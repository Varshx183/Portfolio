# 🏴‍☠️ Grand Line Portfolio

A modern, fully responsive personal portfolio for **Gangam Varshith Reddy**, a
cybersecurity professional. It pairs a clean, professional layout with a light
One Piece / pirate-map identity (treasure gold on a night-sea navy, a hidden
Jolly Roger watermark, a spinning compass, and a bobbing anchor).

**Live site:** https://gangamvarshithreddy.vercel.app

Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and an
embedded Sanity CMS so the whole site can be edited from a browser with no code.

---

## ✨ Features

- **Editable from a dashboard.** Every section (name, intro, stats, projects,
  skills, experience, education, certifications, section titles, and the menu)
  is editable at `/studio`. No redeploy needed; changes go live within a minute.
- **Two themes, one identity.** A navy "night sea" dark theme and a parchment
  "day sea" light theme, toggleable and system-aware with no flash on load.
- **Responsive on every screen.** Verified on desktop, tablet, and mobile in
  both portrait and landscape.
- **Tasteful motion.** Scroll reveals, a pointer-parallax hero, animated waves,
  a timeline, and interactive cards. Everything respects
  `prefers-reduced-motion`.
- **Accessible.** Semantic landmarks, keyboard-operable menu and project modal,
  focus-visible rings, a skip link, ARIA labels, and live regions.
- **SEO ready.** Metadata, Open Graph and Twitter cards, JSON-LD structured
  data, `sitemap.xml`, and `robots.txt`.
- **Fast and hardened.** Statically prerendered, self-hosted fonts (zero layout
  shift), optimized images, a small JS payload, and baseline security headers.

### Sections

Home (hero) · About · Skills · Work Experience · Education · Projects (with
category filtering and a detail modal) · Certifications · Contact (form with
mailto fallback) · Footer.

---

## 🧰 Tech stack

