export interface ExperienceItem {
  id: string;
  period: string;
  year: string;
  role: string;
  company: string;
  isCurrent?: boolean;
  duration?: string;
  highlight?: string;
  details?: string[];
  technologies: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  concept?: string;
  metrics?: string;
  domainTags?: string;
  description: string;
  architectureFlow?: string[];
  githubUrl: string;
  categoryTag?: string;
  technologies?: string[];
}

export interface SocialPlatformItem {
  id: string;
  name: string;
  category: string;
  handle: string;
  url: string;
}
