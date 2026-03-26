import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import GoogleTag from "./GoogleTag";
import { I18nProvider } from "@/i18n/i18nContext";
import LangAttributeSync from "./LangAttributeSync";
import LanguageSelector from "@/components/LanguageSelector";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Patryk Podworski",
  description: `Patryk Podworski's landing page`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(inter.className, "bg-slate-900")}>
        <I18nProvider>
          <LangAttributeSync />
          <LanguageSelector />
          <main className="flex min-h-dvh flex-col items-center justify-center p-4">
            {children}
          </main>
        </I18nProvider>
      </body>
      <GoogleTag />
    </html>
  );
}
