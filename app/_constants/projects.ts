import type { Project } from "@/app/_types/project"
import { STACK } from "./stack"

const bioVerifyGithub = process.env.NEXT_PUBLIC_BIOVERIFY_GITHUB ?? ""

/** Bundled article hero + OG fallback (works with next/image without remotePatterns). */
export const BIOVERIFY_ARTICLE_HERO =
  "/projects/bioverify/images/bioverify_landing.jpg"

const bioVerifyOgImage = (() => {
  const env = process.env.NEXT_PUBLIC_BIOVERIFY_OG_IMAGE?.trim() ?? ""
  if (env.startsWith("/")) return env
  return BIOVERIFY_ARTICLE_HERO
})()

const bioVerifyProject: Project = {
  slug: "bioverify",
  constructionPeriod: "Mar–Apr 2026",
  title: {
    h1: "BioVerify",
    h2: "DeSci Peer-Review — Chainlink VRF & Durable AI Agents for Scientific Integrity",
    short: "Multi-chain Agentic DeSci Case Study",
  },

  description: {
    short:
      "Multi-chain DeSci peer-review case study — Next.js + Solidity + Chainlink + LangGraph + Inngest for decentralized peer review (Base Sepolia & Ethereum Sepolia).",
    problem:
      "Published papers often point to mutable URLs (data can change or disappear after publication). Reviewer selection is opaque, incentives for reviewers and publishers are weak, and the reproducibility crisis has eroded trust in research findings.",
    solution:
      "BioVerify is an experiment in that direction. It treats peer review as a **coordination game**: authors stake ETH, AI screens for plagiarism, human reviewers settle verdicts on-chain, and research artifacts are pinned to IPFS so what was reviewed stays addressable. A truth layer (BioVerifyV3) holds stakes, lifecycle, VRF-based reviewer selection, and settlement; an orchestration layer (LangGraph + Inngest) runs screening and review graphs with durable execution and human-in-the-loop pauses — agents coordinate but do not override the contract.",
    overview: `
        BioVerify separates concerns across two layers. On-chain, **BioVerifyV3** is the source of truth for stakes, publication status, reviewer selection, and settlement. Off-chain, **LangGraph** runs the submission and review graphs while **Inngest** provides retries, step isolation, and pauses that can span days.
        Chain events drive the app: the contract emits rich events instead of view-heavy reads for product state. **Alchemy Notify** POSTs logs to a verified webhook (**HMAC-SHA256**); **processContractEvent** projects into **Neon Postgres** with optimistic concurrency on (blockNumber, logIndex). The frontend reads the projection and uses a **viem** WebSocket subscription to **NewPublicationStatus** so open lists invalidate as soon as a status event is mined.
        Security patterns used include **CEI** and **OpenZeppelin** **nonReentrant** on ETH-out paths, pull-style claims for reviewers, verified webhooks, and **EIP-712**-signed peer verdicts verified server-side before on-chain recording.
      `,
  },

  features: [
    {
      key: "Stake & Submit",
      description:
        "Scientists upload research manifests to **IPFS** (**Pinata**) and submit **on-chain** with a collateral stake and submission fee.",
    },
    {
      key: "AI Forensic Screening",
      description:
        "A **LangGraph** **Submission Agent** fetches the abstract from **IPFS**, runs a neural search against academic literature via **Exa AI**, and produces a structured **Gemini** LLM verdict. Plagiarism triggers immediate **on-chain slashing**.",
    },
    {
      key: "VRF Reviewer Selection",
      description:
        "If the submission passes AI screening, **Chainlink VRF** draws `I_VRF_NUM_WORDS = 3` candidates from the staked reviewer pool using cryptographically verifiable randomness. The **Senior Reviewer** is whichever drawn reviewer has the highest on-chain reputation.",
    },
    {
      key: "Human-in-the-Loop Peer Review",
      description:
        "Selected reviewers submit **EIP-712**-signed verdicts through the frontend. Each review resumes the **LangGraph Review Agent**'s **HITL** interrupt. Conflicting verdicts escalate to the **Senior Reviewer** for a tie-break.",
    },
    {
      key: "On-Chain Settlement",
      description:
        "The agent partitions reviewers into honest (aligned with the final decision) and negligent (opposed), then settles **on-chain**: honest reviewers are rewarded, negligent reviewers are **slashed**, and the publisher's stake is returned or forfeited.",
    },
    {
      key: "Security Architecture",
      description:
        "**CEI** pattern and **nonReentrant** guards on claim and transferSlashPoolToTreasury; **pull-withdrawal** model so settlement does not push ETH in bulk (**gas-limit DoS** resistance). **Alchemy Notify** webhooks authenticated with **HMAC-SHA256** before projection. Off-chain reviewer verdicts use **EIP-712** asymmetric signing (**ECDSA** / **secp256k1**).",
    },
    {
      key: "Event-Driven CQRS Architecture",
      description:
        "**Getter-less** contract design — all state mutations emit events, projected off-chain via **Alchemy Notify** webhooks into a **Neon Postgres** read model (**Drizzle ORM**) with **optimistic concurrency control**.",
    },
    {
      key: "Durable Agent Orchestration",
      description:
        "**Inngest** provides durable execution (automatic retries, wait-for-event, fan-out) while **LangGraph** manages agent lifecycle with checkpointers, enabling workflows to pause for days during peer review and resume exactly where they left off.",
    },
    {
      key: "Live Telegram Notifications",
      description:
        "A public **Telegram bot** broadcasts contract state transitions in real time across **Base Sepolia** and **Ethereum Sepolia** — readers can follow the publication lifecycle without keeping the app open.",
    },
  ],

  challenges: `
        Orchestrating durable agents across asynchronous human review: **LangGraph** checkpointers let the workflow pause for days and resume at the same human-in-the-loop interrupt.
        A getter-light, event-emitted contract required tight alignment between on-chain emissions and **Neon Postgres** projections via **Alchemy Notify**; optimistic concurrency on (blockNumber, logIndex) guards out-of-order or duplicate webhook deliveries.
        Separating **Inngest** durability (retries, wait-for-event, fan-out) from **LangGraph** graph state avoided duplicated side effects when steps replay.
    `,

  outcome: `
        BioVerify demonstrates an end-to-end DeSci peer-review pipeline on **Base Sepolia** and **Ethereum Sepolia** — stake and submit, AI-assisted screening, **Chainlink VRF** reviewer selection, human review with escalation, and on-chain settlement with explicit incentives.
        The work is a learning vehicle for combining stateful agents, durable execution, and Solidity coordination — not a production claim for scientific publishing.
    `,
  outcomeMetrics: [
    "**Deployments:** Base Sepolia + Ethereum Sepolia (verified contract addresses on-chain explorers)",
    "**Test rigor:** BioVerifyV3 — 50 tests across 12 suites — 100% lines (241/241), statements (260/260), branches (33/33), functions (26/26)",
    "**Read path:** Product queries served from the Neon Postgres projection — no polling loops for app state lists/detail",
    "**Realtime UX:** Standalone viem WebSocket clients + TanStack Query invalidation (no eth_call fanout for UX reads)",
    "**Security primitives:** CEI + OpenZeppelin nonReentrant on ETH-out paths; pull-withdrawal claims; HMAC-SHA256–verified Alchemy Notify webhooks; EIP-712–signed peer reviews",
  ],
  transferablePatterns:
    "Event-driven CQRS, durable agent orchestration, multi-actor coordination — patterns that also apply to dashboards, DAO tooling, and marketplaces.",

  limitations: [
    "**No author recourse against false positives** — The submission agent can produce a false plagiarism verdict, and peer review can reach a binding decision the author considers incorrect. Today both paths are terminal (immediate `earlySlashPublication` or `slashPublication`); there is no contract-level mechanism for the author to contest, post an escalation stake, or trigger a second human-only review.",
    "**IPFS / manifest edge cases** — A syntactically valid CID that resolves to an empty or malformed manifest can leave the submission graph without a clean pass/fail path; after **Inngest** step retries the publication may remain stuck in SUBMITTED until validation is hardened.",
    "**Agent transaction failures** — On-chain commands use simulate-then-write with retry only at the **Inngest** step boundary (no in-command gas bump or nonce recovery). A gas spike during settlement can leave a publication in IN_REVIEW after the last human review is recorded.",
  ],
  roadmap: [
    "**Weighted majority voting** — Replace the senior tie-break with consensus weighted by on-chain reputation.",
    "**ZK reputation (Reclaim Protocol)** — Privacy-preserving proofs of real-world signals without exposing raw credentials.",
    "**Encrypted access (Lit Protocol) and monetisation (x402)** — Encrypt IPFS payloads with on-chain conditional decryption; gate datasets and supplementary material behind micropayments.",
    "**Internal corpus + RAG** — Index published manifests in **Neon** + pgvector alongside **Exa AI** for similarity checks.",
    "**Author escalation path** — Let an author contest a verdict (AI early-slash or peer-review settlement) within a bounded escalation window by posting a larger escalation stake. The contract opens a second review cycle restricted to humans only, with a fresh **VRF** cohort that excludes the original reviewers. The second verdict is binding and reconciles the first: if confirmed, the escalation stake is slashed on top of the original; if overturned, prior rewards and slashes are reversed and recomputed against the new verdict. This requires a settlement-enforcement delay (escalation window) before terminal states become final.",
  ],

  stack: {
    all: [
      STACK.TYPESCRIPT,
      STACK.REACT,
      STACK.NEXT,
      STACK.ZOD,
      STACK.TANSTACK_QUERY,
      STACK.TANSTACK_TABLE,
      STACK.NUQS,
      STACK.SOLIDITY,
      STACK.FOUNDRY,
      STACK.OPEN_ZEPPELIN,
      STACK.WAGMI,
      STACK.REOWN,
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
        key: "TanStack Query + TanStack Table + nuqs",
        description:
          "Reactive UI data layer — **TanStack Query** caches server queries and invalidates on `NewPublicationStatus` WSS events; **TanStack Table** plus a custom **niko-table** library powers the `/publications` data grid; **nuqs** syncs filters and pagination to URL state.",
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
      {
        key: "OpenZeppelin",
        description:
          "**ReentrancyGuard** on ETH-out paths (**claim**, **transferSlashPoolToTreasury**) — battle-tested primitives instead of hand-rolled guards.",
      },
    ],
  },

  diagram: {
    title: "Publication lifecycle",
    caption: "On-chain PublicationStatus state machine (BioVerify README).",
    definition: `stateDiagram-v2
      [*] --> SUBMITTED : submitPublication()
      SUBMITTED --> EARLY_SLASHED : AI detects plagiarism
      SUBMITTED --> IN_REVIEW : AI passes, VRF selects reviewers
      IN_REVIEW --> PUBLISHED : peer review consensus (pass)
      IN_REVIEW --> SLASHED : peer review consensus (fail)
      EARLY_SLASHED --> [*]
      PUBLISHED --> [*]
      SLASHED --> [*]`,
  },

  images: [
    "/projects/bioverify/images/bioverify_publications.jpg",
    "/projects/bioverify/images/bioverify_landing.jpg",
  ],

  gifs: [],

  featured: {
    category: "Web3 Architecture & Coordination",
    subtitle: "Base & Ethereum Sepolia",
    summary:
      "A case study in treating scientific peer review as a **coordination game**: authors stake ETH, an AI agent screens for plagiarism, Chainlink VRF picks reviewers, and human verdicts settle on-chain — with research artifacts pinned to IPFS.",
    bullets: [
      "**Getter-less contract, event-sourced reads** — **BioVerifyV3** emits events instead of exposing view getters; **Alchemy Notify** delivers logs to an **HMAC-SHA256**-verified webhook that projects into **Neon Postgres** with optimistic concurrency — the frontend reads from the projection, not the chain.",
      "**Dual-agent pipeline** — a **Submission Agent** fetches the IPFS manifest and runs a neural search via **Exa AI** for plagiarism screening; a **Review Agent** manages multi-day human-in-the-loop peer review, with **LangGraph** checkpointers and **Inngest** durable execution so workflows survive serverless cold starts.",
      "**Trust-minimized reviewer selection** — after screening passes, **Chainlink VRF** provides cryptographically verifiable randomness to pick peer reviewers from the staked pool — no operator or contract owner can influence who reviews a submission.",
    ],
  },

  links: {
    page: "/projects/bioverify",
    article: {
      href: "/articles/bioverify",
      label: "Read the BioVerify article",
      iconName: "dna",
    },
    live: process.env.NEXT_PUBLIC_BIOVERIFY_LIVE ?? "",
    github: bioVerifyGithub,
    ogImage: bioVerifyOgImage,
    architectureDoc: bioVerifyGithub
      ? `${bioVerifyGithub}/blob/main/docs/architecture.md`
      : "",
  },
}

