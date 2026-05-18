export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://siegfried-bozza-portfolio-next.vercel.app";

export const SITE_NAME = "Siegfried Bozza";

export const DEFAULT_TITLE =
  "Siegfried Bozza — Full-Stack Engineer · Web3 & AI Agents";

/** SERP-friendly (≤160 chars). */
export const SITE_DESCRIPTION_SHORT =
  "Full-Stack Engineer · React, Next.js, Solidity. BioVerify DeSci case study, agentic DApps. Open to remote or global relocation.";

/** Richer copy for Open Graph / Twitter. */
export const SITE_DESCRIPTION_LONG =
  "Full-Stack Engineer specializing in React, Next.js, TypeScript, and Solidity. Creator of BioVerify — a DeSci peer-review case study with durable AI agents (LangGraph, Inngest), Chainlink VRF, and on-chain staking. Also built GavL (real-time auctions with Supabase & Stripe), Bet2Gether (Chainlink prediction games), and Forge (ERC-1155 crafting). Open to remote roles or global relocation.";

export const DEFAULT_KEYWORDS = [
  "Siegfried Bozza",
  "Full-Stack Engineer",
  "React",
  "Next.js",
  "TypeScript",
  "Solidity",
  "Web3",
  "DeSci",
  "BioVerify",
  "AI Agents",
  "LangGraph",
  "Inngest",
  "Chainlink",
  "Foundry",
  "wagmi",
  "viem",
  "Drizzle ORM",
  "Neon Postgres",
  "Supabase",
  "Tailwind CSS",
  "shadcn/ui",
  "DApp",
  "decentralized science",
  "peer review",
  "smart contracts",
] as const;
