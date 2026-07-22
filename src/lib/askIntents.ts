/**
 * Rule-based intent matching for the hero "ask me anything" bar.
 *
 * Pure and dependency-free: a typed question is normalized and matched against
 * keyword rules to pick the section to jump to. No network, no model, so it's
 * instant and can never invent an answer. Kept separate from the component so
 * the rules stay easy to read and test.
 */

/** Where a matched question sends the visitor. "resume" opens the PDF. */
export type AskTarget =
  | "#about"
  | "#skills"
  | "#experience"
  | "#projects"
  | "#certifications"
  | "#contact"
  | "resume";

/**
 * Rules are evaluated top-down, most specific first:
 * - education sits above experience (both live in the Experience section)
 * - experience claims "work experience" before projects claims the bare word
 *   "work", so "see my work" and "work experience" both land correctly
 * - the broad "about" rule is last so it only catches leftovers
 */
const INTENTS: { target: AskTarget; keywords: string[] }[] = [
  { target: "#certifications", keywords: ["cert", "credential", "licen"] },
  { target: "resume", keywords: ["resume", "cv"] },
  {
    target: "#experience",
    keywords: [
      "education", "study", "studied", "school", "universit", "college",
      "degree", "master", "bachelor", "graduat",
    ],
  },
  {
    target: "#experience",
    keywords: [
      "work experience", "experience", "job", "career", "company", "intern",
      "employ", "worked",
    ],
  },
  {
    target: "#projects",
    keywords: [
      "project", "work", "portfolio", "built", "build", "bounty", "bounties",
      "made", "showcase",
    ],
  },
  {
    target: "#skills",
    keywords: [
      "skill", "stack", "tech", "tool", "language", "framework", "know how",
    ],
  },
  {
    target: "#contact",
    keywords: [
      "contact", "hire", "hiring", "email", "reach", "message", "chat", "talk",
      "avail", "connect", "touch", "collaborat",
    ],
  },
  { target: "#about", keywords: ["about", "who", "yourself", "bio", "story"] },
];

/** Combining diacritical marks, so "résumé" also matches "resume". */
const DIACRITICS = new RegExp("[\\u0300-\\u036f]", "g");

/** Lowercase and strip accents before matching. */
export function normalize(input: string): string {
  return input.toLowerCase().normalize("NFD").replace(DIACRITICS, "").trim();
}

/** Returns the section to jump to, or null when nothing matches. */
export function matchIntent(input: string): AskTarget | null {
  const q = normalize(input);
  if (!q) return null;
  const hit = INTENTS.find((intent) =>
    intent.keywords.some((k) => q.includes(k))
  );
  return hit ? hit.target : null;
}
