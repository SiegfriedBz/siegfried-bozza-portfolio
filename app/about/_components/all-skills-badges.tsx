import { getStackRecord, StackBadge } from "@/app/_components/stack-badge";
import { STACK } from "@/app/_constants/stack";
import { Badge } from "@/components/ui/badge";
import type { FC } from "react";

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
      STACK.SUPABASE,
      STACK.STRIPE,
      STACK.INNGEST,
      STACK.DRIZZLE,
      STACK.NEON,
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
          <ul className="flex flex-wrap gap-x-4 gap-y-4 ps-0 list-none">
            {items.map((stack) => {
              const record = getStackRecord(stack);
              if (!record) return null;
              const hasLogo = Boolean(record.logo);
              return (
                <li key={stack}>
                  {hasLogo ? (
                    <div className="flex flex-col items-center gap-1 min-w-fit px-1">
                      <StackBadge stack={stack} />
                      <span className="whitespace-nowrap text-[10px] sm:text-xs text-center text-muted-foreground leading-tight">
                        {record.name}
                      </span>
                    </div>
                  ) : (
                    <Badge variant="outline" className="h-8 text-xs">
                      {record.name}
                    </Badge>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
};
