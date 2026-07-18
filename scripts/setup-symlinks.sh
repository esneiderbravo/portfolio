#!/usr/bin/env bash
# Sets up directory-level symlinks from tool config dirs to ai-specs/.
#
# ALWAYS creates the four tool dirs (.agents, .claude, .codex, .cursor) and
# links EVERY top-level directory of ai-specs/ into each of them. Because the
# links are directory-level, files added inside an existing ai-specs folder
# are picked up with no action; re-run this script only when a NEW top-level
# folder is added to ai-specs/.
#
# If a tool dir already contains a REAL directory with the same name, its
# contents are migrated into ai-specs/ first (no overwrite) — nothing is lost.
# Tool-specific files that have no ai-specs counterpart (hooks.json, rules/,
# mcp.json, settings) are left untouched.
#
# Idempotent: safe to run multiple times.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
AI_SPECS="$ROOT/ai-specs"
TOOL_DIRS=(".agents" ".claude" ".codex" ".cursor")

if [ ! -d "$AI_SPECS" ]; then
  echo "error: $AI_SPECS not found — create ai-specs/ first" >&2
  exit 1
fi

link() {
  local src="$1"      # relative path used in ln -s (relative to link location)
  local dst="$2"      # absolute path of the symlink to create
  local abs_src="$3"  # absolute path of the real ai-specs directory

  if [ -L "$dst" ]; then
    rm "$dst"
  elif [ -d "$dst" ]; then
    if [ -n "$(ls -A "$dst" 2>/dev/null)" ]; then
      cp -Rn "$dst/." "$abs_src/" 2>/dev/null || true
      echo "  migrated: ${dst#"$ROOT/"}/* -> ${abs_src#"$ROOT/"}/"
    fi
    rm -rf "$dst"
  fi

  ln -s "$src" "$dst"
  echo "  linked: ${dst#"$ROOT/"} -> $src"
}

echo "Setting up ai-specs symlinks in $ROOT"

for tool in "${TOOL_DIRS[@]}"; do
  mkdir -p "$ROOT/$tool"
  for spec_dir in "$AI_SPECS"/*/; do
    [ -d "$spec_dir" ] || continue
    name="$(basename "$spec_dir")"
    link "../ai-specs/$name" "$ROOT/$tool/$name" "$AI_SPECS/$name"
  done
done

echo "Done."
