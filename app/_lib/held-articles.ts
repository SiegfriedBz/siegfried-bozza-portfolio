/**
 * Articles still being checked before release. The production deploy leaves them out
 * (pages 404, no links, not in the sitemap or llms.txt); local runs and Vercel preview
 * deploys show them, so they can be read in place. Empty this list to publish them.
 */
const HELD_ARTICLE_SLUGS: readonly string[] = ["labstrail", "wallet-watcher"];

const IS_PRODUCTION = process.env.VERCEL_ENV === "production";

export const isArticleHeld = (slug: string): boolean =>
  IS_PRODUCTION && HELD_ARTICLE_SLUGS.includes(slug);

/** Same check for an article link such as `/articles/labstrail`. */
export const isArticleHrefHeld = (href: string): boolean =>
  isArticleHeld(href.replace(/^\/articles\//, ""));
