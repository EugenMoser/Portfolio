"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useDragControls, useMotionValue } from "framer-motion";
import type { SectionId } from "@/types/portfolio";
import { data } from "@/data/portfolio";
import FinderSidebar from "./FinderSidebar";
import FinderContent from "./FinderContent";

const MENUBAR_H = 28;
const DOCK_H = 80;
const PADDING = 16;
const TITLEBAR_H = 28;
const MIN_WIDTH = 320;
const MIN_HEIGHT = 300;

const SECTION_LABELS: Record<SectionId, string> = {
  about: "About",
  projects: "Projects",
  skills: "Skills",
  experience: "Experience",
  certificates: "Certificates",
  contact: "Contact",
};

const SECTION_STATUS: Record<SectionId, string> = {
  about: "1 item",
  projects: `${data.projects.length} items`,
  skills: `${data.skills.length} categories, ${data.skills.reduce((acc, c) => acc + c.items.length, 0)} items`,
  experience: `${data.experience.length} items`,
  certificates: `${data.certifications.length} items`,
  contact: "4 items",
};

interface Props {
  activeSection: SectionId;
  onSelect: (id: SectionId) => void;
  canGoBack: boolean;
  canGoForward: boolean;
  onBack: () => void;
  onForward: () => void;
  onClose: () => void;
}

function TrafficLight({
  bg,
  border,
  symbol,
  onClick,
}: {
  bg: string;
  border: string;
  symbol: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-center rounded-full flex-shrink-0"
      style={{ width: 12, height: 12, background: bg, border: `1px solid ${border}`, cursor: "pointer" }}
    >
      {hovered && (
        <span style={{ fontSize: 8, lineHeight: 1, color: "rgba(0,0,0,0.55)", fontWeight: 800 }}>
          {symbol}
        </span>
      )}
    </button>
  );
}

