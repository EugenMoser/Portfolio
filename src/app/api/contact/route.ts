import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// --- Limits ---
const MAX_EMAIL_LENGTH = 254; // RFC 5321
const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- Best-effort in-memory rate limit (pro Instanz, Reset bei Cold-Start) ---
const RATE_LIMIT_MAX = 5; // Anfragen
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // pro 10 Minuten
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte versuche es später erneut." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const { email, message, company } = (body ?? {}) as {
    email?: unknown;
    message?: unknown;
    company?: unknown; // Honeypot
  };

  // Honeypot: von Bots ausgefüllt, von Menschen nie. Still verwerfen, aber "Erfolg" melden.
  if (typeof company === "string" && company.trim().length > 0) {
    return NextResponse.json({ success: true });
  }

  if (typeof email !== "string" || typeof message !== "string") {
    return NextResponse.json(
      { error: "E-Mail und Nachricht sind erforderlich." },
      { status: 400 },
    );
  }

  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (!trimmedEmail || !trimmedMessage) {
    return NextResponse.json(
      { error: "E-Mail und Nachricht sind erforderlich." },
      { status: 400 },
    );
  }

  if (trimmedEmail.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(trimmedEmail)) {
    return NextResponse.json({ error: "Ungültige E-Mail-Adresse." }, { status: 400 });
  }

  if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: `Nachricht ist zu lang (max. ${MAX_MESSAGE_LENGTH} Zeichen).` },
      { status: 400 },
    );
  }

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <noreply@eugen-moser.com>",
    to: "job@eugen-moser.com",
    replyTo: trimmedEmail,
    subject: `Neue Nachricht von ${trimmedEmail}`,
    text: trimmedMessage,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "E-Mail konnte nicht gesendet werden." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
