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

export interface Project {
  title: string;
  description: string;
  bullets: string[];
  tags: string[];
  period: string;
  link?: string;
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
