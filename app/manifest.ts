import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BrightSpark",
    short_name: "BrightSpark",
    description: "Playful learning for early-primary learners",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f6fc",
    theme_color: "#6f5bd3",
    orientation: "portrait",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon-maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
