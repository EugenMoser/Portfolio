"use client";

import { motion } from "framer-motion";

import type { SectionId } from "@/types/portfolio";

const SECTION_ITEMS: { id: SectionId; emoji: string; label: string }[] = [
  { id: "about", emoji: "👤", label: "About" },
  { id: "projects", emoji: "🗂️", label: "Projects" },
  { id: "skills", emoji: "⚡", label: "Skills" },
  { id: "experience", emoji: "💼", label: "Experience" },
  { id: "certificates", emoji: "🏅", label: "Certificates" },
  { id: "contact", emoji: "✉️", label: "Contact" },
];

interface Props {
  active: SectionId;
  onSelect: (id: SectionId) => void;
  windowOpen: boolean;
  onOpenWindow: () => void;
}

function DockIcon({
  emoji,
  label,
  active,
  dimmed,
  onClick,
}: {
  emoji: string;
  label: string;
  active?: boolean;
  dimmed?: boolean;
  onClick: () => void;
}) {
  return (
    <div className="group relative flex flex-col items-center">
      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
        {label}
      </span>
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="flex items-center justify-center rounded-xl"
        style={{
          width: 44,
          height: 44,
          opacity: dimmed ? 0.45 : 1,
          background: active
            ? "linear-gradient(145deg, #6fa3e0, #4a7fc1)"
            : "linear-gradient(145deg, rgba(255,255,255,0.7), rgba(220,230,250,0.5))",
          boxShadow: active
            ? "0 4px 12px rgba(74,127,193,0.6)"
            : "0 2px 8px rgba(0,0,0,0.2)",
          border: active
            ? "1px solid rgba(255,255,255,0.5)"
            : "1px solid rgba(255,255,255,0.4)",
        }}
      >
        <span className="text-xl">{emoji}</span>
      </motion.button>
      <div
        className="mt-0.5 h-1 w-1 rounded-full transition-all"
        style={{ background: active ? "rgba(255,255,255,0.9)" : "transparent" }}
      />
    </div>
  );
}

export default function Dock({
  active,
  onSelect,
  windowOpen,
  onOpenWindow,
}: Props) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-end justify-center pb-2"
      style={{ height: 80 }}
    >
      <div
        className="flex items-end gap-1 px-3 pb-1 pt-2"
        style={{
          background: "rgba(255,255,255,0.25)",
          backdropFilter: "blur(20px)",
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,0.4)",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)",
        }}
      >
        {/* Finder app icon */}
        <DockIcon
          emoji="🖥️"
          label={windowOpen ? "Finder" : "Finder (geschlossen)"}
          active={false}
          dimmed={!windowOpen}
          onClick={onOpenWindow}
        />

        {/* Divider */}
        <div
          className="mx-1 my-1 self-stretch"
          style={{ width: 1, background: "rgba(255,255,255,0.35)" }}
        />

        {/* Section icons */}
        {SECTION_ITEMS.map(({ id, emoji, label }) => (
          <DockIcon
            key={id}
            emoji={emoji}
            label={label}
            active={windowOpen && active === id}
            onClick={() => onSelect(id)}
          />
        ))}
      </div>
    </div>
  );
}
