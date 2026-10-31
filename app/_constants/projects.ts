import { isArticleHrefHeld } from "@/app/_lib/held-articles";
import type { Project } from "@/app/_types/project";
import { labstrailProject } from "./project-entries/labstrail";
import { walletWatcherProject } from "./project-entries/wallet-watcher";
import { STACK } from "./stack";

const bioVerifyGithub = "https://github.com/SiegfriedBz/BioVerify_Agentic_DApp";

/** Bundled article hero + OG fallback (works with next/image without remotePatterns). */
export const BIOVERIFY_ARTICLE_HERO =
  "/projects/bioverify/images/bioverify-landing.webp";

const bioVerifyProject: Project = {
  slug: "bioverify",
  languages: ["TypeScript", "Solidity"],
  constructionPeriod: "Jan–Apr 2026",
  title: {
    h1: "BioVerify",
    h2: "DeSci Peer-Review — Chainlink VRF & Durable AI Agents for Scientific Integrity",
    short: "Multi-chain Agentic DeSci Case Study",
  },

  description: {
    short:
      "Multi-chain DeSci peer-review case study — Next.js + Solidity + Chainlink + LangGraph + Inngest for decentralized peer review (Base Sepolia & Ethereum Sepolia).",
    meta: "DeSci peer review on Base Sepolia and Ethereum Sepolia: Solidity, Chainlink VRF, a LangGraph review agent, Inngest and a Next.js front end.",
    problem:
      "Published papers often point to mutable URLs (data can change or disappear after publication). Reviewer selection is opaque, incentives for reviewers and publishers are weak, and the reproducibility crisis has eroded trust in research findings.",
    solution:
      "BioVerify is an experiment in that direction. It treats peer review as a **coordination game**: authors stake ETH, AI screens for plagiarism, human reviewers sign their reviews, Gemini or (after an escalation) a senior reviewer sets the verdict, an agent settles it on-chain, and research artifacts are pinned to IPFS so what was reviewed stays addressable. A truth layer (BioVerifyV3) holds stakes, lifecycle, VRF-based reviewer selection, and settlement; an orchestration layer (LangGraph + Inngest) runs screening and review graphs with human-in-the-loop pauses. The contract only accepts a settlement split over reviewers who have stake locked on that publication, so the agent cannot slash arbitrary accounts, but it does decide who is honest.",
    overview: `
        BioVerify separates concerns across two layers. On-chain, **BioVerifyV3** is the source of truth for stakes, publication status, reviewer selection, and settlement. Off-chain, **LangGraph** runs the submission and review graphs and its **Postgres checkpointer** carries pauses that can span days, while **Inngest** retries each agent run.
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
        "A **LangGraph** **Submission Agent** fetches the abstract from **IPFS**, runs a neural search against academic literature via **Exa AI**, and produces a structured **Gemini** LLM verdict. A plagiarism verdict triggers immediate **on-chain slashing**, with no human in that step.",
    },
    {
      key: "VRF Reviewer Selection",
      description:
        "If the submission passes AI screening, **Chainlink VRF** draws `I_VRF_NUM_WORDS = 3` candidates from the staked reviewer pool; the Chainlink coordinator verifies the randomness proof on-chain before calling back **BioVerifyV3**. The submission fee funds the VRF subscription, and rewards are reserved before selection. The **Senior Reviewer** is whichever drawn reviewer has the highest on-chain reputation.",
    },
    {
      key: "Human-in-the-Loop Peer Review",
      description:
        "Selected reviewers submit **EIP-712**-signed verdicts through the frontend. Each review resumes the **LangGraph Review Agent**'s **HITL** interrupt. **Gemini** reads the peer verdicts and either settles or escalates to the **Senior Reviewer**; after escalation, code (not the prompt) forces the senior's decision.",
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
        "**Getter-light** contract design — state mutations emit events, projected off-chain via **Alchemy Notify** webhooks into a **Neon Postgres** read model (**Drizzle ORM**) with **optimistic concurrency control**.",
    },
    {
      key: "Durable Agent Orchestration",
      description:
        "**LangGraph** checkpointers (Postgres) let the review graph pause for days at a human-in-the-loop interrupt and resume where it left off; **Inngest** starts each agent run and retries it on failure.",
    },
    {
      key: "Live Telegram Notifications",
      description:
        "A public **Telegram bot** posts updates as each publication moves through screening, review and settlement, on **Base Sepolia** and **Ethereum Sepolia**, so readers can follow it without keeping the app open.",
    },
  ],

  challenges: `
        Orchestrating durable agents across asynchronous human review: **LangGraph** checkpointers let the workflow pause for days and resume at the same human-in-the-loop interrupt.
        A getter-light, event-emitted contract required tight alignment between on-chain emissions and **Neon Postgres** projections via **Alchemy Notify**; optimistic concurrency on (blockNumber, logIndex) makes a repeated webhook delivery harmless.
        I kept **Inngest** to retries around each agent run and the pause itself in **LangGraph** state; a retry re-runs the whole agent, so its commands read state before writing where they can.
    `,

  outcome: `
        BioVerify demonstrates an end-to-end DeSci peer-review pipeline on **Base Sepolia** and **Ethereum Sepolia** — stake and submit, AI-assisted screening, **Chainlink VRF** reviewer selection, human review with escalation, and on-chain settlement with explicit incentives.
        The work is a learning vehicle for combining stateful agents, durable execution, and Solidity coordination — not a production claim for scientific publishing.
    `,
  outcomeMetrics: [
    "**Deployments:** Base Sepolia + Ethereum Sepolia (verified contract addresses on-chain explorers)",
    "**Tests:** BioVerifyV3 — 50 Foundry tests across 12 suites, in 11 files, including VRF edge cases (collisions, pool shrinking and rewards running out during VRF); `forge coverage` on 24 October 2026: 100% of lines (240/240), branches (37/37) and functions. Only the contract has automated tests",
    "**Read path:** Product queries served from the Neon Postgres projection; lists update over WebSocket, the detail view polls every 10 s until the publication is final",
    "**Realtime UX:** Standalone viem WebSocket clients + TanStack Query invalidation (no eth_call fanout for UX reads)",
    "**Security primitives:** CEI + OpenZeppelin nonReentrant on ETH-out paths; pull-withdrawal claims; HMAC-SHA256–verified Alchemy Notify webhooks; EIP-712–signed peer reviews",
  ],
  transferablePatterns:
    "Event-driven CQRS, durable agent orchestration, multi-actor coordination — patterns that also apply to dashboards, DAO tooling, and marketplaces.",

  limitations: [
    "**Settlement is trusted to one agent key** — a single immutable agent address drives every transition (pick reviewers, early slash, publish or slash), and on both deployments the agent address is also the treasury and the owner, who can change the VRF coordinator. The contract limits whom it can slash, not the verdict.",
    "**LLM decisions without a human** — the plagiarism early-slash is one Gemini call over Exa's top results, and without escalation Gemini decides pass or fail from the peer reviews; reviewers who disagree with it are slashed. Signed reviews are verified off-chain; the contract stores only a bool per review, and the signatures stay in the private checkpoint database.",
    "**Contract edge cases** — `pickReviewers` checks `status != IN_REVIEW` instead of `== SUBMITTED`, so the agent could re-open a finished publication; if the reviewer pool shrinks or rewards run out between the VRF request and fulfilment, the callback reverts and the publication stays IN_REVIEW (VRF does not retry); collision handling by linear probing slightly biases the draw.",
    "**Read model** — each row carries one (block, logIndex) stamp while updates touch some columns, so a late event changing a different field is dropped; failed projections after the webhook's 200 are lost, with no replay job yet; the webhook's HMAC is compared with `===`, not in constant time.",
    "**IPFS reads trust the gateway** — the agent fetches content through the **Pinata** gateway and does not re-hash it against the CID.",
    "**No author recourse against false positives** — The submission agent can produce a false plagiarism verdict, and peer review can reach a binding decision the author considers incorrect. Today both paths are terminal (immediate `earlySlashPublication` or `slashPublication`); there is no contract-level mechanism for the author to contest, post an escalation stake, or trigger a second human-only review.",
    "**IPFS / manifest edge cases** — A syntactically valid CID that resolves to an empty or malformed manifest can leave the submission graph without a clean pass/fail path; after **Inngest** step retries the publication may remain stuck in SUBMITTED until validation is hardened.",
    "**Agent transaction failures** — On-chain commands use simulate-then-write with no gas bump or nonce recovery. Settlement runs in the Next.js server action that resumes the last review, with no retry, so a gas spike can leave a publication in IN_REVIEW after the last human review is recorded.",
    "**Chain support is hardcoded** — the two networks are a fixed enum used across the codebase; adding a chain means a new deployment plus changes in several places.",
    "**Testing depth** — only the contract has automated tests; the agents, the read model and the frontend have none.",
  ],
  roadmap: [
    "**Less trust in the agent** — Separate the agent, the treasury and the owner, and record each review's signature on-chain so the contract can check who voted what.",
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
          "BioVerifyV3 smart contract with staking, slashing, VRF-based reviewer selection, an O(1) swap-and-pop reviewer pool, and on-chain settlement. 50 Foundry tests.",
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
          "Retries around each agent run that a chain event starts: the submission agent (screening, then the reviewer draw) and the start of the review agent.",
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
      IN_REVIEW --> PUBLISHED : final verdict (pass)
      IN_REVIEW --> SLASHED : final verdict (fail)
      EARLY_SLASHED --> [*]
      PUBLISHED --> [*]
      SLASHED --> [*]`,
  },

  images: [
    "/projects/bioverify/images/bioverify-landing.webp",
    "/projects/bioverify/images/bioverify_publications.jpg",
  ],

  videos: [
    "/projects/bioverify/videos/submit-success-01-form.mp4",
    "/projects/bioverify/videos/early-slash-02-realtime.mp4",
    "/projects/bioverify/videos/peer-review-02-fail.mp4",
    "/projects/bioverify/videos/peer-review-04-published.mp4",
  ],

  featured: {
    category: "Web3 Architecture & Coordination",
    subtitle: "Base & Ethereum Sepolia",
    summary:
      "A case study in treating scientific peer review as a **coordination game**: authors stake ETH, an AI agent screens for plagiarism, Chainlink VRF picks reviewers who sign their reviews, Gemini or a senior reviewer sets the verdict, and an agent settles it on-chain — with research artifacts pinned to IPFS.",
    bullets: [
      "**Getter-light contract, event-sourced reads** — **BioVerifyV3** emits events instead of exposing most view getters; **Alchemy Notify** delivers logs to an **HMAC-SHA256**-verified webhook that projects into **Neon Postgres** with optimistic concurrency — the frontend reads from the projection, not the chain.",
      "**Dual-agent pipeline** — a **Submission Agent** fetches the IPFS manifest and runs a neural search via **Exa AI** for plagiarism screening; a **Review Agent** manages multi-day human-in-the-loop peer review, with **LangGraph** checkpointers carrying the pause across serverless cold starts and **Inngest** retrying each agent run.",
      "**VRF reviewer selection** — after screening passes, **Chainlink VRF** draws peer reviewers from the staked pool, so reviewers are drawn, not hand-picked, as long as the coordinator is Chainlink's. The agent key settles every outcome and also owns the contract, so it could swap the coordinator (listed under limitations).",
    ],
  },

  links: {
    page: "/projects/bioverify",
    article: {
      href: "/articles/bioverify",
      label: "Read the BioVerify article",
      iconName: "dna",
    },
    live: "https://bio-verify-ai-dapp.vercel.app",
    github: bioVerifyGithub,
    ogImage: BIOVERIFY_ARTICLE_HERO,
    architectureDoc: bioVerifyGithub
      ? `${bioVerifyGithub}/blob/main/docs/architecture.md`
      : "",
  },
};

