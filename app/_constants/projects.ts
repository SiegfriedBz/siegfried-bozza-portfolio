import type { Project } from "@/app/_types/project";
import { STACK } from "./stack";

export const PROJECTS: Project[] = [
	{
		slug: "gavl",
		year: 2025,
		title: {
			h1: "GavL",
			h2: "Real-Time Auction Platform"
		},
		
		description: {
			short: "Powered by Next.js, Supabase & Stripe",
			overview:
				`GavL is a full-stack, real-time auction platform built to simulate a production-grade system handling live bidding, secure payments, multi-user notifications, and full auction lifecycle management.
					Developed with Next.js, TypeScript, Supabase, Stripe, and Shadcn/UI, the project demonstrates end-to-end workflows including authentication, server-side filtering, responsive UI, and seamless multilingual support (French, English, German).
					The platform was designed as a deep dive into real-time state, backend workflows, and scalable domain-driven architecture.
				`,
		},

		features: [
			{
				key: "Real-Time Bidding Engine",
				description: "Live multi-user bidding with instant updates using Supabase Realtime."
			},
			{
				key: "End-to-End Auction Lifecycle",
				description: "Creation, editing, bidding, automatic closure (CRON + Edge Function), winner notifications, and payment completion."
			},
			{
				key: "Stripe Payments",
				description: "Secure checkout flow with webhook handling to update payment status server-side."
			},
			{
				key: "Notification System",
				description: "Instant alerts for bids, auction wins, and payments across connected clients."
			},
				{
				key: "Server-Side Table Filtering",
				description: "URL-driven filters, sorting, and pagination using nuqs for consistent server-client results"
			},
			{
				key: "Multilingual UI",
				description: "Fully localized interface in French, English, and German."
			},
			{
				key: "Responsive Design",
				description: "Optimized layouts for mobile and desktop with smooth transitions using Suspense and skeleton loaders."
			},
			{
				key: "Analytics Dashboard",
				description: "User-specific and global stats with charts, totals, and payment summaries."
			},
		],
		challenges: `One of the main challenges was designing a robust multi-user real-time workflow while keeping business logic clean and maintainable. Adopting a domain-driven structure helped isolate concerns and made it easier to scale features such as notifications, payment updates, and automatic auction closure.
			Integrating Stripe securely—especially ensuring safe paidAt updates with Service Role keys—required careful handling of RLS policies and webhook flows.
			Managing live synchronization across several interacting entities (bids, auctions, notifications, payments) was a valuable exercise in designing responsive UI states, race-condition-safe backend logic, and predictable server-side filtering.
			The project significantly deepened skills in Next.js App Router, Supabase Realtime, server actions, and production-like workflows.
		`
		, 

		outcome: `GavL delivers a complete, production-style experience for running real-time auctions with seamless UI, robust backend workflows, multilingual support, and secure payment processing.
			The platform demonstrates strong full-stack capabilities across real-time systems, domain-driven backend design, and polished user experience. It also serves as a foundation for additional features such as automated validation, auction categories, and advanced analytics.
			Overall, the project showcases readiness for professional roles involving complex web applications, real-time interactions, and scalable Next.js architectures.
			`
		,
					
		stack: {
			all: [
			STACK.TYPESCRIPT,
			STACK.REACT,
			STACK.NEXT,
			STACK.ZOD,
			STACK.RHF,
			STACK.TANSTACK_TABLE,
			STACK.SUPABASE,
			STACK.STRIPE,
			STACK.JEST,
			STACK.SHADCN,
			STACK.TAILWIND,
		],
			main: [
					{
						key: "Frontend",
						description: "Next.js, React, TypeScript"
					},
						{
						key: "Backend & Database",
						description: "Supabase (Realtime, Edge Functions, CRON, RLS)"
					},
						{
						key: "Payments",
						description: "Stripe Checkout & Webhooks"
					},
					{
						key: "UI & Form Handling",
						description: "Shadcn/UI, React Hook Form, Zod"
					},
					{
						key: "Filtering & Data Display",
						description: "Nuqs, TanStack Table"
					},
					{
						key: "File Uploads",
						description: "Uppy"
					},
					{
						key: "Testing",
						description: "Jest"
					},
					{
						key: "Architecture",
						description: ": Domain-driven structure with domains, ports, repositories, and services"
					}
			]
		},

		images: [
			"/images/projects/gavl/gavl-table.png",
			"/images/projects/gavl/gavl-landing.png",
		],

		gifs: [""],

		links: {
			page: "/projects/gavl",
			live: process.env.NEXT_PUBLIC_GAVL_LIVE ?? "",
			github: process.env.NEXT_PUBLIC_GAVL_GITHUB ?? "",
		},
	},
	{
		slug: "bet2gether",
		year: 2025,
		title: {
			h1: "Bet2Gether",
			h2: "Trust-Minimized Crypto Prediction Game with Automated Payouts & NFT Rewards",
		},
		description: {
			short: "A trust-minimized prediction game for crypto asset price movements, powered by Solidity, Chainlink, Tenderly, and a fully reactive Next.js UI.",
			overview: `
			Bet2Gether is a decentralized prediction game where players bet ETH on real-time crypto price movements. 
			The platform ensures transparent and tamper-resistant outcomes using Chainlink Price Feeds, automates game resolution with Chainlink Automation, 
			and distributes provably fair NFT rewards using Chainlink VRF. 

			I built this DApp to explore trust-minimized game mechanics, real-time event-driven UIs, and hybrid on-chain/off-chain automation using Tenderly Web3 Actions. 
			Players can create or join games, place bets, claim winnings, and earn ERC-1155 NFT rewards through a fully self-contained smart-contract system.
			`,
		},

		features: [
			{
				key: "Trust-Minimized Prediction Games",
				description:
					"Players bet on whether crypto asset prices (ETH, BTC, LINK, DAI) will rise or fall, with all pricing secured by Chainlink Price Feeds.",
			},
			{
				key: "Automated Game Resolution",
				description:
					"Chainlink Automation (Keepers) resolves games at their deadline without any admin intervention.",
			},
			{
				key: "Provably Fair NFT Rewards",
				description:
					"Winning game creators receive randomized ERC-1155 NFTs using Chainlink VRF for verifiable randomness.",
			},
			{
				key: "Real-Time Updates",
				description:
					"The UI reacts instantly to new games, bets, resolutions, and NFT rewards through Alchemy WebSockets and contract event listeners.",
			},
			{
				key: "Fully Tested Smart Contracts",
				description:
					"Solidity contracts implemented with Foundry and backed by an advanced test suite with detailed line, branch, and function coverage.",
			},
			{
				key: "Hybrid On-Chain / Off-Chain Automation",
				description:
					"Tenderly Web3 Actions mint NFT rewards based on on-chain events—used to explore off-chain automation patterns.",
			},
		],


		challenges: `
			Designing a trust-minimized game flow required coordinating multiple Chainlink services 
			(Price Feeds, Automation, VRF) while keeping gas usage manageable. 
			Real-time updates introduced complexity around selective query refetching and event-driven UI state. 
			Additionally, implementing and testing payout logic, NFT minting, and hybrid off-chain automation demanded careful 
			isolation of contract logic and comprehensive Foundry test coverage.
		`,

		outcome: `
			Bet2Gether became a fully functional end-to-end prediction platform deployed on Sepolia, 
			with automated resolutions, fair pricing, real-time UI updates, and provably random NFT rewards. 
			It allowed me to build and rigorously test Solidity contracts, design a scalable React architecture, 
			experiment with Tenderly Web3 Actions, and implement advanced event-driven workflows. 
			The project significantly deepened my experience with decentralized game mechanics and full-stack Web3 development.
		`,
		
		stack: {
			all: [
			STACK.TYPESCRIPT,
			STACK.REACT,
			STACK.NEXT,
			STACK.ZOD,
			STACK.RHF,
			STACK.TANSTACK_TABLE,
			STACK.TANSTACK_QUERY,
			STACK.SOLIDITY,
			STACK.FOUNDRY,
			STACK.WAGMI,
			STACK.RAINBOW_KIT,
			STACK.VIEM,
			STACK.CHAINLINK,
			STACK.TENDERLY,
			STACK.ALCHEMY,
			STACK.IPFS,
			STACK.SHADCN,
			STACK.TAILWIND,
			],
			main: [
				{
					key: "Solidity + Foundry",
					description:
						"Core game logic, payout calculations, VRF integration, and comprehensive contract testing.",
				},
				{
					key: "Next.js + Wagmi",
					description:
						"Frontend framework with wallet integration and event-driven data flow.",
				},
				{
					key: "Chainlink Services",
					description:
						"Price Feeds for trustless pricing, Automation for game resolution, and VRF for NFT randomness.",
				},
				{
					key: "Alchemy WebSockets",
					description:
						"Live updates for new games, bets, resolutions, and on-chain events.",
				},
			],
		},

		images: [
			"/images/projects/bet2gether/bet2gether-landing-create.png",
			"/images/projects/bet2gether/bet2gether-bet.png",
			"/images/projects/bet2gether/bet2gether-claim.png",
			"/images/projects/bet2gether/bet2gether-nft.png",
		],

		gifs: [
				// "/assets/bet2gether/desktop-tour.gif",
				// "/assets/bet2gether/create-game-1.gif",
				// "/assets/bet2gether/game-resolution.gif",
				// "/assets/bet2gether/nft-mint.gif",
			],

		links: {
			page: "/projects/bet2gether",
			live: process.env.NEXT_PUBLIC_BET2GETHER_LIVE ?? "",
			github: process.env.NEXT_PUBLIC_BET2GETHER_GITHUB ?? "",
		},

	},
	{
		slug: "forge",
		year: 2025,
		title: {
			h1: "Forge",
			h2: "On-Chain ERC-1155 Crafting Game with Real-Time Events & 100% Foundry Test Coverage",
		},
		description: {
			short: "A Web3 ERC-1155 crafting game where players mint, burn, trade, and forge tokens using fully on-chain rules, real-time events, and extensively tested Solidity contracts.",
			overview: `
				Forge is an on-chain token crafting game built around ERC-1155 assets, where players mint basic tokens, 
				burn combinations to forge rare items, and trade tokens through a provably enforced smart-contract system. 
				The frontend is a fully reactive Next.js dApp that updates in real time using Alchemy WebSockets and custom event listeners.

				I built Forge to practice end-to-end Web3 development: designing smart-contract architectures, 
				implementing complex item-crafting rules, achieving 100% Foundry test coverage, and creating a modern, performant UI 
				with wallet connectivity, optimistic rendering, and event-driven data refresh strategies.
			`,
		},

		features: [
			{
				key: "On-Chain Crafting System (ERC-1155)",
				description:
					"Players mint basic tokens and forge rare items by burning specific token combinations, enforced entirely by Solidity game logic.",
			},
			{
				key: "Cooldown-Based Minting",
				description:
					"Each player has an enforced minting cooldown for basic tokens, preventing spam and balancing gameplay.",
			},
			{
				key: "Event-Driven UI Updates",
				description:
					"The dApp listens to mint, burn, forge, and trade events via Alchemy WebSockets and updates UI state instantly.",
			},
			{
				key: "Token Trading Mechanism",
				description:
					"Players burn any token to receive a different basic token, introducing strategic resource management.",
			},
			{
				key: "100% Contract Test Coverage",
				description:
					"All smart contracts are tested with Foundry, with full line, branch, and function coverage across FToken and Forge.",
			},
			{
				key: "Verified Smart Contracts",
				description:
					"Contracts deployed to Sepolia are automatically verified on Etherscan for transparency and auditability.",
			},
		],
		
		challenges: `
			Designing a clean and extensible crafting system required carefully encoding minting rules, burn requirements, 
			and cooldown mechanics directly into smart contracts. Achieving 100% Foundry test coverage demanded detailed scenario testing 
			across minting, forging, burning, and trading logic. Real-time UI updates introduced challenges around selective React Query 
			refetching and handling multiple concurrent WebSocket event streams without duplicating UI state.
		`,

		outcome: `
			Forge became a complete on-chain game deployed on Sepolia with verified contracts, real-time event syncing, 
			and a polished dApp supporting minting, burning, crafting, and trading. The project strengthened my understanding of 
			Solidity contract composition, Foundry testing patterns, ERC-1155 design, and event-driven React architectures. 
			It stands as a full-stack Web3 project demonstrating smart-contract engineering and modern frontend development.
		`,

		stack: {
			all: [
			STACK.TYPESCRIPT,
			STACK.REACT,
			STACK.NEXT,
			STACK.ZOD,
			STACK.RHF,
			STACK.TANSTACK_TABLE,
			STACK.SOLIDITY,
			STACK.FOUNDRY,
			STACK.WAGMI,
			STACK.RAINBOW_KIT,
			STACK.VIEM,
			STACK.ALCHEMY,
			STACK.IPFS,
			STACK.SHADCN,
			STACK.TAILWIND,
		],
		main: [
    {
      key: "Solidity + Foundry",
      description:
        "Implements ERC-1155 minting, forging, burning, trading logic, plus full test suite with 100% coverage.",
    },
    {
      key: "Next.js + Wagmi",
      description:
        "Frontend framework with wallet integration, event listeners, and reactive state management.",
    },
    {
      key: "Alchemy WebSockets",
      description:
        "Real-time synchronization for mint, forge, burn, and trade events with selective refetching.",
    },
    {
      key: "ERC-1155 Architecture",
      description:
        "Efficient multi-token setup supporting crafting rules, metadata, and IPFS hosting.",
    },
  ],

	},

		images: [
			"/images/projects/forge/forge-forge.png",
			"/images/projects/forge/forge-landing.png",
			"/images/projects/forge/forge-mint.png",
		],

		gifs: [  
			"/assets/forge/desktop-mint.gif",
			"/assets/forge/desktop-trade.gif",
			"/assets/forge/desktop-forge.gif",
			"/assets/forge/desktop-burn.gif",
			"/assets/forge/mobile-mint.gif"
		],
			
		links: {
			page: "/projects/forge",
			live: process.env.NEXT_PUBLIC_FORGE_LIVE ?? "",
			github: process.env.NEXT_PUBLIC_FORGE_GITHUB ?? "",
		},
	},
];
