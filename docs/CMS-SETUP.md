# 🧭 Content Management (Sanity CMS)

This portfolio can be edited from a **dashboard** at `/studio` — no code required.
Until you connect a Sanity project, the site renders from the local fallback
content in [`src/content/site.ts`](../src/content/site.ts), so it always works.

## What you can edit from the dashboard

The left-hand menu mirrors the website:

- **Site Settings** (a single document, split into tabs so it's easy to find
  things):
  - **🏠 Home Page**: your name, the title under it, the one-line intro, the
    location pill, the two buttons, and the highlight numbers (stats).
  - **🧑 About Section**: the About paragraphs, profile photo (upload), the
    three highlight cards, and the poster labels.
  - **✉️ Contact & Résumé**: contact email, résumé PDF (upload), social links,
    the search-engine description, and all of the contact card / form wording.
  - **🏷️ Section Titles**: the label, title, and subtitle at the top of each
    section (leave any field blank to keep the default).
  - **🧭 Menu Labels**: rename the links in the top navigation menu.
  - **⚓ Footer**: the footer column headings, résumé link, and credit lines.
  - **🔖 Buttons & Small Labels**: every remaining button and label (project
    card/modal labels, the "View credential" link, the Education heading, the
    header résumé buttons, and the loading-screen text).

Practically every visible line is editable; anything left blank falls back to a
sensible default, so you only fill in what you want to change.
- **Projects**, **Skills**, **Work Experience**, **Education**, and
  **Certifications**: repeatable lists. Each has a **Sort order** field (lower
  numbers appear first).

Every field is labelled in plain language to match what you see on the site.
Published changes appear on the live site automatically within about a minute
(no redeploy).

---

## One-time setup (≈5 minutes)

### 1. Create a free Sanity project

1. Go to **https://www.sanity.io/manage** and sign in (GitHub/Google).
2. Create a new project. Give it a name; keep the default dataset **`production`**.
3. Copy your **Project ID** (Project → Settings → API, or the URL).

### 2. Add environment variables

Create `.env.local` in the project root (copy from `.env.example`) and set:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

Add the **same two variables** to your hosting provider (e.g. Vercel →
Project → Settings → Environment Variables), then redeploy.

### 3. Allow the Studio to talk to Sanity (CORS)

In **sanity.io/manage → your project → API → CORS origins**, add:

- `http://localhost:3000` (for local editing)
- your production URL, e.g. `https://yourname.dev`

Tick **“Allow credentials”** for each.

### 4. Open the Studio and add content

```bash
npm run dev
```

Visit **http://localhost:3000/studio**, log in with your Sanity account, and:

1. Open **Site Settings** and fill in your details across its tabs (this is a
   single document).
2. Add **Projects**, **Skills**, **Work Experience**, **Education**, and
   **Certifications** (use **Sort order** to control ordering; lower = first).
3. Upload project images and your résumé/photo directly in the editor.

That's it — your live site now reads from the CMS. In production the Studio is
available at `https://yourdomain.com/studio`.

---

## Notes

- **Fallback:** if a content type has no documents yet, that section falls back
  to the local placeholder content, so the site is never empty while you fill
  it in.
- **Skill icons:** the icon field is a searchable picker — type to filter and
  click an icon. To add a new one, add a key to the `registry` in
  [`SkillIcon.tsx`](../src/components/ui/SkillIcon.tsx); the picker lists them
  automatically.
- **Images:** uploaded images are served from Sanity's CDN (already whitelisted
  in `next.config.mjs`) and optimized by `next/image`.
- **Prefer code?** You can ignore Sanity entirely and just edit
  `src/content/site.ts`.
