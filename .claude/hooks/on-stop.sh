#!/usr/bin/env bash
# Stop: if TypeScript or MDX changed on this branch or in the working tree, the project must
# typecheck. On errors, block the stop and hand them to Claude; after 3 blocks in a row,
# let Claude stop so it can report instead.
set -uo pipefail

input=$(cat)
project="${CLAUDE_PROJECT_DIR:-$(pwd)}"
session=$(printf '%s' "$input" | jq -r '.session_id // "unknown"')
cwd=$(printf '%s' "$input" | jq -r '.cwd // empty')
counter="${TMPDIR:-/tmp}/portfolio-stop-${session}"
max_blocks=3

# Check the checkout the session works in (the hook input's cwd, which follows a cd): in a
# worktree under .claude/worktrees/, $CLAUDE_PROJECT_DIR is still the main checkout.
root="$project"
if [ -n "$cwd" ] && top=$(git -C "$cwd" rev-parse --show-toplevel 2>/dev/null) &&
  [ "$(git -C "$top" rev-parse --path-format=absolute --git-common-dir)" = \
    "$(git -C "$project" rev-parse --path-format=absolute --git-common-dir 2>/dev/null)" ]; then
  root="$top"
fi
cd "$root" || exit 0

base=$(git merge-base HEAD develop 2>/dev/null || git rev-parse HEAD)
changed=$(
  {
    git diff --name-only "$base"
    git ls-files --others --exclude-standard
  } | grep -E '\.(ts|tsx|mdx)$|(^|/)(package|tsconfig)\.json$' | sort -u
)

if [ -z "$changed" ]; then
  rm -f "$counter"
  exit 0
fi

# Route types under .next/types go stale when pages move; drop them before checking.
rm -rf .next/types .next/dev/types
if [ ! -x node_modules/.bin/tsc ]; then
  # A new worktree has no node_modules until pnpm install runs there.
  message="TypeScript is not installed in $root: run pnpm install there, then finish."
elif out=$(node_modules/.bin/tsc --noEmit -p . 2>&1); then
  rm -f "$counter"
  exit 0
else
  errors=$(printf '%s\n' "$out" | grep -E 'error TS' | head -n 40)
  [ -n "$errors" ] || errors=$(printf '%s\n' "$out" | tail -n 40)
  message="Fix these errors before finishing:
$errors"
fi

blocks=$(( $(cat "$counter" 2>/dev/null || echo 0) + 1 ))
if [ "$blocks" -gt "$max_blocks" ]; then
  rm -f "$counter"
  jq -n '{systemMessage: "Typecheck still fails after 3 attempts; stopping so Claude can report it."}'
  exit 0
fi
echo "$blocks" > "$counter"

jq -n --arg reason "Typecheck fails (attempt $blocks of $max_blocks). $message" '{decision: "block", reason: $reason}'
exit 0
