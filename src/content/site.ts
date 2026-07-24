/**
 * ============================================================================
 *  FALLBACK SITE CONTENT
 * ============================================================================
 *  This is the DEFAULT content used when the CMS (Sanity) is not configured or
 *  has no data yet — so the site always renders. Once Sanity is set up and
 *  populated, `getContent()` (src/lib/content.ts) reads from the CMS instead.
 *
 *  You can still edit this file directly if you prefer code over the CMS.
 *  Skill icons are string keys resolved by SkillIcon (see SkillIcon.tsx).
 * ============================================================================
 */

import type {
  SiteInfo,
  Social,
  SkillGroup,
  ExperienceItem,
  EducationItem,
  Project,
  Certification,
  SectionHeadings,
  HeroCopy,
  NavKey,
  NavLabels,
  UiCopy,
} from "./types";

// Re-export the shared types so existing `@/content/site` type imports keep working.
export type {
  SocialKey,
  Social,
  SkillGroup,
  Skill,
  ExperienceItem,
  EducationItem,
  Project,
  ProjectCategory,
  Certification,
  SiteInfo,
  SiteContent,
  SectionCopy,
  SectionKey,
  SectionHeadings,
  HeroCopy,
  NavKey,
  NavLabels,
  Highlight,
  ContactCopy,
  ProjectLabels,
  FooterCopy,
  UiCopy,
} from "./types";

/* -------------------------------------------------------------------------- */
/*  Personal / meta                                                            */
/* -------------------------------------------------------------------------- */

