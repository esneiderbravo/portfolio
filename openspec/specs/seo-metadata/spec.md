### Requirement: Layout metadata declares all favicon variants
The `metadata` export in `app/layout.tsx` SHALL declare all favicon variants so browsers and crawlers resolve the most appropriate format.

#### Scenario: Icons metadata includes raster and SVG variants
- **WHEN** the page is served
- **THEN** the `icons` field in the Next.js `metadata` export SHALL reference:
  - `favicon.ico` for the base icon (browsers that do not support SVG)
  - `favicon-32x32.png` at 32×32
  - `icon-192x192.png` at 192×192
  - `apple-touch-icon.png` for the `apple` key at 180×180

#### Scenario: SVG icon link tag present for modern browsers
- **WHEN** the HTML is rendered
- **THEN** a `<link rel="icon" type="image/svg+xml" href="/favicon.svg">` tag SHALL be present in `<head>` so modern browsers prefer the vector version

#### Scenario: Apple touch icon declared
- **WHEN** the HTML is rendered
- **THEN** a `<link rel="apple-touch-icon" href="/apple-touch-icon.png">` tag SHALL be present in `<head>`
