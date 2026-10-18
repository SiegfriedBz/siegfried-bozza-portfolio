import { ExternalLinkIcon, MoveRightIcon, NewspaperIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, FC } from "react";
import { LuGithub } from "react-icons/lu";
import { posterFor } from "@/app/_components/autoplay-video";
import { ProjectLinks } from "@/app/_components/project-links";
import { getStackRecord } from "@/app/_components/stack-badge";
import { TerminalCover } from "@/app/_components/terminal-cover";
import type { STACK } from "@/app/_constants/stack";
import type { Project } from "@/app/_types/project";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Tech named on a card; the full list (with logos) lives on the project page. */
const MAX_CHIPS = 6;

type Props = ComponentProps<typeof Card> & {
  project: Project;
};

export const ProjectCard: FC<Props> = (props) => {
  const { project, className, ...rest } = props;

  const { slug, title, description, images, videos, terminal, stack, links } =
    project;

  const [img] = images;
  const [video] = videos;

  const chips = stack.all
    .map((s) => getStackRecord(s as STACK)?.name)
    .filter((name): name is string => Boolean(name));
  const extra = chips.length - MAX_CHIPS;

  const linksTo = [
    {
      href: links.page,
      title: "Case study",
      icon: MoveRightIcon,
      as: Link,
    },
    ...(links.article
      ? [
          {
            href: links.article.href,
            title: "Article",
            icon: NewspaperIcon,
            as: Link,
          },
        ]
      : []),
    links.live
      ? {
          href: links.live,
          title: "Live demo",
          icon: ExternalLinkIcon,
          as: "a" as const,
        }
      : {
          href: links.github,
          title: "GitHub",
          icon: LuGithub,
          as: "a" as const,
        },
  ].filter((l) => l.href.trim().length > 0);

  return (
    <Card
      {...rest}
      className={cn(
        "group h-full gap-0 overflow-hidden bg-transparent p-0 text-left transition-colors hover:border-accent-blue/60",
        className,
      )}
    >
      <Link
        href={links.page}
        className="relative block aspect-video w-full overflow-hidden border-b border-border"
        tabIndex={-1}
        aria-hidden
      >
        {img ? (
          <Image
            src={img}
            fill
            alt=""
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : terminal ? (
          <TerminalCover
            title={terminal.title}
            lines={terminal.lines}
            className="rounded-none border-0"
          />
        ) : video ? (
          <Image
            src={posterFor(video)}
            fill
            alt=""
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
          />
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold tracking-tight">
            <Link
              href={links.page}
              className="hover:underline underline-offset-4"
            >
              {title.h1}
            </Link>
          </h3>
          <p className="text-sm font-medium text-muted-foreground">
            {title.short ?? title.h2}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-foreground/80">
          {description.short}
        </p>

        <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
          {chips.slice(0, MAX_CHIPS).map((name) => (
            <li
              key={`${slug}-${name}`}
              className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {name}
            </li>
          ))}
          {extra > 0 ? (
            <li className="px-1 py-0.5 font-mono text-[11px] text-muted-foreground">
              +{extra}
            </li>
          ) : null}
        </ul>

        <div className="mt-auto pt-2">
          <ProjectLinks links={linksTo} />
        </div>
      </div>
    </Card>
  );
};
