"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "@/i18n/i18nContext";

export default function HomeClient() {
  const { t, locale } = useTranslations();
  return (
    <AnimatePresence mode="wait">
      <motion.h1
        key={locale}
        initial={{ filter: "blur(20px)" }}
        animate={{ filter: "blur(0px)" }}
        exit={{ filter: "blur(20px)" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="text-zinc-200 text-4xl text-center select-none font-serif italic"
      >
        {t("heading")}
      </motion.h1>
    </AnimatePresence>
  );
}
