"use client";

import { useTranslations } from "@/i18n/i18nContext";
import type { TranslationKey } from "@/i18n/translations";

const getGreetingKey = (): TranslationKey => {
  const hour = new Date().getHours();
  if (hour < 12) return "greeting_morning";
  if (hour < 18) return "greeting_afternoon";
  return "greeting_evening";
};

export default function HomeClient() {
  const { t } = useTranslations();
  return (
    <h1 className="text-zinc-200 text-4xl text-center select-none font-serif italic">
      {t(getGreetingKey())}, {t("home_title_suffix")}
    </h1>
  );
}
