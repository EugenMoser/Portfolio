import { useEffect } from "react";
import type { SectionId } from "@/types/portfolio";

const SECTION_KEYS: Record<string, SectionId> = {
  "1": "about",
  "2": "projects",
  "3": "skills",
  "4": "experience",
  "5": "certificates",
  "6": "contact",
};

interface Options {
  onNavigate: (id: SectionId) => void;
  onBack: () => void;
  onForward: () => void;
  onSpotlight: () => void;
  onMinimize: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  windowOpen: boolean;
}

export function useKeyboardShortcuts({
  onNavigate,
  onBack,
  onForward,
  onSpotlight,
  onMinimize,
  canGoBack,
  canGoForward,
  windowOpen,
}: Options) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isMeta = e.metaKey || e.ctrlKey;
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (isMeta && e.key === " ") {
        e.preventDefault();
        onSpotlight();
        return;
      }

      if (isMeta && e.key === "m") {
        e.preventDefault();
        if (windowOpen) onMinimize();
        return;
      }

      if (isMeta && SECTION_KEYS[e.key]) {
        e.preventDefault();
        onNavigate(SECTION_KEYS[e.key]);
        return;
      }

      if (isMeta && (e.key === "[" || e.key === "ArrowLeft")) {
        e.preventDefault();
        if (canGoBack) onBack();
        return;
      }

      if (isMeta && (e.key === "]" || e.key === "ArrowRight")) {
        e.preventDefault();
        if (canGoForward) onForward();
        return;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNavigate, onBack, onForward, onSpotlight, onMinimize, canGoBack, canGoForward, windowOpen]);
}
