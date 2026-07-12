import { renderOgImage, ogSize, ogAlt, ogContentType } from "@/lib/og";

// Twitter/X card image — same artwork as Open Graph.
export const runtime = "edge";
export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage();
}
