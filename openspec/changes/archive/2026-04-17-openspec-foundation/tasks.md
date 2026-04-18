## 1. Portfolio Content Spec

- [x] 1.1 Verify `tests/content.test.ts` covers all requirements in `specs/portfolio-content/spec.md` — add missing assertions for skill groups and certifications if needed
- [x] 1.2 Run `npm test` to confirm all portfolio-content scenarios pass green

## 2. SEO Discoverability Spec

- [x] 2.1 Manually verify OG tags are present in the rendered HTML (`curl https://esneiderbravo.dev | grep og:`)
- [x] 2.2 Manually verify JSON-LD blocks are present (Person + WebSite schemas) in the rendered HTML
- [x] 2.3 Verify `/sitemap.xml` returns the root URL with priority 1
- [x] 2.4 Verify `/robots.txt` allows `*` on `/` and disallows `/api/`

## 3. i18n Spec

- [x] 3.1 Audit `src/i18n/translations.ts` — confirm every EN key listed in the spec has a non-empty value
- [x] 3.2 Audit ES locale — confirm all UI-chrome keys (nav, hero, about, CTA, skills, experience, education, certifications, ai) are non-empty
- [x] 3.3 Confirm ES `projects.summaries` and `projects.impacts` are intentionally empty and add an inline comment in `translations.ts` documenting this as by design
- [x] 3.4 Run `npm run typecheck` to confirm no type errors after any edits

## 4. Final Verification

- [x] 4.1 Run `npm run validate` (lint → typecheck → test → build) — all steps must pass