export const site: SiteInfo = {
  /** Your public name / handle. (CMS "Name" overrides this.) */
  name: "Gangam Varshith Reddy",
  /** Short role shown under the hero heading. */
  role: "Full-Stack Engineer & Product Builder",
  /** Pirate-flavoured tagline for the hero. */
  tagline: "Securing the digital seas, one threat at a time.",
  /** One-liner used for SEO description + social share. */
  description:
    "Portfolio of a cybersecurity enthusiast focused on securing systems, hunting vulnerabilities, and building safer software.",
  /** Longer About paragraph(s). */
  about: [
    "I'm a cybersecurity enthusiast who enjoys understanding how systems work so I can help keep them secure. I like getting under the hood, whether that means hardening applications, analyzing threats, or hunting down vulnerabilities before they turn into problems.",
    "I'm always charting new territory, from picking up a new security tool to working through a CTF or digging into the latest in threat detection. When I'm away from the keyboard, I'm usually reading up on the next thing worth learning.",
  ],
  /** Where you're based. */
  location: "Grand Line · Remote-friendly",
  /** Your primary contact email. */
  email: "gangamvarshithreddy18@gmail.com", // PLACEHOLDER — verify
  /** Public résumé file placed in /public. */
  resumeUrl: "/resume.pdf",
  /** Optional profile photo for the About "poster". Drop the image in /public
   *  (e.g. /avatar.jpg) and set this to its path. Empty string = show the
   *  placeholder until you add one. */
  photo: "", // e.g. "/avatar.jpg"
  /** Canonical site URL for SEO. Set NEXT_PUBLIC_SITE_URL in your deploy env;
   *  falls back to the placeholder below for local/preview. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://your-portfolio.vercel.app",
  /** Quick at-a-glance stats shown in the hero. Fully editable in the CMS
   *  (Site Settings -> Stats): each entry is a Value + Label. */
  stats: [
    { label: "Projects built", value: "10+" },
    { label: "Certifications", value: "5+" },
    { label: "CTFs solved", value: "20+" },
    { label: "Cups of coffee", value: "∞" },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export const navLinks: { key: NavKey; label: string; href: string }[] = [
  { key: "home", label: "Home", href: "#home" },
  { key: "about", label: "About", href: "#about" },
  { key: "skills", label: "Skills", href: "#skills" },
  { key: "experience", label: "Experience", href: "#experience" },
  { key: "projects", label: "Projects", href: "#projects" },
  { key: "certifications", label: "Certifications", href: "#certifications" },
  { key: "contact", label: "Contact", href: "#contact" },
];

/** Default nav labels (editable in the CMS -> Site Settings -> Nav labels). */
export const navLabels: NavLabels = {
  home: "Home",
  about: "About",
  skills: "Skills",
  experience: "Experience",
  projects: "Projects",
  certifications: "Certifications",
  contact: "Contact",
};

/** Hero button labels (hardcoded — no longer edited in the CMS). */
export const heroCopy: HeroCopy = {
  ctaPrimary: "View my projects",
  ctaSecondary: "Contact",
};

/* -------------------------------------------------------------------------- */
/*  Section headings (title + subtitle). Editable in the CMS -> Site Settings  */
/*  -> Section headings. These are the defaults / fallback.                     */
/* -------------------------------------------------------------------------- */

export const sectionHeadings: SectionHeadings = {
  about: {
    eyebrow: "Chapter 01",
    title: "About Me",
    subtitle: "A little about who I am and how I work.",
  },
  skills: {
    eyebrow: "Chapter 02",
    title: "Skills",
    subtitle: "The tools and technologies I work with, grouped by domain.",
  },
  experience: {
    eyebrow: "Chapter 03",
    title: "Experience",
    subtitle: "The roles and milestones that shaped my journey so far.",
  },
  projects: {
    eyebrow: "Chapter 04",
    title: "Projects",
    subtitle:
      "A selection of things I've built. Filter by category, or open one for the full story.",
  },
  certifications: {
    eyebrow: "Chapter 05",
    title: "Certifications",
    subtitle: "Credentials and courses I've earned along the way.",
  },
  contact: {
    eyebrow: "Chapter 06",
    title: "Open a Secure Channel",
    subtitle:
      "Got a role, a project, or a question? Send a message in a bottle.",
  },
};

/* -------------------------------------------------------------------------- */
/*  Social links                                                               */
/* -------------------------------------------------------------------------- */

export const socials: Social[] = [
  { key: "github", label: "GitHub", href: "https://github.com/yourhandle" }, // PLACEHOLDER
  { key: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/yourhandle" }, // PLACEHOLDER
  { key: "twitter", label: "X / Twitter", href: "https://twitter.com/yourhandle" }, // PLACEHOLDER
  { key: "email", label: "Email", href: "mailto:gangamvarshithreddy18@gmail.com" }, // PLACEHOLDER
];

/* -------------------------------------------------------------------------- */
/*  Skills — grouped "Devil Fruit" abilities                                   */
/* -------------------------------------------------------------------------- */

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    blurb: "Interfaces that feel alive.",
    skills: [
      { name: "React", icon: "react", level: 95 },
      { name: "Next.js", icon: "nextjs", level: 92 },
      { name: "TypeScript", icon: "typescript", level: 90 },
      { name: "JavaScript", icon: "javascript", level: 93 },
      { name: "Tailwind CSS", icon: "tailwind", level: 94 },
    ],
  },
  {
    title: "Backend",
    blurb: "Engines that never stall.",
    skills: [
      { name: "Node.js", icon: "nodejs", level: 88 },
      { name: "Python", icon: "python", level: 82 },
      { name: "GraphQL", icon: "graphql", level: 80 },
      { name: "PostgreSQL", icon: "postgresql", level: 84 },
      { name: "MongoDB", icon: "mongodb", level: 78 },
    ],
  },
  {
    title: "Tools & Cloud",
    blurb: "The crew that keeps us afloat.",
    skills: [
      { name: "Docker", icon: "docker", level: 80 },
      { name: "Google Cloud", icon: "gcp", level: 76 },
      { name: "Git", icon: "git", level: 92 },
      { name: "Figma", icon: "figma", level: 85 },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Experience — the "Voyage" timeline                                         */
/* -------------------------------------------------------------------------- */

export const experience: ExperienceItem[] = [
  {
    role: "Senior Software Engineer",
    company: "Straw Hat Labs", // PLACEHOLDER
    period: "2023 — Present",
    location: "Remote",
    bullets: [
      "Led the rebuild of the core product UI, cutting page load times by 45%.",
      "Mentored 4 engineers and established the team's component design system.",
      "Shipped a real-time collaboration feature used by 20k+ daily users.",
    ],
    tags: ["React", "Next.js", "TypeScript", "GraphQL"],
  },
  {
    role: "Full-Stack Engineer",
    company: "Baratie Systems", // PLACEHOLDER
    period: "2021 — 2023",
    location: "Hybrid",
    bullets: [
      "Built and scaled REST + GraphQL APIs serving millions of requests/day.",
      "Introduced automated testing that reduced production incidents by 60%.",
      "Partnered with design to launch a full brand + UI refresh.",
    ],
    tags: ["Node.js", "PostgreSQL", "AWS", "Docker"],
  },
  {
    role: "Frontend Developer",
    company: "Cocoyasi Studio", // PLACEHOLDER
    period: "2019 — 2021",
    location: "On-site",
    bullets: [
      "Delivered 15+ responsive marketing sites with a focus on accessibility.",
      "Improved Lighthouse scores across the board to 95+.",
      "Created reusable animation utilities adopted across the studio.",
    ],
    tags: ["JavaScript", "React", "CSS", "Figma"],
  },
];

/* -------------------------------------------------------------------------- */
/*  Education                                                                   */
/* -------------------------------------------------------------------------- */

export const education: EducationItem[] = [
  {
    degree: "B.Tech in Computer Science",
    school: "Grand Line University", // PLACEHOLDER
    period: "2015 — 2019",
    detail: "Graduated with distinction. Focus on web systems & HCI.",
  },
  {
    degree: "Full-Stack Web Development",
    school: "Red Line Bootcamp", // PLACEHOLDER
    period: "2019",
    detail: "Intensive project-based program building production apps.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Projects — "Wanted Poster" bounties                                        */
/* -------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    title: "Threat Hunting Dashboard",
    bounty: "500,000,000",
    summary: "Real-time SIEM dashboard for spotting anomalies fast.",
    description:
      "A security-operations dashboard that ingests logs from multiple sources, correlates events, and surfaces suspicious activity with alerting and drill-down views. Built for speed with streaming queries and clean, readable visualizations.",
    image: "/projects/project-1.svg",
    tags: ["Python", "Elastic (ELK)", "Splunk", "SIEM"],
    category: "Web",
    featured: true,
    links: { live: "https://example.com", code: "https://github.com/Varshx183" },
  },
  {
    title: "Cloud IAM Auditor",
    bounty: "420,000,000",
    summary: "Scans cloud accounts for risky, over-privileged access.",
    description:
      "Audits GCP and AWS IAM policies against CIS Benchmarks and least-privilege principles, flags excessive permissions, and generates a prioritized remediation report to shrink the attack surface.",
    image: "/projects/project-2.svg",
    tags: ["Python", "GCP", "IAM", "CIS Benchmarks"],
    category: "Open Source",
    featured: true,
    links: { code: "https://github.com/Varshx183" },
  },
  {
    title: "Vulnerability Scanner CLI",
    bounty: "310,000,000",
    summary: "Fast network and web vulnerability scanner for the terminal.",
    description:
      "A command-line scanner that fingerprints hosts, checks for known CVEs, and outputs actionable findings. Modular checks make it easy to extend for new vulnerability classes.",
    image: "/projects/project-3.svg",
    tags: ["Python", "Nmap", "CVE", "Automation"],
    category: "Open Source",
    links: { code: "https://github.com/Varshx183" },
  },
  {
    title: "Phishing Simulation Platform",
    bounty: "240,000,000",
    summary: "Run safe phishing drills and measure security awareness.",
    description:
      "Launches controlled phishing campaigns, tracks click and report rates, and delivers just-in-time training to the users who need it, helping teams build a stronger human firewall.",
    image: "/projects/project-4.svg",
    tags: ["Node.js", "React", "PostgreSQL", "Email"],
    category: "Web",
    links: { live: "https://example.com" },
  },
  {
    title: "Zero-Knowledge Secrets Vault",
    bounty: "180,000,000",
    summary: "End-to-end encrypted manager for secrets and credentials.",
    description:
      "A privacy-first vault where everything is encrypted client-side before it leaves the browser, so the server only ever sees ciphertext. Includes secure sharing, audit logs, and WebAuthn login.",
    image: "/projects/project-5.svg",
    tags: ["WebCrypto", "React", "Encryption", "WebAuthn"],
    category: "Web",
    links: { live: "https://example.com", code: "https://github.com/Varshx183" },
  },
  {
    title: "CTF Toolkit & Writeups",
    bounty: "90,000,000",
    summary: "Scripts and notes from capture-the-flag challenges.",
    description:
      "A growing collection of reusable exploitation, forensics, and reverse-engineering scripts, plus detailed writeups from CTF competitions that document the approach behind each solve.",
    image: "/projects/project-6.svg",
    tags: ["Python", "Reverse Engineering", "Forensics", "CTF"],
    category: "Open Source",
    links: { code: "https://github.com/Varshx183" },
  },
];

/* -------------------------------------------------------------------------- */
/*  Certifications — "Treasure" chest badges                                   */
/* -------------------------------------------------------------------------- */

export const certifications: Certification[] = [
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services", // PLACEHOLDER
    year: "2024",
    credentialUrl: "https://example.com",
  },
  {
    title: "Professional Cloud Developer",
    issuer: "Google Cloud", // PLACEHOLDER
    year: "2023",
    credentialUrl: "https://example.com",
  },
  {
    title: "Meta Front-End Developer",
    issuer: "Meta", // PLACEHOLDER
    year: "2022",
    credentialUrl: "https://example.com",
  },
  {
    title: "Certified Kubernetes Application Developer",
    issuer: "CNCF", // PLACEHOLDER
    year: "2023",
    credentialUrl: "https://example.com",
  },
];

/* -------------------------------------------------------------------------- */
/*  UI copy — defaults for every other on-screen string. Each is editable in   */
/*  the CMS; leaving a field blank there falls back to the value here.         */
/* -------------------------------------------------------------------------- */

export const uiCopy: UiCopy = {
  // Hero "ask me anything" bar. Each chip label jumps to a fixed section.
  ask: {
    placeholder: "ask me anything…",
    notFound: "Not on this map. Try one of these:",
    projects: "see my work",
    skills: "skills you have?",
    experience: "experience you have?",
    certifications: "certifications you have?",
    resume: "résumé",
    contact: "wanna chat?",
  },
  // About section highlight cards.
  aboutHighlights: [
    {
      title: "Security-minded",
      text: "I think about how systems break, not just how they work.",
    },
    {
      title: "Thorough & methodical",
      text: "Careful analysis and clean fixes, with no loose ends.",
    },
    {
      title: "Always learning",
      text: "New tools, new threats. The map is never finished.",
    },
  ],
  // About "wanted poster" labels.
  posterStatus: "Wanted Alive",
  posterPlaceholder: "Wanted",
  // Experience section: the heading above the education cards.
  educationHeading: "Education",
  // Certifications: the link under each card.
  certView: "View credential",
  // Navbar résumé buttons (desktop + mobile drawer).
  navResume: "Résumé",
  navResumeMobile: "Download Résumé",
  // Intro loading overlay.
  loaderText: "Charting the course…",
  // Projects section labels (filter, cards, and modal).
  projects: {
    all: "All",
    empty: "No bounties in these waters yet. Try another crew.",
    featured: "Featured",
    bounty: "Bounty",
    crewTools: "Crew & Tools",
    live: "Live demo",
    code: "Source code",
  },
  // Contact section: info card, résumé card, and form.
  contact: {
    cardHeading: "Let's set sail together",
    cardText:
      "I'm open to full-time roles, freelance voyages, and interesting collaborations. I usually reply within a day.",
    resumeTitle: "Grab my résumé",
    resumeText: "The full logbook — one PDF.",
    resumeButton: "Download",
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Message",
    namePlaceholder: "Nico Robin",
    emailPlaceholder: "you@crew.com",
    messagePlaceholder: "Tell me about your project or role…",
    submitLabel: "Send message",
    sendingLabel: "Sending…",
    successMessage: "Message sent! I'll be in touch soon.",
    errorMessage: "Something went wrong. Please email me directly.",
  },
  // Footer columns and credits.
  footer: {
    navHeading: "Navigate",
    contactHeading: "Set Sail",
    resumeLabel: "Download Résumé ↓",
    copyright: "Sailing the Grand Line of the web.",
    credit: "Built with Next.js, Tailwind & Framer Motion.",
  },
};
