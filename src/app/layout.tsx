// src/app/layout.tsx
import "./globals.css";
import Script from "next/script";
import { Providers } from "./providers";
import LocalFontLoader from "next/font/local";
import type { Metadata, Viewport } from "next";

const Kurale = LocalFontLoader({ variable: "--font-Kurale", src: "../fonts/Kurale.ttf" });
const Brittany = LocalFontLoader({ variable: "--font-Brittany", src: "../fonts/Brittany.otf" });

const APP_NAME = "PWA App";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DEFAULT_TITLE = "My Awesome PWA App";
const APP_DESCRIPTION = "Best PWA app in the world!";
export const metadata: Metadata = {
  manifest: "/manifest.json",
  applicationName: APP_NAME,
  description: APP_DESCRIPTION,
  formatDetection: { telephone: false },
  title: { default: APP_DEFAULT_TITLE, template: APP_TITLE_TEMPLATE },
  appleWebApp: { capable: true, statusBarStyle: "default", title: APP_DEFAULT_TITLE },
  twitter: { card: "summary", title: { default: APP_DEFAULT_TITLE, template: APP_TITLE_TEMPLATE }, description: APP_DESCRIPTION },
  openGraph: { type: "website", siteName: APP_NAME, title: { default: APP_DEFAULT_TITLE, template: APP_TITLE_TEMPLATE }, description: APP_DESCRIPTION }
};
export const viewport: Viewport = { themeColor: "#FFFFFF" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${Kurale.variable} ${Brittany.variable} antialiased font-Kurale`}>
        <Providers>
          <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9464475307933754" crossOrigin="anonymous" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
