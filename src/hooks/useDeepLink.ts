import { useEffect } from "react";
import type { SectionId } from "@/types/portfolio";

const VALID: SectionId[] = ["about", "projects", "skills", "experience", "certificates", "contact"];

function isValidSection(s: string): s is SectionId {
  return VALID.includes(s as SectionId);
}

function getHashSection(): SectionId | null {
  const hash = window.location.hash.replace("#", "");
  return isValidSection(hash) ? hash : null;
}

interface Options {
  onNavigate: (id: SectionId) => void;
  activeSection: SectionId;
}

export function useDeepLink({ onNavigate, activeSection }: Options) {
  // On mount: read hash and navigate
  useEffect(() => {
    const section = getHashSection();
    if (section && section !== activeSection) {
      onNavigate(section);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When hash changes externally (browser back/forward)
  useEffect(() => {
    function onHashChange() {
      const section = getHashSection();
      if (section) onNavigate(section);
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [onNavigate]);

  // Keep hash in sync with activeSection
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${activeSection}`);
    }
  }, [activeSection]);
}
