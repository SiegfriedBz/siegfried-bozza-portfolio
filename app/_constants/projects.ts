import type { Project } from "@/app/_types/project";
import { STACK } from "./stack";

export const PROJECTS: Project[] = [
  {
    slug: "bioverify",
    year: 2026,
    title: {
      h1: "BioVerify",
      h2: "DeSci Protocol — Durable AI Agents for Scientific Integrity",
    },

    description: {
      short:
        "DeSci protocol — Next.js + Solidity + LangGraph + Inngest for decentralized peer review.",
      overview: `
        BioVerify is a decentralized science (DeSci) protocol that replaces opaque, slow, and biased traditional peer review with stateful AI agents and on-chain game theory.
        Scientists stake collateral to submit research, autonomous agents screen for plagiarism via Exa AI neural search and Gemini structured output, Chainlink VRF selects unbiased reviewers, and cryptographic consensus settles stakes — creating an immutable, economically enforced pipeline for scientific truth.
        The contract uses a getter-less, event-sourced design: all state mutations emit events projected off-chain into a Neon Postgres read model via Alchemy Notify webhooks, powering all frontend queries with zero on-chain reads.
      `,
    },

    features: [
      {
        key: "Stake & Submit",
        description:
          "Scientists upload research manifests to IPFS (Pinata) and submit on-chain with a collateral stake and submission fee.",
      },
      {
        key: "AI Forensic Screening",
        description:
          "A LangGraph Submission Agent fetches the abstract from IPFS, runs a neural search against academic literature via Exa AI, and produces a structured Gemini LLM verdict. Plagiarism triggers immediate on-chain slashing.",
      },
      {
        key: "VRF Reviewer Selection",
        description:
          "If the submission passes AI screening, Chainlink VRF selects N peer reviewers from the staked pool using cryptographically verifiable randomness. The highest-reputation reviewer is assigned as Senior Reviewer.",
      },
      {
        key: "Human-in-the-Loop Peer Review",
        description:
          "Selected reviewers submit EIP-712-signed verdicts through the frontend. Each review resumes the LangGraph Review Agent's HITL interrupt. Conflicting verdicts escalate to the Senior Reviewer for a tie-break.",
      },
      {
        key: "On-Chain Settlement",
        description:
          "The agent partitions reviewers into honest (aligned with the final decision) and negligent (opposed), then settles on-chain: honest reviewers are rewarded, negligent reviewers are slashed, and the publisher's stake is returned or forfeited.",
      },
      {
        key: "Event-Driven CQRS Architecture",
        description:
          "Getter-less contract design — all state mutations emit events, projected off-chain via Alchemy Notify webhooks into a Neon Postgres read model (Drizzle ORM) with optimistic concurrency control.",
      },
      {
        key: "Durable Agent Orchestration",
        description:
          "Inngest provides durable execution (automatic retries, wait-for-event, fan-out) while LangGraph manages agent lifecycle with checkpointers, enabling workflows to pause for days during peer review and resume exactly where they left off.",
      },
    ],

    challenges: `
        Key challenges included orchestrating durable AI agents across asynchronous human review cycles — LangGraph checkpointers allow the workflow to pause for days and resume at the exact HITL interrupt.
        Designing the getter-less, event-sourced contract required careful coordination between on-chain event emissions and off-chain Postgres projections via Alchemy Notify webhooks.
        Coordinating Inngest's durable execution layer with LangGraph's agent lifecycle demanded precise separation of logic state (LangGraph) from execution durability (Inngest retries, wait-for-event, fan-out).
    `,

    outcome: `
        BioVerify delivers a full DeSci pipeline deployed on Base Sepolia and Ethereum Sepolia — from stake-and-submit through AI forensic screening, VRF reviewer selection, human-in-the-loop peer review, to on-chain settlement with economic enforcement.
        The project demonstrates end-to-end integration of stateful AI agents, durable execution, and smart contract game theory for scientific integrity.
    `,

    stack: {
      all: [
        STACK.TYPESCRIPT,
        STACK.REACT,
        STACK.NEXT,
        STACK.ZOD,
        STACK.TANSTACK_QUERY,
        STACK.SOLIDITY,
        STACK.FOUNDRY,
        STACK.WAGMI,
        STACK.VIEM,
        STACK.CHAINLINK,
        STACK.ALCHEMY,
        STACK.IPFS,
        STACK.SHADCN,
        STACK.TAILWIND,
        STACK.INNGEST,
        STACK.LANGGRAPH,
        STACK.GEMINI,
        STACK.EXA_AI,
        STACK.DRIZZLE,
        STACK.NEON,
      ],
      main: [
        {
          key: "Solidity + Foundry + Chainlink VRF",
          description:
            "BioVerifyV3 smart contract with staking, slashing, VRF-based reviewer selection, and on-chain settlement. 100% branch coverage.",
        },
        {
          key: "Next.js + wagmi + Reown AppKit",
          description:
            "DApp frontend with wallet integration, EIP-712 typed data signing, and real-time event-driven UI.",
        },
        {
          key: "LangGraph.js + Gemini + Exa AI",
          description:
            "Stateful AI agents for submission forensics (plagiarism detection via neural search) and review orchestration with HITL interrupts.",
        },
        {
          key: "Inngest",
          description:
            "Durable execution layer — automatic retries for on-chain commands, wait-for-event logic, and fan-out orchestration.",
        },
        {
          key: "Drizzle ORM + Neon Postgres",
          description:
            "Event-sourced CQRS read model with optimistic concurrency control, powering all frontend queries.",
        },
        {
          key: "Alchemy Notify",
          description:
            "HMAC-verified webhooks projecting contract events into the off-chain read model in real time.",
        },
      ],
    },

    images: [
      "/projects/bioverify/images/bioverify_publications.jpg",
      "/projects/bioverify/images/bioverify_landing.jpg",
    ],

    gifs: [],

    links: {
      page: "/projects/bioverify",
      live: process.env.NEXT_PUBLIC_BIOVERIFY_LIVE ?? "",
      github: process.env.NEXT_PUBLIC_BIOVERIFY_GITHUB ?? "",
    },
  },
  {
    slug: "gavl",
    year: 2025,
    title: {
      h1: "GavL",
      h2: "Real-Time Auction Platform",
    },

    description: {
      short: "Next.js + Supabase + Stripe for live auctions.",
      overview: `
        GavL is a full-stack auction platform built to simulate a production-grade system.
        It integrates Next.js, Supabase, and Stripe to handle live bidding, secure payments, and multilingual support (French, English, German).
        The project emphasizes real-time workflows, scalable architecture, a seamless user experience and a responsive design optimized for all devices
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
          "Creation, editing, bidding, automatic closure (CRON + Edge Functions), winner notifications, and payment completion.",
      },
      {
        key: "Stripe Payments",
        description:
          "Secure checkout flow with webhook handling for server-side payment status updates.",
      },
      {
        key: "Notification System",
        description:
          "Instant alerts for bids, auction wins, and payments across all connected clients.",
      },
      {
        key: "Server-Side Table Filtering",
        description:
          "URL-driven filters, sorting, and pagination using nuqs for consistent server-client synchronization.",
      },
      {
        key: "Multilingual UI",
        description:
          "Fully localized interface in French, English, and German.",
      },
      {
        key: "Responsive Design",
        description:
          "Optimized layouts for mobile and desktop with Suspense and skeleton loaders for smooth transitions.",
      },
      {
        key: "Dashboards",
        description:
          "User-specific and global statistics, including charts, totals, and payment summaries.",
      },
    ],
    challenges: `
        Key challenges included designing a robust real-time multi-user workflow while maintaining clean, maintainable logic.
        A domain-driven structure helped isolate concerns and scale features like notifications and payments.
        Secure Stripe integration required careful handling of RLS policies and webhook flows.
        The project deepened my expertise in Next.js App Router, Supabase Realtime, and production-grade workflows.
    `,

    outcome: `
      GavL delivers a complete, production-style auction experience with seamless real-time UI, robust backend workflows, multilingual support, and secure payment processing.
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
        " Next.js + Solidity + Chainlink + Tenderly for decentralized prediction games.",
      overview: `
        Bet2Gether is a decentralized prediction game where players bet ETH on crypto price movements (ETH, BTC, LINK, DAI).
        Built with Next.js, Solidity, Chainlink, and Tenderly, it ensures transparent outcomes, automated payouts, and provably fair NFT rewards.
        The project explores trust-minimized mechanics, real-time on-chain event-driven UIs, and hybrid on-chain/off-chain automation.
        Players can create or join games, place bets, claim rewards, and earn ERC-1155 NFT rewards.
      `,
    },

    features: [
      {
        key: "Trust-Minimized Prediction Games",
        description:
          "Players bet on crypto price movements, with all pricing secured by Chainlink Price Feeds.",
      },
      {
        key: "Automated Game Resolution",
        description:
          "Chainlink Automation (Keepers) resolves games at their deadline without admin intervention.",
      },
      {
        key: "Provably Fair NFT Rewards",
        description:
          "Winning game creators receive randomized ERC-1155 NFTs using Chainlink VRF for verifiable randomness.",
      },
      {
        key: "Real-Time Updates",
        description:
          "UI reacts instantly to new games, bets, and resolutions via Alchemy WebSockets and contract event listeners (Wagmi).",
      },
      {
        key: "Hybrid On-Chain/Off-Chain Automation",
        description:
          "Tenderly Web3 Actions mint NFT rewards based on on-chain events, exploring off-chain automation.",
      },
      {
        key: "Smart Contract Testing",
        description: "Solidity contracts tested with Foundry.",
      },
      {
        key: "Verified Smart Contracts",
        description:
          "Deployed to Sepolia and automatically verified on Etherscan for transparency.",
      },
    ],

    challenges: `
    Key challenges included coordinating multiple Chainlink services (Price Feeds, Automation, VRF) for trust-minimized game flow.
    Real-time updates required selective query refetching and event-driven UI state management.
    Implementing payout logic, NFT minting, and hybrid automation demanded careful isolation of contract logic.
    `,

    outcome: `
      Bet2Gether is a fully functional crypto-assets price prediction platform deployed on Sepolia, featuring decentralized game mechanics, automated game resolution and payouts, provably fair NFT rewards, and real-time UI updates.
      The project deepened my expertise in Solidity, Chainlink, and full-stack Web3 development.
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
            "Live updates for new games, bets, resolutions and NFT rewards.",
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
        " Next.js + Solidity for on-chain ERC-1155 token crafting and trading.",
      overview: `
      Forge is an on-chain crafting game where players mint, burn, and trade ERC-1155 tokens using smart-contract enforced rules.
      Built with Solidity and Next.js, it features real-time UI updates via Alchemy WebSockets, 100% Foundry test coverage, and verified contracts on Sepolia.
      The project explores end-to-end Web3 development: contract architecture, game logic, and event-driven UI synchronization.     `,
    },

    features: [
      {
        key: "On-Chain Crafting System (ERC-1155)",
        description:
          "Players mint basic tokens and forge rare items by burning combinations, enforced entirely by Solidity logic.",
      },
      {
        key: "Cooldown-Based Minting",
        description:
          "Enforced minting cooldowns prevent spam and balance gameplay.",
      },
      {
        key: "Event-Driven UI Updates",
        description:
          "Real-time syncing of mint, burn, forge, and trade events via Alchemy WebSockets.",
      },
      {
        key: "100% Contract Test Coverage",
        description:
          "All smart contracts tested with Foundry for full line, branch, and function coverage.",
      },
      {
        key: "Verified Smart Contracts",
        description:
          "Deployed to Sepolia and automatically verified on Etherscan for transparency.",
      },
    ],
    challenges: `
    Key challenges included encoding crafting rules, cooldowns, and burn mechanics into smart contracts.
    Achieving 100% Foundry test coverage required detailed scenario testing for all game logic.
    Real-time UI updates demanded careful handling of React Query refetching and event listeners.
  `,
    outcome: `
    Forge is a complete on-chain game deployed on Sepolia, featuring:
    - ERC-1155 token crafting, trading, and real-time event syncing.
    - Verified contracts and a polished dApp with wallet connectivity.
    - Full-stack Web3 development from Solidity to event-driven UI.

    Built before my Bet2Gether DApp, this project strengthened my skills in contract composition, Foundry testing, and ERC-1155 design.
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
