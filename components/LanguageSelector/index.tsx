"use client";

import { useEffect, useRef, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setOpen((prev) => !prev)}
        title={LOCALE_LABELS[locale]}
        aria-label={LOCALE_LABELS[locale]}
        className="text-xl w-9 h-9 rounded-lg flex items-center justify-center bg-zinc-700/60 hover:bg-zinc-700 transition-colors cursor-pointer"
      >
        {LOCALE_FLAGS[locale]}
      </button>

      {open && (
        <div className="absolute top-11 right-0 flex flex-col gap-1 bg-zinc-800 border border-zinc-700 rounded-lg p-1">
          {SUPPORTED_LOCALES.filter((lang) => lang !== locale).map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setLocale(lang);
                setOpen(false);
              }}
              title={LOCALE_LABELS[lang]}
              aria-label={LOCALE_LABELS[lang]}
              className="text-xl w-9 h-9 rounded-md flex items-center justify-center opacity-70 hover:opacity-100 hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              {LOCALE_FLAGS[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
