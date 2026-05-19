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
      "**High-Performance UI:** Built responsive data grids with **TanStack Table**, type-safe server-side URL state (**nuqs**), and **Recharts** KPI widgets on a **shadcn/ui** + **Tailwind CSS** design system, with **i18n** support and **Next.js App Router** streaming + **React Suspense** for smooth UX on large datasets — deployed on **Vercel**.",
      "**CQRS & Event-Driven Patterns:** Read/write separation across core domain workflows, implemented over **Supabase** primitives — database triggers, **RPC** functions, and the typed **Supabase client**.",
      "**Domain-Driven Design:** Domain logic decoupled from infrastructure via **ports/adapters** (hexagonal architecture).",
      "**Testing:** Wrote **Vitest** unit tests and E2E tests with **Cypress**.",
      "**AI-Augmented Development:** Integrated AI agents in **Cursor** for planning and implementation. Treated all agent-generated code as standard PRs requiring architectural review and testing before merge.",
      "**Agile Delivery:** Contributed in 2-week sprints tracked in **Linear**, with backlog refinement sessions, peer code reviews on every PR, **Git Flow** branching, and required CI checks before merge.",
    ],
  },
  {
    id: 2,
    company: "Freelance",
    location: "France / Indonesia (Remote)",
    position: "Full-Stack Developer",
    from: "07/2023",
    to: "08/2024",
    section: "software",
    description: [
      "Developed **React/Next.js** applications styled with **Tailwind CSS** + **shadcn/ui** and animated with **Framer Motion**, backed by **MongoDB**, with unit and integration tests using **Jest**.",
      "Contributed front-end features to DeXter-on-Radix, an open-source decentralized exchange DApp.",
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
      "Conducted genomic research and co-authored three peer-reviewed studies in J. Neurosci. Res., Fungal Genet. Biol., Dev. Biol.",
    ],
    references: [
      {
        label: "Dromard et al., J. Neurosci. Res. 2008",
        href: "https://pubmed.ncbi.nlm.nih.gov/18335522/",
      },
      {
        label: "Tanguay et al., Fungal Genet. Biol. 2006",
        href: "https://pubmed.ncbi.nlm.nih.gov/16859936/",
      },
      {
        label: "Fisher et al., Dev. Biol. 2010",
        href: "https://pubmed.ncbi.nlm.nih.gov/19833123/",
      },
    ],
  },
];
