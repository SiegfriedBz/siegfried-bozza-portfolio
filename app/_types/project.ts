import type { IconName } from "@/app/_constants/icons";

export type FeaturedCategory =
  | "Web3 Architecture & Coordination"
  | "Smart Contract Patterns & Testing"
  | "Full-Stack Web2";

export type Project = {
  slug: string;
  /** Human-facing build window, e.g. "Mar–Apr 2026" (badge) */
  constructionPeriod: string;
  title: {
    h1: string;
    h2: string;
    /** Punchy pitch for about page; falls back to title.h2 when omitted */
    short?: string;
  };
  description: {
    short: string;
    /** Business-context lead-in for project detail pages (markdown **bold** supported) */
    problem?: string;
    solution?: string;
    overview: string;
  };

  features: {
    key: string;
    description: string;
  }[];

  challenges: string;
  outcome: string;
  /** Quantified bullets rendered under Outcome (RichText / **bold** supported) */
  outcomeMetrics?: string[];
  transferablePatterns?: string;

  /** Honest backlog / edge cases (RichText bullets) */
  limitations?: string[];
  /** Planned extensions (RichText bullets) */
  roadmap?: string[];

  stack: {
    all: string[];
    main: {
      key: string;
      description: string;
    }[];
  };

  /** Single curated architecture diagram (Mermaid), sourced from each repo README */
  diagram?: {
    title: string;
    caption?: string;
    definition: string;
  };

  images: string[];
  gifs: string[];

  links: {
    page: string;
    live: string;
    github: string;
    /** Open Graph / article hero image (absolute URL); optional, BioVerify article only */
    ogImage?: string;
    /** README architecture deep-link; optional, BioVerify article only */
    architectureDoc?: string;
    /** Long-form article: URL + display label + theme icon. Optional. */
    article?: {
      href: string;
      label: string;
      iconName: IconName;
    };
  };

  featured?: {
    category: FeaturedCategory;
    subtitle?: string;
    /** About-page blurb (1–2 sentences); distinct from detail `description.problem` / `solution` */
    summary?: string;
    bullets: string[];
  };
};
