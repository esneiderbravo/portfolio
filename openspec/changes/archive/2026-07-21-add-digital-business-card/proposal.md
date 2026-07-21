# Proposal: add-digital-business-card

## Why

In-person networking (meetups, conferences, potential partners) currently has no fast path from a handshake to a saved contact. A printed/physical card with a QR code should land people on a polished digital business card where they can save the contact in one tap (iOS/Android), book a call, and reach every channel — turning brief encounters into durable connections.

## What Changes

- New route `app/card/page.tsx` (`/card`) — a focused, mobile-first digital business card: photo/brand mark, name, role, one-line pitch, and action shortcuts. Visually consistent with the existing `{eb}` brand (dark theme, cyan accent).
- **Save contact** action: downloads a `.vcf` (vCard 4.0) served from `public/` so iOS and Android open the native "add contact" flow directly.
- **Book a call** action: prominent CTA linking to a scheduling service (Calendly/Cal.com URL stored in content, not hardcoded).
- Recommended shortcuts: WhatsApp direct chat (`wa.me` deep link), email (`mailto:`), LinkedIn, GitHub, portfolio home, and native **share** via Web Share API with clipboard fallback.
- QR code pointing to `https://esneiderbravo.dev/card`, generated once by a repo script into `public/qr/` (SVG + print-ready PNG) for use on the physical card.
- New `businessCard` block in `src/content/portfolio.ts` + matching types in `src/types/portfolio.ts` (phone/WhatsApp number, scheduling URL, pitch copy).
- All page strings added to `src/i18n/translations.ts` in EN and ES; locale toggle reuses `useLocale`.
- Page metadata (title, description, OpenGraph) so shared links look professional.

## Capabilities

### New Capabilities

- `business-card-page`: the `/card` route — layout, branding, action shortcuts, locale behavior, and metadata.
- `contact-vcard`: vCard file content, encoding, and download behavior on iOS/Android.
- `qr-card-assets`: generation script and committed QR assets for the physical card.

### Modified Capabilities

- `portfolio-content`: content model gains a `businessCard` section (contact channels, scheduling URL, pitch) validated by existing content tests.

## Impact

- New: `app/card/page.tsx` (+ client component), `public/esneider-bravo.vcf`, `public/qr/*`, `scripts/generate-qr.mjs`.
- Modified: `src/content/portfolio.ts`, `src/types/portfolio.ts`, `src/i18n/translations.ts`, `app/sitemap.ts`, `app/globals.css`, `tests/content.test.ts`.
- Dependency (flagged): `qrcode` as a **devDependency** only, used by the one-shot generation script — no runtime dependency added.

## Non-goals

- No physical card print design (only the QR assets it needs).
- No backend, forms, or analytics; scheduling stays on the external provider.
- No NFC support and no dynamic per-visitor QR codes.
- No changes to the home (`/`) or `/cv` layouts beyond the sitemap entry.
