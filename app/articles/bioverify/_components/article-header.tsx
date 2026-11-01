import { MoveRightIcon } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { SiegAvatar } from "@/app/_components/sieg-avatar";
import { getArticle } from "@/app/_constants/articles";
import { formatDate } from "@/app/articles/_lib/format-date";

type Props = {
  className?: string;
};

export const ArticleHeader: FC<Props> = () => {
  const article = getArticle("bioverify");

  return (
    <header className="mb-8 border-b border-border pb-6 pt-8 sm:mb-14 sm:pb-12 dark:border-white/10">
      <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.12em] text-teal-700 sm:mb-5 dark:text-[#2dd4bf]">
        Architecture · Web3 · DeSci · Agentic Systems
      </span>
      <h1 className="mb-3 font-[family-name:var(--font-serif)] text-[clamp(2rem,5vw,3.25rem)] font-normal leading-[1.15] text-foreground sm:mb-5">
        When the Chain Is Not Enough: Building a Full-Stack Agentic DApp
      </h1>
      <p className="font-[family-name:var(--font-serif)] text-xl italic leading-snug text-muted-foreground">
        A DeSci peer-review case study, told as a user journey — where every
        step in the workflow introduces the piece of the stack that makes it
        possible.
      </p>
      {/* Same byline as the MDX articles (post-shell.tsx). */}
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <SiegAvatar className="size-7" alt="" />
          <Link
            href="/about"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Siegfried Bozza
          </Link>
        </span>
        <span aria-hidden>·</span>
        <time dateTime={article.date}>{formatDate(article.date)}</time>
        {article.updated ? (
          <>
            <span aria-hidden>·</span>
            <span>
              Updated{" "}
              <time dateTime={article.updated}>
                {formatDate(article.updated)}
              </time>
            </span>
          </>
        ) : null}
        <span aria-hidden>·</span>
        <span>{article.readingMinutes} min read</span>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Companion piece to the{" "}
        <Link
          href="/projects/bioverify"
          className="inline-flex items-center gap-1 font-medium text-teal-700 underline-offset-4 hover:underline dark:text-[#2dd4bf]"
        >
          BioVerify project page
          <MoveRightIcon className="size-4 shrink-0" />
        </Link>
        .
      </p>
    </header>
  );
};
