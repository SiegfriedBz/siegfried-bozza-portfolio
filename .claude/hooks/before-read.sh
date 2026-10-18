#!/usr/bin/env bash
# PreToolUse (Read|Grep): keep env files out of Claude's context (.env.example is fine).
set -uo pipefail

root="${CLAUDE_PROJECT_DIR:-$(pwd)}"
file=$(jq -r '.tool_input.file_path // .tool_input.path // empty')
[ -n "$file" ] || exit 0
rel="${file#"$root"/}"

case "$rel" in
  .env.example | */.env.example) ;;
  .env* | */.env*)
    jq -n --arg reason "$rel may hold secrets and is off limits. Read .env.example for the variable names." '{
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: $reason
      }
    }'
    ;;
esac

exit 0
