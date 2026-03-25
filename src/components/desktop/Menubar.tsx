"use client";

import { useEffect, useState } from "react";

export default function Menubar() {
  const [time, setTime] = useState("");

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

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3"
      style={{
        height: 28,
        background: "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(220,220,220,0.75) 100%)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.2)",
        WebkitAppRegion: "drag",
      } as React.CSSProperties}
    >
      {/* Left: Apple logo + app menus */}
      <div className="flex items-center gap-4 text-[13px] font-medium text-black/80">
        <span className="text-[15px]">🍎</span>
        <span className="font-bold">Finder</span>
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Go</span>
        <span>Window</span>
        <span>Help</span>
      </div>

      {/* Right: clock + status icons */}
      <div className="flex items-center gap-3 text-[12px] text-black/70">
        <span>🔋</span>
        <span>📶</span>
        <span suppressHydrationWarning>{time}</span>
      </div>
    </div>
  );
}
