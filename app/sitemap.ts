import { ARTICLES } from "@/app/_constants/articles";
import { PROJECTS } from "@/app/_constants/projects";
import { SITE_URL } from "@/app/_lib/site-metadata";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/projects`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/articles`, changeFrequency: "monthly", priority: 0.8 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${base}${p.links.page}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${base}${a.href}`,
    changeFrequency: "monthly" as const,
    priority: 0.85,
    lastModified: a.date,
  }));

  return [...staticRoutes, ...projectRoutes, ...articleRoutes];
}