export default function FinderWindow({
  activeSection, onSelect,
  canGoBack, canGoForward, onBack, onForward,
  onClose,
}: Props) {
  const dragControls = useDragControls();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [shaded, setShaded] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [size, setSize] = useState({ width: 960, height: 500 });
  const savedSize = useRef({ width: 960, height: 500 });
  const savedPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const w = Math.min(960, window.innerWidth - PADDING * 2);
    const h = window.innerHeight - MENUBAR_H - DOCK_H - PADDING * 2;
    setSize({ width: w, height: h });
    savedSize.current = { width: w, height: h };

    function handleResize() {
      const maxW = window.innerWidth - PADDING * 2;
      const maxH = window.innerHeight - MENUBAR_H - DOCK_H - PADDING * 2;
      setSize((prev) => ({
        width: Math.min(prev.width, maxW),
        height: Math.min(prev.height, maxH),
      }));
      // Clamp position so window stays in viewport
      const curX = x.get();
      const curY = y.get();
      if (curX > 0) x.set(Math.min(curX, maxW / 2));
      if (curY > 0) y.set(Math.min(curY, maxH / 2));
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [x, y]);

  function toggleShade() {
    if (maximized) setMaximized(false);
    setShaded((s) => !s);
  }

  function toggleMaximize() {
    if (maximized) {
      setSize(savedSize.current);
      x.set(savedPos.current.x);
      y.set(savedPos.current.y);
      setMaximized(false);
    } else {
      savedSize.current = { ...size };
      savedPos.current = { x: x.get(), y: y.get() };
      setSize({
        width: window.innerWidth - PADDING * 2,
        height: window.innerHeight - MENUBAR_H - DOCK_H - PADDING * 2,
      });
      x.set(0);
      y.set(0);
      setMaximized(true);
      setShaded(false);
    }
  }

  // Resize handle
  const resizeStart = useRef<{ ex: number; ey: number; w: number; h: number } | null>(null);

  function onResizePointerDown(e: React.PointerEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (maximized || shaded) return;
    resizeStart.current = { ex: e.clientX, ey: e.clientY, w: size.width, h: size.height };
    function onMove(ev: PointerEvent) {
      if (!resizeStart.current) return;
      setSize({
        width: Math.max(MIN_WIDTH, resizeStart.current.w + ev.clientX - resizeStart.current.ex),
        height: Math.max(MIN_HEIGHT, resizeStart.current.h + ev.clientY - resizeStart.current.ey),
      });
    }
    function onUp() {
      resizeStart.current = null;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  const displayHeight = shaded ? TITLEBAR_H : size.height;

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragElastic={0}
      dragMomentum={false}
      dragConstraints={{ top: 0, left: -3000, right: 3000, bottom: 3000 }}
      style={{ x, y, marginTop: MENUBAR_H + PADDING, position: "relative" }}
      className="mx-auto"
      exit={{ scale: 0.88, opacity: 0, y: 30, transition: { duration: 0.18 } }}
    >
      {/* Window shell */}
      <div
        style={{
          width: size.width,
          height: displayHeight,
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.22s ease, height 0.22s ease",
        }}
      >
        {/* Titlebar — drag handle */}
        <div
          onPointerDown={(e) => dragControls.start(e)}
          className="flex items-center flex-shrink-0 select-none"
          style={{
            height: TITLEBAR_H,
            background: "linear-gradient(180deg, #e8e8e8 0%, #d0d0d0 100%)",
            borderBottom: shaded ? "none" : "1px solid rgba(0,0,0,0.2)",
            paddingLeft: 12,
            paddingRight: 12,
            cursor: "grab",
          }}
        >
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5 mr-4">
            <TrafficLight bg="#ff5f57" border="#e0443e" symbol="×" onClick={onClose} />
            <TrafficLight bg="#ffbd2e" border="#dea123" symbol="−" onClick={toggleShade} />
            <TrafficLight bg="#28c840" border="#1aab29" symbol="+" onClick={toggleMaximize} />
          </div>

          <div className="flex-1 text-center">
            <span className="text-[12px] font-semibold text-gray-600">
              {shaded ? `Finder — ${SECTION_LABELS[activeSection]}` : SECTION_LABELS[activeSection]}
            </span>
          </div>
          <div style={{ width: 54 }} />
        </div>

        {/* Content hidden when shaded */}
        {!shaded && (
          <>
            {/* Toolbar */}
            <div
              className="flex items-center gap-2 flex-shrink-0"
              style={{
                height: 36,
                padding: "0 12px",
                background: "linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)",
                borderBottom: "1px solid rgba(0,0,0,0.12)",
              }}
            >
              <button
                onClick={onBack}
                disabled={!canGoBack}
                className="px-2 py-0.5 rounded text-[11px] border transition-colors disabled:opacity-30 disabled:cursor-default"
                style={{
                  boxShadow: canGoBack ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
                  background: canGoBack ? "rgba(255,255,255,0.6)" : "transparent",
                  borderColor: canGoBack ? "rgb(209,213,219)" : "transparent",
                  color: canGoBack ? "rgb(75,85,99)" : "rgb(156,163,175)",
                }}
              >
                ‹
              </button>
              <button
                onClick={onForward}
                disabled={!canGoForward}
                className="px-2 py-0.5 rounded text-[11px] border transition-colors disabled:opacity-30 disabled:cursor-default"
                style={{
                  boxShadow: canGoForward ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
                  background: canGoForward ? "rgba(255,255,255,0.6)" : "transparent",
                  borderColor: canGoForward ? "rgb(209,213,219)" : "transparent",
                  color: canGoForward ? "rgb(75,85,99)" : "rgb(156,163,175)",
                }}
              >
                ›
              </button>
              <div
                className="flex-1 mx-2 px-2 py-0.5 rounded text-[11px] text-gray-500"
                style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.15)" }}
              >
                Portfolio / {SECTION_LABELS[activeSection]}
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 overflow-hidden">
              <FinderSidebar active={activeSection} onSelect={onSelect} />
              <FinderContent active={activeSection} />
            </div>

            {/* Status bar */}
            <div
              className="flex items-center flex-shrink-0"
              style={{
                height: 22,
                padding: "0 12px",
                background: "linear-gradient(180deg, #e0e0e0 0%, #d0d0d0 100%)",
                borderTop: "1px solid rgba(0,0,0,0.15)",
              }}
            >
              <span className="text-[10px] text-gray-500">{SECTION_STATUS[activeSection]}</span>
            </div>
          </>
        )}
      </div>

      {/* Resize handle */}
      {!shaded && !maximized && (
        <div
          onPointerDown={onResizePointerDown}
          className="absolute bottom-0 right-0"
          style={{ width: 16, height: 16, cursor: "se-resize", zIndex: 10 }}
        />
      )}
    </motion.div>
  );
}
