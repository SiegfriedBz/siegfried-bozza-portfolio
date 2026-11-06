#!/usr/bin/env bash
# PostToolUse (Edit|Write): format and lint the file Claude just edited.
# Exit 2 sends stderr back to Claude in the same turn; exit 0 means nothing to report.
set -uo pipefail

project="${CLAUDE_PROJECT_DIR:-$(pwd)}"
file=$(jq -r '.tool_input.file_path // empty')

[ -n "$file" ] && [ -f "$file" ] || exit 0

# Run Biome in the checkout that holds the file: a worktree under .claude/worktrees/ has its
# own biome.json and node_modules, while the hooks still run from the main checkout.
dir=$(dirname "$file")
common=$(git -C "$dir" rev-parse --path-format=absolute --git-common-dir 2>/dev/null)
if [ -n "$common" ]; then
  [ "$common" = "$(git -C "$project" rev-parse --path-format=absolute --git-common-dir 2>/dev/null)" ] ||
    exit 0 # another repository
  root=$(git -C "$dir" rev-parse --show-toplevel 2>/dev/null) || exit 0 # e.g. a file in .git/
  rel="$(git -C "$dir" rev-parse --show-prefix)${file##*/}"
else
  # Git could not answer (too old, or an unsafe directory): run from the project folder.
  case "$file" in
    "$project"/*) root="$project" rel="${file#"$project"/}" ;;
    *) exit 0 ;; # outside the repo
  esac
fi

cd "$root" || exit 0

case "$rel" in
  *.ts | *.tsx | *.js | *.mjs | *.json | *.jsonc | *.css)
    if [ ! -x node_modules/.bin/biome ]; then
      printf '%s: Biome is not installed in %s. Run pnpm install there, then pnpm exec biome check --write %s.\n' "$rel" "$root" "$rel" >&2
      exit 2
    fi
    if ! out=$(node_modules/.bin/biome check --write --no-errors-on-unmatched "$rel" 2>&1); then
      printf 'Biome found problems it cannot fix in %s:\n%s\n' "$rel" "$out" >&2
      exit 2
    fi
    ;;
  *.gif)
    printf '%s: GIFs are not committed here. Convert it to MP4 + a .jpg poster (README → Deployment).\n' "$rel" >&2
    exit 2
    ;;
esac

exit 0
