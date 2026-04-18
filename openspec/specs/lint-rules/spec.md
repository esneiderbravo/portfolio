## ADDED Requirements

### Requirement: TypeScript-aware lint rules enabled

The ESLint config SHALL include `@typescript-eslint/recommended-type-checked` rules, configured with `parserOptions.project` pointing to `tsconfig.json`.

#### Scenario: TypeScript lint catches unsafe any usage

- **WHEN** a variable is typed as `any` without an explicit cast
- **THEN** ESLint reports an error on that line

### Requirement: Prettier compatibility layer active

`eslint-config-prettier` SHALL be the last entry in the ESLint config array, disabling all ESLint rules that conflict with Prettier formatting.

#### Scenario: No ESLint/Prettier rule conflicts

- **WHEN** `npm run lint` is run on Prettier-formatted code
- **THEN** no ESLint errors relate to formatting (quotes, semicolons, spacing)

### Requirement: Import ordering enforced

The ESLint config SHALL include `eslint-plugin-import` with the `import/order` rule enforcing: Node.js builtins first, then external packages, then internal (`@/`) aliases, then relative imports — each group separated by a blank line.

#### Scenario: Incorrect import order flagged

- **WHEN** a file places a relative import before an external package import
- **THEN** ESLint reports an `import/order` error

### Requirement: Lint fix script available

The project SHALL expose a `lint:fix` script (`eslint . --fix`) in `package.json`.

#### Scenario: Lint fix script auto-corrects fixable issues

- **WHEN** `npm run lint:fix` is run
- **THEN** auto-fixable ESLint issues are corrected in-place and the command exits with status 0
