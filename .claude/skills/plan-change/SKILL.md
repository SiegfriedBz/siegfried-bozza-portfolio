---
name: plan-change
description: Write a short numbered plan in docs/plans/ for a portfolio change (feature, content, design, SEO) and propose its branch. Use before any code or content is changed.
argument-hint: <change-name>
disable-model-invocation: true
---

Plan **$ARGUMENTS**. Plan only: change no code and create no branch.

1. Number it: list `docs/plans/` (create it if missing; it is gitignored), take the highest
   `NNN-*.md` and add 1, zero-padded to 3 digits. The file is
   `docs/plans/NNN-<change-name>.md`, kebab-case.
2. Read the root `CLAUDE.md`, `app/_lib/site-metadata.ts`, and the files the change touches.
3. Ask the user, all at once, whatever the code cannot settle: the goal, who it is for
   (recruiter, CTO, engineer), what is out of scope.
4. Fill in [TEMPLATE.md](TEMPLATE.md). Keep it short. The **Claims and sources** table is
   required whenever the change adds or edits content: one row per figure or factual claim,
   with where it was verified.
5. Propose one branch, `<type>/<slug>` from `develop` (`feat`, `fix`, `perf`, `chore`,
   `content`, `design`, `seo`), under 40 characters. If the change is really two concerns,
   propose two branches and two plans.
6. Show the plan path and a 3-line summary. Next: on the user's OK,
   `git switch -c <branch> develop`, do the work in small commits, then `/review-branch`.
