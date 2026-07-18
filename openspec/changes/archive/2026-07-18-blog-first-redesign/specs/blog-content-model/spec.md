# blog-content-model

## ADDED Requirements

### Requirement: Post storage layout

Blog posts SHALL be stored one folder per post at `content/posts/<slug>/`, where `<slug>` is English kebab-case regardless of content language. Each post folder SHALL contain exactly one markdown file per locale: `en.md` and `es.md`.

#### Scenario: Post folder discovered by slug

- **WHEN** a folder `content/posts/my-first-post/` containing `en.md` and `es.md` exists
- **THEN** the post is discoverable with slug `my-first-post` in both locales

#### Scenario: Missing locale file fails the build

- **WHEN** a post folder is missing `en.md` or `es.md`
- **THEN** post loading throws an error naming the missing file, failing the static build

### Requirement: Frontmatter contract

Every post markdown file SHALL declare frontmatter with required fields `title` (non-empty string), `description` (non-empty string), `date` (`YYYY-MM-DD`), and `tags` (non-empty array of English kebab-case strings). Optional fields are `featured` (boolean, default false), `draft` (boolean, default false), and `updated` (`YYYY-MM-DD`). The contract MUST be typed in `src/types/blog.ts` and validated at load time.

#### Scenario: Valid frontmatter parsed

- **WHEN** a post file declares all required fields with valid values
- **THEN** loading returns a typed post object with those fields and defaults applied for omitted optional fields

#### Scenario: Invalid frontmatter rejected

- **WHEN** a post file omits a required field or provides a malformed `date`
- **THEN** post loading throws a validation error identifying the file and field

### Requirement: Locale-invariant fields are consistent

`date`, `tags`, `featured`, and `draft` SHALL be locale-invariant; the values in `en.md` are the source of truth. Per-locale fields are `title` and `description`.

#### Scenario: Invariant fields taken from EN

- **WHEN** a post is loaded in the `es` locale
- **THEN** its `date`, `tags`, `featured`, and `draft` values equal those declared in `en.md`

### Requirement: Draft posts are unpublished

Posts with `draft: true` SHALL be excluded from listings, static route generation, and the sitemap.

#### Scenario: Draft hidden from listing

- **WHEN** a post's `en.md` frontmatter sets `draft: true`
- **THEN** the post does not appear in `getAllPosts` results
