import { cn } from "@/lib/utils";
import type { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  label: string;
  className?: string;
}>;

export const CalloutCard: FC<Props> = (props) => {
  const { label, children, className } = props;

  return (
    <div
      className={cn(
        "my-7 rounded-lg border border-border border-l-[3px] border-l-amber-500 bg-card p-4 text-[15px] leading-relaxed text-foreground dark:border-[rgba(139,148,158,0.3)] dark:border-l-[#f0b429] dark:bg-[#161b22]",
        className,
      )}
    >
      <span className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-amber-600 dark:text-[#f0b429]">
        {label}
      </span>
      <div className="text-[15px] leading-relaxed [&_code]:text-[13px] [&_strong]:font-medium [&_strong]:text-foreground">
        {children}
      </div>
    </div>
  );
};
