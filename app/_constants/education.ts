type Education = {
  id: number;
  year: string;
  title: string;
  location: string;
  description: string;
  link?: { href: string; label: string };
}[];

export const EDUCATION: Education = [
  {
    id: 1,
    year: "2025",
    title: "Advanced Solidity Bootcamp",
    location: "Remote",
    description:
      "Metana: 5-month program on Solidity, EVM, Foundry, security, and oracles.",
  },
  {
    id: 2,
    year: "2022",
    title: "Full-Stack Web Development Bootcamp",
    location: "Zurich, Switzerland",
    description:
      "Le Wagon: 2-month intensive bootcamp covering HTML/CSS, JavaScript, React, Rails, and Git.",
  },
  {
    id: 3,
    year: "2021-2023",
    title: "MSc Blockchain Technologies",
    location: "Remote",
    link: {
      href: process.env.NEXT_PUBLIC_FMT_URL ?? "",
      label: "🎲 Read my article on No-Loss Gaming",
    },
    description:
      "UB/Barcelona: Focused on blockchain, smart contracts, and dApp development.",
  },
  {
    id: 4,
    year: "2012",
    title: "M.Eng. Civil Engineering",
    location: "France",
    description:
      "École des Mines: Civil and environmental engineering curriculum.",
  },
  {
    id: 5,
    year: "2001",
    title: "M.Sc. Molecular Biology",
    location: "France",
    description:
      "University of Montpellier: Molecular biology and genetics curriculum.",
  },
  {
    id: 6,
    year: "2021-Present",
    title: "Self-Taught Web Development",
    location: "Remote",
    description:
      "Completed courses on JavaScript, TypeScript, React, and Next.js with hands-on projects.",
  },
];
