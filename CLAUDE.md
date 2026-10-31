# siegfried-bozza-portfolio

Siegfried Bozza's portfolio: Next.js 16 (App Router), React 19, Tailwind CSS v4, shadcn/ui,
Geist fonts, Mermaid, Biome. Deployed on Vercel at https://www.siegfriedbozza.com from `main`.
The repo is public and recruiters read it, so the code and the content are both on show.

Read `README.md` for setup.

## Commands

| Command | Use |
| --- | --- |
| `pnpm dev` | Dev server (Turbopack) |
| `pnpm check` | Biome on the files changed since `develop` |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm build` | Production build (webpack), the same one Vercel runs |

Toolchain: pnpm 10.34.6, pinned by `packageManager` in `package.json` (proto and Corepack
read it). If proto reports the version is missing, ask the user to run
`proto install pnpm 10.34.6`; do not work around it.

## Where things live

- **Positioning** (role, pitch, stack, availability, short bio): `app/_lib/site-metadata.ts`.
  The hero, the About header, page metadata, JSON-LD, llms.txt and the OG image read it. The
  About prose (`app/about/_components/self-intro.tsx`) says the same things in sentences, so
  update it too. When it changes, the CV (a separate HTML source, outside the repo) and the
  GitHub/LinkedIn copy must change as well: say so in the PR.
- **Content**: `app/_constants/` (projects and `project-entries/`, work experience,
  education, articles, links). Public URLs are hardcoded there, never read from env vars.
- **Stack**: `app/_constants/stack.ts`. The `STACK` enum's order is the display order on
  cards, project pages and About: the core stack (`CORE_STACK` order), then protocols and
  platforms, libraries, testing. A new technology goes in its group and gets a name and mark
  in `stackMap` (`app/_components/stack-tile.tsx`).
- **Logos**: `public/logos/`, one single-colour mark per technology (opaque shape on
  transparent), painted in the text colour through a CSS mask. From Simple Icons (CC0) as
  published, else the project's own mark reduced to one colour, with its source noted in
  `stack-tile.tsx`.
- **Articles**: `app/articles/(posts)/<slug>/content.mdx` plus a small `page.tsx`. MDX rules:
  no frontmatter, imports or exports; only `<TLDR>` and `<Callout title>` as components;
  diagrams as ```` ```mermaid ```` fences; no HTML comments and no bare `<`, `{` or `}` in
  prose. When an article's text changes, set its `updated` field (`app/_constants/articles.ts`)
  to that commit's date.
- **Media**: screen recordings are MP4 with a same-name `.jpg` poster in
  `public/projects/<slug>/videos/` (README has the ffmpeg commands). Never commit GIFs.
  Screenshots go through `next/image` with a `sizes` prop. Every carousel image and video gets
  a `mediaAlt` entry in its project, keyed by its path, that says what it shows (watch a video
  to the end, not only its poster).

## Content rules

The reviewer agent checks these on every branch:

- Every figure or claim must be verifiable: test counts from a real run, dates from the
  project's git history, metrics from the code or the chain, links that resolve. No invented
  numbers.
- Say what is testnet, early or limited; keep the "Known limitations" sections honest.
  Testnet-only projects set `testnet: true` (the badge on their page); the testnet wording in
  `site-metadata.ts`, the hero, About, `/projects` and llms.txt is written by hand, so update it
  if a project goes to mainnet.
- Pages agree with each other: About, project pages, articles, README and the CV tell the
  same story (dates, chains, roles).
- Voice: plain, specific, first person. Avoid AI-writing tells (staged "not X but Y"
  contrasts, forced triads, dash-heavy sentences, hype words).

## Workflow

1. `/plan-change <name>` writes `docs/plans/NNN-<name>.md` (gitignored) and proposes a
   branch.
2. Work on that branch, never on `develop` or `main` (a hook refuses edits there), in small
   commits.
3. `/review-branch` runs the checks and the build, then the read-only reviewer, and drafts
   the PR.

Branches: `<type>/<slug>` from `develop` (`feat`, `fix`, `perf`, `chore`, `content`,
`design`, `seo`). PRs target `develop`; `develop` → `main` releases to production.

## Git

- Commit messages: `type(scope): summary` (imperative, lowercase, ≤ 72 characters); the
  body says why.
- `git commit` asks first. Never push, force-push or rewrite pushed history: the user
  pushes and opens PRs.

## Hooks (`.claude/hooks`)

- Before an edit: refused on `develop`/`main` (create a branch first), and for generated or
  secret files (`pnpm-lock.yaml`, `.next/`, `next-env.d.ts`, `.env*` except `.env.example`).
- After an edit: Biome `check --write` on the file. Fix what it reports in the same turn.
- Env files other than `.env.example` are blocked for Read and Grep.
- On stop: if TypeScript or MDX changed on the branch, `pnpm typecheck` must pass, or the
  stop is blocked with the errors (three attempts, then report instead).
- The hooks need `jq` and only see the Edit, Write, Read and Grep tools. Shell commands are
  not checked, so do not edit files through the shell on `develop` or `main` either.
