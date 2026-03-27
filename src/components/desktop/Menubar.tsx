"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SectionId } from "@/types/portfolio";
import AboutDialog from "./AboutDialog";

const SECTIONS: { id: SectionId; label: string; emoji: string; shortcut: string }[] = [
  { id: "about", label: "About", emoji: "👤", shortcut: "⌘1" },
  { id: "projects", label: "Projects", emoji: "🗂️", shortcut: "⌘2" },
  { id: "skills", label: "Skills", emoji: "⚡", shortcut: "⌘3" },
  { id: "experience", label: "Experience", emoji: "💼", shortcut: "⌘4" },
  { id: "certificates", label: "Certificates", emoji: "🏅", shortcut: "⌘5" },
  { id: "contact", label: "Contact", emoji: "✉️", shortcut: "⌘6" },
];

interface MenuItemProps {
  label?: string;
  shortcut?: string;
  onClick?: () => void;
  separator?: boolean;
  disabled?: boolean;
}

function MenuItem({ label, shortcut, onClick, separator, disabled }: MenuItemProps) {
  if (separator) return <div style={{ height: 1, background: "rgba(0,0,0,0.12)", margin: "3px 0" }} />;
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="w-full flex items-center justify-between px-3 py-0.5 rounded text-left"
      style={{
        fontSize: 13,
        color: disabled ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.85)",
        background: "transparent",
        cursor: disabled ? "default" : "pointer",
      }}
      onMouseEnter={(e) => {
        if (!disabled) (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(180deg, #4a84d4 0%, #2a5fb8 100%)";
        if (!disabled) (e.currentTarget as HTMLButtonElement).style.color = "white";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        (e.currentTarget as HTMLButtonElement).style.color = disabled ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.85)";
      }}
    >
      <span>{label}</span>
      {shortcut && <span style={{ fontSize: 11, opacity: 0.6, marginLeft: 24 }}>{shortcut}</span>}
    </button>
  );
}

function DropdownMenu({ items, style }: { items: MenuItemProps[]; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0.9, y: -4 }}
      animate={{ opacity: 1, scaleY: 1, y: 0 }}
      exit={{ opacity: 0, scaleY: 0.9, y: -4 }}
      transition={{ duration: 0.1 }}
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        minWidth: 200,
        background: "linear-gradient(180deg, #f0f0f0 0%, #e4e4e4 100%)",
        border: "1px solid rgba(0,0,0,0.25)",
        borderRadius: 6,
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        padding: "4px 0",
        zIndex: 200,
        transformOrigin: "top",
        ...style,
      }}
    >
      {items.map((item, i) => (
        <MenuItem key={i} {...item} />
      ))}
    </motion.div>
  );
}

interface Props {
  onNavigate: (id: SectionId) => void;
  windowOpen: boolean;
  onOpenWindow: () => void;
  onCloseWindow: () => void;
  onMinimize: () => void;
  onSpotlight: () => void;
  onOpenLegal: (type: "impressum" | "datenschutz") => void;
}

