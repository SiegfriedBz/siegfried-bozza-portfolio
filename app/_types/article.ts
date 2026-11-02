export type Article = {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  date: string;
  /** Last text change (from git), when later than `date`: JSON-LD dateModified, og modified_time, sitemap lastmod. */
  updated?: string;
  href: string;
  cover?: string;
  tags: string[];
  readingMinutes: number;
  relatedProjectSlug?: string;
};
