## Context

The portfolio has three mature capabilities with no written requirements: content integrity, SEO discoverability, and i18n. This change creates foundational spec files that capture what the system already does, establishing a stable baseline for all future OpenSpec changes.

This is a documentation-only change — no production code is written or modified.

## Goals / Non-Goals

**Goals:**

- Document existing behavior as testable requirements
- Make the i18n scope boundary explicit (EN required, ES optional for projects)
- Give future proposals a reference point so regressions are caught at spec-review time

**Non-Goals:**

- Does not introduce new features
- Does not cover portfolio presentation/visual layout (deferred)
- Does not cover code-quality tooling (separate `configure-formatter-linters` change)

## Decisions

**Decision: Three separate spec files, not one monolithic spec**
Rationale: Each capability evolves independently. Content changes don't affect SEO requirements; SEO changes don't affect i18n. Keeping them separate avoids merge conflicts and makes diffs readable.

**Decision: Document ES scope as "EN-only for projects is acceptable"**
Rationale: The translations.ts file has empty `summaries` and `impacts` maps for the ES locale. This is intentional — featured project content is long-form and EN-only by design. The spec makes this explicit rather than leaving it as an implied gap.

**Decision: Specs describe current behavior, not aspirational behavior**
Rationale: A foundational spec that describes what the system should do (but doesn't yet do) creates false confidence. All requirements here are verifiable today.

## Risks / Trade-offs

- [Risk: Specs become stale as code evolves] → Mitigation: Every change that modifies content, SEO, or i18n must include a delta spec in its own change artifacts
- [Risk: Specs are too coarse to catch real regressions] → Mitigation: Scenarios are written at the level of existing tests; new tests can be added when scenarios are refined
