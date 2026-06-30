import type { Locale } from '@/src/i18n/translations'

const LOCALE_OPTIONS: { value: Locale; label: string; ariaLabel: string }[] = [
  { value: 'en', label: 'EN', ariaLabel: 'English' },
  { value: 'es', label: 'ES', ariaLabel: 'Español' },
]

type LocaleSwitchProps = {
  locale: Locale
  onChange: (locale: Locale) => void
  label: string
  className?: string
  showIcon?: boolean
}

export function LocaleSwitch({
  locale,
  onChange,
  label,
  className = '',
  showIcon = true,
}: LocaleSwitchProps) {
  return (
    <div
      className={`locale-switch${className ? ` ${className}` : ''}`}
      role="radiogroup"
      aria-label={label}
    >
      {showIcon && (
        <span className="material-symbols-outlined locale-switch__icon" aria-hidden="true">
          language
        </span>
      )}
      <div className="locale-switch__track">
        {LOCALE_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={locale === option.value}
            aria-label={option.ariaLabel}
            className={`locale-switch__btn${locale === option.value ? ' is-active' : ''}`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
