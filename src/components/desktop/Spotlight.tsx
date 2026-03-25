"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SectionId } from "@/types/portfolio";
import { data } from "@/data/portfolio";

interface SearchResult {
  id: string;
  section: SectionId;
  title: string;
  subtitle: string;
  emoji: string;
}

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  // Sections themselves
  const sections: { id: SectionId; label: string; emoji: string }[] = [
    { id: "about", label: "About", emoji: "👤" },
    { id: "projects", label: "Projects", emoji: "🗂️" },
    { id: "skills", label: "Skills", emoji: "⚡" },
    { id: "experience", label: "Experience", emoji: "💼" },
    { id: "certificates", label: "Certificates", emoji: "🏅" },
    { id: "contact", label: "Contact", emoji: "✉️" },
  ];
  sections.forEach((s) =>
    results.push({ id: `sec-${s.id}`, section: s.id, title: s.label, subtitle: "Section", emoji: s.emoji })
  );

  // Projects
  data.projects.forEach((p) =>
    results.push({ id: `proj-${p.title}`, section: "projects", title: p.title, subtitle: p.period, emoji: "🗂️" })
  );

  // Skills
  data.skills.forEach((cat) =>
    cat.items.forEach((item) =>
      results.push({ id: `skill-${item}`, section: "skills", title: item, subtitle: cat.category, emoji: "⚡" })
    )
  );

  // Experience
  data.experience.forEach((exp) =>
    results.push({ id: `exp-${exp.company}`, section: "experience", title: exp.position, subtitle: exp.company, emoji: "💼" })
  );

  // Certifications
  data.certifications.forEach((cert) =>
    results.push({ id: `cert-${cert.name}`, section: "certificates", title: cert.name, subtitle: cert.issuer, emoji: "🏅" })
  );

  return results;
}

const INDEX = buildIndex();

interface Props {
  onClose: () => void;
  onNavigate: (id: SectionId) => void;
}

export default function Spotlight({ onClose, onNavigate }: Props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim()
    ? INDEX.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.subtitle.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Escape") { onClose(); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, results.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
    if (e.key === "Enter" && results[selected]) {
      onNavigate(results[selected].section);
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-[300] flex items-start justify-center"
      style={{ paddingTop: "15vh" }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/30" />
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: -10 }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 580,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.15)",
          background: "rgba(235,235,235,0.92)",
          backdropFilter: "blur(20px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Search input */}
        <div
          className="flex items-center gap-3 px-4"
          style={{
            height: 52,
            borderBottom: results.length > 0 ? "1px solid rgba(0,0,0,0.12)" : "none",
          }}
        >
          <span className="text-xl flex-shrink-0">🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Spotlight-Suche"
            className="flex-1 outline-none bg-transparent text-[18px] text-gray-800 placeholder-gray-400"
            style={{ fontWeight: 300 }}
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-gray-400 hover:text-gray-600 text-[12px]">
              ✕
            </button>
          )}
        </div>

        {/* Results */}
        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              style={{ overflow: "hidden" }}
            >
              {results.map((r, i) => (
                <button
                  key={r.id}
                  onClick={() => { onNavigate(r.section); onClose(); }}
                  onMouseEnter={() => setSelected(i)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left"
                  style={{
                    background: i === selected
                      ? "linear-gradient(180deg, #4a84d4 0%, #2a5fb8 100%)"
                      : "transparent",
                  }}
                >
                  <span className="text-xl flex-shrink-0">{r.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[13px] font-medium truncate"
                      style={{ color: i === selected ? "white" : "rgba(0,0,0,0.85)" }}
                    >
                      {r.title}
                    </p>
                    <p
                      className="text-[11px] truncate"
                      style={{ color: i === selected ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.45)" }}
                    >
                      {r.subtitle}
                    </p>
                  </div>
                  <span
                    className="text-[10px] flex-shrink-0"
                    style={{ color: i === selected ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.3)" }}
                  >
                    ↩
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {query && results.length === 0 && (
          <div className="px-4 py-3 text-[13px] text-gray-400 text-center">
            Keine Ergebnisse für „{query}"
          </div>
        )}
      </motion.div>
    </div>
  );
}
