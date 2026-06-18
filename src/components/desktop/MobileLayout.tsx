"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { SectionId } from "@/types/portfolio";
import { data } from "@/data/portfolio";
import FinderContent from "./FinderContent";

const TABS: { id: SectionId; emoji: string; label: string }[] = [
  { id: "about", emoji: "👤", label: "About" },
  { id: "projects", emoji: "🗂️", label: "Projects" },
  { id: "skills", emoji: "⚡", label: "Skills" },
  { id: "experience", emoji: "💼", label: "Experience" },
  { id: "certificates", emoji: "🏅", label: "Certs" },
  { id: "contact", emoji: "✉️", label: "Contact" },
];

const SECTION_LABELS: Record<SectionId, string> = {
  about: "About",
  projects: "Projects",
  skills: "Skills",
  experience: "Experience",
  certificates: "Certificates",
  contact: "Contact",
};

interface Props {
  active: SectionId;
  onSelect: (id: SectionId) => void;
}

export default function MobileLayout({ active, onSelect }: Props) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("de-DE", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{
        background: "linear-gradient(180deg, #1d5fb5 0%, #4a90d9 50%, #6ab0f0 100%)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between flex-shrink-0 px-4"
        style={{
          height: 44,
          background: "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(220,220,220,0.75) 100%)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,0,0,0.2)",
        }}
      >
        <span className="text-[13px] font-semibold text-gray-700 w-24 truncate">
          {data.hero.name}
        </span>
        <span className="text-[13px] font-semibold text-gray-600 absolute left-1/2 -translate-x-1/2">
          {SECTION_LABELS[active]}
        </span>
        <span className="text-[12px] text-gray-500 w-24 text-right" suppressHydrationWarning>
          {time}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="flex-1 flex flex-col h-full"
          >
            <FinderContent active={active} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Tab Bar */}
      <div
        className="flex items-center justify-around flex-shrink-0 px-2"
        style={{
          height: 64,
          background: "rgba(255,255,255,0.25)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.4)",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.15)",
        }}
      >
        {TABS.map(({ id, emoji, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className="flex flex-col items-center gap-0.5 flex-1 py-1 transition-opacity"
              style={{ opacity: isActive ? 1 : 0.6 }}
            >
              <span
                className="flex items-center justify-center rounded-xl transition-all"
                style={{
                  width: 32,
                  height: 32,
                  background: isActive
                    ? "linear-gradient(145deg, #6fa3e0, #4a7fc1)"
                    : "transparent",
                  boxShadow: isActive ? "0 2px 8px rgba(74,127,193,0.5)" : "none",
                }}
              >
                <span style={{ fontSize: 16 }}>{emoji}</span>
              </span>
              <span
                className="text-white"
                style={{
                  fontSize: 10,
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Legal footer */}
      <div
        className="flex items-center justify-center gap-2 flex-shrink-0"
        style={{
          background: "rgba(0,0,0,0.18)",
          borderTop: "1px solid rgba(255,255,255,0.15)",
          paddingTop: 7,
          paddingBottom: "calc(7px + env(safe-area-inset-bottom))",
        }}
      >
        <Link
          href="/impressum"
          className="text-white/70 active:text-white transition-colors"
          style={{ fontSize: 11 }}
        >
          Impressum
        </Link>
        <span className="text-white/40" style={{ fontSize: 11 }}>
          ·
        </span>
        <Link
          href="/datenschutz"
          className="text-white/70 active:text-white transition-colors"
          style={{ fontSize: 11 }}
        >
          Datenschutz
        </Link>
      </div>
    </div>
  );
}
