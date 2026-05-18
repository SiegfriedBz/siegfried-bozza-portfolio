import { cn } from "@/lib/utils";
import type { FC } from "react";

type Props = {
  className?: string;
};

export const OutcomesTable: FC<Props> = (props) => {
  const { className } = props;

  return (
    <div
      className={cn(
        "my-8 overflow-x-auto rounded-xl border border-border dark:border-[rgba(139,148,158,0.3)]",
        className,
      )}
    >
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50 dark:border-[rgba(139,148,158,0.3)] dark:bg-[#1e2530]">
            <th className="px-4 py-3 text-left font-mono text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Outcome
            </th>
            <th className="px-4 py-3 text-left font-mono text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Trigger
            </th>
            <th className="px-4 py-3 text-left font-mono text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Publisher
            </th>
            <th className="px-4 py-3 text-left font-mono text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Honest reviewers
            </th>
            <th className="px-4 py-3 text-left font-mono text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Negligent reviewers
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border hover:bg-muted/20 dark:border-white/10">
            <td className="px-4 py-3 align-top leading-relaxed">
              <span className="inline-block rounded border border-red-400/30 bg-red-500/15 px-2 py-0.5 font-mono text-[11px] font-medium text-red-600 dark:border-[rgba(224,92,75,0.3)] dark:text-[#e05c4b]">
                Early Slashed
              </span>
            </td>
            <td className="px-4 py-3 align-top leading-relaxed text-foreground">
              Plagiarism detected pre-review
            </td>
            <td className="px-4 py-3 align-top leading-relaxed text-foreground">
              Stake slashed · rep penalty
            </td>
            <td className="px-4 py-3 align-top leading-relaxed text-foreground">
              None selected yet
            </td>
            <td className="px-4 py-3 align-top leading-relaxed text-muted-foreground">
              N/A
            </td>
          </tr>
          <tr className="border-b border-border hover:bg-muted/20 dark:border-white/10">
            <td className="px-4 py-3 align-top leading-relaxed">
              <span className="inline-block rounded border border-green-500/25 bg-green-500/12 px-2 py-0.5 font-mono text-[11px] font-medium text-green-700 dark:border-[rgba(63,185,80,0.25)] dark:text-[#3fb950]">
                Published
              </span>
            </td>
            <td className="px-4 py-3 align-top leading-relaxed text-foreground">
              Peer review consensus: pass
            </td>
            <td className="px-4 py-3 align-top leading-relaxed text-foreground">
              Stake returned · rep boost
            </td>
            <td className="px-4 py-3 align-top leading-relaxed text-foreground">
              Stake + reward + rep boost
            </td>
            <td className="px-4 py-3 align-top leading-relaxed text-foreground">
              Stake slashed · rep penalty
            </td>
          </tr>
          <tr className="hover:bg-muted/20">
            <td className="px-4 py-3 align-top leading-relaxed">
              <span className="inline-block rounded border border-amber-500/25 bg-amber-500/12 px-2 py-0.5 font-mono text-[11px] font-medium text-amber-700 dark:border-[rgba(240,180,41,0.25)] dark:text-[#f0b429]">
                Slashed
              </span>
            </td>
            <td className="px-4 py-3 align-top leading-relaxed text-foreground">
              Peer review consensus: fail
            </td>
            <td className="px-4 py-3 align-top leading-relaxed text-foreground">
              Stake slashed · rep penalty
            </td>
            <td className="px-4 py-3 align-top leading-relaxed text-foreground">
              Stake + reward + rep boost
            </td>
            <td className="px-4 py-3 align-top leading-relaxed text-foreground">
              Stake slashed · rep penalty
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr className="border-t border-border dark:border-[rgba(139,148,158,0.3)]">
            <td
              className="px-4 py-3 font-mono text-xs leading-relaxed text-muted-foreground"
              colSpan={5}
            >
              <strong className="font-medium text-foreground">
                Honesty is measured against the binding verdict (peer consensus
                or senior tie-break), not the paper&apos;s outcome.
              </strong>{" "}
              The senior reviewer is always classified as honest at settlement.
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
