'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'

import { setStoredLocale, useLocale } from '@/src/components/article/useLocale'
import { BrandWordmark } from '@/src/components/BrandWordmark'
import { LocaleSwitch } from '@/src/components/LocaleSwitch'
import { portfolioContent } from '@/src/content/portfolio'
import { translations } from '@/src/i18n/translations'

const CARD_URL = 'https://esneiderbravo.dev/card'

/**
 * Focused digital business card served at `/card` — the landing page for the
 * printed QR code. Everything a new contact needs in one screen: save the
 * vCard, book a call, or open any channel.
 */
export default function CardPageClient() {
  const { profile, businessCard } = portfolioContent
  const locale = useLocale()
  const t = useMemo(() => translations[locale], [locale])
  const [copied, setCopied] = useState(false)

  const whatsappHref = `${businessCard.whatsappUrl}?text=${encodeURIComponent(t.card.whatsappGreeting)}`

  const socialIcons: Record<string, string> = {
    github: 'terminal',
    linkedin: 'hub',
  }

  const handleShare = async () => {
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: profile.name, url: CARD_URL })
      } catch {
        // Visitor dismissed the native share sheet — nothing to do.
      }
      return
    }
    await navigator.clipboard.writeText(CARD_URL)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <div className="site-backdrop" aria-hidden="true">
        <div className="site-backdrop__aurora" />
        <div className="site-backdrop__grid" />
        <div className="site-backdrop__grain" />
      </div>

      <main className="card-shell">
        <header className="card-topbar">
          <Link href="/" className="brand" aria-label="esneiderbravo.dev">
            <BrandWordmark />
          </Link>
          <LocaleSwitch locale={locale} onChange={setStoredLocale} label={t.nav.language} />
        </header>

        <section className="card-panel" aria-labelledby="card-name">
          <div className="card-photo-ring" aria-hidden="true" />
          <div className="card-photo">
            <Image
              src="/profile.png"
              alt={`${profile.name} — ${businessCard.jobTitle}`}
              fill
              priority
              sizes="140px"
              className="card-photo-image"
            />
          </div>

          <p className="card-kicker">{t.card.heading}</p>
          <h1 id="card-name" className="card-name">
            {profile.name}
          </h1>
          <p className="card-role">
            {businessCard.jobTitle} · {businessCard.organization}
          </p>
          <p className="card-pitch">{businessCard.pitch[locale]}</p>

          <div className="card-primary-actions">
            <a className="card-btn card-btn--primary" href="/card/vcard" download>
              <span className="material-symbols-outlined" aria-hidden="true">
                person_add
              </span>
              {t.card.saveContact}
            </a>
            <a
              className="card-btn card-btn--ghost"
              href={businessCard.schedulingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                calendar_month
              </span>
              {t.card.bookCall}
            </a>
          </div>

          <div className="card-shortcuts">
            <a
              className="card-shortcut"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                chat
              </span>
              {t.card.whatsapp}
            </a>
            <a className="card-shortcut" href={`mailto:${profile.email}`}>
              <span className="material-symbols-outlined" aria-hidden="true">
                mail
              </span>
              {t.card.email}
            </a>
            {profile.socialLinks.map((link) => (
              <a
                key={link.label}
                className="card-shortcut"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  {socialIcons[link.label.toLowerCase()] ?? 'link'}
                </span>
                {link.label}
              </a>
            ))}
            <Link className="card-shortcut" href="/cv">
              <span className="material-symbols-outlined" aria-hidden="true">
                language
              </span>
              {t.card.viewPortfolio}
            </Link>
            <button type="button" className="card-shortcut" onClick={() => void handleShare()}>
              <span className="material-symbols-outlined" aria-hidden="true">
                {copied ? 'check' : 'share'}
              </span>
              {copied ? t.card.copied : t.card.share}
            </button>
          </div>
        </section>

        <footer className="card-footer">
          <span>{t.footer.signature}</span>
        </footer>
      </main>
    </>
  )
}
