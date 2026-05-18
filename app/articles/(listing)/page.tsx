import { ARTICLES } from "@/app/_constants/articles";
import { ArticlesList } from "@/app/articles/_components/articles-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles | Siegfried Bozza",
  description: "Case studies from projects I've built.",
  openGraph: {
    title: "Articles | Siegfried Bozza",
    description: "Case studies from projects I've built.",
    type: "website",
    url: "/articles",
  },
  twitter: {
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
