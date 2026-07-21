# Design: add-digital-business-card

## Context

The portfolio is a static Next.js 16 App Router app with three routes (`/`, `/article/[slug]`, `/cv`). All content lives in `src/content/portfolio.ts`, typed by `src/types/portfolio.ts`; UI strings live in `src/i18n/translations.ts` (EN/ES) and locale state is shared through `useLocale` (`useSyncExternalStore` over `localStorage`). There is no backend. The `/cv` route already follows the pattern this change needs: a thin server `page.tsx` that exports metadata and renders a `'use client'` component (`CvPageClient`).

The goal is a `/card` page reachable from a printed QR code that converts an in-person meeting into a saved contact, a booked call, or an open chat — in one or two taps on a phone.

## Goals / Non-Goals

**Goals:**

- Mobile-first `/card` page, on-brand (`{eb}` wordmark, dark theme, cyan accent), loading fast on conference Wi-Fi.
- One-tap **Save contact** that triggers the native add-contact flow on iOS and Android.
- One-tap **Book a call**, WhatsApp, email, LinkedIn, GitHub, portfolio link, and native share.
- Single source of truth: all contact data comes from `portfolioContent`; the vCard is derived from it, never hand-maintained.
- Print-ready QR assets committed to the repo.

**Non-Goals:**

- Physical card layout/print design, NFC, analytics, per-visitor QR codes, or any backend.

## Decisions

### 1. Route structure: `app/card/page.tsx` + `CardPageClient` (mirror `/cv`)

Server `page.tsx` exports `metadata` (title, description, OpenGraph) and renders a client component that uses `useLocale` and `portfolioContent`. This is the established pattern (`app/cv/CvPageClient.tsx`), so no new architecture. Alternative — rendering the card as another section of `app/page.tsx` — rejected: the QR must land on a focused page with zero portfolio noise.

### 2. vCard served by a route handler, built from content

`src/lib/vcard.ts` exports `buildVCard(profile, businessCard): string` producing **vCard 3.0** (better iOS/Android compatibility than 4.0 for photos and `TEL;TYPE=CELL`). A route handler `app/card/vcard/route.ts` returns it with `Content-Type: text/vcard; charset=utf-8` and `Content-Disposition: attachment; filename="esneider-bravo.vcf"`; with no dynamic APIs used it is statically optimized at build.

Alternatives rejected:
- Committed static `public/*.vcf`: duplicates data already in `portfolio.ts` and will drift.
- Client-side `Blob` download: `data:`/blob URLs do not reliably open the iOS contact sheet; a real URL with correct MIME type does.

The pure `buildVCard` function is unit-testable in Vitest (escaping of `,`/`;`/newlines, CRLF line endings, required `FN`/`N`/`TEL`/`EMAIL`/`URL` fields).

### 3. Content model: `businessCard` block in `portfolioContent`

New type in `src/types/portfolio.ts`:

```ts
export type BusinessCard = {
  phone: string          // E.164, e.g. +57300...
  whatsappUrl: string    // https://wa.me/<number>
  schedulingUrl: string  // Calendly / Cal.com event link
  pitch: { en: string; es: string }
  organization: string
  jobTitle: string
}
```

`PortfolioContent` gains `businessCard: BusinessCard`. Localized `pitch` lives here (content, like project copy) while UI labels ("Save contact", "Book a call"…) go in `translations.ts` — consistent with the existing split.

### 4. QR generation: one-shot script + committed assets

`scripts/generate-qr.mjs` uses the `qrcode` package (**devDependency only** — flagged per repo rules) to emit `public/qr/card-qr.svg` and `public/qr/card-qr-print.png` (1200×1200, error-correction level H so a center `{eb}` mark can overlay it later) encoding `https://esneiderbravo.dev/card`. Run manually (`npm run generate:qr`), assets committed. Alternative — runtime QR component — rejected: adds a runtime dependency for an image that never changes.

### 5. Shortcuts & share behavior

Actions render as large tap targets (min 48px) using existing Material Symbols icons: Save contact (`/card/vcard`), Book a call (`schedulingUrl`, `target="_blank" rel="noopener noreferrer"`), WhatsApp (`wa.me` with a prefilled localized greeting), Email (`mailto:`), LinkedIn, GitHub, View portfolio (`/`), and Share — `navigator.share({ title, url })` when available, else `navigator.clipboard.writeText(url)` with a transient "copied" state.

### 6. SEO surface

Add `/card` to `app/sitemap.ts` and page-level OpenGraph metadata so the link unfurls well in WhatsApp/LinkedIn (reusing the root OG image). The page stays indexable; the phone number is intentionally public via the vCard — acceptable for a networking card and easy to rotate later.

## Risks / Trade-offs

- [Phone number becomes public/scrapeable] → owner-accepted for networking; number lives in one content field and can be swapped or blanked (vCard builder omits empty fields).
- [iOS opens the .vcf as a preview requiring one extra tap] → platform behavior, unavoidable without an app; the preview's "Create New Contact" is the native flow we want.
- [QR asset drifts if the domain/route ever changes] → URL is a constant in `scripts/generate-qr.mjs`; regenerating is one command, and a Vitest check asserts the committed SVG encodes the expected URL string.
- [`qrcode` devDependency adds install weight] → dev-only, zero runtime cost; pinned in `package.json`.

## Open Questions

- ~~Real values needed from the owner before merge~~ Resolved: phone/WhatsApp is `+573195854272`; scheduling uses **Cal.com** (free for individuals — Calendly rejected as paid). URL is `https://cal.com/esneiderbravo`, pending confirmation once the account is created.
- Whether to also expose the card email as the current Gmail or a domain email (`hi@esneiderbravo.dev`) — defaults to `profile.email`.
