export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.siegfriedbozza.com";

export const SITE_NAME = "Siegfried Bozza";

/**
 * Positioning — single source of truth. Hero, About, metadata, OG image and
 * manifest all read from here, so the CV / GitHub / LinkedIn copy should match it.
 */
export const ROLE = "Full-Stack Web3 Engineer";

export const PITCH =
  "I build the off-chain systems that on-chain products depend on: event pipelines, wallet and settlement backends, durable AI-agent workflows, and the dApps on top.";

export const CORE_STACK = ["TypeScript", "Solidity", "Node.js", "Next.js"];

export const BACKGROUND =
  "Before software, I spent fifteen years in molecular-biology research and environmental engineering, which is where my interest in DeSci comes from.";

export const AVAILABILITY = {
  headline: "Open to full-time remote roles",
  detail:
    "France (CET) · async, cross-timezone teams · open to relocation",
};

export const DEFAULT_TITLE = `${SITE_NAME} — ${ROLE}`;

/** SERP-friendly (≤160 chars). */
export const SITE_DESCRIPTION_SHORT =
  "Full-Stack Web3 Engineer (TypeScript, Solidity). Event pipelines, wallet backends and AI-agent workflows around smart contracts. Open to remote roles.";

/** Richer copy for Open Graph / Twitter. */
export const SITE_DESCRIPTION_LONG =
  "Full-Stack Web3 Engineer working in TypeScript and Solidity. I build the off-chain systems on-chain products depend on: VeriSci (open paper ratings on the OriginTrail DKG), Wallet Watcher (a custody backend slice with an append-only ledger and exactly-once withdrawals), BioVerify (agentic DeSci peer review with Chainlink VRF), plus Bet2Gether, Forge and GavL. Open to full-time remote roles.";

export const DEFAULT_KEYWORDS = [
  "Siegfried Bozza",
  "Full-Stack Web3 Engineer",
  "Web3 backend engineer",
  "TypeScript",
  "Solidity",
  "Node.js",
  "Next.js",
  "React",
  "viem",
  "wagmi",
  "Foundry",
  "Chainlink",
  "custody backend",
  "HD wallets",
  "event-driven architecture",
  "CQRS",
  "DeSci",
  "decentralized science",
  "OriginTrail DKG",
  "VeriSci",
  "BioVerify",
  "AI agents",
  "LangGraph",
  "Inngest",
  "smart contracts",
  "remote",
] as const;
