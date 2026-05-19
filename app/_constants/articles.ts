import { BIOVERIFY_LINKS } from "@/app/_constants/projects";
import type { Article } from "@/app/_types/article";

export const ARTICLES: Article[] = [
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
