import type { IconType } from "react-icons";
import {
  // languages
  SiTypescript, SiJavascript, SiPython, SiGnubash, SiGo, SiRust, SiCplusplus,
  SiC, SiPhp, SiRuby, SiKotlin, SiSwift, SiScala, SiR, SiSolidity, SiPerl,
  SiLua, SiDart, SiElixir, SiHaskell, SiClojure, SiGraphql,
  // frameworks / runtimes
  SiReact, SiNextdotjs, SiVuedotjs, SiAngular, SiSvelte, SiAstro, SiVite,
  SiTailwindcss, SiNodedotjs, SiExpress, SiNestjs, SiDeno, SiBun, SiDjango,
  SiFlask, SiFastapi, SiSpring, SiDotnet, SiLaravel, SiRubyonrails,
  // data / ml
  SiNumpy, SiPandas, SiTensorflow, SiPytorch, SiJupyter,
  // databases / messaging
  SiPostgresql, SiMysql, SiMariadb, SiSqlite, SiMongodb, SiRedis,
  SiApachecassandra, SiInfluxdb, SiSupabase, SiFirebase, SiRabbitmq,
  SiApachekafka,
  // cloud / infra / devops
  SiGooglecloud, SiCloudflare, SiVercel, SiNetlify, SiDigitalocean, SiOpenstack,
  SiDocker, SiPodman, SiKubernetes, SiHelm, SiIstio, SiRancher, SiTerraform,
  SiAnsible, SiVagrant, SiPacker, SiConsul, SiNomad, SiVault, SiHashicorp,
  SiProxmox, SiVirtualbox, SiVmware, SiQemu, SiJenkins, SiGithubactions,
  SiCircleci, SiArgo, SiJira, SiGrafana, SiPrometheus,
  // tools / editors
  SiGit, SiGithub, SiGitlab, SiBitbucket, SiVim, SiNeovim, SiIntellijidea,
  SiPycharm, SiPostman, SiInsomnia, SiSwagger, SiNginx, SiFigma, SiNotion,
  SiDiscord, SiTrello, SiConfluence, SiObsidian,
  // operating systems
  SiLinux, SiKalilinux, SiParrotsecurity, SiUbuntu, SiDebian, SiRedhat,
  SiArchlinux, SiFedora, SiCentos, SiAlpinelinux, SiOpensuse, SiApple,
  SiAndroid, SiRaspberrypi,
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
 * glyphs for tools without an official icon. Add keys to `registry`; the CMS
 * icon picker reads them from the exported `iconKeys`. Unknown keys fall back to
 * a generic code glyph so content edits can never crash the UI.
 */
export const iconRegistry: Record<string, IconType> = {
  // languages
  typescript: SiTypescript, javascript: SiJavascript, python: SiPython,
  bash: SiGnubash, go: SiGo, rust: SiRust, cpp: SiCplusplus, c: SiC, php: SiPhp,
  ruby: SiRuby, kotlin: SiKotlin, swift: SiSwift, scala: SiScala, r: SiR,
  solidity: SiSolidity, perl: SiPerl, lua: SiLua, dart: SiDart, elixir: SiElixir,
  haskell: SiHaskell, clojure: SiClojure, graphql: SiGraphql,
  // frameworks / runtimes
  react: SiReact, nextjs: SiNextdotjs, vue: SiVuedotjs, angular: SiAngular,
  svelte: SiSvelte, astro: SiAstro, vite: SiVite, tailwind: SiTailwindcss,
  nodejs: SiNodedotjs, express: SiExpress, nestjs: SiNestjs, deno: SiDeno,
  bun: SiBun, django: SiDjango, flask: SiFlask, fastapi: SiFastapi,
  spring: SiSpring, dotnet: SiDotnet, laravel: SiLaravel, rails: SiRubyonrails,
  // data / ml
  numpy: SiNumpy, pandas: SiPandas, tensorflow: SiTensorflow, pytorch: SiPytorch,
  jupyter: SiJupyter,
  // databases / messaging
  postgresql: SiPostgresql, mysql: SiMysql, mariadb: SiMariadb, sqlite: SiSqlite,
  mongodb: SiMongodb, redis: SiRedis, cassandra: SiApachecassandra,
  influxdb: SiInfluxdb, supabase: SiSupabase, firebase: SiFirebase,
  rabbitmq: SiRabbitmq, kafka: SiApachekafka,
  // cloud / infra / devops
  aws: FaAws, gcp: SiGooglecloud, cloudflare: SiCloudflare, vercel: SiVercel,
  netlify: SiNetlify, digitalocean: SiDigitalocean, openstack: SiOpenstack,
  docker: SiDocker, podman: SiPodman, kubernetes: SiKubernetes, helm: SiHelm,
  istio: SiIstio, rancher: SiRancher, terraform: SiTerraform, ansible: SiAnsible,
  vagrant: SiVagrant, packer: SiPacker, consul: SiConsul, nomad: SiNomad,
  vault: SiVault, hashicorp: SiHashicorp, proxmox: SiProxmox,
  virtualbox: SiVirtualbox, vmware: SiVmware, qemu: SiQemu, jenkins: SiJenkins,
  githubactions: SiGithubactions, circleci: SiCircleci, argocd: SiArgo,
  jira: SiJira, grafana: SiGrafana, prometheus: SiPrometheus,
  // tools / editors
  git: SiGit, github: SiGithub, gitlab: SiGitlab, bitbucket: SiBitbucket,
  vim: SiVim, neovim: SiNeovim, intellij: SiIntellijidea, pycharm: SiPycharm,
  postman: SiPostman, insomnia: SiInsomnia, swagger: SiSwagger, nginx: SiNginx,
  figma: SiFigma, notion: SiNotion, discord: SiDiscord, trello: SiTrello,
  confluence: SiConfluence, obsidian: SiObsidian,
  // operating systems
  linux: SiLinux, kali: SiKalilinux, parrot: SiParrotsecurity, ubuntu: SiUbuntu,
  debian: SiDebian, redhat: SiRedhat, arch: SiArchlinux, fedora: SiFedora,
  centos: SiCentos, alpine: SiAlpinelinux, opensuse: SiOpensuse, windows: FaWindows,
  macos: SiApple, android: SiAndroid, raspberrypi: SiRaspberrypi,
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

/** All valid icon keys (used by the CMS icon picker). */
export const iconKeys = Object.keys(iconRegistry);

export function SkillIcon({
  name,
  ...props
}: { name: string } & React.ComponentProps<IconType>) {
  const Icon = iconRegistry[name] ?? FiCode;
  return <Icon {...props} />;
}
