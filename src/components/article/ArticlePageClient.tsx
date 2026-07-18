'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useSyncExternalStore } from 'react'

import {
  getRatings,
  getReads,
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
import type { TocEntry } from '@/src/lib/article'

/** One rendered locale variant of an article. */
export type ArticleVersion = {
  title: string
  description: string
  /** Article body rendered to HTML by `src/lib/article.ts`. */
  html: string
  /** `<h2>` headings for the in-page table of contents. */
  toc: TocEntry[]
  readingTimeMinutes: number
}

/** A "keep reading" suggestion shown at the foot of an article. */
export type RelatedArticle = {
  slug: string
  title: string
  date: string
  readingTimeMinutes: number
  tags: string[]
}

/** Build-time payload embedding both locales so the toggle needs no navigation. */
export type ArticlePagePayload = {
  slug: string
  date: string
  updated?: string
  tags: string[]
  /** Chronological edition number (`08`), shown on the cover. */
  edition: string
  related: Record<Locale, RelatedArticle[]>
  versions: Record<Locale, ArticleVersion>
}

/** Number of `.article-art--v*` gradient variants defined in `globals.css`. */
const ART_VARIANT_COUNT = 3

/** Compact "1.2k" formatting for read counts. */
function formatViews(views: number): string {
  if (views < 1000) return String(views)
  return `${(views / 1000).toFixed(1).replace('.0', '')}k`
}

/** Tag pill color cycles cyan → green → neutral to match the design. */
function tagVariant(index: number): string {
  if (index === 0) return 'article-tag--cyan'
  if (index === 1) return 'article-tag--green'
  return 'article-tag--muted'
}

/** Interactive 1–5 star control bound to this visitor's stored rating. */
function StarRating({
  slug,
  userRating,
  size,
  label,
}: {
  slug: string
  userRating: number
  size: 'sm' | 'lg'
  label: string
}) {
  return (
    <div className={`star-rating star-rating--${size}`} role="group" aria-label={label}>
      {[1, 2, 3, 4, 5].map((stars) => (
        <button
          key={stars}
          type="button"
          className={`star-rating__btn${stars <= userRating ? ' is-active' : ''}`}
          aria-pressed={stars <= userRating}
          aria-label={label.replace('{n}', String(stars))}
          onClick={() => rateArticle(slug, stars)}
        >
          <span className="material-symbols-outlined icon-filled" aria-hidden="true">
            star
          </span>
        </button>
      ))}
    </div>
  )
}

/**
 * Article reading view (Articulo): reading-progress bar, back link, colored
 * tag pills, title/lead, author + date + reads meta, edition cover, a sticky
 * rating + read-mark bar, a table of contents, the rendered markdown body, a
 * "was this helpful" star prompt, author bio, related articles, and footer.
 * Community stats (reads, votes, view boosts) persist in `localStorage`.
 */
export function ArticlePageClient({ article }: { article: ArticlePagePayload }) {
  const locale = useLocale()
  const t = translations[locale]
  const version = article.versions[locale]
  const related = article.related[locale]
  const { profile } = portfolioContent

  const reads = useSyncExternalStore(subscribeToCommunity, getReads, getServerReads)
  const ratings = useSyncExternalStore(subscribeToCommunity, getRatings, getServerRatings)
  const viewBoosts = useSyncExternalStore(subscribeToCommunity, getViewBoosts, getServerViewBoosts)

  const [progress, setProgress] = useState(0)

  // Count one local read of this article, once per mount.
  useEffect(() => {
    registerView(article.slug)
  }, [article.slug])

  // Reading progress bar. Passive scroll + rAF throttle; cleaned up on unmount.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? Math.min(1, doc.scrollTop / max) : 0)
    }
    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const baseline = communityBaselines[article.slug] ?? DEFAULT_BASELINE
  const userRating = ratings[article.slug] ?? 0
  const isRead = Boolean(reads[article.slug])
  const views = baseline.views + (viewBoosts[article.slug] ?? 0)
  const ratingCount = baseline.ratingCount + (userRating > 0 ? 1 : 0)
  const ratingAvg =
    ratingCount > 0 ? (baseline.ratingAvg * baseline.ratingCount + userRating) / ratingCount : 0

  const editionVariant = (Number(article.edition) - 1 + ART_VARIANT_COUNT) % ART_VARIANT_COUNT
  const ratingHint =
    userRating > 0
      ? t.article.ratingHintVoted.replace('{n}', String(userRating))
      : t.article.ratingHintPrompt

  return (
    <>
      <div className="site-backdrop" aria-hidden="true">
        <div className="site-backdrop__aurora" />
        <div className="site-backdrop__grid" />
        <div className="site-backdrop__grain" />
      </div>

      <div className="reading-progress" aria-hidden="true">
        <div className="reading-progress__bar" style={{ transform: `scaleX(${progress})` }} />
      </div>

      <SiteHeader locale={locale} onLocaleChange={setStoredLocale} active="home" />

      <main className="page-shell article-page-shell">
        <article className="article-page">
          <Link href="/" className="article-back">
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_back
            </span>
            {t.article.backToArticles}
          </Link>

          <header className="article-header">
            <ul className="article-tags">
              {article.tags.map((tag, index) => (
                <li key={tag} className={`article-tag ${tagVariant(index)}`}>
                  {tag}
                </li>
              ))}
            </ul>
            <h1 className="article-title">{version.title}</h1>
            <p className="article-lead">{version.description}</p>
            <div className="article-byline">
              <span className="article-byline__author">
                <Image
                  src="/profile.png"
                  alt={profile.name}
                  width={30}
                  height={30}
                  className="article-byline__avatar"
                />
                {profile.name}
              </span>
              <span aria-hidden="true">·</span>
              <time dateTime={article.date}>{formatArticleDate(article.date, locale)}</time>
              <span aria-hidden="true">·</span>
              <span>
                {version.readingTimeMinutes} {t.article.minRead}
              </span>
              <span aria-hidden="true">·</span>
              <span className="article-byline__views">
                <span className="material-symbols-outlined" aria-hidden="true">
                  visibility
                </span>
                {formatViews(views)} {t.article.readsLabel}
              </span>
            </div>
          </header>

          <div
            className={`article-cover article-art article-art--v${editionVariant}`}
            aria-hidden="true"
          >
            <span className="article-art__number">{article.edition}</span>
            <span className="article-art__tags">{`// ${article.tags.slice(0, 3).join(' · ')}`}</span>
          </div>

          <div className="article-actionbar">
            <div className="article-actionbar__rating">
              {ratingCount > 0 && (
                <span className="article-actionbar__avg">
                  <span className="material-symbols-outlined icon-filled" aria-hidden="true">
                    star
                  </span>
                  {ratingAvg.toFixed(1)}
                  <span className="article-actionbar__count">({ratingCount})</span>
                </span>
              )}
              <span className="article-actionbar__divider" aria-hidden="true" />
              <span className="article-actionbar__vote">
                <span className="article-actionbar__vote-label">{t.article.yourVote}</span>
                <StarRating
                  slug={article.slug}
                  userRating={userRating}
                  size="sm"
                  label={t.article.starLabel}
                />
              </span>
            </div>
            <button
              type="button"
              className={`read-toggle${isRead ? ' is-read' : ''}`}
              aria-pressed={isRead}
              onClick={() => toggleRead(article.slug)}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                check
              </span>
              {isRead ? t.article.readBadge : t.article.markRead}
            </button>
          </div>

          {version.toc.length > 0 && (
            <nav className="article-toc" aria-label={t.article.tocTitle}>
              <span className="article-toc__label">{t.article.tocTitle}</span>
              {version.toc.map((entry) => (
                <a key={entry.id} href={`#${entry.id}`} className="article-toc__link">
                  {entry.text}
                </a>
              ))}
            </nav>
          )}

          {/* Author-controlled markdown from this repo — no user input (design D3). */}
          <div className="article-prose" dangerouslySetInnerHTML={{ __html: version.html }} />

          <div className="rating-prompt">
            <p className="rating-prompt__title">{t.article.ratingPrompt}</p>
            <StarRating
              slug={article.slug}
              userRating={userRating}
              size="lg"
              label={t.article.starLabel}
            />
            <p className="rating-prompt__hint">{ratingHint}</p>
          </div>

          <aside className="article-bio">
            <Image
              src="/profile.png"
              alt={profile.name}
              width={56}
              height={56}
              className="article-bio__avatar"
            />
            <div className="article-bio__body">
              <h2>{profile.name}</h2>
              <p>{t.article.authorBody}</p>
            </div>
          </aside>

          {related.length > 0 && (
            <section className="article-related" aria-label={t.article.keepReading}>
              <h2 className="article-related__title">{t.article.keepReading}</h2>
              <div className="article-related__grid">
                {related.map((item, index) => (
                  <Link key={item.slug} href={`/article/${item.slug}`} className="related-card">
                    <div
                      className={`related-card__cover article-art article-art--v${index % ART_VARIANT_COUNT}`}
                      aria-hidden="true"
                    >
                      <span className="article-art__tags">{`// ${item.tags.slice(0, 3).join(' · ')}`}</span>
                    </div>
                    <div className="related-card__body">
                      <p className="related-card__meta">
                        {formatArticleDate(item.date, locale)} · {item.readingTimeMinutes}{' '}
                        {t.article.minRead}
                      </p>
                      <h3 className="related-card__title">{item.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <footer className="article-page-footer">
            <Link href="/">← {t.article.allArticlesLink}</Link>
            <span>© 2026 Esneider Bravo</span>
          </footer>
        </article>
      </main>
    </>
  )
}
