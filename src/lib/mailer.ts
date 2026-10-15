import { createTransport, type Transporter } from "nodemailer";
import { z } from "zod";

import { data } from "@/data/portfolio";
import { AppError, ErrorCode, Severity } from "@/lib/errors";

// Outbound mail for the contact form, sent through the ALL-INKL mailbox over
// SMTP. Only server code may import this module.

/** Limit for each connection phase (DNS lookup, connect, SMTP greeting) and for socket
 *  inactivity, so a slow or unreachable server fails instead of hanging. Not a cap on the
 *  whole request: phases add up, and a server that keeps trickling data never trips it. */
export const SMTP_TIMEOUT_MS = 10_000;

const IMPLICIT_TLS_PORT = 465;
const SENDER_NAME = "Portfolio-Kontaktformular";
const TRANSIENT_CODES = new Set(["ETIMEDOUT", "ESOCKET", "ECONNECTION", "EDNS"]);

const smtpEnvSchema = z.object({
  SMTP_HOST: z.string().trim().min(1),
  SMTP_PORT: z.coerce.number().int().min(1).max(65535).default(IMPLICIT_TLS_PORT),
  // Also the sender address: ALL-INKL only relays mail from the mailbox itself.
  SMTP_USER: z.email(),
  SMTP_PASS: z.string().min(1),
});

type SmtpEnv = z.infer<typeof smtpEnvSchema>;

export interface ContactMail {
  replyTo: string;
  subject: string;
  text: string;
}

interface Mailer {
  transporter: Transporter;
  from: string;
}

// Built on first send, not at import: `next build` evaluates route modules and
// must not need the SMTP credentials.
let mailer: Mailer | undefined;

function readSmtpEnv(): SmtpEnv {
  // Empty strings count as unset; deployment UIs often save a blank field as "".
  const raw = Object.fromEntries(
    Object.keys(smtpEnvSchema.shape).map((key) => [key, process.env[key] || undefined]),
  );
  const parsed = smtpEnvSchema.safeParse(raw);
  if (!parsed.success) {
    // Key names only: issue messages and inputs could echo the secret values.
    const invalid = [...new Set(parsed.error.issues.map((issue) => String(issue.path[0])))];
    throw new AppError("SMTP configuration invalid", {
      code: ErrorCode.Config,
      details: { invalid },
    });
  }
  return parsed.data;
}

/** Throws only AppErrors with code `config`; nothing is cached on failure. */
function getMailer(): Mailer {
  if (mailer) return mailer;
  const env = readSmtpEnv();
  const implicitTls = env.SMTP_PORT === IMPLICIT_TLS_PORT;
  let transporter: Transporter;
  try {
    transporter = createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: implicitTls,
      // On any other port insist on STARTTLS, so credentials never go out in plaintext.
      requireTLS: !implicitTls,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
      connectionTimeout: SMTP_TIMEOUT_MS,
      greetingTimeout: SMTP_TIMEOUT_MS,
      socketTimeout: SMTP_TIMEOUT_MS,
      dnsTimeout: SMTP_TIMEOUT_MS,
    });
  } catch {
    // Neither message nor `cause`: both could quote the host or the credentials.
    throw new AppError("SMTP transport setup failed", { code: ErrorCode.Config });
  }
  mailer = { transporter, from: env.SMTP_USER };
  return mailer;
}

/**
 * Nodemailer errors carry the raw server response, refused addresses and a
 * message that can quote them. Only the fixed fields go into the AppError, and
 * the original is deliberately not kept as `cause`, so nothing personal ends
 * up in the logs.
 */
function toMailSendError(caught: unknown): AppError {
  const source: Record<string, unknown> =
    typeof caught === "object" && caught !== null ? { ...caught } : {};
  const details: Record<string, unknown> = {};
  if (typeof source.code === "string") details.smtpCode = source.code;
  if (typeof source.responseCode === "number") details.responseCode = source.responseCode;
  // Nodemailer sets fixed labels here ("RCPT TO", "AUTH PLAIN", "CONN"), never arguments.
  if (typeof source.command === "string") details.command = source.command;
  return new AppError("SMTP send failed", {
    code: ErrorCode.MailSend,
    severity: Severity.Error,
    details,
    retryable: typeof source.code === "string" && TRANSIENT_CODES.has(source.code),
  });
}

/** Sends the contact form mail. Rejects with an AppError whose log payload
 *  contains no personal data and no SMTP config values: `config` for invalid
 *  env or a failed transport setup, `mail_send` when sending fails. */
export async function sendContactMail(mail: ContactMail): Promise<void> {
  // Outside the try: its config errors must not be relabelled as `mail_send`.
  const { transporter, from } = getMailer();
  try {
    await transporter.sendMail({
      from: { name: SENDER_NAME, address: from },
      to: data.hero.email,
      replyTo: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
    });
  } catch (caught) {
    throw toMailSendError(caught);
  }
}

/** Test hook: forget the cached transport so the next send re-reads the env. */
export function resetMailer(): void {
  mailer = undefined;
}
