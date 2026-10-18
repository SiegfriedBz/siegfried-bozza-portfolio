# Siegfried Bozza — Portfolio (2026)

Personal site and digital resume: **Next.js 16**, **React 19**, **Tailwind CSS v4**, **motion**, **Mermaid**, **shadcn/ui**, **Biome**. Showcases four full-stack case studies (BioVerify, Bet2Gether, Forge, GavL) with deep-dive project pages and a long-form **BioVerify** article.

**Live:** [siegfriedbozza.com](https://www.siegfriedbozza.com)


## Features

- Landing hero + featured projects grid  
- **About** — work experience (software + earlier career), education, skills badges, external links, CV (PDF)  
- **Projects** — per-slug detail pages with carousels, Mermaid diagrams, stack badges, honest limitations & roadmaps  
- **Articles** — index at `/articles` + BioVerify architecture article at `/articles/bioverify`  
- Dark / light theme, Vercel Analytics  

## Tech stack (this repo)

| Area | Packages |
|------|-----------|
| Framework | `next@16.0.7`, `react@19.2.0` |
| Styling | `tailwindcss@^4`, `tw-animate-css`, `class-variance-authority` |
| UI | Radix primitives, `lucide-react`, `embla-carousel-react` |
| Content | `mermaid@^11` (diagrams), `motion@^12` |
| Quality | `@biomejs/biome@^2.3`, TypeScript 5 |

## Local development

```bash
pnpm install
cp .env.example .env.local   # optional — public links live in app/_constants
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm build
pnpm start
```

## Deployment

Configured for **Vercel**. Public URLs (profiles, demos, repos) are hardcoded in `app/_constants`, so no env vars are required; see `.env.example` for the optional ones.

## Contact

- [LinkedIn](https://www.linkedin.com/in/siegfriedbozza)  
