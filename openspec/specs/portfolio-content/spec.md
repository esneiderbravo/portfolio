## ADDED Requirements

### Requirement: Profile data completeness

The system SHALL provide a non-empty `name` field and a valid `email` field (containing "@") in the portfolio profile.

#### Scenario: Profile has required fields

- **WHEN** the application loads portfolio content
- **THEN** `profile.name` is a non-empty string
- **AND** `profile.email` contains the "@" character

### Requirement: Minimum project count

The system SHALL expose at least three featured projects.

#### Scenario: Sufficient projects present

- **WHEN** portfolio content is loaded
- **THEN** `projects` array contains 3 or more entries

### Requirement: Minimum skill group count

The system SHALL define at least five skill groups to represent the full technical breadth.

#### Scenario: Sufficient skill groups present

- **WHEN** portfolio content is loaded
- **THEN** `skillGroups` array contains 5 or more entries

### Requirement: Minimum work experience entries

The system SHALL include at least three work experience entries.

#### Scenario: Sufficient experience entries present

- **WHEN** portfolio content is loaded
- **THEN** `experiences` array contains 3 or more entries

### Requirement: Certifications present

The system SHALL include at least one certification entry.

#### Scenario: At least one certification

- **WHEN** portfolio content is loaded
- **THEN** `certifications` array contains 1 or more entries

### Requirement: Type contract integrity

All portfolio content MUST conform to the TypeScript types defined in `src/types/portfolio.ts`. The type-checker SHALL fail the build if the contract is violated.

#### Scenario: Invalid content shape is caught at build time

- **WHEN** a developer adds content that does not match the declared types
- **THEN** `tsc --noEmit` exits with a non-zero status

### Requirement: Business card content block

Portfolio content SHALL include a `businessCard` block typed by `BusinessCard` in `src/types/portfolio.ts`, containing `phone` (E.164 format), `whatsappUrl` (`https://wa.me/...`), `schedulingUrl`, a localized `pitch` and a localized `jobTitle` (`en` and `es`, both non-empty). No employer/organization field is stored — the company changes over time and would go stale on printed cards and saved contacts. The block MUST be the single source for card contact data — no card component may hardcode contact values.

#### Scenario: Business card content is well-formed

- **WHEN** portfolio content is loaded in the test suite
- **THEN** `businessCard.phone` starts with `+`
- **AND** `businessCard.whatsappUrl` starts with `https://wa.me/`
- **AND** `businessCard.schedulingUrl` is a valid `https://` URL
- **AND** `businessCard.pitch.en` and `businessCard.pitch.es` are non-empty strings

#### Scenario: Type contract enforced

- **WHEN** `businessCard` content does not match the `BusinessCard` type
- **THEN** `tsc --noEmit` exits with a non-zero status
