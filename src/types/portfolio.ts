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

export type TechGroup = {
  name: string;
  items: string[];
};

export type PortfolioContent = {
  profile: Profile;
  projects: Project[];
  techGroups: TechGroup[];
};

