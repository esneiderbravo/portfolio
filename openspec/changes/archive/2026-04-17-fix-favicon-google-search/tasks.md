## 1. Generate Raster Favicon Files

- [x] 1.1 Open `public/favicon.svg` in a browser or tool and export `favicon-32x32.png` (32×32) and `favicon-16x16.png` (16×16) using realfavicongenerator.net or Squoosh
- [x] 1.2 Export `apple-touch-icon.png` at 180×180 from the same SVG source
- [x] 1.3 Export `icon-192x192.png` at 192×192 from the same SVG source
- [x] 1.4 Generate `favicon.ico` containing 16×16 and 32×32 variants (use realfavicongenerator.net or a CLI tool like `png2ico`)

## 2. Add Files to Public Directory

- [x] 2.1 Copy all generated files (`favicon.ico`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`, `icon-192x192.png`) into `public/`
- [x] 2.2 Verify each file is publicly accessible by running `next dev` and opening `http://localhost:3000/favicon.ico` etc. in the browser

## 3. Update Metadata in layout.tsx

- [x] 3.1 Update the `icons` field in the `metadata` export (`app/layout.tsx`) to:
  ```ts
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  }
  ```
- [x] 3.2 Ensure the existing `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />` tag remains in `<head>` for modern browsers
- [x] 3.3 Add `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />` to the `<head>` block if not already present via Next.js metadata

## 4. Verify and Deploy

- [x] 4.1 Run `npm run build` (via `scripts/validate.mjs`) and confirm no errors
- [ ] 4.2 Check browser tab shows the favicon correctly in Chrome, Firefox, and Safari
- [ ] 4.3 Deploy to production
- [ ] 4.4 (Optional) Open Google Search Console → URL Inspection → request re-index for `https://esneiderbravo.dev` to accelerate Google's favicon crawl

