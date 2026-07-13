# 🏴‍☠️ Grand Line Portfolio

A personal portfolio built with Next.js and an embedded Sanity CMS.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

The editor is at `/studio`. Without a CMS connection the site runs from the
local content in `src/content/site.ts`.

## Connect the CMS

1. Create a free Sanity project and copy its **Project ID**.
2. Create `.env.local` in the project root:

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
</invoke>
