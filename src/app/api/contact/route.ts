import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email, message } = await req.json();

  if (!email || !message) {
    return NextResponse.json({ error: "E-Mail und Nachricht sind erforderlich." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <noreply@eugen-moser.com>",
    to: "job@eugen-moser.com",
    replyTo: email,
    subject: `Neue Nachricht von ${email}`,
    text: message,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "E-Mail konnte nicht gesendet werden." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
