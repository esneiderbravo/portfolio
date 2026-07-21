# Tasks: add-digital-business-card

## 1. Content model & data

- [x] 1.1 Add `BusinessCard` type to `src/types/portfolio.ts` and `businessCard` field to `PortfolioContent` (phone, whatsappUrl, schedulingUrl, pitch {en, es}, organization, jobTitle)
- [x] 1.2 Add `businessCard` block to `src/content/portfolio.ts` with placeholder phone/WhatsApp/scheduling values clearly marked `// TODO: real value` and a bilingual pitch
- [x] 1.3 Extend `tests/content.test.ts` with shape checks for `businessCard` (phone starts with `+`, whatsappUrl starts with `https://wa.me/`, schedulingUrl is https, both pitch locales non-empty)

## 2. vCard

- [x] 2.1 Create `src/lib/vcard.ts` with pure `buildVCard(profile, businessCard): string` — vCard 3.0, CRLF endings, FN/N/TITLE/ORG/TEL/EMAIL/URL, escaping of `,` `;` and newlines, empty fields omitted
- [x] 2.2 Add `tests/vcard.test.ts` covering required fields, escaping, CRLF endings, and omission of empty fields
- [x] 2.3 Create route handler `app/card/vcard/route.ts` serving `buildVCard` output with `Content-Type: text/vcard; charset=utf-8` and `Content-Disposition: attachment; filename="esneider-bravo.vcf"`

## 3. i18n strings

- [x] 3.1 Add `card` string group to `src/i18n/translations.ts` in EN and ES: page heading, save contact, book a call, WhatsApp, email, share, copied confirmation, view portfolio, WhatsApp greeting text

## 4. Card page UI

- [x] 4.1 Create `app/card/page.tsx` (server) exporting metadata (title, description, OpenGraph reusing brand OG image) and rendering the client component
- [x] 4.2 Create `app/card/CardPageClient.tsx` with brand header (`{eb}` wordmark), name, role, localized pitch, and locale-aware labels via `useLocale`
- [x] 4.3 Implement action shortcuts: Save contact (`/card/vcard`), Book a call, WhatsApp (locale-aware prefilled greeting), Email, LinkedIn, GitHub, View portfolio — external links with `target="_blank" rel="noopener noreferrer"`, tap targets ≥48px
- [x] 4.4 Implement Share action: `navigator.share` when available, clipboard fallback with transient "copied" state
- [x] 4.5 Add `.card-*` styles to `app/globals.css` using existing custom properties (mobile-first, dark theme, cyan accent)

## 5. QR assets

- [x] 5.1 Add `qrcode` as devDependency and create `scripts/generate-qr.mjs` emitting `public/qr/card-qr.svg` and `public/qr/card-qr-print.png` (1200×1200, EC level H) for `https://esneiderbravo.dev/card`; wire `npm run generate:qr`
- [x] 5.2 Run the script and commit the generated assets under `public/qr/`
- [x] 5.3 Add a Vitest check asserting `public/qr/card-qr.svg` exists and encodes the card URL (script writes a sibling `card-qr.json` manifest with the encoded URL, or decode via the lib)

## 6. SEO & wiring

- [x] 6.1 Add `/card` entry to `app/sitemap.ts`
- [x] 6.2 Verify link unfurl metadata renders (inspect page `<head>` in dev for OG tags)

## 7. Quality gate & manual verification

- [x] 7.1 Run `npm run validate` (lint → typecheck → test → build) and fix any failures
- [x] 7.2 Manual pass on a phone or devtools mobile emulation: scan-flow `/card` → save contact opens native flow, WhatsApp/scheduler/share work in both locales
- [x] 7.3 Replace placeholder phone/WhatsApp/scheduling values with real ones provided by the owner (blocking before merge)
