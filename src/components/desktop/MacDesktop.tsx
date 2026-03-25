"use client";

import { useState } from "react";
import type { SectionId } from "@/types/portfolio";
import Menubar from "./Menubar";
import FinderWindow from "./FinderWindow";
import Dock from "./Dock";

export default function MacDesktop() {
  const [activeSection, setActiveSection] = useState<SectionId>("about");

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #1d5fb5 0%, #4a90d9 50%, #6ab0f0 100%)",
      }}
    >
      <Menubar />
      <FinderWindow activeSection={activeSection} onSelect={setActiveSection} />
      <Dock active={activeSection} onSelect={setActiveSection} />
    </div>
  );
}
