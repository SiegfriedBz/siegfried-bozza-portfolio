import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { FC } from "react";
import { JsonLd } from "@/app/_components/json-ld";
import { BIOVERIFY_ARTICLE_HERO, PROJECTS } from "@/app/_constants/projects";
import {
  breadcrumbNode,
  personNode,
  projectNode,
  websiteNode,
} from "@/app/_lib/json-ld";
import {
  DEFAULT_OG_IMAGES,
  SITE_NAME,
  toMetaDescription,
} from "@/app/_lib/site-metadata";
import { ProjectDetails } from "./_components/project-details";

type Params = { slug: string };

export async function generateStaticParams() {
  return PROJECTS.map((p) => {
    return { slug: p.slug };
  });
}

// Unknown slugs get the prerendered 404 page instead of a page rendered on demand.
export const dynamicParams = false;

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

  const title = project.title.meta
    ? `${project.title.h1}: ${project.title.meta} | ${SITE_NAME}`
    : `${project.title.h1} | ${SITE_NAME}`;
  const description =
    project.description.meta ?? toMetaDescription(project.description.short);
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
      siteName: SITE_NAME,
      type: "website",
      images: ogImage
        ? [{ url: ogImage, alt: project.title.h1 }]
        : DEFAULT_OG_IMAGES,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : DEFAULT_OG_IMAGES.map((i) => i.url),
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
    // Full width under the layout's items-center, so the page column never shrinks to its content.
    <div className="flex w-full flex-col gap-8">
      <JsonLd
        nodes={[
          personNode(),
          websiteNode(),
          projectNode(slug),
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.title.h1 },
          ]),
        ]}
      />
      <ProjectDetails project={project} />
    </div>
  );
};

export default Page;
