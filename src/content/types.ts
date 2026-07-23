/**
 * Shared, SERIALIZABLE content types used across the app.
 *
 * These are the single source of truth for the shape of site content whether it
 * comes from the CMS (Sanity) or the local fallback (site.ts). Nothing here may
 * hold a React component — e.g. skill/social icons are string *keys* that a
 * client-side registry maps to an icon component (see SkillIcon / SocialIcon).
 */

export type SocialKey = "github" | "linkedin" | "twitter" | "email";

export type Social = { key: SocialKey; label: string; href: string };

export type Stat = { label: string; value: string };

export type SiteInfo = {
  name: string;
  role: string;
  tagline: string;
  description: string;
  about: string[];
  location: string;
  email: string;
  resumeUrl: string;
  /** Optional profile photo path/URL for the About poster. */
  photo?: string;
  url: string;
  stats: Stat[];
};

/** `icon` is a string key resolved by SkillIcon's registry. */
export type Skill = { name: string; icon: string; level: number };
export type SkillGroup = { title: string; blurb: string; skills: Skill[] };

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
  tags: string[];
};

export type EducationItem = {
  degree: string;
  school: string;
  period: string;
  detail: string;
};

/** Free-text category (managed in the CMS); the filter bar derives its chips
 *  from whatever categories the projects actually use. */
export type ProjectCategory = string;

export type Project = {
  title: string;
  bounty: string;
  summary: string;
  description: string;
  image: string;
  tags: string[];
  category: ProjectCategory;
  featured?: boolean;
  links: { live?: string; code?: string };
};

export type Certification = {
  title: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
};

/** The full content bundle the site renders from. */
/** Editable heading (eyebrow + title + subtitle) for a section. */
export type SectionCopy = { eyebrow: string; title: string; subtitle: string };
export type SectionKey =
  | "about"
  | "skills"
  | "experience"
  | "projects"
  | "certifications"
  | "contact";
export type SectionHeadings = Record<SectionKey, SectionCopy>;

/** Editable hero call-to-action button labels. */
export type HeroCopy = { ctaPrimary: string; ctaSecondary: string };

/** Editable nav-link labels (hrefs stay fixed in code). */
export type NavKey =
  | "home"
  | "about"
  | "skills"
  | "experience"
  | "projects"
  | "certifications"
  | "contact";
export type NavLabels = Record<NavKey, string>;

/* -------------------------------------------------------------------------- */
/*  Editable UI copy — every remaining bit of on-screen text that isn't a      */
/*  content record above. All optional in the CMS (blank = the default).       */
/* -------------------------------------------------------------------------- */

/** One "About" highlight card. */
export type Highlight = { title: string; text: string };

/** Copy for the Contact section (info card, résumé card, and form). */
export type ContactCopy = {
  cardHeading: string;
  cardText: string;
  resumeTitle: string;
  resumeText: string;
  resumeButton: string;
  nameLabel: string;
  emailLabel: string;
  messageLabel: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  submitLabel: string;
  sendingLabel: string;
  successMessage: string;
  errorMessage: string;
};

/** Small labels used across the Projects section (cards + modal + filter). */
export type ProjectLabels = {
  all: string;
  empty: string;
  wanted: string;
  featured: string;
  bounty: string;
  crewTools: string;
  live: string;
  code: string;
};

/** Copy for the footer columns and credits. */
export type FooterCopy = {
  navHeading: string;
  contactHeading: string;
  resumeLabel: string;
  copyright: string;
  credit: string;
};

/** Copy for the hero "ask me anything" bar and its suggestion chips. Each chip
 *  label maps to a fixed section of the page. */
export type AskCopy = {
  placeholder: string;
  notFound: string;
  projects: string;
  skills: string;
  experience: string;
  certifications: string;
  resume: string;
  contact: string;
};

/** The full bundle of otherwise-hardcoded on-screen strings. */
export type UiCopy = {
  ask: AskCopy;
  aboutHighlights: Highlight[];
  posterStatus: string;
  posterPlaceholder: string;
  educationHeading: string;
  certView: string;
  navResume: string;
  navResumeMobile: string;
  loaderText: string;
  projects: ProjectLabels;
  contact: ContactCopy;
  footer: FooterCopy;
};

export type SiteContent = {
  site: SiteInfo;
  socials: Social[];
  skillGroups: SkillGroup[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: Project[];
  certifications: Certification[];
  sections: SectionHeadings;
  hero: HeroCopy;
  nav: NavLabels;
  copy: UiCopy;
};
