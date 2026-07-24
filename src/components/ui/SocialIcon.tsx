import type { IconType } from "react-icons";
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiGlobe } from "react-icons/fi";
import {
  SiX, SiMedium, SiDevdotto, SiHashnode, SiYoutube, SiInstagram,
  SiStackoverflow, SiTelegram, SiDiscord, SiMastodon, SiReddit, SiFacebook,
  SiBehance, SiKaggle, SiThreads, SiSubstack,
} from "react-icons/si";
import type { SocialKey } from "@/content/site";

const map: Record<SocialKey, IconType> = {
  github: FiGithub,
  linkedin: FiLinkedin,
  twitter: FiTwitter,
  x: SiX,
  email: FiMail,
  website: FiGlobe,
  medium: SiMedium,
  devto: SiDevdotto,
  hashnode: SiHashnode,
  youtube: SiYoutube,
  instagram: SiInstagram,
  stackoverflow: SiStackoverflow,
  telegram: SiTelegram,
  discord: SiDiscord,
  mastodon: SiMastodon,
  reddit: SiReddit,
  facebook: SiFacebook,
  behance: SiBehance,
  kaggle: SiKaggle,
  threads: SiThreads,
  substack: SiSubstack,
};

/** Renders the correct icon for a given social platform key. */
export function SocialIcon({
  name,
  ...props
}: { name: SocialKey } & React.ComponentProps<IconType>) {
  const Icon = map[name] ?? FiGlobe;
  return <Icon {...props} />;
}
