'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState, useSyncExternalStore } from 'react'

import {
  getReads,
  getRatings,
  getServerRatings,
  getServerReads,
  getServerViewBoosts,
  getViewBoosts,
  rateArticle,
  registerView,
  subscribeToCommunity,
  toggleRead,
} from '@/src/components/article/communityStore'
import { formatArticleDate } from '@/src/components/article/formatArticleDate'
import { SiteHeader } from '@/src/components/article/SiteHeader'
import { setStoredLocale, useLocale } from '@/src/components/article/useLocale'
import { communityBaselines, DEFAULT_BASELINE } from '@/src/content/communityStats'
import { portfolioContent } from '@/src/content/portfolio'
import { translations, type Locale } from '@/src/i18n/translations'
import type { ArticleSummary } from '@/src/types/article'

type ArticleHomeProps = {
  /** Article summaries for both locales, loaded at build time (design D4). */
  articles: Record<Locale, ArticleSummary[]>
}

/** Number of `.article-art--v*` gradient variants defined in `globals.css`. */
const ART_VARIANT_COUNT = 3

/** Cards revealed per "load more" step. */
const PAGE_SIZE = 6

type SortKey = 'recent' | 'read' | 'rated' | 'trending'
type ReadFilter = 'all' | 'unread' | 'read'

/** Article enriched with community stats (baseline + this visitor's state). */
type CommunityArticle = ArticleSummary & {
  views: number
  ratingAvg: number
  ratingCount: number
  userRating: number
  isRead: boolean
  /** Freshness-weighted popularity score for the Trending sort. */
  trend: number
  /** Chronological edition label: the oldest article is 01. */
  edition: string
}

/** Compact "1.2k" formatting for read counts. */
function formatViews(views: number): string {
  if (views < 1000) return String(views)
  return `${(views / 1000).toFixed(1).replace('.0', '')}k`
}

/**
 * Decorative gradient cover for an article: token-colored radials (variant
 * cycles by grid position), the edition number, and the leading tags as a
 * code-comment label.
 */
function ArticleArt({
  article,
  variant,
  edition,
}: {
  article: ArticleSummary
  variant: number
  edition?: string
}) {
  return (
    <div className={`article-art article-art--v${variant % ART_VARIANT_COUNT}`} aria-hidden="true">
      {edition ? <span className="article-art__number">{edition}</span> : null}
      <span className="article-art__tags">{`// ${article.tags.slice(0, 3).join(' · ')}`}</span>
    </div>
  )
}

/** Interactive 1–5 star control bound to this visitor's stored rating. */
function StarRating({ article, locale }: { article: CommunityArticle; locale: Locale }) {
  const t = translations[locale]
  return (
    <div className="star-rating" role="group" aria-label={t.article.yourVote}>
      {[1, 2, 3, 4, 5].map((stars) => (
        <button
          key={stars}
          type="button"
          className={`star-rating__btn${stars <= article.userRating ? ' is-active' : ''}`}
          aria-pressed={stars <= article.userRating}
          aria-label={t.article.starLabel.replace('{n}', String(stars))}
          onClick={() => rateArticle(article.slug, stars)}
        >
          <span className="material-symbols-outlined icon-filled" aria-hidden="true">
            star
          </span>
        </button>
      ))}
    </div>
  )
}

