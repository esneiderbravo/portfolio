/**
 * Baseline community stats per article slug: seed numbers for the community
 * home (reads, average rating, rating count). The site has no backend, so
 * these are static baselines; each visitor's own reads/votes are layered on
 * top from `localStorage` (see `src/components/article/communityStore.ts`).
 */

export type CommunityBaseline = {
  /** Baseline read count shown before the visitor's own opens are added. */
  views: number
  /** Baseline average rating (0–5). */
  ratingAvg: number
  /** Number of ratings behind `ratingAvg`. */
  ratingCount: number
}

/** Articles without an entry fall back to zeros (rating hidden until voted). */
export const DEFAULT_BASELINE: CommunityBaseline = { views: 0, ratingAvg: 0, ratingCount: 0 }

export const communityBaselines: Record<string, CommunityBaseline> = {
  'building-a-bilingual-blog-with-nextjs': { views: 1240, ratingAvg: 4.8, ratingCount: 32 },
  'fastapi-service-checklist': { views: 2130, ratingAvg: 4.9, ratingCount: 54 },
  'rag-in-production-lessons-from-chatbook': { views: 3480, ratingAvg: 4.9, ratingCount: 71 },
  'ci-cd-without-drama-github-actions-docker': { views: 1890, ratingAvg: 4.6, ratingCount: 41 },
  'clean-architecture-fastapi-without-overengineering': {
    views: 2670,
    ratingAvg: 4.7,
    ratingCount: 63,
  },
  'postgresql-query-optimization-in-fintech': { views: 1420, ratingAvg: 4.5, ratingCount: 29 },
  'practical-tdd-when-it-pays-off': { views: 980, ratingAvg: 4.3, ratingCount: 22 },
  'structured-logging-for-fastapi-observability': { views: 1560, ratingAvg: 4.6, ratingCount: 37 },
  'aws-lambda-cost-tuning-field-notes': { views: 2240, ratingAvg: 4.7, ratingCount: 48 },
  'pydantic-v2-migration-notes': { views: 1780, ratingAvg: 4.8, ratingCount: 44 },
  'designing-tools-for-llm-agents': { views: 2910, ratingAvg: 4.8, ratingCount: 66 },
  'async-sqlalchemy-patterns-that-scale': { views: 1330, ratingAvg: 4.5, ratingCount: 31 },
  'feature-flags-for-small-teams': { views: 870, ratingAvg: 4.4, ratingCount: 19 },
  'api-versioning-that-does-not-hurt': { views: 1150, ratingAvg: 4.6, ratingCount: 26 },
}
