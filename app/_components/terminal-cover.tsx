import type { FC } from "react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  lines: string[];
  /** In a fixed-size cover the transcript is cropped: fade the last lines out rather than cut one in half. */
  cropped?: boolean;
  className?: string;
};

/** Cover for projects without a UI: a short, real terminal transcript. */
export const TerminalCover: FC<Props> = (props) => {
  const { title, lines, cropped = false, className } = props;

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
        <span className="ms-3 min-w-0 font-mono text-xs text-slate-400">
          {title}
        </span>
      </div>
      <pre
        className={cn(
          "flex-1 overflow-hidden px-4 py-3 font-mono text-[11px] leading-relaxed text-slate-200 sm:text-xs md:text-sm",
          cropped &&
            "[mask-image:linear-gradient(to_bottom,#000_calc(100%-3rem),transparent)]",
        )}
      >
        {lines
          .map((line, n) => ({ line, id: `line-${n}` }))
          .map(({ line, id }) => {
            // Long lines wrap with a hanging indent under their own indentation, so JSON stays readable.
            const indent = line.length - line.trimStart().length;
            return (
              <code
                key={id}
                className={cn(
                  "block whitespace-pre-wrap [overflow-wrap:anywhere]",
                  lineTone(line),
                )}
                style={{
                  paddingInlineStart: `${indent + 2}ch`,
                  textIndent: "-2ch",
                }}
              >
                {line.trimStart() || " "}
              </code>
            );
          })}
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
