"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "@/i18n/i18nContext";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const BLUR_IN_MS = 200;
const BLUR_OUT_MS = 150;
const BLUR_PX = 8;

export default function BlurOnLocaleChange({ children, className }: Props) {
  const { locale } = useTranslations();
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const [blurred, setBlurred] = useState(false);
  const prevLocale = useRef(locale);

  useEffect(() => {
    if (locale === prevLocale.current) return;
    prevLocale.current = locale;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBlurred(true);
    const id = setTimeout(() => {
      setDisplayedChildren(children);
      setBlurred(false);
    }, BLUR_IN_MS);
    return () => clearTimeout(id);
  }, [locale, children]);

  return (
    <motion.span
      layout
      transition={{
        layout: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
      }}
      style={{
        display: "inline-block",
        filter: blurred ? `blur(${BLUR_PX}px)` : "blur(0px)",
        transition: blurred
          ? `filter ${BLUR_IN_MS}ms ease`
          : `filter ${BLUR_OUT_MS}ms cubic-bezier(0.23, 1, 0.32, 1)`,
      }}
      className={className}
    >
      {displayedChildren}
    </motion.span>
  );
}
