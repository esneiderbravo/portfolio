## ADDED Requirements

### Requirement: Business card content block

Portfolio content SHALL include a `businessCard` block typed by `BusinessCard` in `src/types/portfolio.ts`, containing `phone` (E.164 format), `whatsappUrl` (`https://wa.me/...`), `schedulingUrl`, a localized `pitch` (`en` and `es`, both non-empty), `organization`, and `jobTitle`. The block MUST be the single source for card contact data — no card component may hardcode contact values.

#### Scenario: Business card content is well-formed

- **WHEN** portfolio content is loaded in the test suite
- **THEN** `businessCard.phone` starts with `+`
- **AND** `businessCard.whatsappUrl` starts with `https://wa.me/`
- **AND** `businessCard.schedulingUrl` is a valid `https://` URL
- **AND** `businessCard.pitch.en` and `businessCard.pitch.es` are non-empty strings

#### Scenario: Type contract enforced

- **WHEN** `businessCard` content does not match the `BusinessCard` type
- **THEN** `tsc --noEmit` exits with a non-zero status
