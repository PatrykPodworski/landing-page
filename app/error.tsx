"use client";

import Link from "next/link";
import { useTranslations } from "@/i18n/i18nContext";

// TODO: Link the contact page when it's ready
// TODO: Fix the return link
const Error = () => {
  const { t } = useTranslations();
  return (
    <div className="bg-blue-800 text-white p-12 rounded-lg max-w-sm flex flex-col gap-2 items-center">
      <h1 className="text-4xl font-bold">{t("error_title")}</h1>
      <h2 className="font-bold">{t("error_subtitle")}</h2>
      <p className="text-sm text-center">{t("error_body")}</p>
      <Link
        href={"/"}
        className="rounded bg-white text-blue-800 p-2 font-bold mt-2"
      >
        {t("error_return")}
      </Link>
    </div>
  );
};

export default Error;
