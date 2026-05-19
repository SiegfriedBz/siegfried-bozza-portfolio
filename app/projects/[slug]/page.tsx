import { BIOVERIFY_ARTICLE_HERO, PROJECTS } from "@/app/_constants/projects";
import { SITE_NAME } from "@/app/_lib/site-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { FC } from "react";
import { ProjectDetails } from "./_components/project-details";

type Params = { slug: string };

export async function generateStaticParams() {
  return PROJECTS.map((p) => {
    return { slug: p.slug };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return { title: `Project | ${SITE_NAME}` };
  }

  const title = `${project.title.h1} | ${SITE_NAME}`;
  const description = project.description.short.slice(0, 160);
  const ogImage =
    project.links.ogImage?.trim() ||
    project.images[0] ||
    (slug === "bioverify" ? BIOVERIFY_ARTICLE_HERO : undefined);

  return {
    title,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title,
      description,
      url: `/projects/${slug}`,
      ...(ogImage ? { images: [{ url: ogImage, alt: project.title.h1 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

type Props = {
  params: Promise<Params>;
};

const Page: FC<Props> = async (props) => {
  const { slug } = await props.params;

  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return notFound();
  }

  return (
    <main className="flex flex-col gap-8">
      <ProjectDetails project={project} />
    </main>
  );
};

export default Page;
