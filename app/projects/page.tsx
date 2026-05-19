import { SITE_NAME } from "@/app/_lib/site-metadata";
import type { Metadata } from "next";
import { Projects } from "../_components/projects";

const PROJECTS_TITLE = `Projects | ${SITE_NAME}`;
const PROJECTS_DESCRIPTION =
  "Web3 and full-stack case studies: BioVerify (DeSci agents), Bet2Gether, Forge (ERC-1155), GavL (real-time auctions).";

export const metadata: Metadata = {
  title: PROJECTS_TITLE,
  description: PROJECTS_DESCRIPTION,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: PROJECTS_TITLE,
    description: PROJECTS_DESCRIPTION,
    url: "/projects",
  },
  twitter: {
    title: PROJECTS_TITLE,
    description: PROJECTS_DESCRIPTION,
  },
};

export default function Page() {
  return (
    <main className="relative min-h-svh flex flex-col gap-8">
      <Projects />
    </main>
  );
}
