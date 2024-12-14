// src/app/layout.tsx
import "./globals.css";
import Script from "next/script";
import type { Metadata } from "next";
import { Providers } from "./providers";
import LocalFontLoader from "next/font/local";

const Kurale = LocalFontLoader({ variable: "--font-Kurale", src: "../fonts/Kurale.ttf" });
const Brittany = LocalFontLoader({ variable: "--font-Brittany", src: "../fonts/Brittany.otf" });

export const metadata: Metadata = { title: "picBook", description: "Crafted With Imagination And Stories" };
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
