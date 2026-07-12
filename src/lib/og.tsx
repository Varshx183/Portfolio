import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/** Shared config + renderer for the Open Graph / Twitter share images.
 *  Kept here so both route files stay thin with their own literal `runtime`
 *  exports (Next.js requires those to be static literals). */
export const ogSize = { width: 1200, height: 630 };
export const ogAlt = `${site.name} — ${site.role}`;
export const ogContentType = "image/png";

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0c1b30 0%, #081426 100%)",
          color: "#e9f0fa",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Decorative treasure-gold rings (compass motif) */}
        <div
          style={{
            position: "absolute",
            right: -140,
            top: -140,
            width: 520,
            height: 520,
            borderRadius: "50%",
            border: "2px solid rgba(240,191,92,0.22)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -80,
            top: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            border: "2px solid rgba(240,191,92,0.16)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#f0bf5c",
            fontSize: 26,
            letterSpacing: 10,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#f0bf5c",
              display: "flex",
            }}
          />
          PORTFOLIO · GRAND LINE
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 800,
            marginTop: 28,
            lineHeight: 1.02,
          }}
        >
          {site.name}
        </div>

        <div
          style={{ display: "flex", fontSize: 42, color: "#f0bf5c", marginTop: 18 }}
        >
          {site.role}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#8fa4c2",
            marginTop: 30,
            maxWidth: 860,
          }}
        >
          {site.description}
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
