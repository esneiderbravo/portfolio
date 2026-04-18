## ADDED Requirements

### Requirement: Standard metadata present

The site SHALL expose a `<title>`, `<meta name="description">`, and a canonical `<link rel="canonical">` in every page response.

#### Scenario: Core metadata rendered

- **WHEN** the root page is rendered
- **THEN** the document `<head>` contains a non-empty title, meta description, and canonical link pointing to `https://esneiderbravo.dev`

### Requirement: OpenGraph tags present

The site SHALL expose OpenGraph metadata sufficient for rich link previews: `og:type`, `og:title`, `og:description`, `og:url`, `og:image`.

#### Scenario: OG tags rendered

- **WHEN** a URL is shared on a social platform that reads OG tags
- **THEN** the response head contains all five required OG properties

### Requirement: Twitter card metadata present

The site SHALL expose `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image` tags.

#### Scenario: Twitter card tags rendered

- **WHEN** a link is shared on Twitter/X
- **THEN** the response head contains all four required twitter meta tags

### Requirement: JSON-LD structured data present

The site SHALL embed two JSON-LD schemas in the document head: `Person` and `WebSite`, following schema.org definitions.

#### Scenario: JSON-LD scripts present

- **WHEN** the page HTML is inspected
- **THEN** two `<script type="application/ld+json">` blocks exist, one with `@type: Person` and one with `@type: WebSite`

### Requirement: Sitemap accessible

The site SHALL expose a valid XML sitemap at `/sitemap.xml` listing the root URL with a priority of 1.

#### Scenario: Sitemap returns root URL

- **WHEN** a crawler fetches `/sitemap.xml`
- **THEN** the response contains the URL `https://esneiderbravo.dev` with priority 1

### Requirement: Robots directives present

The site SHALL expose a `robots.txt`-equivalent response that allows all user agents to crawl `/` and disallows `/api/`.

#### Scenario: Robots allows crawling

- **WHEN** a crawler fetches `/robots.txt`
- **THEN** the response allows `*` on `/` and disallows `/api/`
