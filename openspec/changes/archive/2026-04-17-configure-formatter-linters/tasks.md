## 1. Install Dependencies

- [x] 1.1 Install Prettier and compatibility layer: `npm install -D prettier eslint-config-prettier`
- [x] 1.2 Install TypeScript ESLint plugins: `npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser`
- [x] 1.3 Install import ordering plugin: `npm install -D eslint-plugin-import`
- [x] 1.4 Install pre-commit tooling: `npm install -D husky lint-staged`

## 2. Configure Prettier

- [x] 2.1 Create `.prettierrc` with: `singleQuote: true`, `semi: false`, `trailingComma: "all"`, `printWidth: 100`, `tabWidth: 2`
- [x] 2.2 Create `.prettierignore` excluding `node_modules`, `.next`, `public`, `*.lock`, and `next-env.d.ts`
- [x] 2.3 Add `"format": "prettier --write ."` and `"format:check": "prettier --check ."` scripts to `package.json`

## 3. Update ESLint Config

- [x] 3.1 Extend `eslint.config.mjs` with `@typescript-eslint` parser and `recommended-type-checked` rules pointed at `tsconfig.json`
- [x] 3.2 Add `eslint-plugin-import` with `import/order` rule (groups: builtin → external → internal → parent → sibling)
- [x] 3.3 Append `eslint-config-prettier` as the last config entry to disable conflicting style rules
- [x] 3.4 Add `"lint:fix": "eslint . --fix"` script to `package.json`

## 4. Run Initial Format Pass

- [x] 4.1 Run `npm run format` — commit the resulting diff as `chore: format all files with prettier`
- [x] 4.2 Run `npm run lint` — fix any new ESLint errors introduced by the TypeScript rules

## 5. Set Up Pre-commit Hooks

- [x] 5.1 Add `"prepare": "husky"` to `package.json` scripts
- [x] 5.2 Run `npx husky init` to scaffold the `.husky/` directory
- [x] 5.3 Set `.husky/pre-commit` to run `npx lint-staged`
- [x] 5.4 Add `lint-staged` config to `package.json`: run `prettier --write` then `eslint --fix` on staged `*.{ts,tsx,json,css}` files

## 6. Final Verification

- [x] 6.1 Make a test commit with a staged file — confirm pre-commit hook runs and passes
- [x] 6.2 Run `npm run validate` (lint → typecheck → test → build) — all steps must exit 0
- [x] 6.3 Run `npm run format:check` — confirm all files are already formatted (no diff)
