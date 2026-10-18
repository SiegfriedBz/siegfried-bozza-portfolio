import type { Metadata } from "next";
import { ARTICLES } from "@/app/_constants/articles";
import { DEFAULT_OG_IMAGES } from "@/app/_lib/site-metadata";
import { ArticlesList } from "@/app/articles/_components/articles-list";

export const metadata: Metadata = {
  title: "Articles | Siegfried Bozza",
  description: "Case studies from projects I've built.",
  openGraph: {
    images: DEFAULT_OG_IMAGES,
    title: "Articles | Siegfried Bozza",
    description: "Case studies from projects I've built.",
    type: "website",
    url: "/articles",
  },
  twitter: {
    images: DEFAULT_OG_IMAGES.map((i) => i.url),
    card: "summary_large_image",
    title: "Articles | Siegfried Bozza",
    description: "Case studies from projects I've built.",
  },
};

export default function ArticlesIndexPage() {
  const showSubtitle = ARTICLES.length > 1;

  return (
    <main className="relative z-10 flex w-full flex-col gap-8">
      {showSubtitle ? (
        <p className="text-center text-sm text-muted-foreground sm:text-base">
          Case studies from projects I&apos;ve built.
        </p>
      ) : null}
      <ArticlesList />
    </main>
  );
}
