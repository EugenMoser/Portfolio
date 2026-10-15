import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { data } from "@/data/portfolio";
import { Severity, toAppError, toLogPayload } from "@/lib/errors";
import { sendContactMail } from "@/lib/mailer";
import { rateLimit, reserveDailySend } from "@/lib/rate-limit";
import {
  MAX_BODY_BYTES,
  checkSubmitTiming,
  getClientIp,
  isAllowedOrigin,
  isJsonContentType,
} from "@/lib/request-guards";

const INVALID_REQUEST = "Ungültige Anfrage.";
const TOO_LARGE = "Die Anfrage ist zu groß.";
const REQUIRED = "E-Mail und Nachricht sind erforderlich.";
const INVALID_EMAIL = "Ungültige E-Mail-Adresse.";
const SEND_FAILED = "E-Mail konnte nicht gesendet werden.";

const contactSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, REQUIRED)
    .max(254, INVALID_EMAIL) // RFC 5321
    // Also rejects line breaks, so the address cannot inject mail headers.
    .email(INVALID_EMAIL),
  message: z
    .string()
    .trim()
    .min(1, REQUIRED)
    .max(5000, "Nachricht ist zu lang (max. 5000 Zeichen)."),
  // Honeypot: filled by bots, never by humans.
  company: z.string().max(0).optional().or(z.literal("")),
});

function error(message: string, status: number, headers?: HeadersInit) {
  return NextResponse.json({ error: message }, { status, headers });
}

export async function POST(req: NextRequest) {
  // Header checks first: they cost nothing and run before any body is read.
  // A non-JSON content type is what lets third-party pages post without a
  // CORS preflight, so it is rejected outright.
  if (!isJsonContentType(req.headers.get("content-type"))) {
    return error(INVALID_REQUEST, 415);
  }
  if (!isAllowedOrigin(req.headers.get("origin"))) {
    return error(INVALID_REQUEST, 403);
  }
  const declaredLength = Number(req.headers.get("content-length"));
  if (!Number.isFinite(declaredLength) || declaredLength <= 0 || declaredLength > MAX_BODY_BYTES) {
    return error(TOO_LARGE, 413);
  }
  const limit = rateLimit(getClientIp(req.headers));
  if (!limit.ok) {
    return error("Zu viele Anfragen. Bitte versuche es später erneut.", 429, {
      "Retry-After": String(limit.retryAfterSec),
    });
  }

  let body: unknown;
  try {
    const raw = await req.text();
    // Content-Length is client-supplied; re-check what actually arrived.
    if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
      return error(TOO_LARGE, 413);
    }
    body = JSON.parse(raw);
  } catch {
    return error(INVALID_REQUEST, 400);
  }

  try {
    const elapsedMs =
      typeof body === "object" && body !== null && "elapsedMs" in body
        ? (body as { elapsedMs: unknown }).elapsedMs
        : undefined;
    const timing = checkSubmitTiming(elapsedMs);
    if (timing === "bot") {
      // Same silent fake success as the honeypot, so bots don't adapt.
      console.warn("[api/contact] request without valid elapsedMs treated as bot");
      return NextResponse.json({ success: true });
    }
    if (timing === "too-fast") {
      return error("Bitte warte einen Moment und versuche es erneut.", 429);
    }
    if (timing === "stale") {
      return error(
        "Das Fenster war zu lange geöffnet. Bitte lade die Seite neu und sende die Nachricht erneut.",
        400,
      );
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      // Honeypot hit: silently pretend success so bots don't adapt.
      const honeypotIssue = parsed.error.issues.find((issue) => issue.path[0] === "company");
      if (honeypotIssue) {
        return NextResponse.json({ success: true });
      }
      // Only our own German messages reach the user. invalid_type/invalid_value
      // can't come from the real form and would leak Zod's English defaults.
      const firstIssue = parsed.error.issues[0];
      const message =
        firstIssue && firstIssue.code !== "invalid_type" && firstIssue.code !== "invalid_value"
          ? firstIssue.message
          : INVALID_REQUEST;
      return error(message, 400);
    }

    if (!reserveDailySend()) {
      console.error("[api/contact] daily send cap reached");
      return error(
        `Das Formular ist heute nicht mehr erreichbar. Bitte schreib direkt an ${data.hero.email}.`,
        503,
      );
    }

    const { email, message } = parsed.data;

    // Rejects on missing SMTP config and on every SMTP failure; handled below.
    await sendContactMail({
      replyTo: email,
      subject: `[Portfolio] Neue Nachricht von ${email}`,
      text: `Von: ${email}\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (caught) {
    // Mainly sendContactMail: invalid SMTP env (code `config`) or a refused or
    // unreachable mail server (code `mail_send`). Its AppErrors carry only key
    // names and SMTP status fields, never form data or credentials, so the
    // payload is safe to log.
    const appError = toAppError(caught, "Contact request failed");
    const payload = toLogPayload(appError);
    if (appError.severity === Severity.Error) {
      console.error("[api/contact] request failed", payload);
    } else {
      console.warn("[api/contact] request failed", payload);
    }
    return error(SEND_FAILED, 500);
  }
}
