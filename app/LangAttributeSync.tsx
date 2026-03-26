"use client";

import { useEffect } from "react";
import { useTranslations } from "@/i18n/i18nContext";

export default function LangAttributeSync() {
  const { locale } = useTranslations();
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
