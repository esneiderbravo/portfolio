## ADDED Requirements

### Requirement: Prettier config present

The project SHALL include a `.prettierrc` file defining formatting rules for all TypeScript, TSX, JSON, and CSS files.

#### Scenario: Prettier config exists and is valid

- **WHEN** `prettier --check .` is run
- **THEN** Prettier can parse `.prettierrc` without error

### Requirement: Formatting style contract

Prettier SHALL be configured with: single quotes, no semicolons, trailing commas in multi-line constructs (`"all"`), 100-character print width, and 2-space indentation.

#### Scenario: Formatted file matches Prettier output

- **WHEN** a TypeScript file is formatted with Prettier
- **THEN** the output uses single quotes, no trailing semicolons, trailing commas, and 100-char line width

### Requirement: Prettier ignore file present

A `.prettierignore` file SHALL exist and exclude `node_modules`, `.next`, `public`, and generated files from formatting.

#### Scenario: Generated files not reformatted

- **WHEN** `prettier --write .` is run
- **THEN** files in `node_modules/` and `.next/` are not modified

### Requirement: Format script available

The project SHALL expose a `format` script (`prettier --write .`) and a `format:check` script (`prettier --check .`) in `package.json`.

#### Scenario: Format script runs without error

- **WHEN** `npm run format` is executed on already-formatted code
- **THEN** the command exits with status 0

#### Scenario: Format check catches unformatted code

- **WHEN** `npm run format:check` is run on a file with incorrect formatting
- **THEN** the command exits with a non-zero status and lists the offending file
