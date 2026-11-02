import type { FC } from "react";
import { StackTiles } from "@/app/_components/stack-tile";
import { STACK } from "@/app/_constants/stack";

// Each group shows its items in STACK order (StackTiles sorts them).
const CATEGORIES: { label: string; items: STACK[] }[] = [
  {
    label: "Frontend",
    items: [
      STACK.REACT,
      STACK.NEXT,
      STACK.TYPESCRIPT,
      STACK.TANSTACK_QUERY,
      STACK.TANSTACK_TABLE,
      STACK.RHF,
      STACK.ZOD,
      STACK.SHADCN,
      STACK.TAILWIND,
      STACK.LINGUI,
      STACK.NUQS,
      STACK.RECHARTS,
      STACK.FRAMER_MOTION,
    ],
  },
  {
    label: "Backend",
    items: [
      STACK.NODE,
      STACK.HONO,
      STACK.SUPABASE,
      STACK.STRIPE,
      STACK.INNGEST,
      STACK.DRIZZLE,
      STACK.NEON,
      STACK.SQLITE,
      STACK.MONGODB,
    ],
  },
  {
    label: "Testing",
    items: [STACK.JEST, STACK.VITEST, STACK.CYPRESS],
  },
  {
    label: "Web3",
    items: [
      STACK.SOLIDITY,
      STACK.FOUNDRY,
      STACK.OPEN_ZEPPELIN,
      STACK.WAGMI,
      STACK.VIEM,
      STACK.RAINBOW_KIT,
      STACK.REOWN,
      STACK.CHAINLINK,
      STACK.ALCHEMY,
      STACK.TENDERLY,
      STACK.IPFS,
      STACK.ORIGINTRAIL,
    ],
  },
  {
    label: "AI / Agents",
    items: [STACK.LANGGRAPH, STACK.EXA_AI, STACK.GEMINI],
  },
];

export const AllSkillsBadges: FC = () => {
  return (
    <div className="flex flex-col gap-8 mt-3">
      {CATEGORIES.map(({ label, items }) => (
        <section key={label}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground whitespace-nowrap">
              {label}
            </span>
            <div className="flex-1 h-px bg-border" aria-hidden />
          </div>
          <StackTiles items={items} className="ps-0 list-none" />
        </section>
      ))}
    </div>
  );
};
