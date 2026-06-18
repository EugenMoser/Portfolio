"use client";

import { useState } from "react";
import { data } from "@/data/portfolio";

type SendState = "idle" | "sending" | "sent" | "error";

export default function ContactSection() {
  const { hero } = data;
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [company, setCompany] = useState(""); // Honeypot – bleibt leer für echte Nutzer
  const [sendState, setSendState] = useState<SendState>("idle");

  async function handleSend() {
    if (!email.trim() || !body.trim()) return;
    setSendState("sending");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), message: body.trim(), company }),
    });

    setSendState(res.ok ? "sent" : "error");
  }

  function handleNew() {
    setEmail("");
    setBody("");
    setCompany("");
    setSendState("idle");
  }

  const canSend = email.trim().length > 0 && body.trim().length > 0;

  return (
    <div className="flex flex-col h-full" style={{ background: "#f0f0f0" }}>
      {/* Mail.app Toolbar */}
      <div
        className="flex items-center gap-2 px-3 flex-shrink-0"
        style={{
          height: 40,
          background: "linear-gradient(180deg, #e8e8e8 0%, #d8d8d8 100%)",
          borderBottom: "1px solid rgba(0,0,0,0.15)",
        }}
      >
        <MailToolbarButton
          emoji="📤"
          label="Senden"
          onClick={handleSend}
          disabled={sendState === "sending" || sendState === "sent" || !canSend}
          primary
        />
        <MailToolbarButton emoji="📎" label="Anhang" onClick={() => {}} disabled />
        <MailToolbarButton emoji="👤" label="Adressbuch" onClick={() => {}} disabled />
        <div className="flex-1" />
        <MailToolbarButton emoji="✏️" label="Neue Mail" onClick={handleNew} />
      </div>

      {/* Header fields */}
      <div
        className="flex-shrink-0"
        style={{
          background: "white",
          borderBottom: "1px solid rgba(0,0,0,0.12)",
        }}
      >
        <HeaderField label="An:" value={hero.email} readOnly />
        <div style={{ height: 1, background: "rgba(0,0,0,0.08)", margin: "0 12px" }} />
        <HeaderField
          label="Von:"
          value={email}
          onChange={setEmail}
          placeholder="deine@email.com"
          readOnly={sendState === "sent"}
          type="email"
        />
      </div>

      {/* Honeypot – für Menschen unsichtbar, fängt Bots ab */}
      <input
        type="text"
        name="company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {/* Body */}
      <div className="flex-1 relative" style={{ background: "white" }}>
        {sendState === "sent" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span className="text-4xl">📨</span>
            <p className="text-[14px] font-medium text-gray-700">Nachricht gesendet!</p>
            <p className="text-[12px] text-gray-500 text-center max-w-xs">
              Ich melde mich so bald wie möglich bei dir.
            </p>
            <button
              onClick={handleNew}
              className="mt-2 px-4 py-1.5 rounded text-[12px] font-medium text-white"
              style={{
                background: "linear-gradient(180deg, #7ab0e8 0%, #4a7fc1 100%)",
                border: "1px solid #3a6fa1",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            >
              Neue Nachricht
            </button>
          </div>
        ) : sendState === "error" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span className="text-4xl">⚠️</span>
            <p className="text-[14px] font-medium text-gray-700">Fehler beim Senden</p>
            <p className="text-[12px] text-gray-500 text-center max-w-xs">
              Bitte versuche es erneut oder schreib direkt an {hero.email}.
            </p>
            <button
              onClick={() => setSendState("idle")}
              className="mt-2 px-4 py-1.5 rounded text-[12px] font-medium text-white"
              style={{
                background: "linear-gradient(180deg, #7ab0e8 0%, #4a7fc1 100%)",
                border: "1px solid #3a6fa1",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            >
              Erneut versuchen
            </button>
          </div>
        ) : (
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={`Hallo Eugen,\n\n`}
            className="w-full h-full resize-none outline-none text-[13px] text-gray-800 leading-relaxed"
            style={{
              padding: "12px 16px",
              fontFamily: "Georgia, 'Times New Roman', serif",
              background: "transparent",
            }}
            disabled={sendState === "sending"}
          />
        )}

        {/* Sending overlay */}
        {sendState === "sending" && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <div className="flex flex-col items-center gap-2">
              <div className="text-2xl animate-bounce">📤</div>
              <p className="text-[12px] text-gray-500">Wird gesendet…</p>
            </div>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-3 flex-shrink-0 text-[10px] text-gray-500"
        style={{
          height: 20,
          background: "linear-gradient(180deg, #e0e0e0 0%, #d0d0d0 100%)",
          borderTop: "1px solid rgba(0,0,0,0.12)",
        }}
      >
        <span>
          {body.length > 0 ? `${body.length} Zeichen` : "Neue Nachricht"}
        </span>
        <span>Mail 2.1.3 (Tiger)</span>
      </div>
    </div>
  );
}

function MailToolbarButton({
  emoji,
  label,
  onClick,
  disabled,
  primary,
}: {
  emoji: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex flex-col items-center gap-0.5 px-2 py-1 rounded transition-colors disabled:opacity-40 disabled:cursor-default"
      style={{
        background:
          primary && !disabled
            ? "linear-gradient(180deg, #7ab0e8 0%, #4a7fc1 100%)"
            : "linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(220,220,220,0.8) 100%)",
        border: primary && !disabled ? "1px solid #3a6fa1" : "1px solid rgba(0,0,0,0.15)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
        minWidth: 52,
      }}
    >
      <span style={{ fontSize: 16, lineHeight: 1 }}>{emoji}</span>
      <span
        style={{
          fontSize: 10,
          fontWeight: 500,
          color: primary && !disabled ? "white" : "rgba(0,0,0,0.65)",
          lineHeight: 1,
        }}
      >
        {label}
      </span>
    </button>
  );
}

function HeaderField({
  label,
  value,
  onChange,
  placeholder,
  readOnly,
  type = "text",
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  type?: string;
}) {
  return (
    <div className="flex items-center" style={{ minHeight: 28, padding: "0 12px" }}>
      <span
        className="flex-shrink-0 text-right text-[12px] font-medium text-gray-500 select-none"
        style={{ width: 60 }}
      >
        {label}
      </span>
      {readOnly || !onChange ? (
        <span className="text-[12px] text-gray-800 ml-2 truncate">{value}</span>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 ml-2 text-[12px] text-gray-800 outline-none bg-transparent"
          style={{ fontFamily: "system-ui, sans-serif" }}
        />
      )}
    </div>
  );
}
