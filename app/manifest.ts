import {
  DEFAULT_TITLE,
  SITE_DESCRIPTION_SHORT,
} from "@/app/_lib/site-metadata";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: DEFAULT_TITLE,
    short_name: "Siegfried Bozza",
    description: SITE_DESCRIPTION_SHORT,
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#0f172a",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
