import type { FC } from "react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  lines: string[];
  className?: string;
};

/** Cover for projects without a UI: a short, real terminal transcript. */
export const TerminalCover: FC<Props> = (props) => {
  const { title, lines, className } = props;

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-[#0d1117] text-left shadow-inner",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="size-3 rounded-full bg-[#ff5f57]" aria-hidden />
        <span className="size-3 rounded-full bg-[#febc2e]" aria-hidden />
        <span className="size-3 rounded-full bg-[#28c840]" aria-hidden />
        <span className="ms-3 truncate font-mono text-xs text-slate-400">
          {title}
        </span>
      </div>
      <pre className="flex-1 overflow-hidden px-4 py-3 font-mono text-[11px] leading-relaxed text-slate-200 sm:text-xs md:text-sm">
        {lines.map((line, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static transcript
          <code key={i} className={cn("block whitespace-pre", lineTone(line))}>
            {line || " "}
          </code>
        ))}
      </pre>
    </div>
  );
};

const lineTone = (line: string) => {
  if (line.startsWith("$")) return "text-[#7ee787]";
  if (line.startsWith("#") || line.startsWith("//")) return "text-slate-500";
  if (line.startsWith("✅") || line.startsWith("✓")) return "text-[#aaffff]";
  return undefined;
};
