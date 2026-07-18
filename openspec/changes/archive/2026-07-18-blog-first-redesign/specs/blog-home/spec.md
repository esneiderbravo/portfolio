# blog-home

## ADDED Requirements

### Requirement: Blog-first homepage

The root route `/` SHALL render a blog editorial page — not the portfolio landing page — including a hero (kicker, title, lead from the existing `blog.*` translations), the post listing, topic discovery, an author card, and a prominent link to `/cv`.

#### Scenario: Homepage is the blog

- **WHEN** a visitor loads `/`
- **THEN** the page shows the blog hero and post listing, and a visible link navigates to `/cv`

### Requirement: Post listing entries

Each listed post SHALL show its localized title and description, publication date, tags, and reading time, and link to `/blog/<slug>`. Posts marked `featured: true` SHALL be visually distinguished.

#### Scenario: Entry links to post

- **WHEN** the visitor clicks a post entry
- **THEN** the browser navigates to that post's `/blog/<slug>` page

#### Scenario: Featured post highlighted

- **WHEN** a non-draft post has `featured: true`
- **THEN** it renders with the featured treatment and `featuredBadge` label

### Requirement: Topic filtering and search

The homepage SHALL let visitors filter the listing by tag and by text search over titles/descriptions, entirely client-side over already-loaded post metadata. An empty result SHALL show the localized `emptyState` message.

#### Scenario: Tag filter narrows the list

- **WHEN** the visitor selects a tag chip
- **THEN** only posts carrying that tag remain listed

#### Scenario: No matches

- **WHEN** a search query matches no posts
- **THEN** the localized empty-state message is shown

### Requirement: Bilingual homepage content

The homepage SHALL render all its chrome and post metadata in the active locale, switching between EN and ES without navigation, using post payloads for both locales loaded at build time.

#### Scenario: Locale toggle swaps listing language

- **WHEN** the visitor switches the locale to ES
- **THEN** hero strings and post titles/descriptions display in Spanish without a page reload
