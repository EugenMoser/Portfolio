import React from "react";

import {
  BriefcaseIcon,
  CodeIcon,
  GraduationCapIcon,
  LayoutIcon,
  UserIcon,
} from "lucide-react";

import { strings } from "../../data/portfolio";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";

export function PortfolioGrid() {
  return (
    <BentoGrid className="mx-auto max-w-4xl md:auto-rows-[20rem]">
      {/* About Me Tile */}
      <BentoGridItem
        title={strings.sectionTitle.aboutMe}
        description={strings.aboutMeText.substring(0, 150) + "..."}
        header={<SkeletonProfile />}
        className="md:col-span-2"
        icon={<UserIcon className="h-4 w-4 text-neutral-500" />}
      />

      {/* Skills Tile */}
      <BentoGridItem
        title="Tech Stack"
        description={
          <div className="mt-2 flex flex-wrap gap-2">
            {strings.skills?.slice(0, 8).map((skill, i) => (
              <span
                key={i}
                className="rounded bg-neutral-800 px-2 py-1 text-xs text-neutral-300"
              >
                {skill}
              </span>
            ))}
            {strings.skills && strings.skills.length > 8 && <span>...</span>}
          </div>
        }
        header={<SkeletonStack />}
        className="md:col-span-1"
        icon={<CodeIcon className="h-4 w-4 text-neutral-500" />}
      />

      {/* Experience Tile */}
      <BentoGridItem
        title={strings.resume.experienceTitle}
        description={`Aktuell: ${strings.resume.experience[0].position} bei ${strings.resume.experience[0].company}`}
        header={<SkeletonTimeline />}
        className="md:col-span-1"
        icon={<BriefcaseIcon className="h-4 w-4 text-neutral-500" />}
      />

      {/* Project Tile */}
      {strings.projects && strings.projects.length > 0 && (
        <BentoGridItem
          title={strings.projects[0].title}
          description={strings.projects[0].description}
          header={<SkeletonProject />}
          className="md:col-span-2"
          icon={<LayoutIcon className="h-4 w-4 text-neutral-500" />}
        />
      )}

      {/* Education Tile */}
      <BentoGridItem
        title={strings.sectionTitle.education}
        description={strings.education[0].name}
        header={<SkeletonEducation />}
        className="md:col-span-1"
        icon={<GraduationCapIcon className="h-4 w-4 text-neutral-500" />}
      />
    </BentoGrid>
  );
}

// Placeholder visuals for the tiles
const SkeletonProfile = () => (
  <div className="flex h-full min-h-[6rem] w-full flex-1 rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800" />
);

const SkeletonStack = () => (
  <div className="flex h-full min-h-[6rem] w-full flex-1 rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800" />
);

const SkeletonTimeline = () => (
  <div className="flex h-full min-h-[6rem] w-full flex-1 rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800" />
);

const SkeletonProject = () => (
  <div className="flex h-full min-h-[6rem] w-full flex-1 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500" />
);

const SkeletonEducation = () => (
  <div className="flex h-full min-h-[6rem] w-full flex-1 rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800" />
);
