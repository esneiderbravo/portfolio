'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { BrandWordmark } from '@/src/components/BrandWordmark'
import { LocaleSwitch } from '@/src/components/LocaleSwitch'
import { translations, type Locale } from '@/src/i18n/translations'

type SiteHeaderProps = {
  locale: Locale
  onLocaleChange: (locale: Locale) => void
  /** Which top-level destination is active, for link highlighting. */
  active?: 'home' | 'cv'
}

/**
 * The single site header shared by every route: brand (links home), the Home
 * link, the View CV call-to-action button, and the locale toggle.
 */
export function SiteHeader({ locale, onLocaleChange, active }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const t = translations[locale]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`nav site-header${scrolled ? ' nav--scrolled' : ''}`}
      aria-label="Main navigation"
    >
      <div className="nav-inner">
        <Link href="/" className="brand" aria-label="esneiderbravo.dev">
          <BrandWordmark />
        </Link>
        <div className="nav-links site-header__links">
          <Link href="/" className={active === 'home' ? 'active' : ''}>
            {t.nav.home}
          </Link>
        </div>
        <Link href="/cv" className={`nav-cta${active === 'cv' ? ' is-active' : ''}`}>
          {t.article.viewCv}
          <span className="material-symbols-outlined" aria-hidden="true">
            arrow_forward
          </span>
        </Link>
        <LocaleSwitch locale={locale} onChange={onLocaleChange} label={t.nav.language} />
      </div>
    </nav>
  )
}
