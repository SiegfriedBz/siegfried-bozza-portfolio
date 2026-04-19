import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "next-themes";
import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Siegfried Bozza | Full-Stack Developer — React, Next.js, Web3 & AI Agents",
  description:
    "Full-Stack Developer specializing in React, Next.js, TypeScript, and Solidity. Creator of BioVerify — a DeSci protocol with durable AI agents (LangGraph, Inngest), Chainlink VRF, and on-chain staking for decentralized peer review. Also built GavL (real-time auctions with Supabase & Stripe), Bet2Gether (Chainlink-powered prediction games), and Forge (ERC-1155 crafting DApp). Open to remote roles in Web2, Web3, and AI.",
  keywords: [
    "Siegfried Bozza",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Solidity",
    "Web3",
    "DeSci",
    "BioVerify",
    "AI Agents",
    "LangGraph",
    "Inngest",
    "Chainlink",
    "Foundry",
    "wagmi",
    "viem",
    "Drizzle ORM",
    "Neon Postgres",
    "Supabase",
    "Tailwind CSS",
    "shadcn/ui",
    "DApp",
    "decentralized science",
    "peer review",
    "smart contracts",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased px-4 sm:px-16 mx-auto gap-8`}
      >
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
