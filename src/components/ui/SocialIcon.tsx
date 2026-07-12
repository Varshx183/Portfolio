import type { IconType } from "react-icons";
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi";
import type { SocialKey } from "@/content/site";

const map: Record<SocialKey, IconType> = {
  github: FiGithub,
  linkedin: FiLinkedin,
  twitter: FiTwitter,
  email: FiMail,
};

/** Renders the correct icon for a given social platform key. */
export function SocialIcon({
  name,
  ...props
}: { name: SocialKey } & React.ComponentProps<IconType>) {
  const Icon = map[name] ?? FiMail;
  return <Icon {...props} />;
}
