# blog-post-page

## ADDED Requirements

### Requirement: Statically generated post routes

`/blog/[slug]` SHALL statically generate one page per non-draft post via `generateStaticParams`, rendering the post's markdown as HTML in an article layout with title, date, tags, reading time, and a localized back-to-blog link. Unknown slugs SHALL return a 404.

#### Scenario: Post page renders

- **WHEN** a visitor loads `/blog/<slug>` for an existing non-draft post
- **THEN** the rendered article shows the post title, formatted date, tags, reading time, and body HTML

#### Scenario: Unknown slug 404s

- **WHEN** a visitor loads `/blog/does-not-exist`
- **THEN** the site responds with the 404 page

### Requirement: Bilingual post rendering

The post page SHALL embed both EN and ES rendered payloads at build time and display the one matching the active locale, switching without navigation.

#### Scenario: Toggle switches article language

- **WHEN** the visitor switches locale on a post page
- **THEN** the article title and body swap to the other language without a page reload

### Requirement: Post-level SEO metadata

Each post page SHALL declare metadata from the EN frontmatter via `generateMetadata`: page title (through the existing title template), meta description, canonical URL `https://esneiderbravo.dev/blog/<slug>`, OpenGraph `type: article` tags, and Twitter card tags.

#### Scenario: Post metadata rendered

- **WHEN** a post page response head is inspected
- **THEN** it contains the post-specific title, description, canonical link, `og:type` `article`, and Twitter card tags

### Requirement: BlogPosting structured data

Each post page SHALL embed a `BlogPosting` JSON-LD script with `headline`, `description`, `datePublished`, `dateModified` (when `updated` is set), `author` referencing Esneider Bravo, and `inLanguage`.

#### Scenario: BlogPosting JSON-LD present

- **WHEN** a post page HTML is inspected
- **THEN** a `<script type="application/ld+json">` block with `@type: BlogPosting` and the post's headline exists
