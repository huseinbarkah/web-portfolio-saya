import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { en, type Dictionary } from './en'
import { id } from './id'

type Locale = 'en' | 'id'

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  t: Dictionary
}

const dictionaries: Record<Locale, Dictionary> = { en, id }

const I18nContext = createContext<I18nContextType | null>(null)

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  try {
    const saved = localStorage.getItem('portfolio-locale')
    if (saved === 'en' || saved === 'id') return saved
  } catch {}
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    setLocaleState(getInitialLocale())
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    try {
      localStorage.setItem('portfolio-locale', newLocale)
    } catch {}
  }, [])

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'en' ? 'id' : 'en')
  }, [locale, setLocale])

  return (
    <I18nContext.Provider value={{ locale, setLocale, toggleLocale, t: dictionaries[locale] }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider')
  return ctx
}
