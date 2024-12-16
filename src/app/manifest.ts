import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    start_url: "/",
    name: "picbook",
    short_name: "pb",
    display: "standalone",
    theme_color: "#8936FF",
    background_color: "#2EC6FE",
    description: "A Progressive Web App built with Next.js",
    icons: [
      { src: "/icon512_rounded.png", sizes: "192x192", type: "image/png" },
      { src: "/icon512_maskable.png", sizes: "512x512", type: "image/png" }
    ]
  };
}
