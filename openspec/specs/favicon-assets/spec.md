### Requirement: Raster favicon files present in public directory
The site SHALL provide raster favicon files in `public/` covering the sizes required by Google Search, iOS, and Android. The existing `favicon.svg` SHALL be retained.

#### Scenario: Required files exist at deploy time
- **WHEN** the site is deployed
- **THEN** the following files SHALL be present and publicly accessible:
  - `/favicon.ico` (multi-size: 16×16 and 32×32)
  - `/favicon-32x32.png` (32×32 pixels)
  - `/favicon-16x16.png` (16×16 pixels)
  - `/apple-touch-icon.png` (180×180 pixels)
  - `/icon-192x192.png` (192×192 pixels)

#### Scenario: Favicon files are accessible without authentication
- **WHEN** a crawler or browser requests any favicon file
- **THEN** the server SHALL return HTTP 200 with the correct image content-type

#### Scenario: ICO file contains multiple sizes
- **WHEN** `favicon.ico` is inspected
- **THEN** it SHALL contain at minimum 16×16 and 32×32 pixel variants embedded in the ICO format

### Requirement: Favicon visually matches SVG source
All raster favicon files SHALL be derived from `public/favicon.svg` and visually consistent with it.

#### Scenario: Raster files match the SVG design
- **WHEN** raster files are generated
- **THEN** they SHALL use the same icon shape, colors, and composition as `favicon.svg`
