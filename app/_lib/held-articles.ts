/**
 * Articles still being checked before release. They show only in `pnpm dev` and on Vercel
 * preview deploys; everywhere else (production, a local `pnpm build`, or a build without
 * Vercel's system variables) they 404 and appear in no list, link, sitemap or llms.txt.
 * Empty this list to publish them.
 */
const HELD_ARTICLE_SLUGS: readonly string[] = ["labstrail"];

// Fails closed: held unless this is clearly a dev server or a Vercel preview.
const SHOW_HELD =
  process.env.NODE_ENV === "development" ||
  process.env.VERCEL_ENV === "preview";

export const isArticleHeld = (slug: string): boolean =>
  !SHOW_HELD && HELD_ARTICLE_SLUGS.includes(slug);

/** Same check for an article link such as `/articles/labstrail`. */
export const isArticleHrefHeld = (href: string): boolean =>
  isArticleHeld(href.replace(/^\/articles\//, ""));
