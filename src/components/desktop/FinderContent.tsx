"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { SectionId } from "@/types/portfolio";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import CertificatesSection from "@/components/sections/CertificatesSection";
import ContactSection from "@/components/sections/ContactSection";

interface Props {
  active: SectionId;
}

const SECTION_MAP: Record<SectionId, React.ReactNode> = {
  about: <AboutSection />,
  projects: <ProjectsSection />,
  skills: <SkillsSection />,
  experience: <ExperienceSection />,
  certificates: <CertificatesSection />,
  contact: <ContactSection />,
};

export default function FinderContent({ active }: Props) {
  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="h-full"
        >
          {SECTION_MAP[active]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
