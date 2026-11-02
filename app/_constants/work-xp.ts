export type WorkExperienceSection = "software" | "earlier";

export type WorkExperienceEntry = {
  id: number;
  company: string;
  location: string;
  position: string;
  from: string;
  to: string;
  description: string[];
  link?: { href: string; label: string };
  section: WorkExperienceSection;
  /** Optional PubMed / external refs (earlier-career science roles). */
  references?: { label: string; href: string }[];
};

export const WORK_EXPERIENCE: WorkExperienceEntry[] = [
  {
    id: 1,
    company: "Prismo.io",
    location: "France (Hybrid)",
    position: "Full-Stack Engineer · SaaS Platform",
    from: "08/2024",
    to: "Present",
    section: "software",
    description: [
      "**Product features end to end** in a **Next.js**, **TypeScript** and **Supabase** monorepo (App Router, Server Actions, pnpm, Turborepo): a process builder, a training-management module (catalog, sessions, approvals, budgets) and dashboards with KPIs.",
      "**Postgres and Supabase:** SQL migrations, row-level security policies, RPC functions, triggers, **pg_cron** jobs, Realtime notifications, and Deno Edge Functions for ETL.",
      "**Architecture:** a hexagonal, event-driven core (commands, queries, handlers, repositories, domain events), with CQRS on top of Supabase.",
      "**Quality:** **Vitest** unit and integration tests, **Cypress** end-to-end tests, GitHub Actions CI, Biome, and conventional commits with semantic-release. Role-based permissions and FR/EN i18n (**Lingui**).",
      "**AI-assisted development:** I use coding agents (**Cursor**, **Claude Code**) for planning and implementation, and their code goes through the same review and tests as any other PR.",
    ],
  },
  {
    id: 2,
    company: "Independent study & open source",
    location: "France / Vietnam / Indonesia",
    position: "Full-Stack & Web3 Development",
    from: "07/2023",
    to: "08/2024",
    section: "software",
    description: [
      "Studied full-stack and Web3 development while travelling, building my own **React**, **Next.js** and **TypeScript** projects with **Tailwind CSS**, **shadcn/ui**, **MongoDB** and **Jest** tests.",
      "Contributed front-end features to [DeXter-on-Radix](https://github.com/DeXter-on-Radix/website), an open-source order-book DEX.",
    ],
  },
  {
    id: 3,
    company: "Renuo AG",
    location: "Zurich, Switzerland",
    position: "Software Engineer Intern",
    from: "07/2022",
    to: "06/2023",
    section: "software",
    description: [
      "Contributed to full-stack team projects across multiple agency clients, working in **Ruby on Rails**, **JavaScript** / **TypeScript**, and **React**, using **RSpec** for Rails tests, with attention to clean code practices and agile delivery.",
    ],
  },
  {
    id: 10,
    company: "KIBAG Gruppe · SERPOL · SITA Remediation (SUEZ)",
    location: "France & Switzerland",
    position: "Land Remediation Engineer / Project Manager",
    from: "2012",
    to: "2020",
    section: "earlier",
    description: [
      "Conducted environmental fieldwork, managed soil-sampling operations, and handled compliance reporting for industrial sites.",
    ],
  },
  {
    id: 11,
    company: "INSERM · University of British Columbia",
    location: "France & Canada",
    position: "Molecular Biology Researcher",
    from: "2001",
    to: "2009",
    section: "earlier",
    description: [
      "Conducted genomic research on neural stem cells and epigenetics, and co-authored three peer-reviewed studies.",
    ],
    references: [
      {
        label: "J. Neurosci. Res. 2008",
        href: "https://pubmed.ncbi.nlm.nih.gov/18335522/",
      },
      {
        label: "Fungal Genet. Biol. 2006",
        href: "https://pubmed.ncbi.nlm.nih.gov/16859936/",
      },
      {
        label: "Dev. Biol. 2010",
        href: "https://pubmed.ncbi.nlm.nih.gov/19833123/",
      },
    ],
  },
];
