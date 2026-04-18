## Why

The project has no Prettier and a 3-line ESLint config, leaving code style entirely to developer discretion. Formatting is inconsistent across source files and there is no enforcement mechanism at commit time — style divergence compounds with every change.

## What Changes

- Add **Prettier** with an explicit config (`.prettierrc`) for consistent formatting across TS, TSX, JSON, and CSS
- Add `eslint-config-prettier` to disable ESLint style rules that conflict with Prettier
- Extend `eslint.config.mjs` with `@typescript-eslint` for stricter TypeScript-aware lint rules
- Add `eslint-plugin-import` for deterministic import ordering
- Add `husky` + `lint-staged` to auto-format and lint staged files on every commit
- Add `format`, `format:check`, and `lint:fix` scripts to `package.json`
- Add `.prettierignore` to exclude generated and node_modules files

## Non-Goals

- Does not change runtime behavior or any application logic
- Does not add Biome or replace ESLint — ESLint + Prettier remains the standard path for this Next.js stack
- Does not set up a CI pipeline (separate concern)

## Capabilities

### New Capabilities

- `code-formatting`: Prettier configuration and formatting contract — which style rules apply, which files are formatted, and how format enforcement is invoked
- `lint-rules`: Enhanced ESLint configuration — TypeScript-aware rules, import ordering, Prettier compatibility layer
- `pre-commit-hooks`: Husky + lint-staged setup that runs format + lint only on staged files before each commit

### Modified Capabilities

<!-- No existing specs need modification — code-quality was not in the openspec-foundation baseline -->

## Impact

- **devDependencies added**: `prettier`, `eslint-config-prettier`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `eslint-plugin-import`, `husky`, `lint-staged`
- **Files changed**: `eslint.config.mjs`, `package.json`
- **Files added**: `.prettierrc`, `.prettierignore`
- **Source files**: will be reformatted on first Prettier run (one-time large diff, no logic changes)
- **validate.mjs**: `format:check` can optionally be added to the quality gate
