"use client";

import { useRef, useState } from "react";
import { motion, useDragControls, useMotionValue } from "framer-motion";

const MENUBAR_H = 28;
const PADDING = 16;
const TITLEBAR_H = 28;
const MIN_WIDTH = 400;
const MIN_HEIGHT = 300;

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

function TrafficLight({
  bg, border, symbol, onClick,
}: {
  bg: string; border: string; symbol: string; onClick: () => void;
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

interface Props {
  url: string;
  title: string;
  onClose: () => void;
}

export default function CertificateWindow({ url, title, onClose }: Props) {
  const dragControls = useDragControls();
  const x = useMotionValue(40);
  const y = useMotionValue(40);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState(() => ({
    width: Math.min(900, window.innerWidth - PADDING * 4),
    height: Math.min(620, window.innerHeight - MENUBAR_H - PADDING * 4),
  }));
  const [resizingActive, setResizingActive] = useState(false);
  const resizeStart = useRef<{ ex: number; ey: number; w: number; h: number; px: number; py: number } | null>(null);

  function startResize(direction: ResizeDirection) {
    return (e: React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setResizingActive(true);
      resizeStart.current = {
        ex: e.clientX, ey: e.clientY,
        w: size.width, h: size.height,
        px: x.get(), py: y.get(),
      };
      function onMove(ev: PointerEvent) {
        const start = resizeStart.current;
        if (!start) return;
        const dX = ev.clientX - start.ex;
        const dY = ev.clientY - start.ey;
        let newW = start.w;
        let newH = start.h;
        let newX = start.px;
        let newY = start.py;
        if (direction.includes('e')) newW = Math.max(MIN_WIDTH, start.w + dX);
        if (direction.includes('w')) {
          newW = Math.max(MIN_WIDTH, start.w - dX);
          newX = start.px + (start.w - newW);
        }
        if (direction.includes('s')) newH = Math.max(MIN_HEIGHT, start.h + dY);
        if (direction.includes('n')) {
          newH = Math.max(MIN_HEIGHT, start.h - dY);
          newY = start.py + (start.h - newH);
        }
        setSize({ width: newW, height: newH });
        if (direction.includes('w')) x.set(newX);
        if (direction.includes('n')) y.set(newY);
      }
      function onUp() {
        resizeStart.current = null;
        setResizingActive(false);
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
      }
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    };
  }

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragElastic={0}
      dragMomentum={false}
      dragConstraints={{ top: 0, left: -3000, right: 3000, bottom: 3000 }}
      style={{ x, y, top: MENUBAR_H + PADDING, position: "fixed", zIndex: 200, width: size.width }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.88, opacity: 0, transition: { duration: 0.15 } }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div
        style={{
          width: size.width,
          height: size.height,
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
          transition: resizingActive ? "none" : "width 0.22s ease, height 0.22s ease",
        }}
      >
        {/* Titlebar */}
        <div
          onPointerDown={(e) => dragControls.start(e)}
          className="flex items-center flex-shrink-0 select-none"
          style={{
            height: TITLEBAR_H,
            background: "linear-gradient(180deg, #e8e8e8 0%, #d0d0d0 100%)",
            borderBottom: "1px solid rgba(0,0,0,0.2)",
            paddingLeft: 12,
            paddingRight: 12,
            cursor: "grab",
          }}
        >
          <div className="flex items-center gap-1.5 mr-4">
            <TrafficLight bg="#ff5f57" border="#e0443e" symbol="×" onClick={onClose} />
            <TrafficLight bg="#ffbd2e" border="#dea123" symbol="−" onClick={onClose} />
            <TrafficLight bg="#28c840" border="#1aab29" symbol="+" onClick={() => {}} />
          </div>
          <div className="flex-1 text-center">
            <span className="text-[12px] font-semibold text-gray-600 truncate">{title}</span>
          </div>
          <div style={{ width: 54 }} />
        </div>

        {/* iframe */}
        <div className="flex-1 relative bg-white">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="flex flex-col items-center gap-2">
                <div className="text-3xl animate-bounce">🏅</div>
                <p className="text-[12px] text-gray-400">Zertifikat wird geladen…</p>
              </div>
            </div>
          )}
          <iframe
            src={url}
            className="w-full h-full border-0"
            onLoad={() => setLoading(false)}
            title={title}
          />
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
          <span className="truncate max-w-xs">{url}</span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline flex-shrink-0 ml-2"
          >
            ↗ Im Browser öffnen
          </a>
        </div>
      </div>

      {/* Resize handles — 4 corners + 4 edges */}
      <>
        <div onPointerDown={startResize('nw')} className="absolute top-0 left-0" style={{ width: 12, height: 12, cursor: 'nw-resize', zIndex: 11 }} />
        <div onPointerDown={startResize('ne')} className="absolute top-0 right-0" style={{ width: 12, height: 12, cursor: 'ne-resize', zIndex: 11 }} />
        <div onPointerDown={startResize('se')} className="absolute bottom-0 right-0" style={{ width: 12, height: 12, cursor: 'se-resize', zIndex: 11 }} />
        <div onPointerDown={startResize('sw')} className="absolute bottom-0 left-0" style={{ width: 12, height: 12, cursor: 'sw-resize', zIndex: 11 }} />
        <div onPointerDown={startResize('n')} className="absolute top-0 left-3 right-3" style={{ height: 6, cursor: 'n-resize', zIndex: 10 }} />
        <div onPointerDown={startResize('s')} className="absolute bottom-0 left-3 right-3" style={{ height: 6, cursor: 's-resize', zIndex: 10 }} />
        <div onPointerDown={startResize('e')} className="absolute top-3 bottom-3 right-0" style={{ width: 6, cursor: 'e-resize', zIndex: 10 }} />
        <div onPointerDown={startResize('w')} className="absolute top-3 bottom-3 left-0" style={{ width: 6, cursor: 'w-resize', zIndex: 10 }} />
      </>
    </motion.div>
  );
}
