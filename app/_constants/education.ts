import type { IconName } from "@/app/_constants/icons";

export type EducationSection = "software" | "earlier";

export type EducationEntry = {
  id: number;
  year?: string;
  title: string;
  /** School or programme provider, for structured data. */
  institution: string;
  location: string;
  description: string;
  link?: { href: string; label: string; iconName?: IconName };
  section: EducationSection;
};

export const EDUCATION: EducationEntry[] = [
  {
    id: 1,
    year: "2025",
    title: "EVM Architecture & Smart Contract Security Specialization",
    institution: "Metana",
    location: "Remote",
    section: "software",
    description:
      "Metana — 5-month intensive on Solidity. Completed core curriculum focused on EVM architecture, advanced Foundry testing, and oracle integration.",
  },
  {
    id: 2,
    year: "2023",
    title: "M.Sc. Blockchain Technologies",
    institution: "University of Barcelona",
    location: "Remote",
    section: "software",
    link: {
      href: "https://drive.google.com/file/d/13Z-Se1lSnq1VLzee3Mt7DICzXwc_Yxb5/view?usp=sharing",
      label: "Read my No-Loss Gaming article",
    },
    description:
      "University of Barcelona — decentralized architectures, cryptography, and smart-contract protocol design. Completed part-time alongside the Le Wagon bootcamp (2022) and first engineering roles (Renuo AG, 2022–2023). GBI scholarship recipient (Global Blockchain Initiative Local Hub — France, Dec 2021 – Apr 2023).",
  },
  {
    id: 3,
    year: "2022",
    title: "Full-Stack Software Engineering Bootcamp",
    institution: "Le Wagon",
    location: "Zurich, Switzerland",
    section: "software",
    description:
      "Le Wagon — 2-month intensive on JavaScript, React, Rails, and modern web tooling. Continued as Teaching Assistant in Zurich after graduating.",
  },
  {
    id: 4,
    year: "2012",
    title: "M.Eng. Civil & Environmental Engineering",
    institution: "École des Mines",
    location: "France",
    section: "earlier",
    description:
      "École des Mines — Civil and Environmental Engineering curriculum.",
  },
  {
    id: 5,
    year: "2001",
    title: "M.Sc. Molecular Biology & Genetics",
    institution: "University of Montpellier",
    location: "France",
    section: "earlier",
    description:
      "University of Montpellier — Molecular Biology & Genetics. Followed by research roles in France (INSERM, Institute for Neurosciences of Montpellier) and Canada (University of British Columbia, Vancouver).",
  },
];
