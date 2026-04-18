# esneiderbravo.dev — Personal Portfolio

> **Senior Fullstack Developer & Systems Architect** · 8+ years · Fintech · AI-First

[![Live](https://img.shields.io/badge/Live-esneiderbravo.dev-00e5ff?style=flat-square&logo=vercel&logoColor=white)](https://esneiderbravo.dev)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-69f6b8?style=flat-square)](LICENSE)

---

## Overview

A dark-mode, performance-first personal portfolio built entirely with **Next.js 14 App Router**, **TypeScript**, and pure **CSS** — no UI framework, no bloat. Every section is driven by structured content data, making updates a one-line change.

### Highlights

- ⚡ **Next.js 14 App Router** with full server/client split
- 🌐 **i18n** — English & Spanish, zero external library
- 📱 **Fully responsive** — phone → tablet → laptop → XL desktop
- 🎠 **Experience carousel** — 6 roles with animated slide transitions
- 🍔 **Mobile nav overlay** — hamburger with animated X transform
- 🎯 **Scroll-aware nav** — `IntersectionObserver` with viewport trigger band
- 🧩 **Content-driven** — all data in `src/content/portfolio.ts`
- 🧪 **Vitest** unit tests included

---

## Tech Stack

| Layer      | Technology                                    |
| ---------- | --------------------------------------------- |
| Framework  | Next.js 14 (App Router)                       |
| Language   | TypeScript 5                                  |
| Styling    | Pure CSS — custom design tokens, no framework |
| Icons      | Google Material Symbols Outlined              |
| Fonts      | Inter + Space Grotesk (Google Fonts)          |
| Testing    | Vitest                                        |
| Deployment | Vercel                                        |

---

## Project Structure

```
portfolio/
├── app/
│   ├── page.tsx            # All sections + carousel logic
│   ├── layout.tsx          # Root layout — fonts & metadata
│   └── globals.css         # Design system — tokens, layout, responsive
├── src/
│   ├── content/
│   │   └── portfolio.ts    # ← All content lives here
│   ├── i18n/
│   │   └── translations.ts # EN / ES strings
│   └── types/
│       └── portfolio.ts    # TypeScript types
├── public/
│   └── profile.png
└── tests/
    └── content.test.ts
```

---

## Getting Started

```bash
# Clone
git clone https://github.com/esneiderbravo/portfolio.git
cd portfolio

# Install
npm install

# Dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Customization

All content is decoupled from the UI. To make it your own:

**1. Update your profile** — `src/content/portfolio.ts`

```ts
profile: {
  name: "Your Name",
  email: "you@example.com",
  yearsExperience: "5+",
  socialLinks: [
    { label: "GitHub", href: "https://github.com/you" },
  ],
}
```

**2. Add experience entries**

```ts
experiences: [
  {
    company: 'Acme Corp',
    role: 'Senior Engineer',
    period: 'Jan 2023 – Present',
    current: true,
    bullets: ['Built X', 'Led Y'],
  },
]
```

**3. Update translations** — `src/i18n/translations.ts`

---

## Sections

| Section        | Description                                      |
| -------------- | ------------------------------------------------ |
| **Hero**       | Full-viewport intro — photo, role, bio & socials |
| **About**      | Philosophy quote + body copy                     |
| **Skills**     | 6-group tech grid + core capabilities chips      |
| **Experience** | Animated carousel — 6 roles across 3 companies   |
| **Projects**   | 3 featured projects with impact statements       |
| **Contact**    | CTA → direct WhatsApp link                       |

---

## Responsive Breakpoints

| Breakpoint | Layout                                         |
| ---------- | ---------------------------------------------- |
| `< 640px`  | Single column, hamburger nav                   |
| `≥ 640px`  | 2-col grids, wider padding                     |
| `≥ 920px`  | 2-col hero, 3-col skills/projects, desktop nav |
| `≥ 1280px` | Increased horizontal padding                   |
| `≥ 1440px` | Max padding (15rem per side)                   |

---

## Running Tests

```bash
npm run test
```

---

## Deployment

Optimized for **Vercel** zero-config deployment:

```bash
vercel --prod
```

Or connect the repo to Vercel for automatic deploys on every `main` push.

---

## License

MIT © 2026 [Esneider Bravo](https://github.com/esneiderbravo)

---

<p align="center">
  <strong>ENGINEERED WITH PRECISION</strong>
</p>
