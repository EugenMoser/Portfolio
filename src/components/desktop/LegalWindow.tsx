"use client";

import { useState } from "react";
import { motion, useDragControls, useMotionValue } from "framer-motion";
import { ImpressumContent, DatenschutzContent } from "@/components/legal/LegalContent";

const MENUBAR_H = 28;
const PADDING = 16;
const TITLEBAR_H = 28;

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
  type: "impressum" | "datenschutz";
  onClose: () => void;
}

export default function LegalWindow({ type, onClose }: Props) {
  const dragControls = useDragControls();
  const x = useMotionValue(60);
  const y = useMotionValue(60);

  const winWidth = Math.min(620, window.innerWidth - PADDING * 4);
  const winHeight = Math.min(540, window.innerHeight - MENUBAR_H - PADDING * 4);
  const title = type === "impressum" ? "Impressum" : "Datenschutzerklärung";

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragElastic={0}
      dragMomentum={false}
      dragConstraints={{ top: 0, left: -3000, right: 3000, bottom: 3000 }}
      style={{ x, y, top: MENUBAR_H + PADDING, position: "fixed", zIndex: 200 }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.88, opacity: 0, transition: { duration: 0.15 } }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div
        style={{
          width: winWidth,
          height: winHeight,
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
          background: "#1e1e1e",
        }}
      >
        {/* Titlebar */}
        <div
          onPointerDown={(e) => dragControls.start(e)}
          className="flex items-center flex-shrink-0 select-none"
          style={{
            height: TITLEBAR_H,
            background: "linear-gradient(180deg, #3a3a3a 0%, #2c2c2c 100%)",
            borderBottom: "1px solid rgba(0,0,0,0.4)",
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
            <span className="text-[12px] font-semibold text-neutral-400 truncate">{title}</span>
          </div>
          <div style={{ width: 54 }} />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto" style={{ background: "#1e1e1e" }}>
          <div className="px-8 py-6 text-sm">
            {type === "impressum" ? (
              <ImpressumContent variant="window" />
            ) : (
              <DatenschutzContent variant="window" />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
