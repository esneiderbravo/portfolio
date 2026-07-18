'use client'

/**
 * Per-visitor community state (read marks, star ratings, view boosts) backed
 * by `localStorage` and exposed through `useSyncExternalStore`-compatible
 * subscribe/snapshot functions, so SSR HTML always hydrates with the empty
 * baseline and the stored state applies right after hydration (same pattern
 * as `useLocale`).
 */

const KEYS = {
  reads: 'eb-article-reads',
  ratings: 'eb-article-ratings',
  views: 'eb-article-view-boosts',
} as const

const CHANGE_EVENT = 'eb-community-change'

/** Slugs the visitor marked as read. */
export type ReadsMap = Record<string, boolean>
/** The visitor's star rating (1–5) per slug. */
export type RatingsMap = Record<string, number>
/** How many times the visitor opened each article here. */
export type ViewBoostMap = Record<string, number>

const EMPTY_READS: ReadsMap = {}
const EMPTY_RATINGS: RatingsMap = {}
const EMPTY_VIEWS: ViewBoostMap = {}

// Snapshot cache keyed by storage key: `useSyncExternalStore` needs the same
// reference back while the underlying raw string has not changed.
const cache: Record<string, { raw: string | null; value: unknown }> = {}

function getStored<T>(key: string, empty: T): T {
  const raw = localStorage.getItem(key)
  const cached = cache[key]
  if (cached && cached.raw === raw) return cached.value as T
  let value: T
  try {
    value = raw ? (JSON.parse(raw) as T) : empty
  } catch {
    value = empty
  }
  cache[key] = { raw, value }
  return value
}

function writeStored(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Private mode / quota errors: state still works for this render pass.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

/** Subscribes to community-state changes from this tab and other tabs. */
export function subscribeToCommunity(onStoreChange: () => void): () => void {
  window.addEventListener('storage', onStoreChange)
  window.addEventListener(CHANGE_EVENT, onStoreChange)
  return () => {
    window.removeEventListener('storage', onStoreChange)
    window.removeEventListener(CHANGE_EVENT, onStoreChange)
  }
}

export const getReads = (): ReadsMap => getStored(KEYS.reads, EMPTY_READS)
export const getRatings = (): RatingsMap => getStored(KEYS.ratings, EMPTY_RATINGS)
export const getViewBoosts = (): ViewBoostMap => getStored(KEYS.views, EMPTY_VIEWS)

export const getServerReads = (): ReadsMap => EMPTY_READS
export const getServerRatings = (): RatingsMap => EMPTY_RATINGS
export const getServerViewBoosts = (): ViewBoostMap => EMPTY_VIEWS

/** Toggles the read mark for a slug. */
export function toggleRead(slug: string): void {
  const next = { ...getReads() }
  if (next[slug]) delete next[slug]
  else next[slug] = true
  writeStored(KEYS.reads, next)
}

/** Sets the visitor's rating for a slug; voting the same value clears it. */
export function rateArticle(slug: string, stars: number): void {
  const next = { ...getRatings() }
  if (next[slug] === stars) delete next[slug]
  else next[slug] = stars
  writeStored(KEYS.ratings, next)
}

/** Counts one more local open of an article (called when navigating to it). */
export function registerView(slug: string): void {
  const next = { ...getViewBoosts() }
  next[slug] = (next[slug] ?? 0) + 1
  writeStored(KEYS.views, next)
}
