export type SocialLink = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  headline: string;
  role: string;
  bio: string;
  philosophyTitle: string;
  philosophyQuote: string;
  philosophyBody: string;
  yearsExperience: string;
  availability: string;
  email: string;
  socialLinks: SocialLink[];
};

export type Project = {
  title: string;
  domain: string;
  summary: string;
  impact: string;
};

export type SkillGroup = {
  name: string;
  items: string[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  bullets: string[];
};

export type PortfolioContent = {
  profile: Profile;
  projects: Project[];
  experiences: Experience[];
  skillGroups: SkillGroup[];
  coreCapabilities: string[];
};

