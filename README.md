# Siegfried Bozza — Portfolio (2026)

Personal site and digital resume: **Next.js 16**, **React 19**, **Tailwind CSS v4**, **motion**, **Mermaid**, **shadcn/ui**, **Biome**. Showcases six case studies (VeriSci, Wallet Watcher, BioVerify, Bet2Gether, Forge, GavL) with deep-dive project pages and long-form articles written in **MDX**.

**Live:** [siegfriedbozza.com](https://www.siegfriedbozza.com)


## Features

- Landing hero + featured projects grid  
- **About** — work experience (software + earlier career), education, skills badges, external links, CV (PDF)  
- **Projects** — per-slug detail pages with screenshot/video carousels, Mermaid diagrams, stack badges, honest limitations & roadmaps  
- **Articles** — index at `/articles`; MDX posts in `app/articles/(posts)/<slug>/content.mdx`, plus the bespoke BioVerify article  
- Dark / light theme, Vercel Analytics  

## Tech stack (this repo)

| Area | Packages |
|------|-----------|
| Framework | `next@16.4.2`, `react@19.3.1` |
| Styling | `tailwindcss@^4`, `tw-animate-css`, `class-variance-authority` |
| UI | Radix primitives, `lucide-react`, `embla-carousel-react` |
| Content | `@next/mdx` + `remark-gfm`, `sugar-high` (code), `mermaid@^11` (diagrams), `motion@^12` |
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

Screen recordings live in `public/projects/<slug>/videos/` as H.264 MP4 with a same-name `.jpg` poster. To add one from a GIF:

```bash
ffmpeg -i in.gif -an -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart \
  -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" out.mp4
ffmpeg -ss 1 -i out.mp4 -frames:v 1 -q:v 4 out.jpg
```

## Contact

- [LinkedIn](https://www.linkedin.com/in/siegfriedbozza)  
