import { cn } from "@/lib/utils";
import type { FC, ReactNode } from "react";

type Item = { key: string; content: ReactNode };

type Props = {
  items: Item[];
  className?: string;
};

export const TldrCard: FC<Props> = (props) => {
  const { items, className } = props;

  return (
    <div
      className={cn(
        "mb-12 rounded-lg border border-border border-l-[3px] border-l-teal-500 bg-card p-5 pr-6 dark:border-[rgba(139,148,158,0.3)] dark:border-l-[#2dd4bf] dark:bg-[#161b22]",
        className,
      )}
    >
      <span className="mb-3.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        TL;DR
      </span>
      <ul className="m-0 list-none p-0">
        {items.map((item) => (
          <li
            key={item.key}
            className="relative pl-5 text-[15px] leading-relaxed text-foreground before:absolute before:left-0 before:text-teal-600 before:content-['—'] dark:before:text-[#2dd4bf]"
          >
            {item.content}
          </li>
        ))}
      </ul>
    </div>
  );
};
