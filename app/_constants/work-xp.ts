type WorkExperience = {
  id: number;
  company: string;
  location: string;
  position: string;
  from: string;
  to: string;
  description: string[];
  link?: { href: string; label: string };
}[];

export const WORK_EXPERIENCE: WorkExperience = [
  {
    id: 1,
    company: "Prismo.io",
    location: "France",
    position: "Full-Stack Developer",
    from: "08/2024",
    to: "Present",
    description: [
      "Develop and maintain the HR tech platform using **Next.js, Supabase (auth + real-time), and Shadcn/Tailwind for UI**.",
      "Optimize UI performance with **Next.js Streaming and React Suspense**.",
      "Build dynamic forms using **React Hook Form + Zod validation** (client/server).",
      "Implement **TanStack Table** for data-heavy UIs with server-side sorting/filtering/pagination via **nuqs**.",
      "Use **React Context** for state management across complex workflows.",
      "Design interactive workflows with **React Flow** for intuitive user experiences.",
      "Write domain-specific logic in a hexagonal architecture.",
      "Boost test coverage with **Jest/Cypress**.",
      "Collaborate via **Git** for version control and code reviews.",
      "Ship features in **Agile sprints** (2-week cycles).",
    ],
  },
  {
    id: 2,
    company: "Freelance",
    location: "France / Indonesia (Remote)",
    position: "Full-Stack Developer",
    from: "07/2023",
    to: "08/2024",
    description: [
      "Developed **Next.js/React apps** with MongoDB.",
      "Contributed to **DeXter-on-Radix** (open-source DApp).",
    ],
    link: {
      href: process.env.NEXT_PUBLIC_PORTFOLIO_2024_URL ?? "",
      label: "View my 2024 Portfolio",
    },
  },
  {
    id: 3,
    company: "Renuo AG",
    location: "Zurich, Switzerland",
    position: "Software Engineer Intern",
    from: "07/2022",
    to: "06/2023",
    description: [
      "Contributed to team projects while learning full-stack development (HTML / CSS / Ruby On Rails / JS / React / Git).",
    ],
  },
  {
    id: 4,
    company: "Career Transition",
    location: "Switzerland / France",
    position: "Self-Study",
    from: "2021",
    to: "2022",
    description: [
      "Transitioned from Civil Engineering to Web Development through self-study.",
    ],
  },
];
