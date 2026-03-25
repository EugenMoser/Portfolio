"use client";

import { useState } from "react";
import type { SectionId } from "@/types/portfolio";
import Menubar from "./Menubar";
import FinderWindow from "./FinderWindow";
import Dock from "./Dock";

export default function MacDesktop() {
  const [history, setHistory] = useState<SectionId[]>(["about"]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const activeSection = history[historyIndex];

  function navigate(id: SectionId) {
    if (id === activeSection) return;
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, id]);
    setHistoryIndex(newHistory.length);
  }

  function goBack() {
    if (historyIndex > 0) setHistoryIndex((i) => i - 1);
  }

  function goForward() {
    if (historyIndex < history.length - 1) setHistoryIndex((i) => i + 1);
  }

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #1d5fb5 0%, #4a90d9 50%, #6ab0f0 100%)",
      }}
    >
      <Menubar />
      <FinderWindow
        activeSection={activeSection}
        onSelect={navigate}
        canGoBack={historyIndex > 0}
        canGoForward={historyIndex < history.length - 1}
        onBack={goBack}
        onForward={goForward}
      />
      <Dock active={activeSection} onSelect={navigate} />
    </div>
  );
}
