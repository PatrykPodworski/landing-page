import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import GoogleTag from "./GoogleTag";

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
    <html lang="en">
      <body className={clsx(inter.className, "bg-slate-900")}>
        <main className="flex min-h-dvh flex-col items-center justify-center py-4">
          {children}
        </main>
      </body>
      <GoogleTag />
    </html>
  );
}
