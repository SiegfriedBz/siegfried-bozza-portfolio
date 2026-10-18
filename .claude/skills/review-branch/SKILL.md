---
name: review-branch
description: Run the checks and the production build, review the current branch against develop with the read-only reviewer subagent, block on failures or Content/Docs findings, then draft the PR. Use when a branch is ready for a PR.
disable-model-invocation: true
---

1. Base: `develop` (`main` for a release branch). Find the plan in `docs/plans/` if the
   branch has one. Refuse to run on `develop` or `main` themselves.
2. From a clean working tree, run what CI runs: `pnpm check`, `pnpm typecheck`,
   `pnpm build`. If one fails, stop: show the command and its error, and do not go on.
3. If the branch changes anything a visitor sees, run `pnpm build && pnpm start` and look
   at the changed pages in light and dark, desktop and 390 px wide, with the console open.
   Report what you saw.
4. Run the **reviewer** subagent on the diff and the plan. It reports and edits nothing.
5. Show its findings, most severe first, by section (Code, Content, Media and SEO, Docs),
   then its **Sources checked**. Any **Content** or **Docs** finding blocks the PR: list
   what to fix and stop.
6. Otherwise draft the PR:
   - **Title** = the squash commit, `type(scope): summary`, at most 72 characters.
   - **Body**: Summary, Changes, How to verify, Checklist (the plan's Done when). One line
     per paragraph or bullet, no hard wraps.
   - End with `Built with Claude Code`. Base `develop`; squash and merge.
7. Remind the user that pushing and opening the PR are theirs.
