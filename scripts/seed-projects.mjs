/**
 * One-time seed: creates the six cybersecurity projects as editable documents
 * in your Sanity CMS, so they show up under Studio → Projects and you can edit
 * every field (title, summary, description, tags, links, order…) from there.
 *
 * Usage (PowerShell):
 *   $env:SANITY_WRITE_TOKEN="your_token"; npm run seed:projects
 * Usage (bash):
 *   SANITY_WRITE_TOKEN=your_token npm run seed:projects
 *
 * Get a token at sanity.io/manage → your project → API → Tokens → add a token
 * with the "Editor" (write) role. Your project id / dataset are read from
 * .env.local automatically.
 *
 * Safe to re-run: each project has a fixed id, so running again updates the
 * same documents instead of creating duplicates.
 */
import { readFileSync } from "node:fs";
import { createClient } from "next-sanity";

/* Read NEXT_PUBLIC_SANITY_* from .env.local if they aren't already in the env. */
try {
  for (const line of readFileSync(".env.local", "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {
  /* no .env.local — rely on the environment */
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing config. Need NEXT_PUBLIC_SANITY_PROJECT_ID (from .env.local) and " +
      "SANITY_WRITE_TOKEN (passed in the command)."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

const projects = [
  {
    title: "Threat Hunting Dashboard",
    bounty: "500,000,000",
    summary: "Real-time SIEM dashboard for spotting anomalies fast.",
    description:
      "A security-operations dashboard that ingests logs from multiple sources, correlates events, and surfaces suspicious activity with alerting and drill-down views. Built for speed with streaming queries and clean, readable visualizations.",
    tags: ["Python", "Elastic (ELK)", "Splunk", "SIEM"],
    category: "Web",
    featured: true,
    liveUrl: "https://example.com",
    codeUrl: "https://github.com/Varshx183",
  },
  {
    title: "Cloud IAM Auditor",
    bounty: "420,000,000",
    summary: "Scans cloud accounts for risky, over-privileged access.",
    description:
      "Audits GCP and AWS IAM policies against CIS Benchmarks and least-privilege principles, flags excessive permissions, and generates a prioritized remediation report to shrink the attack surface.",
    tags: ["Python", "GCP", "IAM", "CIS Benchmarks"],
    category: "Open Source",
    featured: true,
    codeUrl: "https://github.com/Varshx183",
  },
  {
    title: "Vulnerability Scanner CLI",
    bounty: "310,000,000",
    summary: "Fast network and web vulnerability scanner for the terminal.",
    description:
      "A command-line scanner that fingerprints hosts, checks for known CVEs, and outputs actionable findings. Modular checks make it easy to extend for new vulnerability classes.",
    tags: ["Python", "Nmap", "CVE", "Automation"],
    category: "Open Source",
    codeUrl: "https://github.com/Varshx183",
  },
  {
    title: "Phishing Simulation Platform",
    bounty: "240,000,000",
    summary: "Run safe phishing drills and measure security awareness.",
    description:
      "Launches controlled phishing campaigns, tracks click and report rates, and delivers just-in-time training to the users who need it, helping teams build a stronger human firewall.",
    tags: ["Node.js", "React", "PostgreSQL", "Email"],
    category: "Web",
    liveUrl: "https://example.com",
  },
  {
    title: "Zero-Knowledge Secrets Vault",
    bounty: "180,000,000",
    summary: "End-to-end encrypted manager for secrets and credentials.",
    description:
      "A privacy-first vault where everything is encrypted client-side before it leaves the browser, so the server only ever sees ciphertext. Includes secure sharing, audit logs, and WebAuthn login.",
    tags: ["WebCrypto", "React", "Encryption", "WebAuthn"],
    category: "Web",
    liveUrl: "https://example.com",
    codeUrl: "https://github.com/Varshx183",
  },
  {
    title: "CTF Toolkit & Writeups",
    bounty: "90,000,000",
    summary: "Scripts and notes from capture-the-flag challenges.",
    description:
      "A growing collection of reusable exploitation, forensics, and reverse-engineering scripts, plus detailed writeups from CTF competitions that document the approach behind each solve.",
    tags: ["Python", "Reverse Engineering", "Forensics", "CTF"],
    category: "Open Source",
    codeUrl: "https://github.com/Varshx183",
  },
];

const slug = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

async function run() {
  const tx = client.transaction();
  projects.forEach((p, i) => {
    tx.createOrReplace({ _id: `project.${slug(p.title)}`, _type: "project", order: i, ...p });
  });
  const res = await tx.commit();
  console.log(`Seeded ${res.results.length} projects into "${dataset}". Open Studio → Projects to edit them.`);
}

run().catch((err) => {
  console.error("Seed failed:", err.message || err);
  process.exit(1);
});
