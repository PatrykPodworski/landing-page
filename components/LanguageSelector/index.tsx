"use client";

import { useTranslations } from "@/i18n/i18nContext";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/types";

const LOCALE_FLAGS: Record<Locale, string> = {
  en: "🇺🇸",
  pl: "🇵🇱",
  es: "🇪🇸",
};

const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  pl: "Polski",
  es: "Español",
};

export default function LanguageSelector() {
  const { locale, setLocale } = useTranslations();

  const handleClick = () => {
    const currentIndex = SUPPORTED_LOCALES.indexOf(locale);
    const nextLocale = SUPPORTED_LOCALES[(currentIndex + 1) % SUPPORTED_LOCALES.length];
    setLocale(nextLocale);
  };

  return (
    <button
      onClick={handleClick}
      title={LOCALE_LABELS[locale]}
      aria-label={LOCALE_LABELS[locale]}
      className="fixed top-4 right-4 z-50 text-xl w-9 h-9 rounded-lg flex items-center justify-center bg-zinc-700/60 hover:bg-zinc-700 transition-colors cursor-pointer"
    >
      {LOCALE_FLAGS[locale]}
    </button>
  );
}
