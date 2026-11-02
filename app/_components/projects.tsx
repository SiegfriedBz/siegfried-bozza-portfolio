import type { FC } from "react";
import { PROJECTS } from "@/app/_constants/projects";
import { ProjectCard } from "../(landing)/_components/project-card";

type Props = {
  /** Optional section heading (the landing page shows one; /projects has its own H1). */
  heading?: string;
};

export const Projects: FC<Props> = ({ heading }) => {
  return (
    <section
      className="w-full py-8"
      aria-labelledby={heading ? "projects-heading" : undefined}
    >
      {heading ? (
        <h2
          id="projects-heading"
          className="mb-8 text-left text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {heading}
        </h2>
      ) : null}
      <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {PROJECTS.map((p, index) => (
          <li key={p.slug}>
            <ProjectCard
              project={p}
              titleAs={heading ? "h3" : "h2"}
              // On /projects the first card is above the fold; on the landing page the hero is.
              eagerImage={!heading && index === 0}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
