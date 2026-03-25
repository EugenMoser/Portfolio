"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { SectionId } from "@/types/portfolio";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useDeepLink } from "@/hooks/useDeepLink";
import { DesktopContext } from "@/contexts/DesktopContext";
import Menubar from "./Menubar";
import FinderWindow from "./FinderWindow";
import Dock from "./Dock";
import Spotlight from "./Spotlight";
import MobileLayout from "./MobileLayout";
import CertificateWindow from "./CertificateWindow";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

export default function MacDesktop() {
  const isMobile = useIsMobile();
  const [history, setHistory] = useState<SectionId[]>(["about"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [windowOpen, setWindowOpen] = useState(true);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [certWindow, setCertWindow] = useState<{ url: string; title: string } | null>(null);

  const activeSection = history[historyIndex];
  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;

  function navigate(id: SectionId) {
    if (id === activeSection) {
      if (!windowOpen) setWindowOpen(true);
      return;
    }
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, id]);
    setHistoryIndex(newHistory.length);
    if (!windowOpen) setWindowOpen(true);
  }

  function goBack() {
    if (canGoBack) setHistoryIndex((i) => i - 1);
  }

  function goForward() {
    if (canGoForward) setHistoryIndex((i) => i + 1);
  }

  useDeepLink({ onNavigate: navigate, activeSection });

  useKeyboardShortcuts({
    onNavigate: navigate,
    onBack: goBack,
    onForward: goForward,
    onSpotlight: () => setSpotlightOpen(true),
    canGoBack,
    canGoForward,
  });

  if (isMobile) {
    return <MobileLayout active={activeSection} onSelect={navigate} />;
  }

  return (
    <DesktopContext.Provider value={{ onOpenCert: (url, title) => setCertWindow({ url, title }) }}>
      <div
        className="relative w-screen h-screen overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #1d5fb5 0%, #4a90d9 50%, #6ab0f0 100%)",
        }}
      >
        <Menubar
          onNavigate={navigate}
          windowOpen={windowOpen}
          onOpenWindow={() => setWindowOpen(true)}
          onCloseWindow={() => setWindowOpen(false)}
          onSpotlight={() => setSpotlightOpen(true)}
        />

        <AnimatePresence>
          {windowOpen && (
            <FinderWindow
              key="finder"
              activeSection={activeSection}
              onSelect={navigate}
              canGoBack={canGoBack}
              canGoForward={canGoForward}
              onBack={goBack}
              onForward={goForward}
              onClose={() => setWindowOpen(false)}
            />
          )}
        </AnimatePresence>

        <Dock
          active={activeSection}
          onSelect={navigate}
          windowOpen={windowOpen}
          onOpenWindow={() => setWindowOpen(true)}
        />

        <AnimatePresence>
          {spotlightOpen && (
            <Spotlight
              key="spotlight"
              onClose={() => setSpotlightOpen(false)}
              onNavigate={(id) => { navigate(id); setSpotlightOpen(false); }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {certWindow && (
            <CertificateWindow
              key="cert"
              url={certWindow.url}
              title={certWindow.title}
              onClose={() => setCertWindow(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </DesktopContext.Provider>
  );
}
