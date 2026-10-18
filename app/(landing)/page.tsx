import type { Metadata } from "next";
import { PROJECTS } from "@/app/_constants/projects";
import {
  DEFAULT_TITLE,
  SITE_DESCRIPTION_LONG,
  SITE_DESCRIPTION_SHORT,
} from "@/app/_lib/site-metadata";
import { Projects } from "../_components/projects";
import { Hero, type HeroProof } from "./_components/hero";

export const metadata: Metadata = {
  title: DEFAULT_TITLE,
  description: SITE_DESCRIPTION_SHORT,
  alternates: { canonical: "/" },
  openGraph: {
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION_LONG,
    url: "/",
  },
  twitter: {
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION_LONG,
  },
};

/** Projects shown as proof in the hero, in this order. */
const HERO_PROOF_SLUGS = ["verisci", "wallet-watcher", "bioverify"];

const heroProof: HeroProof[] = HERO_PROOF_SLUGS.flatMap((slug) => {
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return [];
  return [
    {
      slug,
      name: project.title.h1,
      pitch: project.title.short ?? project.title.h2,
      period: project.constructionPeriod,
      href: project.links.page,
    },
  ];
});

export default function Page() {
  return (
    <main className="max-w-6xl mx-auto flex flex-col gap-8">
      <Hero proof={heroProof} />
      <Projects />
    </main>
  );
}
