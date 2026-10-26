import type { Metadata } from "next";
import { JsonLd } from "@/app/_components/json-ld";
import { breadcrumbNode } from "@/app/_lib/json-ld";
import { DEFAULT_OG_IMAGES, SITE_NAME } from "@/app/_lib/site-metadata";
import { ArticlesList } from "@/app/articles/_components/articles-list";

const ARTICLES_TITLE = `Articles | ${SITE_NAME}`;
const ARTICLES_DESCRIPTION =
  "How I built LabsTrail, Wallet Watcher and BioVerify, the trade-offs I made, and what production would need.";

export const metadata: Metadata = {
  alternates: { canonical: "/articles" },
  title: ARTICLES_TITLE,
  description: ARTICLES_DESCRIPTION,
  openGraph: {
    images: DEFAULT_OG_IMAGES,
    title: ARTICLES_TITLE,
    description: ARTICLES_DESCRIPTION,
    type: "website",
    url: "/articles",
    siteName: SITE_NAME,
  },
  twitter: {
    images: DEFAULT_OG_IMAGES.map((i) => i.url),
    card: "summary_large_image",
    title: ARTICLES_TITLE,
    description: ARTICLES_DESCRIPTION,
  },
};

export default function ArticlesIndexPage() {
  return (
    <div className="relative z-10 flex w-full flex-col gap-8">
      <JsonLd
        nodes={[
          breadcrumbNode([{ name: "Home", path: "/" }, { name: "Articles" }]),
        ]}
      />
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Articles
        </h1>
        <p className="text-muted-foreground">
          How the projects work, why they are built that way, and what is
          missing.
        </p>
      </div>
      <ArticlesList />
    </div>
  );
}
