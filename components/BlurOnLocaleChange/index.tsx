"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "@/i18n/i18nContext";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const BLUR_DURATION = 0.2;
const WIDTH_DURATION = 0.2;
const BLUR_PX = 8;

export default function BlurOnLocaleChange({ children, className }: Props) {
  const { locale } = useTranslations();
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const [blurred, setBlurred] = useState(false);
  const prevLocale = useRef(locale);

  useEffect(() => {
    if (locale === prevLocale.current) return;
    prevLocale.current = locale;

    setBlurred(true);
    const id = setTimeout(() => {
      setDisplayedChildren(children);
      setBlurred(false);
    }, BLUR_DURATION * 1000);
    return () => clearTimeout(id);
  }, [locale, children]);

  return (
    <motion.span
      layout
      animate={{ filter: blurred ? `blur(${BLUR_PX}px)` : "blur(0px)" }}
      transition={{
        filter: { duration: BLUR_DURATION, ease: [0.4, 0, 0.2, 1] },
        layout: { duration: WIDTH_DURATION, ease: [0.4, 0, 0.2, 1] },
      }}
      style={{ display: "inline-block" }}
      className={className}
    >
      {displayedChildren}
    </motion.span>
  );
}
