## Context

The project uses ESLint 9 with the flat config format (`eslint.config.mjs`). No formatter is installed. The quality gate (`scripts/validate.mjs`) already runs lint and typecheck — formatting enforcement slots naturally into that pipeline.

## Goals / Non-Goals

**Goals:**

- Zero-config formatting via Prettier with an explicit `.prettierrc`
- ESLint extended with TypeScript-aware and import-order rules, Prettier-compatible
- Pre-commit hook that runs lint-staged (format + lint on staged files only, keeping commits fast)

**Non-Goals:**

- No Biome migration — ESLint + Prettier is the established standard for Next.js 16 projects
- No CI pipeline changes — that's a separate concern
- No editor-specific config (`.editorconfig`, `.vscode/settings.json`) — out of scope

## Decisions

**Decision: Prettier over ESLint stylistic rules**
Rationale: ESLint stylistic rules require per-rule configuration and still leave many formatting decisions open. Prettier is fully opinionated with one config object. For a solo developer, zero-config formatting removes all style bikeshedding permanently.
Alternative considered: `@stylistic/eslint-plugin` — rejected because it still requires explicit rule configuration and is slower than Prettier's AST-based formatting.

**Decision: `eslint-config-prettier` as a disable layer, not a replace**
Rationale: `eslint-config-next` enables some style rules. Adding `eslint-config-prettier` last in the config array disables only the conflicting ones, preserving all quality rules from Next's config.

**Decision: `lint-staged` scope limited to staged files**
Rationale: Running Prettier on the entire codebase in a pre-commit hook would be slow and block commits. `lint-staged` runs only on the files in the current commit, keeping hook overhead under 1 second for typical commits.

**Decision: `@typescript-eslint` rules set to `recommended-type-checked` subset**
Rationale: `strict` ruleset is too aggressive for an existing codebase mid-migration. `recommended-type-checked` catches real bugs (unsafe any, missing return types on exported functions) without requiring a full type annotation pass.

**Decision: `eslint-plugin-import` for import ordering**
Rationale: Consistent import ordering (node builtins → external → internal → relative) makes diffs cleaner. The plugin enforces this automatically with `import/order` rule.

## Risks / Trade-offs

- [Risk: First Prettier run produces a large diff] → Mitigation: Run as a single dedicated commit (`chore: format all files with prettier`) before any other work; this isolates the noise
- [Risk: TypeScript-aware ESLint rules require `parserOptions.project`] → Mitigation: Point to existing `tsconfig.json`; the project already has strict TS configured so rule errors should be minimal
- [Risk: husky install step required in CI if CI is added later] → Mitigation: Add `"prepare": "husky"` to package.json scripts; CI environments that skip `npm install --ignore-scripts` will pick it up automatically

## Migration Plan

1. Install all new devDependencies
2. Add `.prettierrc` and `.prettierignore`
3. Update `eslint.config.mjs` with new plugins and rules
4. Run `npx prettier --write .` — single formatting commit
5. Initialize husky and add pre-commit hook
6. Add `lint-staged` config to `package.json`
7. Add `format`, `format:check`, `lint:fix` scripts
8. Run `npm run validate` — all steps must pass
