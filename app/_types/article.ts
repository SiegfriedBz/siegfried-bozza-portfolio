export type Article = {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  date: string;
  href: string;
  cover?: string;
  tags: string[];
  readingMinutes: number;
  relatedProjectSlug?: string;
};
