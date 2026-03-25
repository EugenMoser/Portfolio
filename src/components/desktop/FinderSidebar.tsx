"use client";

import type { SectionId } from "@/types/portfolio";

const SECTIONS: { id: SectionId; label: string; emoji: string }[] = [
  { id: "about", label: "About", emoji: "👤" },
  { id: "projects", label: "Projects", emoji: "🗂️" },
  { id: "skills", label: "Skills", emoji: "⚡" },
  { id: "experience", label: "Experience", emoji: "💼" },
  { id: "certificates", label: "Certificates", emoji: "🏅" },
  { id: "contact", label: "Contact", emoji: "✉️" },
];

interface Props {
  active: SectionId;
  onSelect: (id: SectionId) => void;
}

export default function FinderSidebar({ active, onSelect }: Props) {
  return (
    <aside
      className="flex-shrink-0 flex flex-col pt-2 pb-2 overflow-hidden"
      style={{
        width: "clamp(48px, 15vw, 180px)",
        background: "linear-gradient(180deg, #d8dce8 0%, #c8ccd8 100%)",
        borderRight: "1px solid rgba(0,0,0,0.18)",
      }}
    >
      {/* Section: Places */}
      <div className="px-2 mb-1">
        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide hidden md:block pl-1">
          Places
        </p>
      </div>

      {SECTIONS.map(({ id, label, emoji }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className="flex items-center gap-2 px-2 py-1.5 mx-1 rounded text-left transition-colors"
          style={{
            background:
              active === id
                ? "linear-gradient(180deg, #6fa3e0 0%, #4a7fc1 100%)"
                : "transparent",
            color: active === id ? "white" : "#2c2c2c",
          }}
        >
          <span className="text-[16px] flex-shrink-0">{emoji}</span>
          <span className="text-[12px] font-medium truncate hidden md:inline">
            {label}
          </span>
        </button>
      ))}
    </aside>
  );
}
