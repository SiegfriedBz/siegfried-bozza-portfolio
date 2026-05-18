import { cn } from "@/lib/utils";
import type { FC, ReactNode } from "react";

type Item = { key: string; content: ReactNode };

type Props = {
  label: string;
  items: Item[];
  className?: string;
};

export const RecapCard: FC<Props> = (props) => {
  const { label, items, className } = props;

  return (
    <div
      className={cn(
        "my-10 rounded-r-lg border border-border border-l-[3px] border-l-amber-500 bg-muted/30 p-4 dark:border-white/10 dark:border-l-[#f0b429] dark:bg-[#1e2530]",
        className,
      )}
    >
      <span className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-amber-600 dark:text-[#f0b429]">
        {label}
      </span>
      <ul className="m-0 list-none p-0">
        {items.map((item) => (
          <li
            key={item.key}
            className="relative py-0.5 pl-[18px] text-sm text-muted-foreground before:absolute before:left-0 before:text-xs before:text-amber-500 before:content-['✓'] dark:text-[#b0bac4] dark:before:text-[#f0b429]"
          >
            {item.content}
          </li>
        ))}
      </ul>
    </div>
  );
};
