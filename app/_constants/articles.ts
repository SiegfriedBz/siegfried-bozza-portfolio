import { BIOVERIFY_LINKS } from "@/app/_constants/projects";
import { isArticleHeld } from "@/app/_lib/held-articles";
import type { Article } from "@/app/_types/article";

const ALL_ARTICLES: Article[] = [
  {
    slug: "labstrail",
    title: "Keeping a Knowledge Graph and a Chain in Sync: Building LabsTrail",
    subtitle:
      "Rating life-science papers on the OriginTrail DKG and Base Sepolia, and keeping each score correct through lost webhooks, retried mints, stuck nonces and a non-deterministic LLM.",
    excerpt:
      "How I rebuilt a DeSci prototype into a rating pipeline where every store, mint and oracle transaction is safe to retry: at-least-once webhooks, a cron reconciler, a serialized oracle lane, and an LLM whose quotes are checked by code.",
    date: "2026-10-26",
    href: "/articles/labstrail",
    cover: "/projects/labstrail/images/labstrail-landing.png",
    tags: ["DeSci", "Web3", "OriginTrail DKG", "Inngest", "LabsTrail"],
    readingMinutes: 15,
    relatedProjectSlug: "labstrail",
  },
  {
    slug: "wallet-watcher",
    title:
      "Booking Every Withdrawal From Its Receipt: A Wallet Backend on Sepolia",
    subtitle:
      "Outflows booked from receipts, bigint wei end to end, Multicall3 snapshots pinned to their block, and an HTTP layer that never holds the mnemonic.",
    excerpt:
      "A Node.js and TypeScript service on Sepolia that derives HD wallets, keeps an append-only ETH ledger and signs EIP-1559 withdrawals. The write-up covers the boring failure modes it rules out, how it is tested, and what production would change.",
    date: "2026-10-18",
    href: "/articles/wallet-watcher",
    tags: ["Web3 Backend", "Custody", "Ethereum", "viem", "TypeScript"],
    readingMinutes: 13,
    relatedProjectSlug: "wallet-watcher",
  },
  {
    slug: "bioverify",
    title: "When the Chain Is Not Enough: Building a Full-Stack Agentic DApp",
    subtitle:
      "A DeSci peer-review case study, told as a user journey — where every step introduces the stack that makes it possible.",
    excerpt:
      "Peer review as a coordination game: IPFS manifests, Chainlink VRF, LangGraph + Inngest agents, EIP-712 verdicts, and a getter-light contract projected into Neon Postgres — end to end on Base Sepolia and Ethereum Sepolia.",
    date: "2026-05-18",
    href: "/articles/bioverify",
    cover: BIOVERIFY_LINKS.ogImage?.trim() || undefined,
    tags: ["DeSci", "Web3", "Agentic AI", "BioVerify"],
    readingMinutes: 28,
    relatedProjectSlug: "bioverify",
  },
];

/** The articles this deploy lists and links to; held ones are left out in production. */
export const ARTICLES = ALL_ARTICLES.filter((a) => !isArticleHeld(a.slug));

export const getArticle = (slug: string): Article => {
  const article = ALL_ARTICLES.find((a) => a.slug === slug);
  if (!article) throw new Error(`Unknown article slug: ${slug}`);
  return article;
};
