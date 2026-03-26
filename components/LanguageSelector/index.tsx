"use client";

import clsx from "clsx";
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
  return (
    <div className="fixed top-4 right-4 flex gap-1 z-50">
      {SUPPORTED_LOCALES.map((lang) => (
        <button
          key={lang}
          onClick={() => setLocale(lang)}
          title={LOCALE_LABELS[lang]}
          aria-label={LOCALE_LABELS[lang]}
          className={clsx(
            "text-xl w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer",
            locale === lang
              ? "bg-zinc-700"
              : "opacity-40 hover:opacity-80"
          )}
        >
          {LOCALE_FLAGS[lang]}
        </button>
      ))}
    </div>
  );
}
