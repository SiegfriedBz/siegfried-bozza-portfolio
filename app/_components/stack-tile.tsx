import type { CSSProperties, FC } from "react";
import { cn } from "@/lib/utils";
import { STACK, sortStack } from "../_constants/stack";

export type StackRecord = {
  name: string;
  /** Single-colour mark in public/logos, painted in the text colour through a CSS mask. */
  icon?: string;
};

/*
 * Marks: Simple Icons 16.36.0 (CC0). The ones it lacks come from each project's own site or
 * repo, reduced to one colour: Foundry (getfoundry.sh), OriginTrail (origintrail.io), Inngest
 * (inngest.com), viem (viem.sh), Reown (reown.com), RainbowKit, Lingui and nuqs (their repos),
 * Tenderly (its GitHub avatar), Exa (the SVG Logos set). Recharts publishes no mark, so its
 * tile shows a letter. The marks belong to their owners.
 */
const stackMap: Record<STACK, StackRecord> = {
  [STACK.NEXT]: { name: "Next.js", icon: "/logos/next.svg" },
  [STACK.TYPESCRIPT]: { name: "TypeScript", icon: "/logos/typescript.svg" },
  [STACK.NODE]: { name: "Node.js", icon: "/logos/node.svg" },
  [STACK.SOLIDITY]: { name: "Solidity", icon: "/logos/solidity.svg" },
  [STACK.FOUNDRY]: { name: "Foundry", icon: "/logos/foundry.png" },

  [STACK.CHAINLINK]: { name: "Chainlink", icon: "/logos/chainlink.svg" },
  [STACK.ORIGINTRAIL]: {
    name: "OriginTrail DKG",
    icon: "/logos/origintrail.svg",
  },
  [STACK.LANGGRAPH]: { name: "LangGraph", icon: "/logos/langgraph.svg" },
  [STACK.INNGEST]: { name: "Inngest", icon: "/logos/inngest.svg" },
  [STACK.SUPABASE]: { name: "Supabase", icon: "/logos/supabase.svg" },
  [STACK.STRIPE]: { name: "Stripe", icon: "/logos/stripe.svg" },

  [STACK.OPEN_ZEPPELIN]: {
    name: "OpenZeppelin",
    icon: "/logos/openzeppelin.svg",
  },
  [STACK.VIEM]: { name: "viem", icon: "/logos/viem.png" },
  [STACK.WAGMI]: { name: "wagmi", icon: "/logos/wagmi.svg" },
  [STACK.REOWN]: { name: "Reown", icon: "/logos/reown.svg" },
  [STACK.RAINBOW_KIT]: { name: "RainbowKit", icon: "/logos/rainbowkit.svg" },
  [STACK.IPFS]: { name: "IPFS", icon: "/logos/ipfs.svg" },
  [STACK.ALCHEMY]: { name: "Alchemy", icon: "/logos/alchemy.svg" },
  [STACK.TENDERLY]: { name: "Tenderly", icon: "/logos/tenderly.png" },

  [STACK.GEMINI]: { name: "Gemini", icon: "/logos/gemini.svg" },
  [STACK.EXA_AI]: { name: "Exa AI", icon: "/logos/exa.svg" },

  [STACK.HONO]: { name: "Hono", icon: "/logos/hono.svg" },
  [STACK.DRIZZLE]: { name: "Drizzle", icon: "/logos/drizzle.svg" },
  [STACK.NEON]: { name: "Neon", icon: "/logos/neon.svg" },
  [STACK.SQLITE]: { name: "SQLite", icon: "/logos/sqlite.svg" },
  [STACK.UPSTASH]: { name: "Upstash", icon: "/logos/upstash.svg" },
  [STACK.MONGODB]: { name: "MongoDB", icon: "/logos/mongodb.svg" },

  [STACK.REACT]: { name: "React", icon: "/logos/react.svg" },
  [STACK.TANSTACK_QUERY]: {
    name: "TanStack Query",
    icon: "/logos/tanstack-query.svg",
  },
  [STACK.TANSTACK_TABLE]: {
    name: "TanStack Table",
    icon: "/logos/tanstack-table.svg",
  },
  [STACK.RHF]: { name: "React Hook Form", icon: "/logos/react-hook-form.svg" },
  [STACK.ZOD]: { name: "Zod", icon: "/logos/zod.svg" },
  [STACK.NUQS]: { name: "nuqs", icon: "/logos/nuqs.svg" },
  [STACK.LINGUI]: { name: "Lingui", icon: "/logos/lingui.svg" },
  [STACK.RECHARTS]: { name: "Recharts" },
  [STACK.SHADCN]: { name: "shadcn/ui", icon: "/logos/shadcn.svg" },
  [STACK.TAILWIND]: { name: "Tailwind CSS", icon: "/logos/tailwind.svg" },
  [STACK.FRAMER_MOTION]: { name: "Motion (Framer Motion)" },

  [STACK.VITEST]: { name: "Vitest", icon: "/logos/vitest.svg" },
  [STACK.JEST]: { name: "Jest", icon: "/logos/jest.svg" },
  [STACK.CYPRESS]: { name: "Cypress", icon: "/logos/cypress.svg" },
};

export const getStackRecord = (stack: STACK): StackRecord | undefined =>
  stackMap[stack];

type Props = {
  stack: STACK;
};

// Soft hyphens between the words of camel-cased names, so narrow tiles break "Open-Zeppelin"
// rather than mid-word.
const breakable = (name: string) => name.replace(/([a-z])([A-Z])/g, "$1­$2");

/** One technology in an equal-size tile: its mark (or initial) over its name. */
export const StackTile: FC<Props> = ({ stack }) => {
  const record = stackMap[stack];

  if (!record) return null;

  return (
    <div className="flex h-full flex-col items-center gap-1.5 rounded-lg border border-border bg-muted/30 px-1 py-2.5 text-center sm:gap-2 sm:py-3">
      {record.icon ? (
        <span
          aria-hidden
          className="size-6 bg-foreground/85 [mask-image:var(--icon)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] sm:size-7"
          style={{ "--icon": `url(${record.icon})` } as CSSProperties}
        />
      ) : (
        <span
          aria-hidden
          className="flex size-6 items-center justify-center font-mono text-base font-semibold text-foreground/85 sm:size-7 sm:text-lg"
        >
          {record.name.charAt(0)}
        </span>
      )}
      <span className="text-xs leading-tight text-muted-foreground">
        {breakable(record.name)}
      </span>
    </div>
  );
};

type TilesProps = {
  items: readonly string[];
  className?: string;
};

/** Equal tiles in STACK order: three columns on phones, wider tiles from `sm`. */
export const StackTiles: FC<TilesProps> = ({ items, className }) => (
  <ul
    className={cn(
      "grid grid-cols-[repeat(auto-fill,minmax(4.25rem,1fr))] gap-2 sm:grid-cols-[repeat(auto-fill,minmax(5.75rem,1fr))]",
      className,
    )}
  >
    {sortStack(items).map((item) => (
      <li key={item}>
        <StackTile stack={item as STACK} />
      </li>
    ))}
  </ul>
);
