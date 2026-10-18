import { ExternalLinkIcon, MoveRightIcon, NewspaperIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, FC } from "react";
import { LuGithub } from "react-icons/lu";
import { ProjectLinks } from "@/app/_components/project-links";
import { StackBadge } from "@/app/_components/stack-badge";
import { TerminalCover } from "@/app/_components/terminal-cover";
import { TypographyH3 } from "@/app/_components/typography/h3";
import { TypographyH4 } from "@/app/_components/typography/h4";
import type { STACK } from "@/app/_constants/stack";
import type { Project } from "@/app/_types/project";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Props = ComponentProps<typeof Card> & {
  project: Project;
};

export const ProjectCard: FC<Props> = (props) => {
  const { project, className, ...rest } = props;

  const { slug, title, description, images, terminal, stack, links } = project;

  const [img] = images;

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
      className={cn("max-w-5xl mx-auto", className, "bg-transparent pt-0")}
    >
      <div className="flex flex-col gap-8">
        <CardContent className="relative w-full aspect-video rounded-xl overflow-hidden px-0">
          {img ? (
            <Image
              src={img}
              fill
              alt={`${title.h1} — screenshot`}
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
            />
          ) : terminal ? (
            <TerminalCover title={terminal.title} lines={terminal.lines} />
          ) : null}
        </CardContent>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 flex-1">
          <CardHeader>
            <CardTitle>
              <TypographyH3 className="tracking-wide text-balance text-left">
                {title.h1}
              </TypographyH3>
              <TypographyH4 className="tracking-wide text-balance text-left opacity-85">
                {title.h2}
              </TypographyH4>
            </CardTitle>
          </CardHeader>

          <div className="flex flex-col gap-4 px-6 ">
            <CardDescription className="text-left">
              {description.short}
            </CardDescription>

            <ul className="flex flex-wrap gap-2">
              {stack?.all?.map((s) => {
                return (
                  <li key={`${slug}-${s}`}>
                    <StackBadge stack={s as STACK} />
                  </li>
                );
              })}
            </ul>

            <Separator className="my-2" />
            <CardFooter className="self-center">
              <ProjectLinks links={linksTo} />
            </CardFooter>
          </div>
        </div>
      </div>
    </Card>
  );
};
