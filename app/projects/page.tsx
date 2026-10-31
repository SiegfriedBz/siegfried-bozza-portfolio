import type { Metadata } from "next";
import { JsonLd } from "@/app/_components/json-ld";
import { breadcrumbNode } from "@/app/_lib/json-ld";
import { DEFAULT_OG_IMAGES, SITE_NAME } from "@/app/_lib/site-metadata";
import { Projects } from "../_components/projects";

const PROJECTS_TITLE = `Projects | ${SITE_NAME}`;
const PROJECTS_DESCRIPTION =
  "Personal projects, Web3 on testnets: LabsTrail (DeSci ratings), Wallet Watcher (custody backend), BioVerify (agentic peer review), Bet2Gether, Forge, GavL.";

export const metadata: Metadata = {
  title: PROJECTS_TITLE,
  description: PROJECTS_DESCRIPTION,
  alternates: { canonical: "/projects" },
  openGraph: {
    images: DEFAULT_OG_IMAGES,
    title: PROJECTS_TITLE,
    description: PROJECTS_DESCRIPTION,
    url: "/projects",
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    images: DEFAULT_OG_IMAGES.map((i) => i.url),
    title: PROJECTS_TITLE,
    description: PROJECTS_DESCRIPTION,
  },
};

export default function Page() {
  return (
    <div className="relative min-h-svh flex flex-col gap-8">
      <JsonLd
        nodes={[
          breadcrumbNode([{ name: "Home", path: "/" }, { name: "Projects" }]),
        ]}
      />
      <div className="z-10 flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Projects
        </h1>
        <p className="text-muted-foreground">
          Personal end-to-end builds, the Web3 ones on testnets, each with its
          code, tests and known limitations.
        </p>
      </div>
      <Projects />
    </div>
  );
}