export default function Menubar({ onNavigate, windowOpen, onOpenWindow, onCloseWindow, onMinimize, onSpotlight, onOpenLegal }: Props) {
  const [time, setTime] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const menubarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("de-DE", {
          hour: "2-digit",
          minute: "2-digit",
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menubarRef.current && !menubarRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function toggleMenu(name: string) {
    setOpenMenu((m) => (m === name ? null : name));
  }

  function closeMenu() {
    setOpenMenu(null);
  }

  const menuLabelStyle: React.CSSProperties = {
    padding: "2px 8px",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
    color: "rgba(0,0,0,0.8)",
  };

  const activeMenuStyle: React.CSSProperties = {
    ...menuLabelStyle,
    background: "linear-gradient(180deg, #4a84d4 0%, #2a5fb8 100%)",
    color: "white",
  };

  return (
    <>
      <div
        ref={menubarRef}
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-3"
        style={{
          height: 28,
          background: "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(220,220,220,0.75) 100%)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,0,0,0.2)",
        }}
      >
        {/* Left menus */}
        <div className="flex items-center gap-1 h-full">
          {/* Apple menu */}
          <div className="relative h-full flex items-center">
            <span
              style={openMenu === "apple" ? activeMenuStyle : { ...menuLabelStyle, fontSize: 16 }}
              onClick={() => toggleMenu("apple")}
            >
              🍎
            </span>
            <AnimatePresence>
              {openMenu === "apple" && (
                <DropdownMenu items={[
                  { label: "About This Mac", onClick: () => { setShowAbout(true); closeMenu(); } },
                  { separator: true },
                  { label: "Software Update…", disabled: true },
                  { separator: true },
                  { label: "System Preferences…", disabled: true },
                  { separator: true },
                  { label: "Shut Down…", disabled: true },
                ]} />
              )}
            </AnimatePresence>
          </div>

          {/* Finder */}
          <span style={{ ...menuLabelStyle, fontWeight: 700 }}>Finder</span>

          {/* Go menu */}
          <div className="relative h-full flex items-center">
            <span
              style={openMenu === "go" ? activeMenuStyle : menuLabelStyle}
              onClick={() => toggleMenu("go")}
            >
              Go
            </span>
            <AnimatePresence>
              {openMenu === "go" && (
                <DropdownMenu items={[
                  ...SECTIONS.map((s) => ({
                    label: `${s.emoji}  ${s.label}`,
                    shortcut: s.shortcut,
                    onClick: () => { onNavigate(s.id); closeMenu(); },
                  })),
                ]} />
              )}
            </AnimatePresence>
          </div>

          {/* Window menu */}
          <div className="relative h-full flex items-center">
            <span
              style={openMenu === "window" ? activeMenuStyle : menuLabelStyle}
              onClick={() => toggleMenu("window")}
            >
              Window
            </span>
            <AnimatePresence>
              {openMenu === "window" && (
                <DropdownMenu items={[
                  { label: "Minimize", shortcut: "⌘M", disabled: !windowOpen, onClick: () => { onMinimize(); closeMenu(); } },
                  { label: "Close Window", shortcut: "⌘W", disabled: !windowOpen, onClick: () => { onCloseWindow(); closeMenu(); } },
                  { separator: true },
                  { label: "Finder öffnen", shortcut: "⌘N", disabled: windowOpen, onClick: () => { onOpenWindow(); closeMenu(); } },
                ]} />
              )}
            </AnimatePresence>
          </div>

          {/* Help menu */}
          <div className="relative h-full flex items-center">
            <span
              style={openMenu === "help" ? activeMenuStyle : menuLabelStyle}
              onClick={() => toggleMenu("help")}
            >
              Help
            </span>
            <AnimatePresence>
              {openMenu === "help" && (
                <DropdownMenu items={[
                  { label: "Portfolio Help", shortcut: "⌘?", onClick: () => { setShowAbout(true); closeMenu(); } },
                  { separator: true },
                  { label: "Report a Bug…", disabled: true },
                ]} />
              )}
            </AnimatePresence>
          </div>

          {/* Legal */}
          <span style={menuLabelStyle} onClick={() => onOpenLegal("impressum")}>
            Impressum
          </span>
          <span style={menuLabelStyle} onClick={() => onOpenLegal("datenschutz")}>
            Datenschutz
          </span>
        </div>

        {/* Right: clock + spotlight */}
        <div className="flex items-center gap-3 text-[12px] text-black/70">
          <button
            onClick={onSpotlight}
            className="hover:opacity-70 transition-opacity"
            title="Spotlight (⌘Space)"
          >
            🔍
          </button>
          <span>🔋</span>
          <span>📶</span>
          <span suppressHydrationWarning>{time}</span>
        </div>
      </div>

      {/* About Dialog */}
      <AnimatePresence>
        {showAbout && <AboutDialog onClose={() => setShowAbout(false)} />}
      </AnimatePresence>
    </>
  );
}
