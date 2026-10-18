import { ARTICLES } from "@/app/_constants/articles";
import { EDUCATION } from "@/app/_constants/education";
import { PROFILE_LINKS } from "@/app/_constants/links";
import { PROJECTS } from "@/app/_constants/projects";
import { WORK_EXPERIENCE } from "@/app/_constants/work-xp";
import {
  ROLE,
  SITE_DESCRIPTION_SHORT,
  SITE_NAME,
  SITE_URL,
} from "@/app/_lib/site-metadata";

/**
 * Schema.org builders for JSON-LD. Everything is derived from the content constants,
 * so structured data cannot drift from what the pages show.
 */

const base = SITE_URL.replace(/\/$/, "");

/** Absolute URL for a site path (JSON-LD requires absolute URLs). */
export const abs = (path: string) =>
  path.startsWith("http") ? path : `${base}${path}`;

export const PERSON_ID = `${base}/#person`;
export const WEBSITE_ID = `${base}/#website`;

/** Curated topics (not the meta keywords, which include the name and "remote"). */
const KNOWS_ABOUT = [
  "TypeScript",
  "Solidity",
  "Node.js",
  "Next.js",
  "Smart contracts",
  "Foundry",
  "Chainlink",
  "viem",
  "Event-driven architecture",
  "CQRS",
  "Decentralized science (DeSci)",
  "OriginTrail DKG",
  "AI agents",
  "LangGraph",
];

type Node = Record<string, unknown>;

export const personNode = (): Node => {
  const current = WORK_EXPERIENCE.find((w) => w.to === "Present");
  const schools = [...new Set(EDUCATION.map((e) => e.institution))];

  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE_NAME,
    jobTitle: ROLE,
    description: SITE_DESCRIPTION_SHORT,
    url: `${base}/`,
    image: abs("/images/avatar.png"),
    sameAs: [PROFILE_LINKS.github, PROFILE_LINKS.linkedin],
    ...(current
      ? { worksFor: { "@type": "Organization", name: current.company } }
      : {}),
    knowsAbout: KNOWS_ABOUT,
    alumniOf: schools.map((name) => ({
      "@type": "EducationalOrganization",
      name,
    })),
  };
};

export const websiteNode = (): Node => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${base}/`,
  name: SITE_NAME,
  alternateName: `${SITE_NAME}, ${ROLE}`,
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
});

export const profilePageNode = (): Node => ({
  "@type": "ProfilePage",
  "@id": `${base}/about#webpage`,
  url: `${base}/about`,
  name: `About ${SITE_NAME}`,
  isPartOf: { "@id": WEBSITE_ID },
  mainEntity: { "@id": PERSON_ID },
  inLanguage: "en",
});

export const articleNode = (slug: string): Node => {
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) throw new Error(`Unknown article slug: ${slug}`);
  const url = abs(article.href);

  return {
    "@type": "TechArticle",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: article.title,
    alternativeHeadline: article.subtitle,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    image: [abs(article.cover ?? "/opengraph-image")],
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
    keywords: article.tags,
    inLanguage: "en",
    ...(article.relatedProjectSlug
      ? {
          about: {
            "@id": `${abs(`/projects/${article.relatedProjectSlug}`)}#code`,
          },
        }
      : {}),
  };
};

export const projectNode = (slug: string): Node => {
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) throw new Error(`Unknown project slug: ${slug}`);
  const url = abs(project.links.page);
  const [image] = project.images;

  return {
    "@type": "SoftwareSourceCode",
    "@id": `${url}#code`,
    name: project.title.h1,
    description: project.description.short,
    url,
    mainEntityOfPage: url,
    ...(project.links.github ? { codeRepository: project.links.github } : {}),
    programmingLanguage: project.languages,
    author: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
    ...(image ? { image: abs(image) } : {}),
    ...(project.links.article
      ? { subjectOf: { "@id": `${abs(project.links.article.href)}#article` } }
      : {}),
  };
};

/** Breadcrumb trail; the last item (the current page) has no `item` URL. */
export const breadcrumbNode = (trail: { name: string; path?: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    ...(t.path ? { item: abs(t.path) } : {}),
  })),
});
