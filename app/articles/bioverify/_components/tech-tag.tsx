import { cn } from "@/lib/utils";
import type { FC, PropsWithChildren } from "react";

export type TechTagVariant =
  | "teal"
  | "blue"
  | "amber"
  | "purple"
  | "green"
  | "coral";

type Props = PropsWithChildren<{
  variant?: TechTagVariant;
  className?: string;
}>;

const variantClass: Record<TechTagVariant, string> = {
  teal: "border-teal-700/40 bg-zinc-100 text-teal-700 dark:border-teal-600/40 dark:bg-[#1e2530] dark:text-[#2dd4bf]",
  blue: "border-blue-800/35 bg-zinc-100 text-blue-700 dark:border-[#1a4a7a] dark:bg-[#1e2530] dark:text-[#58a6ff]",
  amber:
    "border-amber-700/35 bg-zinc-100 text-amber-700 dark:border-[#7a5a12] dark:bg-[#1e2530] dark:text-[#f0b429]",
  purple:
    "border-purple-500/30 bg-zinc-100 text-purple-700 dark:bg-[#1e2530] dark:text-[#a78bfa]",
  green:
    "border-green-600/25 bg-zinc-100 text-green-700 dark:bg-[#1e2530] dark:text-[#3fb950]",
  coral:
    "border-red-400/30 bg-zinc-100 text-red-600 dark:bg-[#1e2530] dark:text-[#e05c4b]",
};

export const TechTag: FC<Props> = (props) => {
  const { children, className, variant = "teal" } = props;

  return (
    <span
      className={cn(
        "inline-block whitespace-nowrap rounded border px-2 py-0.5 align-middle font-mono text-[11px]",
        variantClass[variant],
        className,
      )}
    >
      {children}
    </span>
  );
};
