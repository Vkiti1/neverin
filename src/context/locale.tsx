import { createContext, FC, useState, useContext } from 'react'

type Locale = 'en' | 'hr'

type SelectLocaleSignature = (locale: Locale) => void

interface LocaleContext {
  locale: Locale
  selectLocale: SelectLocaleSignature
}

const localeContext = createContext<LocaleContext>({
  locale: 'en',
  selectLocale: (_) => {},
})

export const LocaleProvider: FC = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('en')

  const selectLocale: SelectLocaleSignature = (locale) => {
    setLocale(locale)
  }

  return (
    <localeContext.Provider value={{ selectLocale, locale }}>
      {children}
    </localeContext.Provider>
  )
}

export const useLocale = () => useContext(localeContext)
