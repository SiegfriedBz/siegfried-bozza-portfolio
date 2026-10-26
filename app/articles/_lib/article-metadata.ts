import type { Metadata } from "next";
import { getArticle } from "@/app/_constants/articles";
import {
  DEFAULT_OG_IMAGES,
  SITE_NAME,
  toMetaDescription,
} from "@/app/_lib/site-metadata";

export const articleMetadata = (slug: string): Metadata => {
  const article = getArticle(slug);
  const images = article.cover
    ? [{ url: article.cover, alt: article.title }]
    : DEFAULT_OG_IMAGES;

  return {
    // Keep titles under ~60 characters for search results; drop the suffix when it won't fit.
    title:
      article.title.length + SITE_NAME.length + 3 <= 60
        ? `${article.title} | ${SITE_NAME}`
        : article.title,
    description: toMetaDescription(article.excerpt),
    keywords: [...article.tags, SITE_NAME],
    alternates: { canonical: article.href },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.subtitle,
      url: article.href,
      siteName: SITE_NAME,
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
