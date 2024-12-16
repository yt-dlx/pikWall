import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    start_url: "/",
    name: "Next.js PWA",
    display: "standalone",
    theme_color: "#000000",
    short_name: "NextPWA",
    background_color: "#ffffff",
    description: "A Progressive Web App built with Next.js",
    icons: [
      { src: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512x512.png", sizes: "512x512", type: "image/png" }
    ]
  };
}