export const BIOVERIFY_LINKS = bioVerifyProject.links;

const ALL_PROJECTS: Project[] = [
  labstrailProject,
  walletWatcherProject,
  bioVerifyProject,

  {
    slug: "bet2gether",
    languages: ["TypeScript", "Solidity"],
    constructionPeriod: "Oct–Nov 2025",
    title: {
      h1: "Bet2Gether",
      h2: "Chainlink Automation-Driven Round Resolution",
      short: "Chainlink-Settled Prediction Market",
    },
    description: {
      short:
        "Solidity prediction pools with Chainlink Price Feeds, Automation, and VRF — rounds go from Active to Resolved on an Automation upkeep, on Ethereum Sepolia (Next.js + wagmi + Tenderly). Has a known payout bug, listed under Known limitations.",
      meta: "Solidity prediction pools on Ethereum Sepolia with Chainlink Price Feeds, Automation and VRF; an Automation upkeep resolves each round. Known payout bug.",
      problem:
        "Prediction markets only stay interesting when settlement is credibly neutral. Operator-settled designs ask you to trust whoever calls resolve and picks the price. Permissionless on-chain designs still need something to trigger resolution at the deadline — if only winners call it, timing becomes gameable; if a single bot runs it, trust shifts to that operator. Random rewards driven by block metadata or admin-picked tokenIds are easy to bias or predict.",
      solution:
        "Once a round opens, resolution is an on-chain transition tied to oracle inputs. **PredictionPool** reads **Chainlink Price Feeds** when the round resolves; **Chainlink Automation** calls **performUpkeep** after the deadline (the call is also open to anyone, which leaves the timing gap described under Known limitations); **Chainlink VRF v2.5** picks the **ERC-1155** reward tokenId; the mint itself is requested by a **Tenderly Web3 Action** holding an operator key, when the round creator wins.",
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
        key: "Automation-Driven Resolution",
        description:
          "**PredictionPool** implements **AutomationCompatibleInterface** — **Chainlink Automation** calls **performUpkeep** for due rounds. It is permissionless but defensive: each round ID in `performData` is re-checked, so a bogus call cannot resolve a round early or twice.",
      },
      {
        key: "VRF-Picked NFT Rewards",
        description:
          "When a round creator wins, a **Tenderly** action requests a mint and **Chainlink VRF v2.5** picks the **ERC-1155** tokenId. The consumer stores each request and rejects unknown or already-fulfilled ones.",
      },
      {
        key: "Time-Weighted Payouts",
        description:
          "**getBetWeight** scales each bet by `((round.end - bet.time) * 1e18) / (round.end - round.start)` — earlier conviction earns more weight than late-round piling-on. (See the known payout bug under limitations.)",
      },
      {
        key: "Real-Time Updates",
        description:
          "Toasts and table refreshes are driven by contract events (`PredictionPool_NewBet`, `PredictionPool_NewRoundStatus`, `PredictionPoolToken_Mint`) over **Alchemy WebSockets** and **wagmi** listeners.",
      },
      {
        key: "Hybrid On-Chain/Off-Chain Automation",
        description:
          "**Tenderly Web3 Actions** mint NFT rewards based on on-chain events, exploring off-chain automation.",
      },
      {
        key: "Consistent Price Decimals",
        description:
          "Feeds with up to 18 decimals are normalized to **1e18** and answers at or below zero are rejected; the frontend sends the target through **parseEther**, so both sides compare on the same scale.",
      },
      {
        key: "Smart Contract Testing",
        description:
          "**65 Foundry tests**, including time-weight edge cases such as a last-second bet in a 365-day round.",
      },
      {
        key: "Verified Smart Contracts",
        description:
          "Deployed to **Sepolia** and automatically verified on **Etherscan** for transparency.",
      },
    ],

    challenges: `
    Wiring three **Chainlink** surfaces (Price Feeds, Automation, VRF) into one round lifecycle, and keeping the permissionless upkeep safe against bogus calls.
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
      "**Settlement:** the Chainlink Price Feed's latest answer, read when the round is resolved (see the oracle limitation below)",
      "**Real-time UI:** Alchemy WebSockets + wagmi listeners",
      "**Tests:** 65 Foundry tests. Committed coverage report (`be/lcov.info`): **PredictionPool** 88.9% lines / 77.8% branches; **PredictionPoolToken** 85.7% lines / 25% branches. The payout path with players on both sides is not tested (see the known bug).",
    ],
    transferablePatterns:
      "Oracle-driven settlement, hybrid on/off-chain automation, event-driven UI architecture.",

    limitations: [
      "**Known bug, payout** — `claimReward` divides each winner's weight by the total weight of **both** sides, so winners together receive only part of the pool and the rest stays locked in the contract; if nobody bets on the winning side, the whole pool is locked. No refund or sweep exists. The fix is to divide by the winning side's weight only and add a refund path for one-sided rounds.",
      "**Owner can freeze resolution** — the owner can disable a price feed; rounds on that feed then revert when resolved, and because `performUpkeep` resolves due rounds in one batch, one revert blocks every due round.",
      "**Unbounded loops** — `checkUpkeep` scans every round ever created and `claimReward` loops over every player, so gas grows with use until Automation's check limit or a block limit is hit.",
      "**Oracle timing and staleness** — **PredictionPool** reads `latestRoundData()` when `performUpkeep` runs and ignores `updatedAt`. `performUpkeep` is permissionless, so anyone can resolve a round after its deadline and the settlement price depends on *when* that call lands, not on the price at `round.end`; a stale answer would also be accepted. The fix is to walk back with `getRoundData` to the last answer at or before the deadline and to bound staleness against the feed heartbeat.",
      "**Testnet only** — Deployed on **Ethereum Sepolia** for experimentation, not mainnet money at risk.",
      "**Tenderly bridge** — The reward mint depends on an off-chain Web3 Action signing with an operator key that holds **MINTER_ROLE**. It handles only the first `RoundResolved` event per transaction and logs failures without retrying, so a winning creator can miss an NFT.",
      "**Rounding dust** — the remainder of the weight math stays in the contract.",
      "**Unused states** — `NotStarted` and `Ended` exist in the round enum but are never kept: a round goes from Active to Resolved.",
    ],
    roadmap: [
      "**L2 convergence** — Deploy to Arbitrum, Optimism, or similar to compare settlement cost and UX vs Sepolia.",
      "**Fix the payout** — Divide by the winning side's weight and refund one-sided rounds.",
      "**On-chain reward path** — Replace Tenderly-triggered minting with a call from **PredictionPool**, so no off-chain key is needed.",
      "**Bounded loops** — Track due rounds and claim per player instead of scanning every round and player.",
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
            "Core game logic, payout calculations, VRF integration, and 65 Foundry tests.",
        },
        {
          key: "Next.js + Wagmi",
          description:
            "Frontend framework with wallet integration and event-driven data flow.",
        },
        {
          key: "Chainlink Services",
          description:
            "Price Feeds for the settlement price, Automation to trigger resolution, and VRF for NFT randomness.",
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
    CL_Auto ->> Pool: performUpkeep after round.end
    Pool ->> CL_Feed: latestRoundData (at resolution time)
    CL_Feed -->> Pool: latest answer (updatedAt not checked)
    Pool ->> Pool: _resolveRound and emit PredictionPool_RoundResolved
    Pool -->> Tenderly: PredictionPool_RoundResolved (event)
    Tenderly ->> Token: mint(creatorIfWinner)
    Token ->> CL_VRF: requestRandomWords
    CL_VRF -->> Token: fulfillRandomWords → ERC1155 _mint`,
    },

    images: [
      "/projects/bet2gether/images/bet2gether-landing.webp",
      "/projects/bet2gether/images/bet2gether-landing-create.png",
      "/projects/bet2gether/images/bet2gether-bet.png",
      "/projects/bet2gether/images/bet2gether-claim.png",
      "/projects/bet2gether/images/bet2gether-nft.png",
      "/projects/bet2gether/images/bet2gether-tenderly-action-logs.png",
    ],

    videos: [
      "/projects/bet2gether/videos/bet2gether-create-game-and-bet-1.mp4",
      "/projects/bet2gether/videos/bet2gether-create-game-and-bet-2.mp4",
      "/projects/bet2gether/videos/bet2gether-auto-mint-to-game-creator-if-winner.mp4",
      "/projects/bet2gether/videos/bet2gether-winner-claim-rewards.mp4",
    ],

    featured: {
      category: "Web3 Architecture & Coordination",
      summary:
        "A proof-of-concept prediction market: Chainlink Automation triggers resolution, Chainlink Price Feeds supply the price, and VRF picks ERC-1155 reward ids. The deployed contract has a known payout bug and an oracle-timing weakness, both documented under Known limitations.",
      bullets: [
        "**Automation-driven resolution** — **Chainlink Automation** calls **performUpkeep** so eligible rounds move without a human operator clicking resolve.",
        "**Verifiable inputs** — **Chainlink Price Feeds** for settlement prices and **Chainlink VRF v2.5** for unpredictable **ERC-1155** reward ids.",
      ],
    },

    links: {
      page: "/projects/bet2gether",
      live: "https://bet2gether-alpha.vercel.app",
      github: "https://github.com/SiegfriedBz/Bet2Gether-DApp",
    },
  },
  {
    slug: "forge",
    languages: ["TypeScript", "Solidity"],
    constructionPeriod: "Nov 2025",
    title: {
      h1: "Forge",
      h2: "ERC-1155 Token-Composition",
      short: "Atomic ERC-1155 Crafting",
    },
    description: {
      short:
        "ERC-1155 crafting case study — burn-then-mint for composites in one call, a rules contract that owns the token ledger, and 38 Foundry tests (Next.js + wagmi).",
      meta: "ERC-1155 crafting on Ethereum Sepolia: composites burn their parts and mint in one call, a rules contract owns the token ledger, and 38 Foundry tests.",
      problem:
        "ERC-1155 crafting loops need supply rules users cannot route around: inputs burned and outputs minted together, and no way to mint or burn outside the recipes.",
      solution:
        "Forge splits **FToken** (ledger) from **Forge** (rules). Composite IDs 3–6 use **burnBatch** + **mint** in a single tx; basic mints are cooldown-gated; the **Next.js** UI syncs via **Alchemy WebSockets** and **TanStack Query** invalidation.",
      overview: `
      Forge is an experiment in keeping composition rules and supply mutations honest on **ERC-1155**. The ledger (**FToken**) stays supply-focused; the rules (**Forge**) encode cooldowns, recipes, trade constraints, and burn permissions. Every supply change routes through **Forge**, which is the immutable owner of **FToken** after deploy.
      For forged token IDs 3–6, **Forge.mint** calls **burnBatch** then **mint** in one call. Because **FToken** has no public mint or burn, users cannot mint or burn outside these recipes. Basic mints (0–2) are cooldown-gated; the **Next.js** UI listens to **Forge** events over **Alchemy WebSockets** with **wagmi** and invalidates **TanStack Query** keys instead of polling.
      The same split between rules and balances shows up in other domains (crafting loops, inventory-like state machines, enforced burn-mint flows) — spelled out under transferable patterns below rather than as product claims here.
      `,
    },

    features: [
      {
        key: "On-Chain Crafting System (ERC-1155)",
        description:
          "Players mint basic tokens and forge composite items by burning combinations, enforced entirely by **Solidity** logic.",
      },
      {
        key: "Re-entry Cannot Skip the Cooldown",
        description:
          "Basic mint writes **userCoolDownTimer** before the external **I_TOKEN.mint** call, so re-entering through `onERC1155Received` cannot skip the cooldown or double-mint. For forged IDs **3–6**, mint performs **burnBatch** then mint in one call and keeps no state of its own.",
      },
      {
        key: "Logic / Asset Contract Separation",
        description:
          "**Forge** deploys **FToken** in its own constructor and is its immutable owner (a custom check, not OpenZeppelin `Ownable`, with no ownership transfer), so ownership cannot be misconfigured or change. **FToken** **mint**, **burn** and **burnBatch** accept only that owner. Forge burns users' tokens without `setApprovalForAll` because the owner path skips ERC-1155 approvals; it only ever burns `msg.sender`'s tokens and is not upgradeable.",
      },
      {
        key: "Cooldown-Based Minting",
        description:
          "Per-address cooldown (15 s) on basic mints (IDs **0–2**) slows minting on-chain; it is not Sybil-resistant, since a new wallet starts fresh.",
      },
      {
        key: "Event-Driven UI Updates",
        description:
          "Mint, burn, forge and trade events over **Alchemy WebSockets** invalidate the balance queries for the token IDs in the event; separate HTTP and WebSocket **wagmi** configs, cookie-based SSR.",
      },
      {
        key: "Foundry Tests",
        description:
          "**38 tests** (32 Forge, 6 FToken) that run the real deploy script in `setUp`, with a throwaway key so CI needs no secrets, and assert exact custom-error selectors and events. There are no fuzz or invariant tests yet, and `trade` has a single happy-path test.",
      },
      {
        key: "Verified Smart Contracts",
        description:
          "Deployed to **Sepolia** and automatically verified on **Etherscan** for transparency.",
      },
    ],
    challenges: `
    Encoding recipes, cooldowns, and trade/burn rules so they stay readable in **Solidity** without hiding edge cases.
    Testing every revert path of **Forge.sol** and **FToken.sol** with exact custom-error selectors, through the real deploy script.
    Event-driven UI updates required **TanStack Query** keys per token ID, so a **Forge** event invalidates only the balances for the IDs it touched.
  `,
    outcome: `
    Forge on **Sepolia** shows atomic **ERC-1155** composition with verified contracts and a small single-page **Next.js** client — a focused case study, not a shipped game economy.
  `,
    outcomeMetrics: [
      "**Tests:** 38 Foundry unit tests; `forge coverage` reports 100% of lines (95/95), statements, branches (21/21) and functions across Forge.sol, FToken.sol and the deploy scripts",
      "**Sepolia addresses:** [Forge](https://sepolia.etherscan.io/address/0x7d8A16168D337B2241fCbA1cc5bd196479DF1F0C#code) · [FToken](https://sepolia.etherscan.io/address/0xa6D68eDA0993364481C2c5DA8d6cd43e03f592bA#code)",
      "**Deployment:** Sepolia — Forge & FToken verified on Etherscan",
      "**Architecture:** Forge is immutable owner of FToken; only Forge mutates supply; forged IDs use burnBatch + mint in one tx",
    ],
    transferablePatterns:
      "DeFi-style position composition, supply-chain traceability metaphors, on-chain cooldowns as simple rate limits, **ERC-1155** batch operations for atomic multi-token updates.",

    limitations: [
      "**Admin can stop basic mints** — `setCoolDownDelay` has no bounds and the owner is a single EOA: a huge value overflows the timer so every basic mint reverts, and 0 turns the cooldown off.",
      "**Recipes are hard-coded** — the maximum token ID is a constructor parameter while recipes stop at 6; a deploy with a higher maximum would let ID 7 mint for free (the live deploy uses 6).",
      "**Trade rules** — `trade` does not bound-check the ID to burn and allows basic-to-basic swaps with no cooldown.",
      "**UI cooldown is local** — the countdown starts from the browser clock and never reads `userCoolDownTimer`, so after a refresh it can show ready while the chain still reverts.",
      "**Event filtering** — the event watchers do not filter by user and read only the first log, so another user's event triggers a refetch and a multi-log batch is only partly handled.",
      "**Single network** — Sepolia deployment for learning; no mainnet or multi-chain story in this repo.",
      "**Cooldown model** — One global delay for basic mints (IDs 0–2); no per-token issuance curves yet.",
      "**Marketplace** — No secondary marketplace integration beyond the on-chain **trade** helper into basics.",
    ],
    roadmap: [
      "**L2 comparison** — Deploy the same **Forge**/**FToken** pattern to an L2 testnet and compare gas on **burnBatch** + **mint** paths vs Sepolia.",
      "**Bounded admin** — Cap `setCoolDownDelay` and derive recipes from `I_MAX_TOKEN_ID` (or fix it at 6).",
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
            "Implements ERC-1155 minting, forging, burning and trading logic, with custom errors carrying context and an indexed event per action; 38 tests.",
        },
        {
          key: "Next.js + Wagmi",
          description:
            "Frontend framework with wallet integration, event listeners, and reactive state management.",
        },
        {
          key: "Alchemy WebSockets",
          description:
            "Mint, forge, burn and trade events refetch the balances for the affected token IDs.",
        },
        {
          key: "ERC-1155 Architecture",
          description:
            "Multi-token setup supporting crafting rules; metadata pinned on IPFS through the contract's `uri`.",
        },
        {
          key: "OpenZeppelin",
          description:
            "**ERC-1155** base implementation behind **FToken**; minting and burning are guarded by a custom immutable-owner check (no `Ownable`, no ownership transfer).",
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
      "/projects/forge/images/forge-cover.webp",
      "/projects/forge/images/forge-forge.png",
      "/projects/forge/images/forge-landing.png",
      "/projects/forge/images/forge-mint.png",
    ],

    videos: [
      "/projects/forge/videos/forge-mobile-mint.mp4",
      "/projects/forge/videos/forge-desktop-mint-01.mp4",
      "/projects/forge/videos/forge-desktop-trade-02.mp4",
      "/projects/forge/videos/forge-desktop-forge-03.mp4",
      "/projects/forge/videos/forge-desktop-burn-04.mp4",
    ],

    featured: {
      category: "Smart Contract Patterns & Testing",
      subtitle: "Sepolia",
      summary:
        "An experiment in ERC-1155 crafting rules: the ledger (FToken) handles balances while the rules contract (Forge) encodes recipes, cooldowns, and burn-then-mint in one call — with 38 Foundry tests.",
      bullets: [
        "**Atomic forging** — Composite tokens (IDs 3–6) are created by burning their inputs and minting the result in a single transaction (**burnBatch** + **mint**), one wallet confirmation.",
        "**Factory-owned ledger** — **Forge** deploys **FToken** (ERC-1155) in its constructor and is its immutable owner, so users cannot mint or burn outside the recipes and ownership can never change.",
        "**Foundry tests** — 38 unit tests through the real deploy script, asserting exact custom errors and events; contracts verified on Sepolia.",
      ],
    },

    links: {
      page: "/projects/forge",
      live: "https://forge-tokens.vercel.app",
      github: "https://github.com/SiegfriedBz/Forge-DApp",
    },
  },
  {
    slug: "gavl",
    languages: ["TypeScript"],
    constructionPeriod: "Sep–Nov 2025",
    title: {
      h1: "GavL — Next Auctions",
      h2: "Bidding · Stripe Settlement · Postgres Triggers · Realtime Notifications",
      short: "Auctions with Supabase and Stripe",
    },

    description: {
      short:
        "Full-stack auction case study — Postgres triggers that track the highest bid and send per-user Realtime notifications, RLS, a scheduled Edge Function that closes auctions, and Stripe (Next.js, Supabase, TypeScript). Known bid-integrity gaps, listed under Known limitations.",
      meta: "Next.js and Supabase auctions: triggers track the highest bid, Realtime notifies each user, an Edge Function closes auctions. Known bid-integrity gaps.",
      problem:
        "Auction platforms need bidding, automatic closure at the deadline, notifications to the people involved, and payment settlement without exposing privileged database access to the browser.",
      solution:
        "GavL keeps the workflow in **Postgres**: `SECURITY DEFINER` triggers track the highest bid and write `NEW_BID`, `NEW_AUCTION_WON` and `NEW_PAYMENT` notifications, pushed to each user over a private **Supabase Realtime** channel. A **pg_cron** job calls the **close-auctions** Edge Function every 5 minutes to close due auctions, and a signature-verified **Stripe** webhook records payment through a server-only service role.",
      overview: `
        GavL is a learning build focused on real-time full-stack flows. It follows a ports-and-adapters layout: domains hold types and **Zod** schemas; ports are repository interfaces; services own workflows; **Supabase** repositories sit behind those ports; instances wire services to infrastructure.
        Notifications for new bids, auction wins and payments go to each affected user over private per-user **Supabase Realtime** broadcast channels; other viewers see a new price on refresh. A **pg_cron** job calls the **close-auctions** Edge Function every 5 minutes, so auctions close up to 5 minutes after **endAt**; the repo commits it as a migration that reads its URL and key from Vault, and the live project runs the same job, created in the dashboard. **Stripe Checkout** plus a signature-verified webhook (raw body, constructEvent) sets **paidAt** through a **service-role** client that stays server-only.
        The UI is multilingual (**French**, **English**, **German** via **Lingui**), responsive, and uses URL-driven filters, sorting, and pagination (**nuqs**) with **Suspense** and skeleton loaders.
      `,
    },

    features: [
      {
        key: "Bidding Rules in Postgres",
        description:
          "Triggers keep the highest bid and bidder on the auction row; a UNIQUE (auction, amount) index rejects tied bids; RLS stops owners from editing or deleting an auction once it has bids.",
      },
      {
        key: "End-to-End Auction Lifecycle",
        description:
          "Creation, editing, bidding, scheduled closure (**Edge Function**), winner notifications, and payment completion.",
      },
      {
        key: "Stripe Payments",
        description:
          "Stripe Checkout with a signature-verified webhook for server-side payment status; `/api` is excluded from the i18n middleware so Stripe is never redirected.",
      },
      {
        key: "Notification System",
        description:
          "Real-time notifications for new bids, auction wins and payments, pushed to each affected user over a private **Supabase Realtime** channel; the payment notification fires only on the first `paid_at` write.",
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
        key: "Ports-and-Adapters Layering",
        description:
          "Services behind repository interfaces, with **Jest** unit tests on services and mappers run in CI (lint, build, coverage); Supabase declarative schemas with diff-generated migrations.",
      },
    ],
    challenges: `
        Designing a bidding flow that stayed understandable while triggers, the scheduled Edge Function and **Stripe** webhooks all touched related rows.
        **RLS** had to protect normal clients while the webhook used a **service-role** client safely — no privileged paths exposed to the browser.
        Keeping notifications, auction state and payment flags aligned: the payment trigger fires only when paid_at goes from NULL to set, so a webhook retry does not notify twice.
    `,

    outcome: `
      GavL demonstrates an end-to-end auction flow at **next-auctions.vercel.app**: bidding, scheduled closure, **Stripe** settlement, real-time notifications, multilingual UI (**French**, **English**, **German**), dashboards with charts, and a ports-and-adapters codebase with **Jest** unit tests.
      It complements the Web3 case studies with full-stack work on payments, Postgres triggers and RLS, notifications, i18n and testing.
    `,
    outcomeMetrics: [
      "**Live demo:** next-auctions.vercel.app",
      "**i18n:** French / English / German (Lingui)",
      "**Architecture:** ports and adapters — services behind repository interfaces; URL-driven filters via nuqs; 66 Jest unit tests in CI",
      "**Automation:** pg_cron calls the close-auctions Edge Function every 5 minutes; signature-verified Stripe webhook → server-only service-role write",
    ],
    transferablePatterns:
      "Payments + webhooks, workflow rules in Postgres triggers and RLS, per-user notification channels, and scheduled lifecycle jobs.",

    limitations: [
      "**Known bugs, bid integrity** — the server does not check that a bid beats the current highest (only the form does); RLS lets bidders edit or delete their own bids while an auction is open; owners can bid on their own auctions; bids are accepted between **endAt** and the next scheduled close, up to 5 minutes later; and the highest-bid trigger reads `MAX` without a lock, so two near-simultaneous bids can store a stale highest bid. The fix is a `place_bid` RPC that locks the auction row and checks amount and deadline, with no update or delete on bids.",
      "**Payment checks are UI-only** — creating a checkout session does not check on the server that the caller is the winner or that the auction is closed and unpaid; the webhook then trusts the auction ID in the session metadata.",
      "**Webhook retries** are not deduplicated by `event.id`; a retry rewrites `paidAt`, but the payment notification still fires once.",
      "**Testing depth** — 66 **Jest** tests cover services and mappers with mocked repositories; triggers, RLS, the webhook, the Edge Function and the server actions are untested, and there is no end-to-end browser harness yet.",
      "**Service role** — the Stripe webhook and the Edge Function bypass **RLS** with a server-only key. One server action that writes through it has no auth check of its own; today only the webhook route imports it.",
      "**Closing cadence** — the pg_cron job runs every 5 minutes, so an auction can stay open up to 5 minutes past **endAt**.",
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
          description:
            "Supabase (Postgres triggers, RLS, Realtime, Edge Functions, pg_cron)",
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
          description: "Jest unit tests, CI (lint, build, coverage)",
        },
        {
          key: "Architecture",
          description:
            "Ports and adapters: domains, repository interfaces, services and wired instances",
        },
      ],
    },

    diagram: {
      title: "Real-time bid flow",
      caption:
        "DB triggers and per-user Supabase Realtime notifications (Next Auctions README).",
      definition: `sequenceDiagram
    participant User as Logged-in User
    participant Bids as Bids Table
    participant Auctions as Auctions Table
    participant Notifications as Notifications Table
    participant Clients as Notified Users

    User ->> Bids: Insert new bid
    Bids ->> Auctions: Update highest bid info (Trigger: New Bid)
    Bids ->> Notifications: Insert NEW_BID for owner & previous bidders (Trigger: New Bid)
    Notifications ->> Clients: Push to each recipient's private Realtime channel`,
    },

    images: [
      "/projects/gavl/images/gavl-table-flat.webp",
      "/projects/gavl/images/gavl-landing.png",
    ],

    videos: [
      "/projects/gavl/videos/gavl-create-auctions.mp4",
      "/projects/gavl/videos/gavl-bid-2-users.mp4",
      "/projects/gavl/videos/gavl-bid-3-users.mp4",
      "/projects/gavl/videos/gavl-auction-won-notifications.mp4",
      "/projects/gavl/videos/gavl-stripe-flow.mp4",
    ],

    featured: {
      category: "Full-Stack Web2",
      subtitle: "Sep–Nov 2025",
      summary:
        "A learning build for full-stack auction flows: Postgres triggers that track the highest bid and write notifications sent over private Supabase Realtime channels, RLS, scheduled closure via an Edge Function, and Stripe settlement through a signature-verified webhook.",
      bullets: [
        "**Stripe settlement** — a signature-verified **Stripe** webhook records payment through a server-only **Supabase** service role; the payment notification fires once.",
        "**Postgres-native workflow** — triggers track the highest bid and write notifications, pushed to each user over **Supabase Realtime**; a scheduled **close-auctions Edge Function** closes due auctions.",
        "**i18n + layering** — **French**, **English**, and **German** via **Lingui**; services behind repository interfaces with **Jest** unit tests in CI.",
      ],
    },

    links: {
      page: "/projects/gavl",
      live: "https://next-auctions.vercel.app/en",
      github: "https://github.com/SiegfriedBz/Next-Auctions",
    },
  },
];

/** Every project, without the links to articles held back in production. */
export const PROJECTS: Project[] = ALL_PROJECTS.map((project) => {
  const { article, ...links } = project.links;
  return article && isArticleHrefHeld(article.href)
    ? { ...project, links }
    : project;
});
