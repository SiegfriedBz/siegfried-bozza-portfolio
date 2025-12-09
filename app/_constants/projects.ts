import type { Project } from "@/app/_types/project";
import { STACK } from "./stack";

export const PROJECTS: Project[] = [
  {
    slug: "gavl",
    year: 2025,
    title: {
      h1: "GavL",
      h2: "Real-Time Auction Platform",
    },

    description: {
      short: "Powered by Next.js, Supabase & Stripe.",
      overview: `GavL is a full-stack, real-time auction platform built to simulate a production-grade system handling live bidding, secure payments, multi-user notifications, and auction lifecycle management.
					\nDeveloped with Next.js, TypeScript, Supabase, Stripe, and Shadcn/UI, the project demonstrates end-to-end workflows including authentication, server-side filtering, responsive UI, and multilingual support (French, English, German).
					\nThe platform was designed as a deep dive into real-time state synchronization, backend workflows, and a scalable domain-driven architecture.
				`,
    },

    features: [
      {
        key: "Real-Time Bidding Engine",
        description:
          "Live multi-user bidding with instant updates using Supabase Realtime.",
      },
      {
        key: "End-to-End Auction Lifecycle",
        description:
          "Creation, editing, bidding, automatic closure (CRON + Edge Function), winner notifications, and payment completion.",
      },
      {
        key: "Stripe Payments",
        description:
          "Secure checkout flow with webhook handling to update payment status server-side.",
      },
      {
        key: "Notification System",
        description:
          "Instant alerts for bids, auction wins, and payments across connected clients.",
      },
      {
        key: "Server-Side Table Filtering",
        description:
          "URL-driven filters, sorting, and pagination using nuqs for consistent server-client results",
      },
      {
        key: "Multilingual UI",
        description:
          "Fully localized interface in French, English, and German.",
      },
      {
        key: "Responsive Design",
        description:
          "Optimized layouts for mobile and desktop with smooth transitions using Suspense and skeleton loaders.",
      },
      {
        key: "Analytics Dashboard",
        description:
          "User-specific and global stats with charts, totals, and payment summaries.",
      },
    ],
    challenges: `One of the main challenges was designing a robust multi-user real-time workflow while keeping business logic clean and maintainable. 
			\nAdopting a domain-driven structure helped isolate concerns and made it easier to scale features such as notifications, payment updates, and automatic auction closure.
			\nIntegrating Stripe securely required careful handling of RLS policies and webhook flows.
			\nThe project deepened my skills in Next.js App Router, Supabase Realtime, server actions, and production-like workflows.
		`,

    outcome: `GavL delivers a complete, production-style experience for running real-time auctions with seamless UI, robust backend workflows, multilingual support, and secure payment processing.
			`,

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
          description: "Next.js, React, TypeScript",
        },
        {
          key: "Backend & Database",
          description: "Supabase (Realtime, Edge Functions, CRON, RLS)",
        },
        {
          key: "Payments",
          description: "Stripe Checkout & Webhooks",
        },
        {
          key: "UI & Form Handling",
          description: "Shadcn/UI, React Hook Form, Zod",
        },
        {
          key: "Filtering & Data Display",
          description: "Nuqs, TanStack Table",
        },
        {
          key: "File Uploads",
          description: "Uppy",
        },
        {
          key: "Testing",
          description: "Jest",
        },
        {
          key: "Architecture",
          description:
            ":Domain-driven structure with domains, ports, repositories, and services",
        },
      ],
    },

    images: [
      "/projects/gavl/images/gavl-table.png",
      "/projects/gavl/images/gavl-landing.png",
    ],

    gifs: [
      "/projects/gavl/gifs/gavl-create-auctions.gif",
      "/projects/gavl/gifs/gavl-bid-2-users.gif",
      "/projects/gavl/gifs/gavl-bid-3-users.gif",
      "/projects/gavl/gifs/gavl-auction-won-notifications.gif",
      "/projects/gavl/gifs/gavl-stripe-flow.gif",
    ],

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
      short:
        "A trust-minimized prediction game for crypto asset price movements, powered by Solidity, Chainlink, Tenderly, and a fully reactive Next.js UI.",
      overview: `
			Bet2Gether is a decentralized prediction game where players bet ETH on real-time crypto price movements. 
			\nThe platform ensures transparent and tamper-resistant outcomes using Chainlink Price Feeds, automates game resolution with Chainlink Automation (Keepers), and distributes provably fair NFT rewards using Chainlink VRF. 
			\nI built this DApp to explore trust-minimized game mechanics, real-time event-driven UIs, and hybrid on-chain/off-chain automation using Tenderly Web3 Actions. 
			\nPlayers can create or join games, place bets, claim rewards, and earn ERC-1155 NFT rewards through a fully self-contained smart-contract system.
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
        key: "Smart Contracts Testing (Foundry)",
        description:
          "Solidity contracts implemented with Foundry and backed by a test suite with detailed line, branch, and function coverage.",
      },
      {
        key: "Hybrid On-Chain / Off-Chain Automation",
        description:
          "Tenderly Web3 Actions mint NFT rewards based on on-chain events (used to explore off-chain automation patterns).",
      },
    ],

    challenges: `
			Designing a trust-minimized game flow required coordinating multiple Chainlink services (Price Feeds, Automation, VRF). 
			\nReal-time updates introduced complexity around selective query refetching and event-driven UI state. 
			\nAdditionally, implementing and testing payout logic, NFT minting, and hybrid off-chain automation demanded careful 
			isolation of contract logic.
		`,

    outcome: `
			Bet2Gether became a fully functional end-to-end prediction platform deployed on Sepolia, with automated resolutions, fair pricing, real-time UI updates, and provably random NFT rewards. 
			\nIt allowed me to build and test Solidity contracts, design a scalable React architecture, experiment with Tenderly Web3 Actions, and implement advanced event-driven workflows. 
			\nThe project significantly deepened my experience with decentralized game mechanics and full-stack Web3 development.
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
      "/projects/bet2gether/images/bet2gether-landing-create.png",
      "/projects/bet2gether/images/bet2gether-bet.png",
      "/projects/bet2gether/images/bet2gether-claim.png",
      "/projects/bet2gether/images/bet2gether-nft.png",
      "/projects/bet2gether/images/bet2gether-tenderly-action-logs.png",
    ],

    gifs: [
      "/projects/bet2gether/gifs/bet2gether-create-game_and-bet-1.gif",
      "/projects/bet2gether/gifs/bet2gether-create-game_and-bet-2.gif",
      "/projects/bet2gether/gifs/bet2gether-auto-mint-to-game-creator-if-winner.gif",
      "/projects/bet2gether/gifs/bet2gether-winner-claim-rewards.gif",
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
      h2: "On-Chain ERC-1155 Crafting Game with Real-Time Events",
    },
    description: {
      short:
        "A Web3 ERC-1155 crafting game where players mint, burn, trade, and forge tokens using on-chain enforced rules and real-time events.",
      overview: `
				Forge is an on-chain token crafting game built around ERC-1155 assets, where players mint basic tokens, burn combinations to forge rare items, and trade tokens through an enforced smart-contract system. 
				\nThe frontend is a Next.js dApp that updates in real time using Alchemy WebSockets and custom event listeners.
				\nI built Forge to practice end-to-end Web3 development: designing smart-contract architectures, implementing item-crafting rules, achieving 100% Foundry test coverage, and creating a performant UI with wallet connectivity, and on-chain event-driven data refresh strategies.
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
          "The dApp listens to mint, burn, forge, and trade events via Alchemy WebSockets to synchronize the UI state.",
      },
      {
        key: "100% Contract Test Coverage",
        description: "All smart contracts are tested with Foundry.",
      },
      {
        key: "Verified Smart Contracts",
        description:
          "Contracts deployed to Sepolia are automatically verified on Etherscan for transparency and auditability.",
      },
    ],

    challenges: `
			Designing a clean and extensible crafting system required carefully encoding minting rules, burn requirements, 
			and cooldown mechanics directly into smart contracts. 
			\nAchieving 100% Foundry test coverage demanded detailed scenario testing across minting, forging, burning, and trading logic. 
			\nReal-time UI updates introduced challenges around selective React Query refetching.
		`,

    outcome: `
			Forge became a complete on-chain game deployed on Sepolia with verified contracts, real-time event syncing, and a polished dApp supporting minting, burning, crafting, and trading. 
			\nBuilt before my Bet2Gether project, this project strengthened my understanding of Solidity contract composition, Foundry testing patterns, ERC-1155 design, and event-driven React architectures. 
			\nIt stands as a full-stack Web3 project from smart-contract engineering to frontend development.
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
      "/projects/forge/images/forge-forge.png",
      "/projects/forge/images/forge-landing.png",
      "/projects/forge/images/forge-mint.png",
    ],

    gifs: [
      "/projects/forge/gifs/forge-mobile-mint.gif",
      "/projects/forge/gifs/forge-desktop-mint.01.gif",
      "/projects/forge/gifs/forge-desktop-trade.02.gif",
      "/projects/forge/gifs/forge-desktop-forge.03.gif",
      "/projects/forge/gifs/forge-desktop-burn.04.gif",
    ],

    links: {
      page: "/projects/forge",
      live: process.env.NEXT_PUBLIC_FORGE_LIVE ?? "",
      github: process.env.NEXT_PUBLIC_FORGE_GITHUB ?? "",
    },
  },
];
