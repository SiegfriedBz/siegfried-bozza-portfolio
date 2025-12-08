import Image from "next/image";
import type { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { STACK } from "../_constants/stack";

type StackRecord = {
  logo?: string;
  name: string;
};

const stackMap: Partial<Record<STACK, StackRecord>> = {
  [STACK.REACT]: { logo: "/logos/react.svg", name: "React" },
  [STACK.NEXT]: { logo: "/logos/next.png", name: "Next.js" },
  [STACK.TYPESCRIPT]: { logo: "/logos/typescrpt.svg", name: "TypeScript" },

  [STACK.RHF]: { logo: "/logos/react-hook-form.png", name: "React Hook Form" },

  [STACK.TANSTACK_TABLE]: {
    logo: "/logos/tanstack-table.png",
    name: "TanStack Table",
  },
  [STACK.TANSTACK_QUERY]: {
    logo: "/logos/tanstack-query.png",
    name: "TanStack Query",
  },

  [STACK.ZOD]: { logo: "/logos/zod.png", name: "Zod" },

  [STACK.SHADCN]: { logo: "/logos/shadcn.png", name: "shadcn/ui" },
  [STACK.TAILWIND]: { logo: "/logos/tailwind.svg", name: "Tailwind CSS" },

  [STACK.SUPABASE]: { logo: "/logos/supabase.png", name: "Supabase" },
  [STACK.STRIPE]: { logo: "/logos/stripe.svg", name: "Stripe" },

  [STACK.JEST]: { logo: "/logos/jest.svg", name: "Jest" },

  [STACK.SOLIDITY]: { logo: "/logos/solidity.png", name: "Solidity" },
  [STACK.FOUNDRY]: { logo: "/logos/foundry.png", name: "Foundry" },
  [STACK.WAGMI]: { logo: "/logos/wagmi.svg", name: "Wagmi" },
  [STACK.VIEM]: { logo: "/logos/viem.png", name: "Viem" },

  [STACK.RAINBOW_KIT]: { logo: "/logos/rainbow-kit.png", name: "RainbowKit" },
  [STACK.CHAINLINK]: { logo: "/logos/chainlink.svg", name: "Chainlink" },
  [STACK.TENDERLY]: { logo: "/logos/tenderly.png", name: "Tenderly" },
  [STACK.ALCHEMY]: { logo: "/logos/alchemy.png", name: "Alchemy" },
  [STACK.IPFS]: { logo: "/logos/ipfs.svg", name: "IPFS" },
};

type Props = {
  stack: STACK;
};

export const StackBadge: FC<Props> = ({ stack }) => {
  const record = stackMap[stack];

  if (!record) return null;

  // If no logo → fallback badge
  if (!record.logo) return <Badge className="h-8">{record.name}</Badge>;

  return (
    <div className="relative h-10 w-12 sm:h-12 sm:w-14 flex items-center justify-center">
      <Image
        src={record.logo}
        alt={record.name}
        fill
        className="object-contain p-1 rounded-sm"
      />
    </div>
  );
};