/** Community article card: cover, badges, stats, vote row, and read CTA. */
function ArticleCard({
  article,
  variant,
  locale,
  isNewest,
}: {
  article: CommunityArticle
  variant: number
  locale: Locale
  isNewest: boolean
}) {
  const t = translations[locale]
  return (
    <article className={`article-card${article.isRead ? ' is-read' : ''}`}>
      <div className="article-card__cover">
        <ArticleArt article={article} variant={variant} edition={article.edition} />
        {article.isRead && (
          <span className="article-card__read-badge">
            <span className="material-symbols-outlined" aria-hidden="true">
              check
            </span>
            {t.article.readBadge}
          </span>
        )}
      </div>

      <div className="article-card__body">
        <p className="article-card__meta">
          {article.featured && <span className="article-badge">{t.article.featuredBadge}</span>}
          {isNewest && (
            <span className="article-badge article-badge--latest">{t.article.latestBadge}</span>
          )}
          <time dateTime={article.date}>{formatArticleDate(article.date, locale)}</time>
          <span aria-hidden="true">·</span>
          <span>
            {article.readingTimeMinutes} {t.article.minRead}
          </span>
        </p>
        <h3 className="article-card__title">{article.title}</h3>
        <p className="article-card__description">{article.description}</p>

        <div className="article-card__stats">
          <span className="article-card__stat">
            <span className="material-symbols-outlined" aria-hidden="true">
              visibility
            </span>
            {formatViews(article.views)} {t.article.readsLabel}
          </span>
          {article.ratingCount > 0 && (
            <span className="article-card__stat article-card__stat--rating">
              <span className="material-symbols-outlined icon-filled" aria-hidden="true">
                star
              </span>
              {article.ratingAvg.toFixed(1)}{' '}
              <span className="article-card__stat-count">({article.ratingCount})</span>
            </span>
          )}
        </div>

        <div className="article-card__actions">
          <div className="article-card__vote">
            <span className="article-card__vote-label">{t.article.yourVote}</span>
            <StarRating article={article} locale={locale} />
          </div>
          <button
            type="button"
            className={`read-toggle${article.isRead ? ' is-read' : ''}`}
            aria-pressed={article.isRead}
            onClick={() => toggleRead(article.slug)}
          >
            {article.isRead ? t.article.markedRead : t.article.markRead}
          </button>
        </div>

        <Link
          href={`/article/${article.slug}`}
          className="article-card__cta"
          onClick={() => registerView(article.slug)}
        >
          {t.article.readArticle}
          <span className="material-symbols-outlined" aria-hidden="true">
            arrow_forward
          </span>
        </Link>
      </div>
    </article>
  )
}

/**
 * Community home page (Comunidad Blog): hero with live stats, top-3 rated
 * strip, a sticky search/sort/filter bar, the article grid with per-visitor
 * star votes and read marks (persisted in `localStorage`, no backend),
 * "load more" pagination, the author card, and a slim footer.
 */
