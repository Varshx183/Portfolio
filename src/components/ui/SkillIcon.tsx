import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiPython,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiFigma,
  SiGraphql,
  SiGooglecloud,
  SiMongodb,
} from "react-icons/si";
import { FiCode } from "react-icons/fi";

/**
 * Maps a skill's string `icon` key (stored in the CMS / fallback content) to a
 * brand icon component. Add new skills by adding a key here. Unknown keys fall
 * back to a generic code glyph so content edits can never crash the UI.
 */
const registry: Record<string, IconType> = {
  react: SiReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  tailwind: SiTailwindcss,
  nodejs: SiNodedotjs,
  python: SiPython,
  graphql: SiGraphql,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  docker: SiDocker,
  gcp: SiGooglecloud,
  git: SiGit,
  figma: SiFigma,
};

export function SkillIcon({
  name,
  ...props
}: { name: string } & React.ComponentProps<IconType>) {
  const Icon = registry[name] ?? FiCode;
  return <Icon {...props} />;
}
