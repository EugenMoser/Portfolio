export interface Hero {
  name: string;
  title: string;
  subtitle: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Experience {
  period: string;
  position: string;
  company: string;
  description: string;
  details: string[];
  tags: string[];
}

export type Url = `https://${string}`;

export interface LiveLink {
  label: string;
  href: Url;
}

export interface Project {
  title: string;
  description: string;
  bullets: string[];
  tags: string[];
  period: string;
  /** A single unnamed live link, or a non-empty list of named live demos. */
  live?: Url | [LiveLink, ...LiveLink[]];
  repoUrl?: Url;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface PortfolioData {
  hero: Hero;
  about: string;
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
}

export type SectionId =
  | 'about'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'certificates'
  | 'contact';
