export type Article = {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  date: string;
  /** Last content change (from git), when later than `date`: dateModified and sitemap lastmod. */
  updated?: string;
  href: string;
  cover?: string;
  tags: string[];
  readingMinutes: number;
  relatedProjectSlug?: string;
};
