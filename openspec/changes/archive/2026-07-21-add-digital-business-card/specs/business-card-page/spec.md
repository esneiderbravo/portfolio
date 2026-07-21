## ADDED Requirements

### Requirement: Business card route

The system SHALL serve a digital business card page at `/card`, rendered as a focused, mobile-first layout consistent with the `{eb}` brand (dark theme, cyan accent, existing typography tokens) and independent from the home page sections.

#### Scenario: Page is reachable

- **WHEN** a visitor opens `https://esneiderbravo.dev/card`
- **THEN** the business card page renders with name, role, pitch, and action shortcuts
- **AND** no home-page portfolio sections (experience, projects, skills) are rendered

### Requirement: Action shortcuts

The `/card` page SHALL present, as large tap targets (minimum 48px), actions for: Save contact, Book a call, WhatsApp, Email, LinkedIn, GitHub, View portfolio, and Share. External actions MUST open in a new tab with `rel="noopener noreferrer"`.

#### Scenario: Book a call opens scheduler

- **WHEN** the visitor taps "Book a call"
- **THEN** the scheduling URL from `portfolioContent.businessCard.schedulingUrl` opens in a new tab

#### Scenario: WhatsApp deep link

- **WHEN** the visitor taps the WhatsApp action on a phone
- **THEN** a `https://wa.me/<number>` URL opens with a prefilled greeting in the active locale

### Requirement: Native share with fallback

The Share action SHALL invoke the Web Share API when available and otherwise copy the page URL to the clipboard, showing transient visual confirmation.

#### Scenario: Browser supports Web Share

- **WHEN** the visitor taps Share and `navigator.share` is available
- **THEN** the native share sheet opens with the card title and `https://esneiderbravo.dev/card`

#### Scenario: Browser lacks Web Share

- **WHEN** the visitor taps Share and `navigator.share` is unavailable
- **THEN** the URL is copied to the clipboard and a "copied" confirmation is shown briefly

### Requirement: Bilingual card content

All user-visible strings on `/card` SHALL exist in both English and Spanish via `src/i18n/translations.ts` (UI labels) and localized content fields (pitch), following the shared `useLocale` state.

#### Scenario: Locale switch

- **WHEN** the visitor's active locale is Spanish
- **THEN** all card labels and the pitch render in Spanish without a page reload

### Requirement: Page metadata

The `/card` page SHALL export metadata with a localized-neutral title, description, and OpenGraph tags, and SHALL be listed in `app/sitemap.ts`.

#### Scenario: Link unfurl

- **WHEN** the card URL is shared in WhatsApp or LinkedIn
- **THEN** the preview shows the page title, description, and brand OpenGraph image
