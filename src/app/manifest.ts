// src/app/manifest.ts
import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    start_url: "/",
    name: "picbook",
    short_name: "picbook",
    display: "standalone",
    theme_color: "#1a1a1a",
    background_color: "#1a1a1a",
    description: "Crafted With Imagination And Stories",
    icons: [
      { src: "/splash/favicon-196.png", sizes: "196x196", type: "image/png" },
      { src: "/splash/apple-icon-180.png", sizes: "180x180", type: "image/png" },
      { src: "/splash/apple-splash-750-1334.jpg", sizes: "750x1334", type: "image/jpeg" },
      { src: "/splash/apple-splash-828-1792.jpg", sizes: "828x1792", type: "image/jpeg" },
      { src: "/splash/apple-splash-1242-2688.jpg", sizes: "1242x2688", type: "image/jpeg" },
      { src: "/splash/apple-splash-2048-2732.jpg", sizes: "2048x2732", type: "image/jpeg" },
      { src: "/splash/apple-splash-1170-2532.jpg", sizes: "1170x2532", type: "image/jpeg" },
      { src: "/splash/manifest-icon-192.maskable.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/splash/manifest-icon-512.maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
    ]
  };
}
