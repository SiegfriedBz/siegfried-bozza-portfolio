import { BIOVERIFY_LINKS } from "@/app/_constants/projects";
import type { Article } from "@/app/_types/article";

export const ARTICLES: Article[] = [
  {
    slug: "verisci",
    title: "Every Write Converges: The Engineering Behind VeriSci",
    subtitle:
      "Rating life-science papers on the OriginTrail DKG and Base Sepolia, and keeping each score correct through lost webhooks, retried mints, stuck nonces and a non-deterministic LLM.",
    excerpt:
      "How I rebuilt a DeSci prototype into a rating pipeline where every store, mint and oracle transaction is safe to retry: at-least-once webhooks, a cron reconciler, a serialized oracle lane, and an LLM whose quotes are checked by code.",
    date: "2026-10-18",
    href: "/articles/verisci",
    cover: "/projects/verisci/images/verisci-landing.png",
    tags: ["DeSci", "Web3", "OriginTrail DKG", "Inngest", "VeriSci"],
    readingMinutes: 13,
    relatedProjectSlug: "verisci",
  },
  {
    slug: "bioverify",
    title: "When the Chain Is Not Enough: Building a Full-Stack Agentic DApp",
    subtitle:
      "A DeSci peer-review case study, told as a user journey — where every step introduces the stack that makes it possible.",
    excerpt:
      "Peer review as a coordination game: IPFS manifests, Chainlink VRF, LangGraph + Inngest agents, EIP-712 verdicts, and a getter-less contract projected into Neon Postgres — end to end on Base Sepolia and Ethereum Sepolia.",
    date: "2026-05-01",
    href: "/articles/bioverify",
    cover: BIOVERIFY_LINKS.ogImage?.trim() || undefined,
    tags: ["DeSci", "Web3", "Agentic AI", "BioVerify"],
    readingMinutes: 28,
    relatedProjectSlug: "bioverify",
  },
];

export const getArticle = (slug: string): Article => {
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) throw new Error(`Unknown article slug: ${slug}`);
  return article;
};
