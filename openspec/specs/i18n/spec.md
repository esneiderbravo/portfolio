## ADDED Requirements

### Requirement: Supported locales

The system SHALL support exactly two locales: `en` (English) and `es` (Spanish). The default locale is `en`.

#### Scenario: Default locale on load

- **WHEN** the page is first loaded
- **THEN** the UI renders in English (`locale === "en"`)

### Requirement: Locale toggle behavior

The system SHALL allow the user to switch between EN and ES locales without a page reload.

#### Scenario: User switches locale

- **WHEN** the user activates the language toggle
- **THEN** all translated strings update immediately in the current view without navigation

### Requirement: EN locale completeness

All navigation labels, section headings, hero text, about text, CTA text, skill section strings, experience strings, education strings, certification strings, and AI stack strings SHALL have non-empty English translations.

#### Scenario: EN translation keys are complete

- **WHEN** the EN translations object is inspected
- **THEN** every required string key contains a non-empty value

### Requirement: ES locale completeness for UI chrome

Navigation labels, section headings, hero text, about text, CTA text, skill section strings, experience strings, education strings, certification strings, and AI stack strings SHALL have non-empty Spanish translations.

#### Scenario: ES translation keys are complete for UI chrome

- **WHEN** the ES translations object is inspected
- **THEN** every UI-chrome string key contains a non-empty Spanish value

### Requirement: EN-only scope for project content

Featured project summaries and impacts SHALL be EN-only. The ES locale `summaries` and `impacts` maps MAY be empty, and the system SHALL render EN project content regardless of the active locale.

#### Scenario: Project content renders in EN regardless of locale

- **WHEN** the user switches to the ES locale
- **THEN** featured project summaries and impacts continue to display in English
