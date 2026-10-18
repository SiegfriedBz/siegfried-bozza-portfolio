import { MoveRightIcon } from "lucide-react";
import Link from "next/link";
import type { FC, PropsWithChildren } from "react";
import { SiegAvatar } from "@/app/_components/sieg-avatar";
import { PROFILE_LINKS } from "@/app/_constants/links";
import { PROJECTS } from "@/app/_constants/projects";
import type { Article } from "@/app/_types/article";

type Props = PropsWithChildren<{ article: Article }>;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/** Header + prose body + footer links shared by every MDX article. */
export const PostShell: FC<Props> = ({ article, children }) => {
  const project = PROJECTS.find((p) => p.slug === article.relatedProjectSlug);

  const footerLinks = [
    project?.links.github
      ? { href: project.links.github, label: "Source code" }
      : null,
    project?.links.live
      ? { href: project.links.live, label: "Live app" }
      : null,
    project ? { href: project.links.page, label: "Project page" } : null,
    { href: PROFILE_LINKS.calendly, label: "Book a call" },
    { href: PROFILE_LINKS.linkedin, label: "LinkedIn" },
  ].filter((l): l is { href: string; label: string } => l !== null);

  return (
    <article>
      <header className="mb-10 border-b border-border pb-8 pt-8 sm:mb-14 sm:pb-12 dark:border-white/10">
        <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.12em] text-teal-700 dark:text-[#2dd4bf]">
          {article.tags.join(" · ")}
        </span>
        <h1 className="mb-4 font-serif text-[clamp(2rem,5vw,3.1rem)] font-normal leading-[1.15] text-foreground text-balance">
          {article.title}
        </h1>
        <p className="font-serif text-xl italic leading-snug text-muted-foreground text-pretty">
          {article.subtitle}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <SiegAvatar className="size-7" />
            <span className="font-medium text-foreground">Siegfried Bozza</span>
          </span>
          <span aria-hidden>·</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden>·</span>
          <span>{article.readingMinutes} min read</span>
          {project ? (
            <>
              <span aria-hidden>·</span>
              <Link
                href={project.links.page}
                className="inline-flex items-center gap-1 font-medium text-teal-700 underline-offset-4 hover:underline dark:text-[#2dd4bf]"
              >
                {project.title.h1} project page
                <MoveRightIcon className="size-4 shrink-0" />
              </Link>
            </>
          ) : null}
        </div>
      </header>

      <div className="post-prose prose prose-neutral max-w-none dark:prose-invert">
        {children}
      </div>

      <nav
        className="mt-16 flex flex-wrap gap-3 border-t border-border pt-8 dark:border-white/10"
        aria-label="Article links"
      >
        {footerLinks.map((item) => {
          const external = item.href.startsWith("http");
          return (
            <Link
              key={item.label}
              href={item.href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="rounded-md border border-teal-700/35 px-4 py-2 font-mono text-xs uppercase tracking-wide text-teal-700 transition-colors hover:bg-teal-500/10 dark:border-[#1a7a6e] dark:text-[#2dd4bf] dark:hover:bg-[rgba(45,212,191,0.1)]"
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </article>
  );
};
