# seo-discoverability — delta

## MODIFIED Requirements

### Requirement: Standard metadata present

The site SHALL expose a `<title>`, `<meta name="description">`, and a canonical `<link rel="canonical">` in every page response. The canonical URL SHALL be route-specific: `https://esneiderbravo.dev` for `/`, `https://esneiderbravo.dev/cv` for the CV page, and `https://esneiderbravo.dev/blog/<slug>` for each post.

#### Scenario: Core metadata rendered

- **WHEN** the root page is rendered
- **THEN** the document `<head>` contains a non-empty title, meta description, and canonical link pointing to `https://esneiderbravo.dev`

#### Scenario: Route-specific canonical

- **WHEN** `/cv` or a `/blog/<slug>` page is rendered
- **THEN** its `<head>` contains a canonical link pointing to that route's own URL

### Requirement: JSON-LD structured data present

The site SHALL embed `Person` and `WebSite` JSON-LD schemas in the root layout, a `Blog` schema on the blog homepage, and a `BlogPosting` schema on each post page, following schema.org definitions.

#### Scenario: JSON-LD scripts present

- **WHEN** the homepage HTML is inspected
- **THEN** `<script type="application/ld+json">` blocks exist with `@type: Person`, `@type: WebSite`, and `@type: Blog`

#### Scenario: BlogPosting on post pages

- **WHEN** a post page HTML is inspected
- **THEN** a JSON-LD block with `@type: BlogPosting` exists for that post

### Requirement: Sitemap accessible

The site SHALL expose a valid XML sitemap at `/sitemap.xml` listing the root URL with priority 1, the `/cv` URL, and one URL per non-draft blog post with `lastModified` derived from the post's `updated` date when present, otherwise its `date`.

#### Scenario: Sitemap returns root URL

- **WHEN** a crawler fetches `/sitemap.xml`
- **THEN** the response contains the URL `https://esneiderbravo.dev` with priority 1

#### Scenario: Sitemap lists CV and posts

- **WHEN** a crawler fetches `/sitemap.xml`
- **THEN** the response contains `https://esneiderbravo.dev/cv` and a `https://esneiderbravo.dev/blog/<slug>` entry for every non-draft post, and no entries for draft posts
