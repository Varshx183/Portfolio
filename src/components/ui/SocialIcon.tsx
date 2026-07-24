import type { IconType } from "react-icons";
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi";
import { SiReddit, SiMedium, SiDiscord } from "react-icons/si";
import type { SocialKey } from "@/content/site";

const map: Record<SocialKey, IconType> = {
  github: FiGithub,
  linkedin: FiLinkedin,
  twitter: FiTwitter,
  email: FiMail,
  reddit: SiReddit,
  medium: SiMedium,
  discord: SiDiscord,
};

/** Renders the correct icon for a given social platform key. */
export function SocialIcon({
  name,
  ...props
}: { name: SocialKey } & React.ComponentProps<IconType>) {
  const Icon = map[name] ?? FiMail;
  return <Icon {...props} />;
}
