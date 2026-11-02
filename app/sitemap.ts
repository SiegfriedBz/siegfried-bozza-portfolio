import type { MetadataRoute } from "next";
import { ARTICLES } from "@/app/_constants/articles";
import { PROJECTS } from "@/app/_constants/projects";
import { SITE_LAST_UPDATED, SITE_URL } from "@/app/_lib/site-metadata";

// Google ignores changeFrequency and priority; lastModified is what it uses.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    "/",
    "/about",
    "/projects",
    "/articles",
  ].map((path) => ({ url: `${base}${path}`, lastModified: SITE_LAST_UPDATED }));

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${base}${p.links.page}`,
    lastModified: SITE_LAST_UPDATED,
  }));

  const articleRoutes: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${base}${a.href}`,
    lastModified: a.updated ?? a.date,
  }));

  return [...staticRoutes, ...projectRoutes, ...articleRoutes];
}
