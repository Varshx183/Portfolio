"use client";

import dynamic from "next/dynamic";
import config from "../../../../sanity.config";

// Sanity Studio is a browser-only app; never server-render it (that pulls
// React's server build, which lacks createContext).
const NextStudio = dynamic(
  () => import("next-sanity/studio").then((m) => m.NextStudio),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          display: "grid",
          placeItems: "center",
          minHeight: "100vh",
          fontFamily: "sans-serif",
          color: "#8fa4c2",
          background: "#0c1b30",
        }}
      >
        Loading Studio…
      </div>
    ),
  }
);

export default function Studio() {
  return <NextStudio config={config} />;
}
