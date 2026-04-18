## Context

The portfolio currently ships only `public/favicon.svg`. Modern browsers render it fine, but Google's Search crawler does not reliably index SVG favicons — so no icon appears in Google search results. The fix is purely additive: generate raster favicon files from the existing SVG source and update the Next.js metadata to declare all variants.

There is no server, no database, and no build pipeline to complicate this — just static files in `public/` and a metadata export in `app/layout.tsx`.

## Goals / Non-Goals

**Goals:**
- Favicon appears in Google Search results
- Favicon renders correctly on iOS (home screen / share sheet) and Android
- Modern browsers continue to use the SVG for crisp rendering at any size
- No new runtime dependencies

**Non-Goals:**
- PWA manifest, service worker, or installability
- Automated favicon generation at build time (e.g., `sharp` pipeline)
- Theme-aware or dark-mode favicons

## Decisions

### 1. Manual asset generation, not a build step

**Decision**: Generate the raster files once as static assets and commit them to `public/`. Do not introduce a build-time image processing step.

**Rationale**: This is a one-off fix for a static portfolio. A build-time pipeline (e.g., `sharp`, `favicons` npm package) adds dependency weight and complexity that isn't justified for a single SVG source that changes rarely.

**Alternative considered**: `favicons` npm package — generates all sizes automatically but adds ~10 MB to node_modules for a task done once.

### 2. Use realfavicongenerator.net or squoosh for export

**Decision**: Export from `favicon.svg` using a free online tool (realfavicongenerator.net or Squoosh) to produce the required PNG sizes and `.ico`.

**Rationale**: Zero dependency cost, produces spec-compliant output, and is reproducible on demand.

### 3. Keep SVG as primary browser icon

**Decision**: In the `icons` metadata, list SVG first (for modern browsers) and `.ico`/PNG as fallbacks.

**Rationale**: SVG scales perfectly at all DPIs. The raster files exist solely for Google and legacy contexts — not to replace the SVG for browsers.

### 4. Required file set

| File | Size | Purpose |
|---|---|---|
| `favicon.ico` | 16×16 + 32×32 multi-size | Google Search, legacy browsers |
| `favicon-32x32.png` | 32×32 | Standard browser tab |
| `favicon-16x16.png` | 16×16 | Legacy browser tab |
| `apple-touch-icon.png` | 180×180 | iOS home screen / share sheet |
| `icon-192x192.png` | 192×192 | Android / Google PWA heuristic |

## Risks / Trade-offs

- **Google re-crawl delay** → After deploying, Google may take days or weeks to update the cached favicon in search results. No mitigation needed — this is expected behavior.
- **SVG source changes** → If `favicon.svg` is ever redesigned, the raster files must be manually regenerated. Low risk for a personal portfolio.

## Migration Plan

1. Generate raster files from `favicon.svg` (online tool)
2. Place files in `public/`
3. Update `icons` in `app/layout.tsx` metadata
4. Update `<link rel="icon">` in `<head>` to include `.ico` fallback
5. Deploy — no rollback needed (purely additive)
6. Optionally request re-index in Google Search Console to accelerate crawl
