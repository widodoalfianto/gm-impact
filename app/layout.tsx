import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { isSanityConfigured } from "../sanity/env";
import { SanityLive } from "../sanity/lib/live";
import { SanityLiveGate } from "./sanity-live-gate";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Global Missions Impact 2026",
  description: "Global Missions mid-year impact report across five nations.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/xia1xiy.css" />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <SanityLiveGate>
          {isSanityConfigured ? (
            <SanityLive includeDrafts={isDraftMode} />
          ) : null}
          {isSanityConfigured && isDraftMode ? <VisualEditing /> : null}
        </SanityLiveGate>
      </body>
    </html>
  );
}
