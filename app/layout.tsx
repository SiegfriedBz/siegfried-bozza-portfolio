import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Siegfried Bozza | Full-Stack Dev (React/Next.js + Web3)",
	description: "Full-Stack Developer with React, Next.js, and Solidity. Built GavL Auctions (real-time bidding platform), Bet2Gether (Chainlink automation), and Forge (ERC-1155 games). Open to remote roles in Web2/Web3.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased px-4 sm:px-16 max-w-6xl mx-auto gap-8`}
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
