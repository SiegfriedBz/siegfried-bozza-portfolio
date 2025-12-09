import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, FC } from "react";
import { LuGithub } from "react-icons/lu";
import { ProjectCarousel } from "@/app/_components/project-carousel";
import { ProjectLinks } from "@/app/_components/project-links";
import { SiegAvatar } from "@/app/_components/sieg-avatar";
import { StackBadge } from "@/app/_components/stack-badge";
import { TextSplit } from "@/app/_components/text-split";
import { TypographyH1 } from "@/app/_components/typography/h1";
import { TypographyH2 } from "@/app/_components/typography/h2";
import { TypographyH3 } from "@/app/_components/typography/h3";
import { TypographyP } from "@/app/_components/typography/p";
import type { STACK } from "@/app/_constants/stack";
import type { Project } from "@/app/_types/project";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
    images,
    gifs,
    links,
  } = project;

  const linksTo = [
    {
      href: links.github,
      title: "Github",
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

  return (
    <div
      {...rest}
      className={cn(className, "z-10 flex flex-col justify-center gap-8")}
    >
      <TypographyH1 className="tracking-wider text-balance">
        {title.h1}
      </TypographyH1>
      <TypographyH2 className="-mt-4 tracking-wider text-balance">
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
      <ProjectCarousel images={[...images, ...gifs]} />

      {/* Overview */}
      <Card>
        <CardContent>
          <div className="text-left space-y-2">
            <TypographyH3>Overview</TypographyH3>
            <TypographyP>
              <TextSplit text={description.overview} />
            </TypographyP>
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
                    <span className="">{feat.description}</span>
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
            <TypographyH3>Technologies Used</TypographyH3>

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
                    <span className="">{stack.description}</span>
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
              <TextSplit text={challenges} />
            </TypographyP>
          </div>
        </CardContent>
      </Card>

      {/* Outcome */}
      <Card>
        <CardContent>
          <div className="text-left space-y-2">
            <TypographyH3>Outcome</TypographyH3>
            <TypographyP>
              <TextSplit text={outcome} />
            </TypographyP>
          </div>
        </CardContent>
      </Card>

      {/* ProjectLinks */}
      <ProjectLinks className="self-center" links={linksTo} />
    </div>
  );
};