export const BIOVERIFY_LINKS = bioVerifyProject.links

export const PROJECTS: Project[] = [
  bioVerifyProject,

  {
    slug: "bet2gether",
    constructionPeriod: "Nov–Dec 2025",
    title: {
      h1: "Bet2Gether",
      h2: "Autonomous Chainlink Oracle-Driven Settlement",
      short: "Chainlink-Settled Prediction Market",
    },
    description: {
      short:
        "Solidity on-chain state machine with Chainlink Price Feeds, Automation, and VRF — exploring operator-free prediction-market settlement on Ethereum Sepolia (Next.js + wagmi + Tenderly).",
      problem:
        "Prediction markets only stay interesting when settlement is credibly neutral. Operator-settled designs ask you to trust whoever calls resolve and picks the price. Permissionless on-chain designs still need something to trigger resolution at the deadline — if only winners call it, timing becomes gameable; if a single bot runs it, trust shifts to that operator. Random rewards driven by block metadata or admin-picked tokenIds are easy to bias or predict.",
      solution:
        "Once a round opens, settlement and reward draws are encoded as state transitions tied to oracle inputs — no operator step after that. **PredictionPool** reads **Chainlink Price Feeds** at the deadline; **Chainlink Automation** calls **performUpkeep**; **Chainlink VRF v2.5** supplies verifiable randomness for **ERC-1155** reward tokenIds; a **Tenderly Web3 Action** can bridge resolution events to a gated mint when the round creator wins.",
      overview: `
        Bet2Gether is a small prediction-market case study on **Ethereum Sepolia**. Rounds resolve from an allow-listed **Chainlink Price Feed** when the pool's resolve step runs after the deadline — the settlement price is whatever the feed returns at resolution time, not an ad hoc admin choice.
        **PredictionPool** implements **AutomationCompatibleInterface**: **checkUpkeep** flags due rounds and **performUpkeep** resolves them. **PredictionPoolToken** mints randomized **ERC-1155** collectibles via **VRFConsumerBaseV2Plus**; a **Tenderly Web3 Action** listens for **PredictionPool_RoundResolved** and, when configured logic applies, calls **mint** with **MINTER_ROLE** protection.
        The **Next.js** client uses **wagmi**, **viem**, **Alchemy WebSockets**, and **RainbowKit** for wallet UX and event-driven UI.
      `,
    },

    features: [
      {
        key: "Prediction games with oracle pricing",
        description:
          "Players bet on crypto price movements; settlement reads **Chainlink Price Feeds**.",
      },
      {
        key: "CEI Pattern & Reentrancy Guard",
        description:
          "In **claimReward**, internal state (e.g. claimed) is updated before the external ETH transfer (**Checks-Effects-Interactions**). **nonReentrant** protects **claimReward**.",
      },
      {
        key: "Atomic Settlement",
        description:
          "**_resolveRound** reads the settlement price from the feed and updates round status in **one execution step** for that round.",
      },
      {
        key: "Autonomous Settlement Engine",
        description:
          "**PredictionPool** implements **AutomationCompatibleInterface** — **Chainlink Automation** calls **performUpkeep** so eligible rounds resolve without centralized administrative control.",
      },
      {
        key: "Provably Fair NFT Rewards",
        description:
          "Winning game creators receive randomized **ERC-1155** NFTs using **Chainlink VRF v2.5** for verifiable randomness.",
      },
      {
        key: "Time-Weighted Payouts",
        description:
          "**getBetWeight** scales each bet by `((round.end - bet.time) * 1e18) / (round.end - round.start)` — earlier conviction earns a larger share of the pool than late-round piling-on.",
      },
      {
        key: "Real-Time Updates",
        description:
          "UI reacts instantly to new games, bets, and resolutions via **Alchemy WebSockets** and contract event listeners (**Wagmi**).",
      },
      {
        key: "Hybrid On-Chain/Off-Chain Automation",
        description:
          "**Tenderly Web3 Actions** mint NFT rewards based on on-chain events, exploring off-chain automation.",
      },
      {
        key: "Smart Contract Testing",
        description: "**Solidity** contracts tested with **Foundry**.",
      },
      {
        key: "Verified Smart Contracts",
        description:
          "Deployed to **Sepolia** and automatically verified on **Etherscan** for transparency.",
      },
    ],

    challenges: `
    Wiring multiple **Chainlink** surfaces (Price Feeds, Automation, VRF) without letting any one path become a hidden admin.
    Real-time UI needed selective refetching and disciplined event listeners instead of polling everything.
    Isolating payout math, VRF callbacks, and the Tenderly bridge kept failure modes easier to reason about.
    `,

    outcome: `
      Bet2Gether is deployed on **Ethereum Sepolia** with verified **PredictionPool** and **PredictionPoolToken** on **Etherscan**.
      It is a learning exercise in oracle-driven resolution, autonomous upkeep, verifiable randomness for collectibles, and a small event-driven **Next.js** client — not a production prediction market.
    `,
    outcomeMetrics: [
      "**Deployment:** Ethereum Sepolia — PredictionPool & PredictionPoolToken verified on Etherscan",
      "**Sepolia addresses:** [PredictionPool](https://sepolia.etherscan.io/address/0x51A0a7561dEbA056C1cDF5aB4c369Db686c77EF6) · [PredictionPoolToken](https://sepolia.etherscan.io/address/0xddd3c73caE8541FC6Ea119C1BffC5B6547D33eCf)",
      "**Chainlink:** Price Feeds (settlement), Automation (**performUpkeep**), VRF v2.5 (ERC-1155 reward randomness)",
      "**Settlement:** Price feed at deadline — not an operator-chosen number",
      "**Real-time UI:** Alchemy WebSockets + wagmi listeners",
      "**Coverage caveat:** Branch coverage measures how much branching ran under tests — not total logical completeness. README snapshot: **PredictionPool** ~89.5% lines / ~77.8% branches; **PredictionPoolToken** ~85.7% lines / ~25.0% branches (see repo for latest `forge coverage`).",
    ],
    transferablePatterns:
      "Oracle-driven settlement, hybrid on/off-chain automation, event-driven UI architecture.",

    limitations: [
      "**Testnet only** — Deployed on **Ethereum Sepolia** for experimentation, not mainnet money at risk.",
      "**Tenderly bridge** — The Web3 Action is an off-chain automation path with its own trust assumptions; minting is gated by **MINTER_ROLE** on **PredictionPoolToken**.",
    ],
    roadmap: [
      "**L2 convergence** — Deploy to Arbitrum, Optimism, or similar to compare settlement cost and UX vs Sepolia.",
      "**On-chain reward path** — Replace Tenderly-triggered minting with logic inside core contracts for a fully on-chain reward flow.",
    ],

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
        STACK.OPEN_ZEPPELIN,
        STACK.WAGMI,
        STACK.RAINBOW_KIT,
        STACK.VIEM,
        STACK.CHAINLINK,
        STACK.TENDERLY,
        STACK.ALCHEMY,
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
        {
          key: "OpenZeppelin",
          description:
            "**Ownable**, **AccessControl**, **ReentrancyGuard**, and **ERC1155** — `claimReward` reentrancy guard, **MINTER_ROLE**-gated mint, and the **PredictionPoolToken** ledger.",
        },
      ],
    },

    diagram: {
      title: "Autonomous oracle settlement",
      caption:
        "Chainlink Automation performs upkeep; pool resolves from Price Feed (Bet2Gether README).",
      definition: `sequenceDiagram
    participant User
    participant Pool as PredictionPool
    participant CL_Feed as Chainlink_PriceFeed
    participant CL_Auto as Chainlink_Automation
    participant Tenderly as Tenderly_Web3_Action
    participant Token as PredictionPoolToken
    participant CL_VRF as Chainlink_VRF

    User ->> Pool: createRound(feed, target, betSide, duration)
    User ->> Pool: betOn(roundId, betSide)
    CL_Auto ->> Pool: performUpkeep at round.end
    Pool ->> CL_Feed: latestRoundData (atomic settlement)
    CL_Feed -->> Pool: verified price
    Pool ->> Pool: _resolveRound and emit PredictionPool_RoundResolved
    Pool -->> Tenderly: PredictionPool_RoundResolved (event)
    Tenderly ->> Token: mint(creatorIfWinner)
    Token ->> CL_VRF: requestRandomWords
    CL_VRF -->> Token: fulfillRandomWords → ERC1155 _mint`,
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

    featured: {
      category: "Web3 Architecture & Coordination",
      summary:
        "A proof-of-concept for running prediction markets where settlement is decentralized and tamper-resistant, staying outside any operator's hands: Chainlink Price Feeds set the price at deadline, Automation triggers resolution, and VRF randomizes ERC-1155 rewards.",
      bullets: [
        "**Automation-driven resolution** — **Chainlink Automation** calls **performUpkeep** so eligible rounds move without a human operator clicking resolve.",
        "**Verifiable inputs** — **Chainlink Price Feeds** for settlement prices and **Chainlink VRF v2.5** for unpredictable **ERC-1155** reward ids.",
      ],
    },

    links: {
      page: "/projects/bet2gether",
      live: process.env.NEXT_PUBLIC_BET2GETHER_LIVE ?? "",
      github: process.env.NEXT_PUBLIC_BET2GETHER_GITHUB ?? "",
    },
  },
  {
    slug: "forge",
    constructionPeriod: "Oct–Nov 2025",
    title: {
      h1: "Forge",
      h2: "ERC-1155 Token-Composition",
      short: "Atomic ERC-1155 Crafting",
    },
    description: {
      short:
        "ERC-1155 crafting case study — atomic burn-then-mint for composites, access-controlled logic vs ledger split, and 100% Foundry coverage on project-owned contracts (Next.js + wagmi).",
      problem:
        "ERC-1155 games and crafting loops need supply mutations that stay atomic: burn inputs and mint outputs in one transaction, with rules separated from the token ledger so balances cannot be half-updated.",
      solution:
        "Forge splits **FToken** (ledger) from **Forge** (rules). Composite IDs 3–6 use **burnBatch** + **mint** in a single tx; basic mints are cooldown-gated; the **Next.js** UI syncs via **Alchemy WebSockets** and **TanStack Query** invalidation.",
      overview: `
      Forge is an experiment in keeping composition rules and supply mutations honest on **ERC-1155**. The ledger (**FToken**) stays supply-focused; the rules (**Forge**) encode cooldowns, recipes, trade constraints, and burn permissions. Every supply change routes through **Forge**, which is the immutable owner of **FToken** after deploy.
      For forged token IDs 3–6, **Forge.mint** calls **burnBatch** then **mint** in one transaction so balances do not end up half-updated on success paths. Basic mints (0–2) are cooldown-gated; the **Next.js** UI listens to **Forge** events over **Alchemy WebSockets** with **wagmi** and invalidates **TanStack Query** keys instead of polling.
      The same split between rules and balances shows up in other domains (crafting loops, inventory-like state machines, enforced burn-mint flows) — spelled out under transferable patterns below rather than as product claims here.
      `,
    },

    features: [
      {
        key: "On-Chain Crafting System (ERC-1155)",
        description:
          "Players mint basic tokens and forge rare items by burning combinations, enforced entirely by **Solidity** logic.",
      },
      {
        key: "CEI & Atomic Composition",
        description:
          "Basic mint updates **userCoolDownTimer** before the external **I_TOKEN.mint** call (**Checks-Effects-Interactions**). For forged IDs **3–6**, mint performs **burnBatch** then mint in **one transaction** — no half-updated balances.",
      },
      {
        key: "Logic / Asset Contract Separation",
        description:
          "**FToken** **mint**, **burn**, and **burnBatch** are **onlyOwner**; only the deployed **Forge** address can mutate supply. **Forge** owns **FToken** immutably after deployment.",
      },
      {
        key: "Cooldown-Based Minting",
        description:
          "Per-address cooldown on basic mints (IDs **0–2**) enforces rate limits without a centralised API.",
      },
      {
        key: "Event-Driven UI Updates",
        description:
          "Real-time syncing of mint, burn, forge, and trade events via **Alchemy WebSockets**.",
      },
      {
        key: "100% Contract Test Coverage",
        description:
          "**Foundry** coverage report: **100%** lines, statements, branches, and functions across **Forge.sol**, **FToken.sol**, and both deployment scripts (**ForgeScript**, **FTokenScript**).",
      },
      {
        key: "Verified Smart Contracts",
        description:
          "Deployed to **Sepolia** and automatically verified on **Etherscan** for transparency.",
      },
    ],
    challenges: `
    Encoding recipes, cooldowns, and trade/burn rules so they stay readable in **Solidity** without hiding edge cases.
    Reaching **100% Foundry** coverage meant exhaustive happy-path and revert coverage across **Forge.sol**, **FToken.sol**, and deploy scripts.
    Event-driven UI updates required careful **TanStack Query** key design so each **Forge** event only invalidates what changed.
  `,
    outcome: `
    Forge on **Sepolia** shows atomic **ERC-1155** composition with verified contracts and a small single-page **Next.js** client — a focused case study, not a shipped game economy.
  `,
    outcomeMetrics: [
      "**Test rigor:** 37 Foundry tests — 100% coverage on project-owned contracts",
      "**Coverage (Foundry):** 95/95 lines · 99/99 statements · 19/19 branches · 17/17 functions — Forge.sol, FToken.sol, and deploy scripts",
      "**Sepolia addresses:** [Forge](https://sepolia.etherscan.io/address/0x7d8A16168D337B2241fCbA1cc5bd196479DF1F0C#code) · [FToken](https://sepolia.etherscan.io/address/0xa6D68eDA0993364481C2c5DA8d6cd43e03f592bA#code)",
      "**Deployment:** Sepolia — Forge & FToken verified on Etherscan",
      "**Architecture:** Forge is immutable owner of FToken; only Forge mutates supply; forged IDs use burnBatch + mint in one tx",
    ],
    transferablePatterns:
      "DeFi-style position composition, supply-chain traceability metaphors, on-chain cooldowns as simple rate limits, **ERC-1155** batch operations for atomic multi-token updates.",

    limitations: [
      "**Single network** — Sepolia deployment for learning; no mainnet or multi-chain story in this repo.",
      "**Cooldown model** — One global delay for basic mints (IDs 0–2); no per-token issuance curves yet.",
      "**Marketplace** — No secondary marketplace integration beyond the on-chain **trade** helper into basics.",
    ],
    roadmap: [
      "**L2 comparison** — Deploy the same **Forge**/**FToken** pattern to an L2 testnet and compare gas on **burnBatch** + **mint** paths vs Sepolia.",
      "**Progressive cooldowns** — Per-id or tiered cooldown tuning instead of a single mapping.",
      "**Marketplace hooks** — Pair the contracts with standard **ERC-1155** marketplace flows.",
    ],

    stack: {
      all: [
        STACK.TYPESCRIPT,
        STACK.REACT,
        STACK.NEXT,
        STACK.ZOD,
        STACK.RHF,
        STACK.TANSTACK_QUERY,
        STACK.SOLIDITY,
        STACK.FOUNDRY,
        STACK.OPEN_ZEPPELIN,
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
        {
          key: "OpenZeppelin",
          description:
            "**ERC-1155** base implementation behind **FToken**; supply mutations gated behind **onlyOwner** so only the immutable **Forge** owner can mutate balances.",
        },
      ],
    },

    diagram: {
      title: "Tier composition",
      caption: "Atomic burn/mint paths for forged token IDs (Forge README).",
      definition: `graph TD
      ironOre[IronOre_id0] --> forge3[Forge_mint_id3]
      elementalEssence[ElementalEssence_id1] --> forge3
      forge3 -->|"burnBatch_then_mint"| steelIngot[SteelIngot_id3]

      elementalEssence --> forge4[Forge_mint_id4]
      crystalShards[CrystalShards_id2] --> forge4
      forge4 -->|"burnBatch_then_mint"| enchantedCrystal[EnchantedCrystal_id4]

      ironOre --> forge5[Forge_mint_id5]
      crystalShards --> forge5
      forge5 -->|"burnBatch_then_mint"| reinforcedCrystal[ReinforcedCrystal_id5]

      ironOre --> forge6[Forge_mint_id6]
      elementalEssence --> forge6
      crystalShards --> forge6
      forge6 -->|"burnBatch_then_mint"| legendaryCore[LegendaryCore_id6]
    `,
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

    featured: {
      category: "Smart Contract Patterns & Testing",
      subtitle: "Sepolia",
      summary:
        "An experiment in ERC-1155 crafting rules: the ledger (FToken) handles balances while the rules contract (Forge) encodes recipes, cooldowns, and atomic burn-then-mint — with 100% Foundry coverage.",
      bullets: [
        "**Atomic forging** — Composite tokens (IDs 3–6) are created by burning their inputs and minting the result in a single transaction (**burnBatch** + **mint**) — one wallet confirmation, no half-updated balances.",
        "**Ownership-gated composition** — **Forge** deploys **FToken** (ERC-1155) and becomes its immutable owner; all supply mutations are gated behind **onlyOwner**, cleanly separating crafting rules from the token ledger.",
        "**Foundry rigor** — 37 tests, 100% coverage on **Forge.sol**, **FToken.sol**, and deploy scripts; contracts verified on Sepolia.",
      ],
    },

    links: {
      page: "/projects/forge",
      live: process.env.NEXT_PUBLIC_FORGE_LIVE ?? "",
      github: process.env.NEXT_PUBLIC_FORGE_GITHUB ?? "",
    },
  },
  {
    slug: "gavl",
    constructionPeriod: "Sep–Oct 2025",
    title: {
      h1: "GavL — Next Auctions",
      h2: "Realtime Bidding · Stripe Settlement · CRON Lifecycle",
      short: "Real-Time Auction Orchestration",
    },

    description: {
      short:
        "Real-time full-stack auction case study — multi-user bidding, domain-driven architecture, Supabase CRON + Edge Functions, and Stripe (Next.js, Supabase, TypeScript).",
      problem:
        "Auction platforms need live multi-user bidding, automatic closure at deadline, and payment settlement without exposing privileged database access to the browser.",
      solution:
        "GavL uses **Supabase Realtime** for live bids, a **CRON**-triggered **close-auctions** Edge Function, and **Stripe** webhooks with a server-only service role to update payment state safely under **RLS**.",
      overview: `
        GavL is a learning build focused on real-time full-stack flows. It follows a lightweight domain-driven layout: domains hold types and **Zod** schemas; ports are repository interfaces; services own workflows; **Supabase** repositories sit behind those ports; instances wire services to infrastructure.
        **Supabase Realtime** broadcasts notifications for new bids, auction wins, and payments. A **Supabase CRON** job triggers the **close-auctions** Edge Function so auctions close at **endAt**. **Stripe Checkout** plus a verified webhook updates **paidAt** through a **service-role** client where **RLS** must be bypassed safely on the server only.
        The UI is multilingual (**French**, **English**, **German** via **Lingui**), responsive, and uses URL-driven filters, sorting, and pagination (**nuqs**) with **Suspense** and skeleton loaders.
      `,
    },

    features: [
      {
        key: "Real-Time Bidding Engine",
        description:
          "Live multi-user bidding with instant updates using **Supabase Realtime**.",
      },
      {
        key: "End-to-End Auction Lifecycle",
        description:
          "Creation, editing, bidding, automatic closure (**CRON** + **Edge Functions**), winner notifications, and payment completion.",
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
          "URL-driven filters, sorting, and pagination using **nuqs** for consistent server-client synchronization.",
      },
      {
        key: "Multilingual UI",
        description:
          "Fully localized interface in **French**, **English**, and **German** via **Lingui** with locale-aware routes.",
      },
      {
        key: "Domain-driven architecture",
        description:
          "Domains, ports, repositories, and services — **Jest**-tested workflows with URL-driven filters via **nuqs**.",
      },
    ],
    challenges: `
        Designing a multi-user bidding flow that stayed understandable while **Supabase Realtime**, **CRON** + Edge Functions, and **Stripe** webhooks all touched related rows.
        **RLS** had to protect normal clients while the webhook used a **service-role** client safely — no privileged paths exposed to the browser.
        Keeping notifications, auction state, and payment flags aligned across triggers required clear repository boundaries and idempotent handlers where possible.
    `,

    outcome: `
      GavL demonstrates an end-to-end auction flow at **next-auctions.vercel.app**: live bidding, automated closure, **Stripe** settlement, realtime notifications, multilingual UI (**French**, **English**, **German**), dashboards with charts, and a domain-shaped codebase with **Jest** coverage.
      It complements the Web3 case studies — evidence of full-stack work on payments, realtime sync, i18n, and testing alongside on-chain experiments.
    `,
    outcomeMetrics: [
      "**Live demo:** next-auctions.vercel.app",
      "**i18n:** French / English / German (Lingui)",
      "**Architecture:** Domain-driven design — domains, ports, repositories, services; URL-driven filters via nuqs; Jest coverage",
      "**Automation:** Supabase CRON → Edge Function auction closure; Stripe webhooks → service-role client for RLS-safe payment updates",
    ],
    transferablePatterns:
      "Payments + webhooks, realtime fan-out, automated lifecycle jobs, and disciplined data boundaries.",

    limitations: [
      "**Testing depth** — **Jest** covers domain logic; there is no end-to-end browser harness in this repo yet.",
      "**Service role trust** — Stripe webhook updates intentionally bypass **RLS** with a server-only key; misuse would be catastrophic, so the surface stays tiny and audited.",
      "**CRON granularity** — Auction closure depends on how often the scheduled job runs; near-miss timing is bounded by that cadence.",
    ],
    roadmap: [
      "**Cypress E2E** — Cover login, bidding, closure, and Stripe test-mode flows in a browser.",
      "**Admin dashboards** — Richer operational views for support-style tasks.",
    ],

    stack: {
      all: [
        STACK.TYPESCRIPT,
        STACK.REACT,
        STACK.NEXT,
        STACK.ZOD,
        STACK.RHF,
        STACK.TANSTACK_TABLE,
        STACK.LINGUI,
        STACK.NUQS,
        STACK.RECHARTS,
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
          description: "Nuqs, TanStack Table, Recharts (payments dashboards)",
        },
        {
          key: "Internationalization",
          description:
            "**Lingui** — French / English / German with locale-aware routes.",
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
            "Domain-driven structure with domains, ports, repositories, services, and wired instances",
        },
      ],
    },

    diagram: {
      title: "Real-time bid flow",
      caption:
        "DB triggers and Supabase Realtime broadcast (Next Auctions README).",
      definition: `sequenceDiagram
    participant User as Logged-in User
    participant Bids as Bids Table
    participant Auctions as Auctions Table
    participant Notifications as Notifications Table
    participant Clients as Connected Clients

    User ->> Bids: Insert new bid
    Bids ->> Auctions: Update highest bid info (Trigger: New Bid)
    Bids ->> Notifications: Insert NEW_BID for owner & previous bidders (Trigger: New Bid)
    Notifications ->> Clients: Broadcast changes via Supabase Realtime`,
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

    featured: {
      category: "Full-Stack Web2",
      subtitle: "Sep–Oct 2025",
      summary:
        "A learning build for real-time full-stack flows: live multi-user bidding over Supabase Realtime, automated auction closure via CRON + Edge Functions, and Stripe settlement with RLS-safe webhook handling.",
      bullets: [
        "**Asynchronous Settlement** — secure **Stripe** webhook ingestion, using elevated **Supabase Service Roles** to safely bypass Row Level Security (RLS) and update payment states asynchronously.",
        "**Automated lifecycle + live sync** — a **Supabase CRON** job triggers the **close-auctions Edge Function** on schedule; DB changes propagate to all connected clients via **Supabase Realtime** broadcasts.",
        "**i18n + DDD** — **French**, **English**, and **German** via **Lingui**; domain/ports/repositories/services with **Jest** coverage on core workflows.",
      ],
    },

    links: {
      page: "/projects/gavl",
      live: process.env.NEXT_PUBLIC_GAVL_LIVE ?? "",
      github: process.env.NEXT_PUBLIC_GAVL_GITHUB ?? "",
    },
  },
]
