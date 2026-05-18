import { ProjectCarousel } from "@/app/_components/project-carousel";
import { ProjectLinks } from "@/app/_components/project-links";
import { RichText } from "@/app/_components/rich-text";
import { SiegAvatar } from "@/app/_components/sieg-avatar";
import { StackBadge } from "@/app/_components/stack-badge";
import { TypographyH1 } from "@/app/_components/typography/h1";
import { TypographyH2 } from "@/app/_components/typography/h2";
import { TypographyH3 } from "@/app/_components/typography/h3";
import { TypographyP } from "@/app/_components/typography/p";
import type { STACK } from "@/app/_constants/stack";
import type { Project } from "@/app/_types/project";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon, Newspaper } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, FC } from "react";
import { LuGithub } from "react-icons/lu";
import { ProjectDiagramCard } from "./project-diagram-card";

type Props = ComponentProps<"div"> & { project: Project };

export const ProjectDetails: FC<Props> = (props) => {
  const { project, className, ...rest } = props;

  const {
    title,
    description,
    features,
    stack,
    challenges,
    outcome,
    outcomeMetrics,
    transferablePatterns,
    limitations,
    roadmap,
    diagram,
    constructionPeriod,
    images,
    gifs,
    links,
  } = project;

  const rawLinks = [
    ...(links.article
      ? [
          {
            href: links.article.href,
            title: "Article",
            icon: Newspaper,
            as: Link,
          },
        ]
      : []),
    {
      href: links.github,
      title: "GitHub",
      icon: LuGithub,
      as: "a" as const,
    },
    {
      href: links.live,
      title: "Live",
      icon: ExternalLinkIcon,
      as: "a" as const,
    },
  ];

  const linksTo = rawLinks.filter((l) => l.href.trim().length > 0);

  return (
    <div
      {...rest}
      className={cn(className, "z-10 flex flex-col justify-center gap-8")}
    >
      <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-center sm:gap-x-3">
        <TypographyH1 className="w-full max-w-prose tracking-wider text-balance sm:w-auto">
          {title.h1}
        </TypographyH1>
        <Badge className="w-fit shrink-0 font-normal" variant="outline">
          Built {constructionPeriod}
        </Badge>
      </div>
      <TypographyH2 className="-mt-2 text-center tracking-wider text-balance sm:-mt-4">
        {title.h2}
      </TypographyH2>

      {/* Avatar */}
      <div className="flex justify-center items-center gap-x-6 sm:gap-x-8 mb-4">
        <SiegAvatar />
        <span className="text-accent-blue font-bold">Siegfried Bozza</span>
      </div>

      {/* ProjectLinks */}
      <ProjectLinks className="self-center" links={linksTo} />

      {/* Carousel */}
      <ProjectCarousel images={[...images, ...gifs]} projectName={title.h1} />

      {diagram ? (
        <ProjectDiagramCard
          caption={diagram.caption}
          definition={diagram.definition}
          diagramId={project.slug}
          title={diagram.title}
        />
      ) : null}

      {/* Overview */}
      <Card>
        <CardContent>
          <div className="text-left space-y-6">
            <TypographyH3>Overview</TypographyH3>
            {description.problem ? (
              <TypographyP>
                <RichText text={description.problem} />
              </TypographyP>
            ) : null}
            {description.solution ? (
              <TypographyP>
                <RichText text={description.solution} />
              </TypographyP>
            ) : null}
            <div className="space-y-2">
              {description.problem || description.solution ? (
                <p className="font-semibold">Technical Architecture</p>
              ) : null}
              <TypographyP>
                <RichText text={description.overview} />
              </TypographyP>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key features */}
      <Card>
        <CardContent>
          <div className="text-left space-y-4">
            <TypographyH3>Key features</TypographyH3>
            <ul className="pl-4 space-y-2">
              {features.map((feat) => {
                return (
                  <li key={feat.key} className="list-disc pl-2">
                    <span className="font-bold">{feat.key}</span>:{" "}
                    <RichText text={feat.description} />
                  </li>
                );
              })}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Technologies Used */}
      <Card>
        <CardContent>
          <div className="text-left space-y-8">
            <div className="text-left space-y-4">
              <TypographyH3>Technologies Used</TypographyH3>
              <CardDescription className="text-left">
                <RichText text={description.short} />
              </CardDescription>
            </div>

            <ul className="flex flex-wrap gap-2">
              {stack?.all?.map((s) => {
                return (
                  <li key={`${title}-${s}`}>
                    <StackBadge stack={s as STACK} />
                  </li>
                );
              })}
            </ul>

            <ul className="pl-4 space-y-2">
              {stack?.main?.map((stack) => {
                return (
                  <li key={stack.key} className="list-disc pl-2">
                    <span className="font-bold">{stack.key}</span>:{" "}
                    <RichText text={stack.description} />
                  </li>
                );
              })}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Challenges and Learnings */}
      <Card>
        <CardContent>
          <div className="text-left space-y-2">
            <TypographyH3>Challenges and Learnings</TypographyH3>
            <TypographyP>
              <RichText text={challenges} />
            </TypographyP>
          </div>
        </CardContent>
      </Card>

      {/* Outcome */}
      <Card>
        <CardContent>
          <div className="text-left space-y-4">
            <TypographyH3>Outcome</TypographyH3>
            <TypographyP>
              <RichText text={outcome} />
            </TypographyP>
            {outcomeMetrics && outcomeMetrics.length > 0 ? (
              <div className="space-y-2">
                <p className="font-semibold">Key Metrics</p>
                <ul className="list-disc space-y-2 pl-6">
                  {outcomeMetrics.map((metric, idx) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: static list from CMS constant
                    <li key={idx}>
                      <RichText text={metric} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {transferablePatterns ? (
              <p className="text-muted-foreground italic">
                <span className="font-semibold not-italic text-foreground">
                  Transferable patterns:{" "}
                </span>
                <RichText text={transferablePatterns} />
              </p>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {limitations && limitations.length > 0 ? (
        <Card>
          <CardContent>
            <div className="text-left space-y-4">
              <TypographyH3>Known limitations</TypographyH3>
              <ul className="list-disc space-y-2 pl-6">
                {limitations.map((item, idx) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static list from CMS constant
                  <li key={idx}>
                    <RichText text={item} />
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {roadmap && roadmap.length > 0 ? (
        <Card>
          <CardContent>
            <div className="text-left space-y-4">
              <TypographyH3>Roadmap</TypographyH3>
              <ul className="list-disc space-y-2 pl-6">
                {roadmap.map((item, idx) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static list from CMS constant
                  <li key={idx}>
                    <RichText text={item} />
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* ProjectLinks */}
      <ProjectLinks className="self-center" links={linksTo} />
    </div>
  );
};
