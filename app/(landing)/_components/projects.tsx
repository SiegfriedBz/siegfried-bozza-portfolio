import type { FC } from "react";
import { PROJECTS } from "@/app/_constants/projects";
import { ProjectCard } from "./project-card";

export const Projects: FC = () => {
	return (
		<section className="py-8">
			<ul className="space-y-12">
				{PROJECTS.map((p) => {
					return (
						<li key={p.slug}>
							<ProjectCard project={p} />
						</li>
					);
				})}
			</ul>
		</section>
	);
};
