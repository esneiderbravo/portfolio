'use client'

/**
 * Shared locale state for every route (`/`, `/article/[slug]`, `/cv`).
 *
 * The choice is persisted in `localStorage` and read through
 * `useSyncExternalStore` so SSR HTML always hydrates as EN and the stored
 * preference applies right after hydration without a mismatch error.
 */

import { useEffect, useSyncExternalStore } from 'react'

import type { Locale } from '@/src/i18n/translations'

const LOCALE_STORAGE_KEY = 'portfolio-locale'
const LOCALE_CHANGE_EVENT = 'portfolio-locale-change'

/** Preferred locale on the client: stored choice, else browser language. */
function readPreferredLocale(): Locale {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
  if (stored === 'en' || stored === 'es') return stored
  if (navigator.language.toLowerCase().startsWith('es')) return 'es'
  return 'en'
}

/** Server (and hydration) snapshot — must be stable so SSR HTML matches. */
function getServerLocale(): Locale {
  return 'en'
}

/** Subscribes to locale changes from this tab and from other tabs. */
function subscribeToLocale(onStoreChange: () => void): () => void {
  window.addEventListener('storage', onStoreChange)
  window.addEventListener(LOCALE_CHANGE_EVENT, onStoreChange)
  return () => {
    window.removeEventListener('storage', onStoreChange)
    window.removeEventListener(LOCALE_CHANGE_EVENT, onStoreChange)
  }
}

/** Persists the chosen locale and notifies subscribers in this tab. */
export function setStoredLocale(locale: Locale): void {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT))
}

/** Active locale, kept in sync with `localStorage` and `<html lang>`. */
export function useLocale(): Locale {
  const locale = useSyncExternalStore(subscribeToLocale, readPreferredLocale, getServerLocale)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return locale
}
