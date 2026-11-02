import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";

export { GeistSans };

/**
 * Geist Mono, from the same `geist` package, but not preloaded: it only styles small labels
 * and chips, so it should not compete with the body font before the first paint.
 */
export const GeistMono = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  preload: false,
  adjustFontFallback: false,
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Consolas",
    "monospace",
  ],
});
