# blog-pipeline

## ADDED Requirements

### Requirement: Post discovery and loading API

`src/lib/posts.ts` SHALL expose `getAllPosts(locale)` returning all non-draft posts for a locale and `getPostBySlug(slug, locale)` returning a single post, both reading `content/posts/` from the filesystem at build/render time with no database or network access.

#### Scenario: All posts loaded for a locale

- **WHEN** `getAllPosts('es')` is called
- **THEN** it returns one entry per non-draft post folder, with Spanish `title` and `description` from each `es.md`

#### Scenario: Unknown slug

- **WHEN** `getPostBySlug` is called with a slug that has no folder
- **THEN** it signals not-found so the route can render a 404

### Requirement: Deterministic sorting

Post listings SHALL be sorted by `date` descending; ties break by slug ascending so ordering is deterministic.

#### Scenario: Newest post first

- **WHEN** posts dated 2026-01-10 and 2026-03-05 exist
- **THEN** `getAllPosts` returns the 2026-03-05 post first

### Requirement: Reading time computed

Each loaded post SHALL include a reading-time value in whole minutes (minimum 1) computed from the markdown body word count, not from frontmatter.

#### Scenario: Reading time present

- **WHEN** any post is loaded
- **THEN** the post object includes `readingTimeMinutes >= 1`

### Requirement: Markdown rendering

`src/lib/blog.ts` SHALL render post markdown bodies to HTML using `marked`, supporting headings, paragraphs, lists, links, inline code, and fenced code blocks.

#### Scenario: Fenced code block rendered

- **WHEN** a post body contains a fenced code block
- **THEN** the rendered HTML contains a `<pre><code>` block preserving its content

### Requirement: Pipeline unit tests

The pipeline SHALL have Vitest coverage for discovery, frontmatter validation failure, sorting, draft exclusion, locale loading, and reading time, using fixture post folders (not production content).

#### Scenario: Pipeline tests run in CI

- **WHEN** `npm run test` executes
- **THEN** posts-pipeline tests run and pass without touching `content/posts/` production entries
