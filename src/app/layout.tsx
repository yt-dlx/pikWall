// src/app/layout.tsx
import "./globals.css";
import Script from "next/script";
import { Providers } from "./providers";
import LocalFontLoader from "next/font/local";
import type { Metadata, Viewport } from "next";

const Kurale = LocalFontLoader({ variable: "--font-Kurale", src: "../fonts/Kurale.ttf" });
const Brittany = LocalFontLoader({ variable: "--font-Brittany", src: "../fonts/Brittany.otf" });

export const viewport: Viewport = { maximumScale: 1, userScalable: false };
const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "picbook",
  description: "Crafted With Imagination And Stories",
  icons: {
    icon: [{ url: "/splash/favicon-196.png", sizes: "196x196", type: "image/png" }],
    apple: [{ url: "/splash/apple-icon-180.png" }]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    startupImage: [
      {
        url: "/splash/apple-splash-2048-2732.jpg",
        media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      },
      {
        url: "/splash/apple-splash-2732-2048.jpg",
        media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      },
      {
        url: "/splash/apple-splash-1668-2388.jpg",
        media: "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      },
      {
        url: "/splash/apple-splash-2388-1668.jpg",
        media: "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      },
      {
        url: "/splash/apple-splash-1536-2048.jpg",
        media: "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      },
      {
        url: "/splash/apple-splash-2048-1536.jpg",
        media: "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      },
      {
        url: "/splash/apple-splash-1488-2266.jpg",
        media: "(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      },
      {
        url: "/splash/apple-splash-2266-1488.jpg",
        media: "(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      },
      {
        url: "/splash/apple-splash-1640-2360.jpg",
        media: "(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      },
      {
        url: "/splash/apple-splash-2360-1640.jpg",
        media: "(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      },
      {
        url: "/splash/apple-splash-1668-2224.jpg",
        media: "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      },
      {
        url: "/splash/apple-splash-2224-1668.jpg",
        media: "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      },
      {
        url: "/splash/apple-splash-1620-2160.jpg",
        media: "(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      },
      {
        url: "/splash/apple-splash-2160-1620.jpg",
        media: "(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      },
      {
        url: "/splash/apple-splash-1290-2796.jpg",
        media: "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      },
      {
        url: "/splash/apple-splash-2796-1290.jpg",
        media: "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      },
      {
        url: "/splash/apple-splash-1179-2556.jpg",
        media: "(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      },
      {
        url: "/splash/apple-splash-2556-1179.jpg",
        media: "(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      },
      {
        url: "/splash/apple-splash-1284-2778.jpg",
        media: "(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      },
      {
        url: "/splash/apple-splash-2778-1284.jpg",
        media: "(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      },
      {
        url: "/splash/apple-splash-1170-2532.jpg",
        media: "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      },
      {
        url: "/splash/apple-splash-2532-1170.jpg",
        media: "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      }
    ]
  }
};

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
