## Why

OpenSpec has no foundational specs documenting what the portfolio system already does, meaning every future change proposal starts without a shared contract for existing behavior. Establishing baseline specs now gives all future changes a stable reference point and surfaces hidden gaps (like incomplete i18n) before they become bugs.

## What Changes

- Create foundational spec files for three core capabilities that already exist but are undocumented:
  - `portfolio-content` — data model integrity and required content completeness
  - `seo-discoverability` — SEO surface the site must always expose
  - `i18n` — bilingual content contract (EN required, ES scope explicitly bounded)
- No production code changes — this is documentation of existing behavior only

## Non-Goals

- Does not add new features or change any runtime behavior
- Does not cover `portfolio-presentation` (visual/layout spec) — deferred until a design iteration is planned
- Does not cover `code-quality` — covered by the `configure-formatter-linters` change

## Capabilities

### New Capabilities

- `portfolio-content`: Requirements for content data integrity — required fields, type contract, minimum data thresholds (projects, experiences, skill groups, certifications)
- `seo-discoverability`: Requirements for the SEO surface — metadata tags, JSON-LD schemas, OG/Twitter cards, sitemap, robots
- `i18n`: Requirements for the bilingual content system — which sections require EN+ES parity, which are EN-only by design, and the locale toggle behavior

### Modified Capabilities

<!-- None — no existing specs exist yet -->

## Impact

- Adds `openspec/specs/portfolio-content/spec.md`, `openspec/specs/seo-discoverability/spec.md`, `openspec/specs/i18n/spec.md`
- No changes to `app/`, `src/`, or any runtime code
- Future changes that touch content, SEO, or i18n will reference these specs
