import {
  DEFAULT_TITLE,
  SITE_DESCRIPTION_LONG,
  SITE_DESCRIPTION_SHORT,
} from "@/app/_lib/site-metadata";
import type { Metadata } from "next";
import { Projects } from "../_components/projects";
import { Hero } from "./_components/hero";

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

export default function Page() {
  return (
    <main className="max-w-6xl mx-auto flex flex-col gap-8">
      <Hero />
      <Projects />
    </main>
  );
}
