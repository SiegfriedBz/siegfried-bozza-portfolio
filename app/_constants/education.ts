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
    title: "Solidity Bootcamp",
    location: "Remote",
    description:
      "Metana: 5-month intensive program on Solidity, EVM, Foundry, security, and oracles",
  },
  {
    id: 2,
    year: "2022",
    title: "Full-Stack Web Development Bootcamp",
    location: "Zurich, Switzerland",
    description:
      "Le Wagon: Covered HTML, CSS, JavaScript, React, Rails, and Git in a 2-month immersive bootcamp.",
  },
  {
    id: 3,
    year: "2022-2023",
    title: "Blockchain Technologies",
    location: "Remote",
    link: {
      href: process.env.NEXT_PUBLIC_FMT ?? "",
      label: "🎲 A Smart Contract Approach to No-Loss Gaming",
    },
    description: `UB / Barcelona: "Masters degree" in blockchain technologies, smart contracts, EVM, and dApp development.`,
  },
  {
    id: 4,
    year: "2012",
    title: "M.Eng. Civil Engineering",
    location: "France",
    description: `École des Mines: Civil & Environmental Engineering. 
      Technical problem-solving skills I now apply to coding.`,
  },
  {
    id: 5,
    year: "2001",
    title: "M.Sc. Molecular Biology",
    location: "France",
    description: `University of Montpellier: Molecular Biology and Genetics. 
      Systems thinking—skills I now apply to coding.`,
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
