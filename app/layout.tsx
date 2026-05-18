import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";
import {
  DEFAULT_KEYWORDS,
  DEFAULT_TITLE,
  SITE_DESCRIPTION_LONG,
  SITE_DESCRIPTION_SHORT,
  SITE_URL,
} from "./_lib/site-metadata";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: DEFAULT_TITLE,
  description: SITE_DESCRIPTION_SHORT,
  keywords: [...DEFAULT_KEYWORDS],
  openGraph: {
    type: "website",
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION_LONG,
    url: "/",
    siteName: "Siegfried Bozza",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION_LONG,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased px-4 sm:px-16 mx-auto gap-8">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
