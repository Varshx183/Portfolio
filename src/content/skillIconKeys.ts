/** Valid skill icon keys (kept icon-library-free so the CMS schema can import
 *  it without pulling in react-icons). Keep in sync with SkillIcon's registry. */
export const skillIconKeys = [
  // languages / dev
  "react", "nextjs", "typescript", "javascript", "tailwind", "nodejs",
  "python", "bash", "graphql", "postgresql", "mysql", "mongodb", "redis",
  "git", "github", "gitlab", "figma", "postman", "nginx",
  // cloud / infra / devops
  "aws", "gcp", "cloudflare", "docker", "kubernetes", "terraform", "ansible",
  "vagrant", "proxmox", "virtualbox", "vmware", "jenkins", "jira", "grafana",
  "prometheus", "vault", "hashicorp",
  // operating systems
  "linux", "kali", "parrot", "ubuntu", "debian", "redhat", "windows",
  // security tools
  "wireshark", "metasploit", "burpsuite", "portswigger", "owasp", "zap",
  "snort", "splunk", "elastic", "elasticsearch", "elk", "kibana", "logstash",
  "snyk", "trivy", "fortinet", "openvpn", "wireguard", "pfsense", "opnsense",
  "tor", "virustotal", "openssl", "letsencrypt", "jwt", "bitwarden", "cisco",
  "okta", "auth0", "keycloak", "yubikey",
  // learning platforms
  "hackthebox", "tryhackme", "hackerone", "bugcrowd",
  // generic security / infra concepts (for tools without an official logo)
  "shield", "lock", "usershield", "key", "fingerprint", "bug", "virus",
  "skull", "network", "firewall", "terminal", "server", "database", "cloud",
  "search", "eye", "radar", "cctv", "spider", "robot", "microchip", "wifi",
  "code",
] as const;
