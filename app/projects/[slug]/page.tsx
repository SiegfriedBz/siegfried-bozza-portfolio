import { PROJECTS } from "@/app/_constants/projects";
import { notFound } from "next/navigation";
import { FC } from "react";
import { ProjectDetails } from "./_components/project-details";

type Params = { slug: string };

export async function generateStaticParams() {
	return PROJECTS.map(p => {
		return { slug: p.slug }
	})
}

type Props = {
  params: Promise<Params>;
};

const Page: FC<Props> = async (props) => {
  const { slug } = await props.params;

	const project = PROJECTS.find(p => p.slug === slug)

	if(!project) {
		return notFound()
	}
	
	return <main className="flex flex-col gap-8">
		<ProjectDetails project={project} />
	</main>;
}


export default Page
