import type { Metadata } from "next";
import { JsonLd } from "@/app/_components/json-ld";
import { ARTICLES } from "@/app/_constants/articles";
import { PROJECTS } from "@/app/_constants/projects";
import { breadcrumbNode } from "@/app/_lib/json-ld";
import { DEFAULT_OG_IMAGES, SITE_NAME } from "@/app/_lib/site-metadata";
import { ArticlesList } from "@/app/articles/_components/articles-list";

const ARTICLES_TITLE = `Articles | ${SITE_NAME}`;

/** Names the projects of the articles this deploy shows: "A", "A and B", "A, B and C". */
const projectNames = ARTICLES.map(
  (a) => PROJECTS.find((p) => p.slug === a.relatedProjectSlug)?.title.h1,
).filter((name): name is string => Boolean(name));
const namesList =
  projectNames.length > 1
    ? `${projectNames.slice(0, -1).join(", ")} and ${projectNames.at(-1)}`
    : (projectNames[0] ?? "my projects");

const ARTICLES_DESCRIPTION = `How I built ${namesList}, the trade-offs I made, and what production would need.`;

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
