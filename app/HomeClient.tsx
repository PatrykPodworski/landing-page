"use client";

import BlurOnLocaleChange from "@/components/BlurOnLocaleChange";
import { useTranslations } from "@/i18n/i18nContext";

export default function HomeClient() {
  const { t } = useTranslations();
  return (
    <h1 className="text-zinc-200 text-4xl text-center select-none font-serif italic">
      <BlurOnLocaleChange>{t("heading")}</BlurOnLocaleChange>
    </h1>
  );
}
