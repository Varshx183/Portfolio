import { getContent } from "@/lib/content";

/**
 * Person JSON-LD structured data for rich search results.
 * Reads from the content layer (CMS or fallback). Rendered as a script tag;
 * safe because all values are our own content, not user input.
 */
export async function StructuredData() {
  const { site, socials } = await getContent();

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.description,
    url: site.url,
    email: site.email,
    sameAs: socials.filter((s) => s.key !== "email").map((s) => s.href),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
