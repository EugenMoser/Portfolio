import React from "react";

import {
  BriefcaseIcon,
  CodeIcon,
  GraduationCapIcon,
  LayoutIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";

import { strings } from "../../data/portfolio";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";

export function PortfolioGrid() {
  return (
    <BentoGrid className="flex flex-col gap-10">
      <div className="flex w-[300px] flex-col items-center justify-center self-center">
        <Image
          src="/Portfolio-Image.png"
          alt="Profile Picture"
          width={400}
          height={400}
          className="rounded-[50%]"
        />
      </div>
      {/* About Me Tile */}
      {/* <div id="about-me" className="h-content"> */}
      <BentoGridItem
        id="about-me"
        title={strings.sectionTitle.aboutMe}
        description={strings.aboutMeText}
        className="h-content flex flex-wrap"
        icon={<UserIcon className="h-4 w-4 text-neutral-500" />}
      />
      {/* </div> */}
      {/* Skills Tile */}
      <BentoGridItem
        id="skills"
        title="Tech Stack"
        description={
          <div className="mt-2 flex flex-wrap gap-2">
            {strings.skills?.slice(0, 9).map((skill, i) => (
              <span
                key={i}
                className="rounded bg-neutral-800 px-2 py-1 text-neutral-300"
              >
                {skill}
              </span>
            ))}
            {strings.skills && strings.skills.length > 8 && <span>...</span>}
          </div>
        }
        className="min-h-content w-full"
        icon={<CodeIcon className="h-4 w-4 text-neutral-500" />}
      />

      {/* Experience Tile */}
      <BentoGridItem
        id="experience"
        title={strings.resume.experienceTitle}
        description={`Aktuell: ${strings.resume.experience[0].position} bei ${strings.resume.experience[0].company}`}
        className="min-h-content w-full"
        icon={<BriefcaseIcon className="h-4 w-4 text-neutral-500" />}
      />

      {/* Project Tile */}
      {strings.projects && strings.projects.length > 0 && (
        <BentoGridItem
          id="projects"
          title={strings.projects[0].title}
          description={strings.projects[0].description}
          className="min-h-content w-full"
          icon={<LayoutIcon className="h-4 w-4 text-neutral-500" />}
        />
      )}

      {/* Education Tile */}
      <BentoGridItem
        id="education"
        title={strings.sectionTitle.education}
        description={strings.education[0].name}
        className="min-h-content w-full"
        icon={<GraduationCapIcon className="h-4 w-4 text-neutral-500" />}
      />
    </BentoGrid>
  );
}
