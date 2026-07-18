# Design tokens — portfolio

The design system is pure CSS custom properties defined in the `:root` block
of [`app/globals.css`](../app/globals.css). There is no CSS framework and no
UI library — style changes go through these tokens first.

## Tokens (from `app/globals.css`)

| Group | Tokens |
|-------|--------|
| Surfaces | `--midnight` (#0a0f1c), `--charcoal` (#111827), `--charcoal-high`, `--slate` |
| Text | `--text-primary` (#ffffff), `--text-secondary`, `--text-tertiary` |
| Accent | `--accent` (#2563ff), `--accent-deep`, `--accent-text`, `--accent-soft` |
| Borders & grid | `--border`, `--border-strong`, `--grid-line` |
| Radii | `--radius-sm` (6px), `--radius-md` (10px), `--radius-lg` (14px) |
| Effects | `--skew` (-14deg), `--shadow-lift`, `--ease-out` |
| Layout | `--content-max` (1200px), `--content-padding` (clamped; tighter override on small screens) |
| Fonts | `--font-sans` (Geist), `--font-mono` (Geist Mono) |

## Brand assets

| Asset | Path |
|-------|------|
| Logo | `public/brand/logo.png` |
| Company logos | `public/logos/` |
| Profile photo | `public/profile.png` |
| Favicons / touch icons | `public/favicon*.png|ico`, `public/apple-touch-icon.png`, `public/icon-{192x192,512x512}.png` |

## Usage rules

- Never hardcode colors, radii, or spacing that a token already covers — use
  `var(--token)`.
- Responsive behavior is defined per-breakpoint in `globals.css` (single
  stylesheet); match the existing media-query structure when extending it.
