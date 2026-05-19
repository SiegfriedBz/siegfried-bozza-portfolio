import { BIOVERIFY_LINKS } from "@/app/_constants/projects";
import { cn } from "@/lib/utils";
import type { FC } from "react";

const BIOVERIFY_GITHUB = BIOVERIFY_LINKS.github?.trim() ?? "";
const BIOVERIFY_LIVE = BIOVERIFY_LINKS.live?.trim() ?? "";

type Props = {
  className?: string;
};

export const ArticleCta: FC<Props> = (props) => {
  const { className } = props;

  const hasResourceLinks = Boolean(BIOVERIFY_GITHUB || BIOVERIFY_LIVE);

  return (
    <div
      className={cn(
        "mt-12 rounded-lg border border-border border-l-[3px] border-l-teal-500 bg-card p-6 text-base leading-relaxed dark:border-[rgba(139,148,158,0.3)] dark:border-l-[#2dd4bf] dark:bg-[#161b22]",
        className,
      )}
    >
      {hasResourceLinks ? (
        <p className="article-prose m-0 text-foreground [&_strong]:font-medium [&_strong]:text-teal-700 dark:[&_strong]:text-[#2dd4bf]">
          The{" "}
          {BIOVERIFY_GITHUB ? (
            <a
              href={BIOVERIFY_GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-teal-700/60 underline-offset-2"
            >
              <strong>repo</strong>
            </a>
          ) : (
            <strong>repo</strong>
          )}{" "}
          has the full architecture doc
          {BIOVERIFY_LIVE ? (
            <>
              {" "}
              and a{" "}
              <a
                href={BIOVERIFY_LIVE}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-teal-700/60 underline-offset-2"
              >
                <strong>live demo</strong>
              </a>
            </>
          ) : null}
          .
        </p>
      ) : null}
      <p
        className={cn(
          "article-prose m-0 text-foreground",
          hasResourceLinks && "mt-4",
        )}
      >
        The chain records what happened. Agents coordinate what happens next.
        And humans? They make the calls that matter.
      </p>
    </div>
  );
};