| Concern          | Choice                                            |
| ---------------- | ------------------------------------------------- |
| Framework        | [Next.js 14](https://nextjs.org) (App Router)     |
| Language         | TypeScript                                        |
| Styling          | Tailwind CSS (CSS-variable theming)               |
| Animation        | Framer Motion + Lenis (smooth scroll)             |
| Theme switching  | next-themes                                       |
| CMS              | Sanity v3 (embedded Studio at `/studio`)          |
| Icons            | react-icons                                       |
| Hosting          | Vercel                                            |

---

## 🚀 Getting started

**Prerequisites:** Node.js 18.17+ (or 20+).

```bash
# 1. Install dependencies
npm install

# 2. (Optional) connect the CMS: copy the env template and fill it in
cp .env.example .env.local

# 3. Start the dev server
npm run dev
```

Open **http://localhost:3000**. The editor is at **/studio**.

Without any environment variables the site still runs, rendering from the local
fallback content in [`src/content/site.ts`](src/content/site.ts).

### Scripts

| Command         | What it does                      |
| --------------- | --------------------------------- |
| `npm run dev`   | Start the dev server (hot reload) |
| `npm run build` | Production build                  |
| `npm run start` | Serve the production build        |
| `npm run lint`  | Run ESLint                        |

---

## ✏️ Editing content (CMS)

There are two ways to edit the site. The CMS is the recommended one.

### Option A: the dashboard (no code)

Go to **`/studio`** and sign in with the Sanity account. The left menu mirrors
the website:

- **Site Settings** (a single document, organised into tabs):
  - **🏠 Home Page**: your name, the title under it, the one-line intro, the
    location pill, the two buttons, and the highlight numbers (stats).
  - **🧑 About Section**: the About paragraphs and your profile photo.
  - **✉️ Contact & Résumé**: contact email, résumé PDF, social links, and the
    search-engine description.
  - **🏷️ Section Titles**: the small label, title, and subtitle at the top of
    each section (leave any field blank to keep the default).
  - **🧭 Menu Labels**: rename the links in the top menu.
- **Projects**, **Skills**, **Work Experience**, **Education**, and
  **Certifications**: repeatable lists. Use each item's **Sort order** field to
  control ordering (lower numbers appear first).

Every field is labelled in plain language to match what you see on the site.
Published changes appear on the live site automatically within about a minute.

First-time Sanity setup (about 5 minutes) is documented in
**[docs/CMS-SETUP.md](docs/CMS-SETUP.md)**.

### Option B: edit the code

All fallback content lives in one file,
[`src/content/site.ts`](src/content/site.ts): `site` (name, role, tagline, bio,
location, email, résumé path, stats), `socials`, `skillGroups`, `experience`,
`education`, `projects`, and `certifications`. When the CMS is connected it
overrides these values field by field, so this file is the safety net.

---

## 🎨 Assets, theme, and fonts

**Images** live in `/public`:

| File                    | Replace with                                         |
| ----------------------- | ---------------------------------------------------- |
| `public/resume.pdf`     | The résumé PDF (or upload one in the CMS)            |
| `public/projects/*.svg` | Project placeholders (CMS uploads override these)   |
| `public/favicon.svg`    | The favicon                                          |

The hidden Jolly Roger watermark is `public/jolly-roger-mask.png`, a committed
alpha mask that recolors to the current theme.

**Theme colors** are CSS variables defined once in
[`src/app/globals.css`](src/app/globals.css) under `:root` (light) and `.dark`
(dark); Tailwind tokens (`bg`, `gold`, `crimson`, `ocean`, ...) map to them in
[`tailwind.config.ts`](tailwind.config.ts). Change them there to re-skin the
whole site.

**Fonts** are configured with `next/font` in
[`src/app/layout.tsx`](src/app/layout.tsx): Fredoka (display), Plus Jakarta Sans
(body), and Pirata One (pirate accents).

---

## 📬 Contact form

The form validates input and, by default, opens the visitor's email app with a
pre-filled `mailto:`. To collect submissions without a backend, set a form
endpoint (Formspree, Getform, Basin, etc.) in `.env.local`:

```bash
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
```

Restart the dev server and the form POSTs there instead.

---

## 🌐 Deploying (Vercel)

The site is deployed on Vercel and redeploys automatically on every push to the
default branch.

1. Import the repo at [vercel.com/new](https://vercel.com/new).
2. Add the environment variables (Project → Settings → Environment Variables):
   - `NEXT_PUBLIC_SITE_URL` (the final domain, used for SEO/canonical URLs)
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` (for the CMS)
   - `NEXT_PUBLIC_FORM_ENDPOINT` (only if using a contact-form service)
3. Deploy. Any Next.js host (Netlify, Render, a Node server) also works via
   `npm run build` then `npm run start`.

---

## 📁 Project structure

```
src/
├─ app/                      # App Router: layout, page, SEO routes, Studio
│  ├─ layout.tsx             # Fonts, metadata, providers, page loader, skip link
│  ├─ page.tsx              # Fetches content and assembles all sections
│  ├─ globals.css           # Theme tokens + base styles + utilities
│  ├─ robots.ts / sitemap.ts / opengraph-image.tsx / twitter-image.tsx
│  └─ studio/[[...tool]]/    # Embedded Sanity Studio at /studio
├─ components/
│  ├─ layout/                # Navbar, Footer
│  ├─ sections/              # Hero, About, Skills, Experience, Projects, ...
│  ├─ projects/              # ProjectCard, ProjectModal
│  ├─ sound/                 # Ambient ocean sound provider + toggle
│  ├─ theme/                 # ThemeProvider, ThemeToggle
│  ├─ ui/                    # Reveal, SectionHeading, Waves, JollyRogerBackdrop, ...
│  └─ seo/                   # JSON-LD structured data
├─ content/
│  ├─ site.ts                # Fallback content (used until the CMS overrides it)
│  └─ types.ts               # Shared content types (CMS + fallback share these)
├─ lib/
│  └─ content.ts             # getContent(): reads Sanity, falls back to site.ts
├─ sanity/                   # Sanity client, env, image helper, schema types
└─ hooks/                    # useActiveSection (scroll-spy), useParallax
```

---

## 🔧 Maintenance notes

- **How content flows.** [`src/lib/content.ts`](src/lib/content.ts) is the single
  entry point. If Sanity is configured it reads from the CMS and merges each
  field over the `site.ts` defaults; otherwise it uses `site.ts` alone. Pages
  use ISR (`revalidate = 60`), which is why CMS edits appear within a minute
  without a redeploy.
- **Adding a CMS field.** Add it to the relevant schema in
  `src/sanity/schemaTypes/`, select it in the matching GROQ query in
  `content.ts`, map it in the corresponding `map*` function, and add its type to
  `src/content/types.ts`.
- **Skill icons.** The CMS icon field is a dropdown of supported keys. To add a
  new one, extend both [`src/components/ui/SkillIcon.tsx`](src/components/ui/SkillIcon.tsx)
  and [`src/content/skillIconKeys.ts`](src/content/skillIconKeys.ts).
- **Signature visuals.** The Jolly Roger backdrop, the compass, and the anchor
  are intentional brand elements; keep them when refactoring.
- **No PWA.** The site is deliberately not installable (no web manifest / service
  worker), so browsers do not show an "Install app" prompt.
- **styled-components** is listed as a dependency only because the embedded
  Sanity Studio requires it as a peer; the site itself does not use it.

---

Built with Next.js, Tailwind CSS, and Framer Motion. ⚓
</content>
</invoke>
