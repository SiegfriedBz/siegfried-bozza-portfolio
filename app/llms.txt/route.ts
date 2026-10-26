import { ARTICLES } from "@/app/_constants/articles";
import { PROFILE_LINKS } from "@/app/_constants/links";
import { PROJECTS } from "@/app/_constants/projects";
import { abs } from "@/app/_lib/json-ld";
import { PERSON_SUMMARY, SITE_NAME } from "@/app/_lib/site-metadata";

export const dynamic = "force-static";

/** /llms.txt: a plain-text map of the site for AI assistants, built from the content constants. */
export function GET() {
  const plain = (s: string) => s.replace(/\*\*/g, "");
  const body = [
    `# ${SITE_NAME}`,
    "",
    `> ${PERSON_SUMMARY}`,
    "",
    "## Projects",
    ...PROJECTS.map(
      (p) =>
        `- [${p.title.h1}](${abs(p.links.page)}): ${plain(p.description.short)}`,
    ),
    "",
    "## Articles",
    ...ARTICLES.map(
      (a) => `- [${a.title}](${abs(a.href)}): ${plain(a.excerpt)}`,
    ),
    "",
    "## Profiles",
    `- [About](${abs("/about")})`,
    `- [GitHub](${PROFILE_LINKS.github})`,
    `- [LinkedIn](${PROFILE_LINKS.linkedin})`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
