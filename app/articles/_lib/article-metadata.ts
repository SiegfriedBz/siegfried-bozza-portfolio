import type { Metadata } from "next";
import { getArticle } from "@/app/_constants/articles";
import { DEFAULT_OG_IMAGES, SITE_NAME } from "@/app/_lib/site-metadata";

export const articleMetadata = (slug: string): Metadata => {
  const article = getArticle(slug);
  const images = article.cover
    ? [{ url: article.cover, alt: article.title }]
    : DEFAULT_OG_IMAGES;

  return {
    title: `${article.title} | ${SITE_NAME}`,
    description: article.excerpt.slice(0, 160),
    keywords: [...article.tags, SITE_NAME],
    alternates: { canonical: article.href },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.subtitle,
      url: article.href,
      publishedTime: article.date,
      authors: [SITE_NAME],
      tags: article.tags,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.subtitle,
      images: images.map((i) => i.url),
    },
  };
};
