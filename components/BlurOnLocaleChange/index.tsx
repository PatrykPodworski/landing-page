"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "@/i18n/i18nContext";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function BlurOnLocaleChange({ children, className }: Props) {
  const { locale } = useTranslations();
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={locale}
        initial={{ filter: "blur(20px)" }}
        animate={{ filter: "blur(0px)" }}
        exit={{ filter: "blur(20px)" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={className}
      >
        {children}
      </motion.span>
    </AnimatePresence>
  );
}
