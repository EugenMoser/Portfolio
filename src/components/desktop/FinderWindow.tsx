import type { SectionId } from "@/types/portfolio";
import { data } from "@/data/portfolio";
import FinderSidebar from "./FinderSidebar";
import FinderContent from "./FinderContent";

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
}

export default function FinderWindow({ activeSection, onSelect, canGoBack, canGoForward, onBack, onForward }: Props) {
  return (
    <div
      className="flex flex-col mx-auto"
      style={{
        width: "min(960px, calc(100vw - 32px))",
        height: "calc(100vh - 28px - 80px - 32px)",
        marginTop: "calc(28px + 16px)",
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.25)",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center px-3 flex-shrink-0"
        style={{
          height: 28,
          background: "linear-gradient(180deg, #e8e8e8 0%, #d0d0d0 100%)",
          borderBottom: "1px solid rgba(0,0,0,0.2)",
        }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 mr-4">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]" />
        </div>
        {/* Window title */}
        <div className="flex-1 text-center">
          <span className="text-[12px] font-semibold text-gray-700">
            {SECTION_LABELS[activeSection]}
          </span>
        </div>
        {/* Spacer to balance traffic lights */}
        <div className="w-[54px]" />
      </div>

      {/* Toolbar */}
      <div
        className="flex items-center px-3 gap-2 flex-shrink-0"
        style={{
          height: 36,
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
          style={{
            background: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(0,0,0,0.15)",
          }}
        >
          Portfolio / {SECTION_LABELS[activeSection]}
        </div>
      </div>

      {/* Body: sidebar + content */}
      <div className="flex flex-1 overflow-hidden">
        <FinderSidebar active={activeSection} onSelect={onSelect} />
        <FinderContent active={activeSection} />
      </div>

      {/* Status bar */}
      <div
        className="flex items-center px-3 flex-shrink-0"
        style={{
          height: 22,
          background: "linear-gradient(180deg, #e0e0e0 0%, #d0d0d0 100%)",
          borderTop: "1px solid rgba(0,0,0,0.15)",
        }}
      >
        <span className="text-[10px] text-gray-500">{SECTION_STATUS[activeSection]}</span>
      </div>
    </div>
  );
}
