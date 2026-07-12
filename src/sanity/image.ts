import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { safeProjectId, dataset } from "./env";

const builder = imageUrlBuilder({ projectId: safeProjectId, dataset });

/** Build an optimized image URL from a Sanity image reference. */
export function urlForImage(source: Image) {
  return builder.image(source);
}
