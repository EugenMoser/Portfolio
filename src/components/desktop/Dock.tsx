"use client";

import { motion } from "framer-motion";
import type { SectionId } from "@/types/portfolio";

const DOCK_ITEMS: { id: SectionId; emoji: string; label: string }[] = [
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
}

export default function Dock({ active, onSelect }: Props) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center items-end pb-2"
      style={{ height: 80 }}
    >
      <div
        className="flex items-end gap-1 px-3 pb-1"
        style={{
          background: "rgba(255,255,255,0.25)",
          backdropFilter: "blur(20px)",
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,0.4)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)",
        }}
      >
        {DOCK_ITEMS.map(({ id, emoji, label }) => (
          <div key={id} className="flex flex-col items-center group relative">
            {/* Tooltip */}
            <span
              className="absolute -top-8 left-1/2 -translate-x-1/2 text-[11px] font-medium text-white bg-black/70 rounded px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
            >
              {label}
            </span>

            <motion.button
              onClick={() => onSelect(id)}
              whileHover={{ scale: 1.35, y: -8 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-center justify-center rounded-xl relative"
              style={{
                width: 52,
                height: 52,
                background: active === id
                  ? "linear-gradient(145deg, #6fa3e0, #4a7fc1)"
                  : "linear-gradient(145deg, rgba(255,255,255,0.7), rgba(220,230,250,0.5))",
                boxShadow: active === id
                  ? "0 4px 12px rgba(74,127,193,0.6)"
                  : "0 2px 8px rgba(0,0,0,0.2)",
                border: active === id
                  ? "1px solid rgba(255,255,255,0.5)"
                  : "1px solid rgba(255,255,255,0.4)",
              }}
            >
              <span className="text-2xl">{emoji}</span>
            </motion.button>

            {/* Active dot */}
            <div
              className="mt-0.5 w-1 h-1 rounded-full transition-all"
              style={{
                background: active === id ? "rgba(255,255,255,0.9)" : "transparent",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