export function ArticleHome({ articles }: ArticleHomeProps) {
  const locale = useLocale()
  const t = translations[locale]

  const reads = useSyncExternalStore(subscribeToCommunity, getReads, getServerReads)
  const ratings = useSyncExternalStore(subscribeToCommunity, getRatings, getServerRatings)
  const viewBoosts = useSyncExternalStore(subscribeToCommunity, getViewBoosts, getServerViewBoosts)

  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [sort, setSort] = useState<SortKey>('recent')
  const [readFilter, setReadFilter] = useState<ReadFilter>('all')
  const [page, setPage] = useState(1)
  // Captured once at mount so the trending score stays stable across renders.
  const [nowMs] = useState(() => Date.now())

  const list = articles[locale]

  /** Baseline stats + this visitor's votes/reads layered on every article. */
  const enriched = useMemo<CommunityArticle[]>(() => {
    return list.map((article, index) => {
      const base = communityBaselines[article.slug] ?? DEFAULT_BASELINE
      const userRating = ratings[article.slug] ?? 0
      const ratingCount = base.ratingCount + (userRating > 0 ? 1 : 0)
      const ratingSum = base.ratingAvg * base.ratingCount + userRating
      const ratingAvg = ratingCount > 0 ? ratingSum / ratingCount : 0
      const views = base.views + (viewBoosts[article.slug] ?? 0)
      const ageDays = Math.max(
        1,
        (nowMs - new Date(`${article.date}T00:00:00Z`).getTime()) / 86400000,
      )
      return {
        ...article,
        views,
        ratingAvg,
        ratingCount,
        userRating,
        isRead: Boolean(reads[article.slug]),
        trend: (views * ratingAvg) / Math.pow(ageDays + 3, 0.55),
        edition: String(list.length - index).padStart(2, '0'),
      }
    })
  }, [list, reads, ratings, viewBoosts, nowMs])

  /** Tag → article count, most-used first, alphabetical tie-break. */
  const tagCounts = useMemo(() => {
    const counts = new Map<string, number>()
    for (const article of list) {
      for (const tag of article.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  }, [list])

  const totalReads = enriched.reduce((sum, article) => sum + article.views, 0)
  const rated = enriched.filter((article) => article.ratingCount > 0)
  const averageRating =
    rated.length > 0
      ? (rated.reduce((sum, article) => sum + article.ratingAvg, 0) / rated.length).toFixed(1)
      : '0.0'

  const topRated = useMemo(
    () =>
      enriched
        .filter((article) => article.ratingCount > 0)
        .sort((a, b) => b.ratingAvg - a.ratingAvg || b.ratingCount - a.ratingCount)
        .slice(0, 3),
    [enriched],
  )

  const needle = query.trim().toLowerCase()
  const filtering = needle !== '' || activeTag !== null || readFilter !== 'all'

  const matched = useMemo(() => {
    const compare: Record<SortKey, (a: CommunityArticle, b: CommunityArticle) => number> = {
      recent: (a, b) => b.date.localeCompare(a.date),
      read: (a, b) => b.views - a.views,
      rated: (a, b) => b.ratingAvg - a.ratingAvg || b.ratingCount - a.ratingCount,
      trending: (a, b) => b.trend - a.trend,
    }
    return enriched
      .filter((article) => {
        if (activeTag && !article.tags.includes(activeTag)) return false
        if (readFilter === 'read' && !article.isRead) return false
        if (readFilter === 'unread' && article.isRead) return false
        if (needle === '') return true
        return (
          article.title.toLowerCase().includes(needle) ||
          article.description.toLowerCase().includes(needle) ||
          article.tags.some((tag) => tag.includes(needle))
        )
      })
      .sort(compare[sort])
  }, [enriched, activeTag, readFilter, needle, sort])

  const shown = matched.slice(0, page * PAGE_SIZE)
  const hasMore = matched.length > shown.length
  const newestSlug = list[0]?.slug

  const resultMeta =
    matched.length === 1
      ? t.article.resultMetaOne
      : t.article.resultMeta
          .replace('{shown}', String(shown.length))
          .replace('{matched}', String(matched.length))

  const sortOptions: { key: SortKey; label: string }[] = [
    { key: 'recent', label: t.article.sortRecent },
    { key: 'read', label: t.article.sortMostRead },
    { key: 'rated', label: t.article.sortTopRated },
    { key: 'trending', label: t.article.sortTrending },
  ]
  const readOptions: { key: ReadFilter; label: string }[] = [
    { key: 'all', label: t.article.filterAll },
    { key: 'unread', label: t.article.filterUnread },
    { key: 'read', label: t.article.filterRead },
  ]

  const clearFilters = () => {
    setQuery('')
    setActiveTag(null)
    setReadFilter('all')
    setPage(1)
  }

  const { profile } = portfolioContent

  return (
    <>
      <div className="site-backdrop" aria-hidden="true">
        <div className="site-backdrop__aurora" />
        <div className="site-backdrop__grid" />
        <div className="site-backdrop__grain" />
      </div>

      <SiteHeader locale={locale} onLocaleChange={setStoredLocale} active="home" />

      <main className="page-shell article-shell">
        <section className="article-hero">
          <div className="article-hero__copy">
            <p className="article-hero__kicker">{t.article.heroKicker}</p>
            <h1 className="article-hero__title">
              {t.article.heroTitle}{' '}
              <span className="article-hero__accent">{t.article.heroTitleAccent}</span>{' '}
              {t.article.heroTitleEnd}
            </h1>
            <p className="article-hero__lead">{t.article.heroLead}</p>
          </div>
          <div className="article-hero__stats">
            <div className="hero-stat">
              <strong>{list.length}</strong>
              <span>{t.article.statArticles}</span>
            </div>
            <div className="hero-stat">
              <strong>{formatViews(totalReads)}</strong>
              <span>{t.article.statReads}</span>
            </div>
            <div className="hero-stat hero-stat--rating">
              <strong>{averageRating}</strong>
              <span>{t.article.statRating}</span>
            </div>
          </div>
        </section>

        {topRated.length > 0 && (
          <section className="top-rated" aria-label={t.article.topRatedTitle}>
            <div className="article-section__head">
              <h2 className="top-rated__title">
                <span className="material-symbols-outlined icon-filled" aria-hidden="true">
                  star
                </span>
                {t.article.topRatedTitle}
              </h2>
              <span className="top-rated__tag">{t.article.topRatedTag}</span>
            </div>
            <div className="top-rated__grid">
              {topRated.map((article, index) => (
                <Link
                  key={article.slug}
                  href={`/article/${article.slug}`}
                  className="top-rated__card"
                  onClick={() => registerView(article.slug)}
                >
                  <span className="top-rated__rank">{String(index + 1).padStart(2, '0')}</span>
                  <div className="top-rated__info">
                    <h3>{article.title}</h3>
                    <p>
                      <span className="top-rated__avg">
                        <span className="material-symbols-outlined icon-filled" aria-hidden="true">
                          star
                        </span>
                        {article.ratingAvg.toFixed(1)}
                      </span>
                      <span className="top-rated__views">
                        <span className="material-symbols-outlined" aria-hidden="true">
                          visibility
                        </span>
                        {formatViews(article.views)} {t.article.readsLabel}
                      </span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="filter-bar">
          <div className="filter-bar__search">
            <span className="material-symbols-outlined" aria-hidden="true">
              search
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setPage(1)
              }}
              placeholder={t.article.searchPlaceholder}
              aria-label={t.article.searchPlaceholder}
            />
          </div>
          <div className="filter-bar__controls">
            <div className="seg-group" role="group" aria-label={t.article.sortRecent}>
              {sortOptions.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  className={`seg-btn${sort === option.key ? ' is-active' : ''}`}
                  aria-pressed={sort === option.key}
                  onClick={() => {
                    setSort(option.key)
                    setPage(1)
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="seg-group" role="group" aria-label={t.article.filterAll}>
              {readOptions.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  className={`seg-btn${readFilter === option.key ? ' is-active' : ''}`}
                  aria-pressed={readFilter === option.key}
                  onClick={() => {
                    setReadFilter(option.key)
                    setPage(1)
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-bar__chips" role="group" aria-label={t.article.allTopics}>
            <button
              type="button"
              className={`filter-chip${activeTag === null ? ' is-active' : ''}`}
              aria-pressed={activeTag === null}
              onClick={() => {
                setActiveTag(null)
                setPage(1)
              }}
            >
              {t.article.allTopics}
            </button>
            {tagCounts.map(([tag, count]) => (
              <button
                key={tag}
                type="button"
                className={`filter-chip${activeTag === tag ? ' is-active' : ''}`}
                aria-pressed={activeTag === tag}
                onClick={() => {
                  setActiveTag(activeTag === tag ? null : tag)
                  setPage(1)
                }}
              >
                {tag}
                <span className="filter-chip__count">{count}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="result-bar">
          <p className="result-bar__meta">
            {matched.length === 0 ? t.article.emptyTitle : resultMeta}
          </p>
          {filtering && (
            <button type="button" className="article-clear" onClick={clearFilters}>
              <span className="material-symbols-outlined" aria-hidden="true">
                close
              </span>
              {t.article.clearFilters}
            </button>
          )}
        </div>

        {matched.length === 0 ? (
          <div className="article-empty">
            <p className="article-empty__title">{t.article.emptyTitle}</p>
            <p>{t.article.emptyState}</p>
          </div>
        ) : (
          <div className="article-grid">
            {shown.map((article, index) => (
              <ArticleCard
                key={article.slug}
                article={article}
                variant={index}
                locale={locale}
                isNewest={article.slug === newestSlug}
              />
            ))}
          </div>
        )}

        {hasMore && (
          <div className="load-more">
            <button type="button" className="load-more__btn" onClick={() => setPage(page + 1)}>
              {t.article.loadMore}
              <span className="material-symbols-outlined" aria-hidden="true">
                expand_more
              </span>
            </button>
          </div>
        )}

        <section className="article-author" aria-label={profile.name}>
          <div className="article-author__intro">
            <Image
              src="/profile.png"
              alt={profile.name}
              className="article-author__avatar"
              width={60}
              height={60}
            />
            <div className="article-author__body">
              <h2>{profile.name}</h2>
              <p>{t.article.authorBody}</p>
            </div>
          </div>
          <div className="article-author__actions">
            <Link className="hero-btn hero-btn--primary" href="/cv">
              {t.article.viewCv}
              <span className="material-symbols-outlined" aria-hidden="true">
                arrow_forward
              </span>
            </Link>
            <p className="article-author__links">
              {profile.socialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </p>
          </div>
        </section>
      </main>

      <footer className="article-footer">
        <span>{t.article.footerNote}</span>
        <span>© 2026 Esneider Bravo</span>
      </footer>
    </>
  )
}
