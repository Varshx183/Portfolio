import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { apiVersion, dataset, safeProjectId } from "./src/sanity/env";

/**
 * Sanity Studio configuration for the embedded editor at /studio.
 *
 * The left-hand menu mirrors the website: "Site Settings" holds the one-off
 * content (name, intro, contact, menu…) and each list below matches a section
 * of the page. "Site Settings" is a singleton; the rest are collections.
 */
export default defineConfig({
  name: "default",
  title: "Portfolio CMS",
  projectId: safeProjectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Edit your website")
          .items([
            S.listItem()
              .title("Site Settings (name, intro, contact, menu)")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.divider(),
            S.documentTypeListItem("project").title("Projects"),
            S.documentTypeListItem("skillGroup").title("Skills"),
            S.documentTypeListItem("experience").title("Work Experience"),
            S.documentTypeListItem("education").title("Education"),
            S.documentTypeListItem("certification").title("Certifications"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: { types: schemaTypes },
});
