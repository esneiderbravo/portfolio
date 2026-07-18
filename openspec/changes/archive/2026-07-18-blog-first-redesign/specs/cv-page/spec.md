# cv-page

## ADDED Requirements

### Requirement: CV route hosts the portfolio experience

The site SHALL serve the full portfolio experience at `/cv`: profile/hero, about, AI stack, skills, experience, education, certifications, projects, and contact sections, sourced unchanged from `src/content/portfolio.ts` and preserving the existing section ids and scroll-spy navigation.

#### Scenario: CV page shows all portfolio sections

- **WHEN** a visitor loads `/cv`
- **THEN** all portfolio sections render with the same content previously shown on `/`

#### Scenario: Section anchors preserved

- **WHEN** a visitor loads `/cv#projects`
- **THEN** the page scrolls to the projects section

### Requirement: CV is reachable from blog surfaces

The shared site header SHALL include a CV link on every route, and the blog homepage SHALL surface the localized `viewCv` call-to-action.

#### Scenario: Navigating from blog to CV

- **WHEN** a visitor on `/` activates the CV link
- **THEN** the browser navigates to `/cv` and the active locale is preserved

### Requirement: CV page metadata

`/cv` SHALL declare its own metadata: a CV-specific title through the existing title template, description, canonical URL `https://esneiderbravo.dev/cv`, and OpenGraph tags. It SHALL remain indexable.

#### Scenario: CV metadata rendered

- **WHEN** the `/cv` response head is inspected
- **THEN** it contains a CV-specific title, description, and canonical link to `/cv`

### Requirement: Bilingual CV content

The CV page SHALL render in the active locale with the same EN/ES coverage rules as the current portfolio page, including the existing EN-only scope for featured project summaries and impacts.

#### Scenario: CV locale toggle

- **WHEN** the visitor switches locale on `/cv`
- **THEN** UI chrome and translated sections display in the selected language without a page reload
