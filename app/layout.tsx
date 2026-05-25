import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UGC Script Generator PRO",
  description: "Generatore premium di script UGC, TikTok, Reels, Meta Ads e Shorts pronti da registrare."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
