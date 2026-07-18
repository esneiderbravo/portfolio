# i18n — delta

## MODIFIED Requirements

### Requirement: Locale toggle behavior

The system SHALL allow the user to switch between EN and ES locales without a page reload, and the selected locale SHALL persist across client-side navigation between routes (`/`, `/blog/[slug]`, `/cv`) and across page reloads via `localStorage`, using a hydration-safe subscription (`useSyncExternalStore`).

#### Scenario: User switches locale

- **WHEN** the user activates the language toggle
- **THEN** all translated strings update immediately in the current view without navigation

#### Scenario: Locale persists across routes

- **WHEN** the user selects ES on `/` and navigates to `/cv` or a post page
- **THEN** the destination renders in ES without requiring the toggle again

#### Scenario: Locale persists across reloads

- **WHEN** the user selected ES and later reloads any page
- **THEN** the page renders in ES after hydration without a locale flash mismatch error

## ADDED Requirements

### Requirement: Blog UI string completeness

All blog UI strings (hero, badges, listing labels, search placeholder, author card, community card, empty state, back link, reading-time and published labels) SHALL have non-empty translations in both EN and ES under the `blog` translation namespace.

#### Scenario: Blog translation keys are complete

- **WHEN** the EN and ES translation objects are inspected
- **THEN** every `blog.*` string key contains a non-empty value in both locales
