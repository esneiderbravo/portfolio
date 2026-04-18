## Why

The portfolio site only ships a `favicon.svg`, which Google's search crawler does not reliably support. As a result, no favicon appears next to the site in Google search results, reducing brand recognition and perceived professionalism for a portfolio targeting senior engineering roles.

## What Changes

- Add `favicon.ico` (multi-size: 16×16 + 32×32) to `public/`
- Add `favicon-32x32.png` and `favicon-16x16.png` to `public/`
- Add `apple-touch-icon.png` (180×180) to `public/`
- Add `icon-192x192.png` to `public/` for Android/PWA
- Update `app/layout.tsx` metadata `icons` config to reference raster formats
- Keep `favicon.svg` for modern browsers that support it

## Capabilities

### New Capabilities

- `favicon-assets`: Raster favicon files in standard sizes required by Google Search, iOS, and Android — generated from the existing `favicon.svg` source.

### Modified Capabilities

- `seo-metadata`: Update the `icons` metadata in `layout.tsx` to declare all favicon variants so browsers and crawlers resolve the correct format.

## Impact

- `public/` — new image files added (no deletions)
- `app/layout.tsx` — `icons` field in `metadata` export updated; existing `<link rel="icon">` tag updated
- No changes to content, routing, or styling
- No new dependencies

## Non-goals

- PWA manifest or service worker setup
- Animated or theme-aware favicons
- Generating favicons programmatically at build time
