#!/usr/bin/env bash
# Stop: if TypeScript or MDX changed on this branch or in the working tree, the project must
# typecheck. On errors, block the stop and hand them to Claude; after 3 blocks in a row,
# let Claude stop so it can report instead.
set -uo pipefail

root="${CLAUDE_PROJECT_DIR:-$(pwd)}"
cd "$root" || exit 0
session=$(jq -r '.session_id // "unknown"')
counter="${TMPDIR:-/tmp}/portfolio-stop-${session}"
max_blocks=3

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
if out=$(node_modules/.bin/tsc --noEmit -p . 2>&1); then
  rm -f "$counter"
  exit 0
fi

blocks=$(( $(cat "$counter" 2>/dev/null || echo 0) + 1 ))
if [ "$blocks" -gt "$max_blocks" ]; then
  rm -f "$counter"
  jq -n '{systemMessage: "Typecheck still fails after 3 attempts; stopping so Claude can report it."}'
  exit 0
fi
echo "$blocks" > "$counter"

errors=$(printf '%s\n' "$out" | grep -E 'error TS' | head -n 40)
[ -n "$errors" ] || errors=$(printf '%s\n' "$out" | tail -n 40)

jq -n --arg reason "Typecheck fails (attempt $blocks of $max_blocks). Fix these errors before finishing:
$errors" '{decision: "block", reason: $reason}'
exit 0
