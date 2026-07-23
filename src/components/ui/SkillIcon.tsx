import type { IconType } from "react-icons";
import {
  // languages / dev
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiNodedotjs,
  SiPython, SiGnubash, SiGraphql, SiPostgresql, SiMysql, SiMongodb, SiRedis,
  SiGit, SiGithub, SiGitlab, SiFigma, SiPostman, SiNginx,
  // cloud / infra / devops
  SiGooglecloud, SiCloudflare, SiDocker, SiKubernetes, SiTerraform, SiAnsible,
  SiVagrant, SiProxmox, SiVirtualbox, SiVmware, SiJenkins, SiJira, SiGrafana,
  SiPrometheus, SiVault, SiHashicorp,
  // operating systems
  SiLinux, SiKalilinux, SiParrotsecurity, SiUbuntu, SiDebian, SiRedhat,
  // security tools
  SiWireshark, SiMetasploit, SiBurpsuite, SiPortswigger, SiOwasp, SiSnort,
  SiSplunk, SiElastic, SiElasticsearch, SiElasticstack, SiKibana, SiLogstash,
  SiSnyk, SiTrivy, SiFortinet, SiOpenvpn, SiWireguard, SiPfsense, SiOpnsense,
  SiTorproject, SiVirustotal, SiOpenssl, SiLetsencrypt, SiJsonwebtokens,
  SiBitwarden, SiCisco, SiOkta, SiAuth0, SiKeycloak, SiYubico,
  // learning platforms
  SiHackthebox, SiTryhackme, SiHackerone, SiBugcrowd,
} from "react-icons/si";
import {
  FaAws, FaWindows, FaShieldHalved, FaLock, FaUserShield, FaKey, FaFingerprint,
  FaBug, FaViruses, FaSkullCrossbones, FaNetworkWired, FaFireFlameCurved,
  FaTerminal, FaServer, FaDatabase, FaCloud, FaMagnifyingGlass, FaEye,
  FaSatelliteDish, FaVideo, FaSpider, FaRobot, FaMicrochip, FaWifi, FaCode,
} from "react-icons/fa6";
import { FiCode } from "react-icons/fi";

/**
 * Maps a skill's string `icon` key (stored in the CMS / fallback content) to a
 * brand or concept icon. Real brand logos where they exist; generic security
 * glyphs (shield, bug, network…) for tools without an official icon. Add keys
 * here AND in skillIconKeys.ts. Unknown keys fall back to a generic code glyph
 * so content edits can never crash the UI.
 */
const registry: Record<string, IconType> = {
  // languages / dev
  react: SiReact, nextjs: SiNextdotjs, typescript: SiTypescript,
  javascript: SiJavascript, tailwind: SiTailwindcss, nodejs: SiNodedotjs,
  python: SiPython, bash: SiGnubash, graphql: SiGraphql, postgresql: SiPostgresql,
  mysql: SiMysql, mongodb: SiMongodb, redis: SiRedis, git: SiGit,
  github: SiGithub, gitlab: SiGitlab, figma: SiFigma, postman: SiPostman,
  nginx: SiNginx,
  // cloud / infra / devops
  aws: FaAws, gcp: SiGooglecloud, cloudflare: SiCloudflare, docker: SiDocker,
  kubernetes: SiKubernetes, terraform: SiTerraform, ansible: SiAnsible,
  vagrant: SiVagrant, proxmox: SiProxmox, virtualbox: SiVirtualbox,
  vmware: SiVmware, jenkins: SiJenkins, jira: SiJira, grafana: SiGrafana,
  prometheus: SiPrometheus, vault: SiVault, hashicorp: SiHashicorp,
  // operating systems
  linux: SiLinux, kali: SiKalilinux, parrot: SiParrotsecurity, ubuntu: SiUbuntu,
  debian: SiDebian, redhat: SiRedhat, windows: FaWindows,
  // security tools
  wireshark: SiWireshark, metasploit: SiMetasploit, burpsuite: SiBurpsuite,
  portswigger: SiPortswigger, owasp: SiOwasp, zap: SiOwasp, snort: SiSnort,
  splunk: SiSplunk, elastic: SiElastic, elasticsearch: SiElasticsearch,
  elk: SiElasticstack, kibana: SiKibana, logstash: SiLogstash, snyk: SiSnyk,
  trivy: SiTrivy, fortinet: SiFortinet, openvpn: SiOpenvpn, wireguard: SiWireguard,
  pfsense: SiPfsense, opnsense: SiOpnsense, tor: SiTorproject,
  virustotal: SiVirustotal, openssl: SiOpenssl, letsencrypt: SiLetsencrypt,
  jwt: SiJsonwebtokens, bitwarden: SiBitwarden, cisco: SiCisco, okta: SiOkta,
  auth0: SiAuth0, keycloak: SiKeycloak, yubikey: SiYubico,
  // learning platforms
  hackthebox: SiHackthebox, tryhackme: SiTryhackme, hackerone: SiHackerone,
  bugcrowd: SiBugcrowd,
  // generic security / infra concepts (for tools without an official logo)
  shield: FaShieldHalved, lock: FaLock, usershield: FaUserShield, key: FaKey,
  fingerprint: FaFingerprint, bug: FaBug, virus: FaViruses,
  skull: FaSkullCrossbones, network: FaNetworkWired, firewall: FaFireFlameCurved,
  terminal: FaTerminal, server: FaServer, database: FaDatabase, cloud: FaCloud,
  search: FaMagnifyingGlass, eye: FaEye, radar: FaSatelliteDish, cctv: FaVideo,
  spider: FaSpider, robot: FaRobot, microchip: FaMicrochip, wifi: FaWifi,
  code: FaCode,
};

export function SkillIcon({
  name,
  ...props
}: { name: string } & React.ComponentProps<IconType>) {
  const Icon = registry[name] ?? FiCode;
  return <Icon {...props} />;
}
