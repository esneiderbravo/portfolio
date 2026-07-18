# Conventions — portfolio

## Code style

- **Prettier** (`.prettierrc`) + **ESLint** flat config (`eslint.config.mjs`,
  `eslint-config-next`, `@typescript-eslint`, `eslint-plugin-import`,
  `eslint-config-prettier`).
- **TypeScript strict mode** (`tsconfig.json`); `npm run typecheck` must pass.
- Pre-commit: husky runs `lint-staged` → prettier + eslint on staged
  `*.{ts,tsx,json,css}`.

## Naming

- Components: `PascalCase.tsx` (`BlogHome.tsx`, `LocaleSwitch.tsx`); hooks:
  `useX.ts` (`useLocale.ts`); lib modules: `camelCase.ts`
  (`yearsExperience.ts`).
- Blog post folders and slugs: **always English kebab-case**, even for
  bilingual content — locale lives in the file name (`en.md` / `es.md`),
  never in the folder name.

## Git

- Branch: work lands on `main` (no feature-branch convention observed).
- Commit format: conventional-commit-style prefixes observed in history —
  `feat:`, `fix:`, `seo:`, `chore:`, `docs:`, `test:`.
- No ticket-ID convention in use.
- Spec-driven changes go through **OpenSpec** (`openspec/` — specs in
  `openspec/specs/`, completed changes archived under `openspec/changes/`).

## Language

- Code, comments, and docs: **English**.
- User-visible copy: **bilingual EN/ES** — every UI string exists in both
  locales in `src/i18n/translations.ts`; every blog post ships `en.md` and
  `es.md`.
