#!/usr/bin/env bash
# PostToolUse (Edit|Write): format and lint the file Claude just edited.
# Exit 2 sends stderr back to Claude in the same turn; exit 0 means nothing to report.
set -uo pipefail

root="${CLAUDE_PROJECT_DIR:-$(pwd)}"
file=$(jq -r '.tool_input.file_path // empty')

[ -n "$file" ] && [ -f "$file" ] || exit 0
case "$file" in
  "$root"/*) rel="${file#"$root"/}" ;;
  *) exit 0 ;;
esac

cd "$root" || exit 0

case "$rel" in
  *.ts | *.tsx | *.js | *.mjs | *.json | *.jsonc | *.css)
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
