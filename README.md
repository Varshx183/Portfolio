# 🏴‍☠️ Grand Line Portfolio

A personal portfolio built with Next.js and an embedded Sanity CMS.

## Getting started (run it on your machine)

**Prerequisites:** Node.js 18 or newer (includes npm) and Git.

1. Clone the repository and move into the folder:

   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 in your browser.

The content editor is at `/studio`. Until you connect the CMS (below), the site
runs from the local content in `src/content/site.ts`, so it works out of the box.

## Connect the CMS

1. Create a free Sanity project and copy its **Project ID**.
2. Create a `.env.local` file in the project root:

   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

3. Restart the dev server, then edit everything at `/studio`.

## Deploy with Vercel

1. Import this repository into Vercel.
2. Add the same environment variables under **Project → Settings → Environment
   Variables** (plus `NEXT_PUBLIC_SITE_URL` for your domain).
3. Deploy. Every push to the default branch redeploys automatically.
</content>
