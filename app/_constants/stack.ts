/**
 * Declaration order is the display order on cards, project pages and About: the core stack
 * first (CORE_STACK in site-metadata.ts), then what a project is about, then libraries, then
 * testing.
 */
export enum STACK {
  // core stack
  NEXT = "NEXT",
  TYPESCRIPT = "TYPESCRIPT",
  NODE = "NODE",
  SOLIDITY = "SOLIDITY",
  FOUNDRY = "FOUNDRY",
  // protocols, agents and platforms
  CHAINLINK = "CHAINLINK",
  ORIGINTRAIL = "ORIGINTRAIL",
  LANGGRAPH = "LANGGRAPH",
  INNGEST = "INNGEST",
  SUPABASE = "SUPABASE",
  STRIPE = "STRIPE",
  // web3 libraries and infrastructure
  OPEN_ZEPPELIN = "OPEN_ZEPPELIN",
  VIEM = "VIEM",
  WAGMI = "WAGMI",
  REOWN = "REOWN",
  RAINBOW_KIT = "RAINBOW_KIT",
  IPFS = "IPFS",
  ALCHEMY = "ALCHEMY",
  TENDERLY = "TENDERLY",
  // AI
  GEMINI = "GEMINI",
  EXA_AI = "EXA_AI",
  // backend and data
  HONO = "HONO",
  DRIZZLE = "DRIZZLE",
  NEON = "NEON",
  SQLITE = "SQLITE",
  UPSTASH = "UPSTASH",
  MONGODB = "MONGODB",
  // frontend
  REACT = "REACT",
  TANSTACK_QUERY = "TANSTACK_QUERY",
  TANSTACK_TABLE = "TANSTACK_TABLE",
  RHF = "RHF",
  ZOD = "ZOD",
  NUQS = "NUQS",
  LINGUI = "LINGUI",
  RECHARTS = "RECHARTS",
  SHADCN = "SHADCN",
  TAILWIND = "TAILWIND",
  FRAMER_MOTION = "FRAMER_MOTION",
  // testing
  VITEST = "VITEST",
  JEST = "JEST",
  CYPRESS = "CYPRESS",
}

const STACK_ORDER: readonly string[] = Object.values(STACK);

/** A copy of `items` in display order. */
export const sortStack = <T extends string>(items: readonly T[]): T[] =>
  [...items].sort((a, b) => STACK_ORDER.indexOf(a) - STACK_ORDER.indexOf(b));
