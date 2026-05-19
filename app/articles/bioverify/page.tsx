import { BIOVERIFY_LINKS } from "@/app/_constants/projects";
import type { Metadata } from "next";
import { BioVerifyArticle } from "./_components/bioverify-article";

export async function generateMetadata(): Promise<Metadata> {
  const ogImage = BIOVERIFY_LINKS.ogImage ?? "";

  const title = "When the Chain Is Not Enough: Agentic DApp Case Study";
  const description =
    "A DeSci peer-review case study: where every step in the workflow introduces the piece of the stack that makes it possible.";

  return {
    title,
    description,
    alternates: {
      canonical: "/articles/bioverify",
    },
    keywords: [
      "BioVerify",
      "DeSci",
      "Peer review",
      "Agentic DApp",
      "LangGraph",
      "Inngest",
      "Chainlink VRF",
      "EIP-712",
      "CQRS",
      "IPFS",
      "Web3",
      "Siegfried Bozza",
    ],
    openGraph: {
      type: "article",
      title,
      description,
      url: "/articles/bioverify",
      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                alt: "BioVerify Protocol hero artwork",
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default function BioVerifyArticlePage() {
  return <BioVerifyArticle />;
}
