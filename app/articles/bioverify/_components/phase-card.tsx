import { cn } from "@/lib/utils";
import type { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  number: string;
  label: string;
  title: string;
  className?: string;
}>;

export const PhaseCard: FC<Props> = (props) => {
  const { number, label, title, className } = props;

  return (
    <div
      className={cn(
        "my-12 flex items-start gap-[18px] rounded-xl border border-border bg-card p-5 dark:border-white/10 dark:bg-[#161b22]",
        "max-sm:flex-col max-sm:gap-2",
        className,
      )}
    >
      <div
        className="shrink-0 font-[family-name:var(--font-serif)] text-[2.625rem] leading-none text-teal-500/35 dark:text-[#2dd4bf]/35"
        aria-hidden
      >
        {number}
      </div>
      <div className="min-w-0 flex-1">
        <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-teal-600 dark:text-[#2dd4bf]">
          {label}
        </span>
        <div className="font-[family-name:var(--font-serif)] text-[1.375rem] font-normal text-foreground">
          {title}
        </div>
      </div>
    </div>
  );
};
