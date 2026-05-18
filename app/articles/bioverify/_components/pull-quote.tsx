import { cn } from "@/lib/utils";
import type { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
}>;

export const PullQuote: FC<Props> = (props) => {
  const { children, className } = props;

  return (
    <blockquote
      className={cn(
        "my-9 rounded-r-lg border-l-[3px] border-teal-500 bg-teal-500/10 py-5 pl-6 pr-6 font-[family-name:var(--font-serif)] text-[clamp(1.1rem,2.5vw,1.35rem)] leading-[1.55] text-foreground italic dark:border-[#2dd4bf] dark:bg-[rgba(45,212,191,0.1)]",
        className,
      )}
    >
      {children}
    </blockquote>
  );
};
