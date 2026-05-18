import { RichText } from "@/app/_components/rich-text";
import { TypographyH2 } from "@/app/_components/typography/h2";
import { TypographyH3 } from "@/app/_components/typography/h3";
import { PROJECTS } from "@/app/_constants/projects";
import type { FeaturedCategory, Project } from "@/app/_types/project";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";

const CATEGORY_ORDER: FeaturedCategory[] = [
  "Web3 Architecture & Coordination",
  "Smart Contract Patterns & Testing",
  "Full-Stack Web2",
];

const groupFeaturedProjects = () => {
  return CATEGORY_ORDER.map((category) => ({
    category,
    projects: PROJECTS.filter(
      (p): p is Project & { featured: NonNullable<Project["featured"]> } =>
        p.featured?.category === category,
    ),
  })).filter((g) => g.projects.length > 0);
};

export const FeaturedProjects = () => {
  const groups = groupFeaturedProjects();

  return (
    <>
      <TypographyH2 className="font-extrabold">Featured Projects</TypographyH2>
      <p className="mt-2 text-sm text-muted-foreground">
        Full-stack end-to-end case studies.
      </p>

      <div className="mt-6 flex flex-col gap-y-10">
        {groups.map((group) => (
          <div key={group.category} className="space-y-6">
            <TypographyH3 className="text-lg font-bold text-muted-foreground">
              {group.category}
            </TypographyH3>

            <ul className="flex flex-col gap-y-8">
              {group.projects.map((project) => {
                const pitch = project.title.short ?? project.title.h2;

                return (
                  <li key={project.slug} className="space-y-3">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-accent-blue">
                        {project.title.h1}: {pitch}
                        {project.featured.subtitle ? (
                          <span className="font-normal text-muted-foreground">
                            {" "}
                            ({project.featured.subtitle})
                          </span>
                        ) : null}
                      </span>
                    </div>

                    {project.featured.summary ? (
                      <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                        <RichText text={project.featured.summary} />
                      </p>
                    ) : null}

                    <ul className="list-outside list-disc space-y-2 ps-6 sm:ps-12">
                      {project.featured.bullets.map((bullet) => (
                        <li
                          key={`${project.slug}-${bullet.slice(0, 48)}`}
                          className="text-sm sm:text-base md:text-lg tracking-wide font-normal leading-relaxed"
                        >
                          <RichText text={bullet} />
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-col gap-y-1 ps-6 sm:ps-12">
                      <Link
                        href={project.links.page}
                        className="inline-flex items-center gap-1 text-sm font-medium text-accent-blue hover:underline"
                      >
                        View project
                        <MoveRightIcon className="size-4" />
                      </Link>

                      {project.links.article ? (
                        <Link
                          href={project.links.article.href}
                          className="inline-flex items-center gap-1 text-sm font-medium text-accent-blue hover:underline"
                        >
                          {project.links.article.label}
                          <MoveRightIcon className="size-4" />
                        </Link>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};
