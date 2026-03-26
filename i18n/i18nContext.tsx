"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, type TranslationKey } from "./translations";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "./types";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function detectLocale(): Locale {
  const stored = localStorage.getItem("locale") as Locale | null;
  if (stored && SUPPORTED_LOCALES.includes(stored)) return stored;

  const browserLang = navigator.language?.split("-")[0] as Locale;
  if (SUPPORTED_LOCALES.includes(browserLang)) return browserLang;

  return DEFAULT_LOCALE;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocaleState(detectLocale());
  }, []);

  const setLocale = (newLocale: Locale) => {
    localStorage.setItem("locale", newLocale);
    setLocaleState(newLocale);
  };

  const t = (key: TranslationKey): string => translations[locale][key];

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslations() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslations must be used within I18nProvider");
  return ctx;
}
