## ADDED Requirements

### Requirement: Husky pre-commit hook installed

The project SHALL include a Husky pre-commit hook that runs `lint-staged` on every `git commit`.

#### Scenario: Pre-commit hook triggers on commit

- **WHEN** `git commit` is executed
- **THEN** the `.husky/pre-commit` script runs automatically before the commit is recorded

### Requirement: lint-staged runs only on staged files

`lint-staged` SHALL be configured to run Prettier formatting and ESLint linting only on files staged for the current commit, not the entire codebase.

#### Scenario: Only staged files are processed

- **WHEN** two files are modified but only one is staged
- **THEN** `lint-staged` formats and lints only the staged file

### Requirement: Commit blocked on lint errors

If ESLint reports errors on any staged file, the pre-commit hook SHALL exit with a non-zero status, preventing the commit from completing.

#### Scenario: Commit rejected on lint error

- **WHEN** a staged file contains an ESLint error
- **THEN** `git commit` exits with a non-zero status and the commit is not recorded

### Requirement: Husky install wired to prepare script

The `package.json` SHALL include `"prepare": "husky"` so that `npm install` automatically sets up the git hook in fresh checkouts.

#### Scenario: Hooks installed after npm install

- **WHEN** `npm install` is run in a fresh clone
- **THEN** the `.husky/pre-commit` hook file exists and is executable
