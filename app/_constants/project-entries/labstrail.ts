/** LabsTrail — figures verified against main (3df9e7e, v0.8.1) on 2026-10-26; limitations matched to the README's (1c738ba) on 2026-10-30. */
import { STACK } from "@/app/_constants/stack";
import type { Project } from "@/app/_types/project";

const REPO = "https://github.com/SiegfriedBz/labstrail";
const blob = (path: string) => `${REPO}/blob/main/${path}`;

export const labstrailProject: Project = {
  slug: "labstrail",
  languages: ["TypeScript", "Solidity"],
  constructionPeriod: "Oct 2026",
  testnet: true,
  title: {
    h1: "LabsTrail",
    h2: "Open Reproducibility-Readiness Ratings for Life-Science Papers on the OriginTrail DKG and Base",
    short: "Traceable Paper Ratings on the OriginTrail DKG and Base",
    meta: "Traceable Paper Ratings",
  },

  description: {
    short:
      "Open ratings for life-science papers: evidence on the OriginTrail DKG, scores on Base Sepolia, and a pipeline where every write is safe to retry.",
    problem:
      "Trust in a scientific paper is mostly inferred from the journal it appeared in, and the reviews behind that judgement are rarely public. Reporting guidelines such as CONSORT and ARRIVE list what a paper must state for others to repeat the work, yet compliance is rarely checked in the open. In a 2016 Nature survey of more than 1,500 researchers, more than 70% had tried and failed to reproduce another scientist's experiments.",
    solution:
      "LabsTrail publishes a paper to the **OriginTrail DKG** as a Knowledge Asset, from a submission its submitter signs with **EIP-712**. Anyone with a wallet can request a rating on a **Base Sepolia** contract. A durable **Inngest** run reads the paper, has **Gemini** answer the reporting checklists for the kinds of study it reports, with quotes, checks every quote in code, computes the score once, publishes the rating as its own Knowledge Asset, and has the oracle record the score on chain.",
    overview: `LabsTrail is a DeSci app under construction that rates how completely a life-science or health paper reports its work, a score it calls **reproducibility readiness**. The first phase, a machine score, runs on testnets, and production already has published papers and settled ratings. Human review, with reviewers drawn by **Chainlink VRF**, comes next.
The rating's evidence (rationale, kinds of study, every check with its quote) lives in a Knowledge Asset on the **OriginTrail DKG**; the score and which asset counts live on the **RatingController** contract on **Base Sepolia**. The contract is never ahead of the DKG, and the UI flags any gap between them.
Most of the engineering is off-chain. Chain events arrive through an **HMAC**-verified **Alchemy Notify** webhook, a cron reconciler restarts stuck requests from the contract's own pending set, every store, mint, fulfil and cancel reads state before writing, and a single serialized **Inngest** function sends every oracle transaction.
The project is a rebuild of an earlier prototype, desci-rating-dapp, and its 36 ADRs start from what that prototype taught.`,
  },

  features: [
    {
      key: "Signed paper publishing",
      description:
        "A submitter uploads a PDF to **IPFS** and signs its CID, the target context graph and a deadline with **EIP-712** (smart-contract wallets verify through ERC-1271 and ERC-6492). An **Inngest** run parses it with **GROBID**, has **Gemini Flash-Lite** check that it is a life-science or health paper, and publishes it to the **OriginTrail DKG**. The same PDF always has the same CID, so publishing it again converges on the same asset.",
    },
    {
      key: "On-chain rating requests",
      description:
        "**RatingController** (Solidity 0.8.37, **OpenZeppelin** Ownable2Step, Pausable, EnumerableSet) gives each request an id hashed from the chain id, contract address, deploy time, a counter, the requester and the target, so the rating's DKG asset name derives from the id alone. An enumerable pending set lets recovery read current state instead of scanning logs. Owner and oracle are kept apart on every path, and renouncing ownership always reverts.",
    },
    {
      key: "Convergent writes",
      description:
        'Every store, mint, fulfil and cancel reads state first and treats "already done" as success ([ADR 0007](' +
        blob("docs/adr/0007-all-writes-converge.md") +
        ")). A rating attempt reads its asset and does only what is left, and the score is computed once, stored in the asset and read back before the oracle records it, so a non-deterministic LLM never puts two scores on chain.",
    },
    {
      key: "At-least-once ingestion and a reconciler",
      description:
        "The **Alchemy Notify** webhook is checked with HMAC-SHA256 in constant time, each request becomes an **Inngest** event whose id is built from the request id, and the route returns 503 until Inngest accepts it. A cron every 30 minutes restarts any request pending over 4 hours, with a per-window event id and a singleton run per request, and a request older than 24 hours is settled or cancelled.",
    },
    {
      key: "Serialized oracle lane",
      description:
        "One **Inngest** function sends every oracle transaction, one step at a time: it reads nonces and the request, sends, and checks receipts in later steps. Unmined transactions are resent at the same nonce with fees raised 15% up to a 10 gwei cap, and a nonce held for 10 minutes is replaced.",
    },
    {
      key: "Checklist scoring with checked quotes",
      description:
        "**Gemini** lists the kinds of study a paper reports and answers their checklists (built from CONSORT 2025, STROBE, ARRIVE 2.0, MDAR and PRISMA 2020) with a quote per answer. Code awards a point only when the quote is found in the paper's text and computes the 0 to 100 score with integer rounding; the model never gives the number.",
    },
    {
      key: "Isolated environments",
      description:
        "Staging (develop) and production (main) each have their own contract, DKG context graph, webhook, oracle wallet, Inngest environment and limit counters. Config validation refuses a production graph outside production, and the signed submission names its context graph, so a staging signature cannot publish to production.",
    },
    {
      key: "Operational alerts",
      description:
        "An hourly health check reads the DKG node, the oracle and publisher wallet balances (ETH and TRAC) and requests pending past 6 hours, and posts what needs attention to a **Telegram** chat, along with failed runs, orphaned rating assets, published papers and settled ratings. Production refuses to start without the bot's settings.",
    },
    {
      key: "Readable by search engines and AI search",
      description:
        "Production is open to crawlers ([ADR 0040](" +
        blob("docs/adr/0040-production-is-open-to-crawlers.md") +
        ")). Each paper and rating has its own title, canonical link and schema.org data (a ScholarlyArticle, and a rating as a Review of it), each paper a share card, and crawlers that run no JavaScript get the record in the HTML.",
    },
    {
      key: "Wallet loaded on demand",
      description:
        "Pages load the wallet's code (**Reown AppKit**, WalletConnect, about 1 MB) only when a visitor uses it or comes back connected. Lighthouse mobile went from 67–74 to 92–97 on every page.",
    },
  ],

  challenges: `A DKG mint can succeed while its response is lost: in a spike against the project's own node, three concurrent mints of one asset produced one mint, one reverted transaction that still paid gas and one token approval, and a mint whose client disconnected landed seconds later. Every write therefore reads state first, and mints are started and then polled in short steps.
A hosted LLM gives different answers to the same paper, even with temperature set to 0 (deprecated for Gemini 3.8 Flash). The score is computed once from checked quotes, stored in the rating's Knowledge Asset and read back by every retry, so the score on chain always equals the one on the DKG.
That keeps the record consistent, not the score steady: the same staging paper scored 54, then 75, on one day. Over 16 measured runs on 3 papers, the model classed a fly genetics paper as an animal study in some runs and as lab work in others, a spread of 21 points. Scorer version 4 defines the kinds of study more precisely, lets a paper report several, gives eight checks a rule per answer and tells the model how to quote long passages. Over 14 more runs, one paper scored the same every time and the other two moved by 7 and 9 points.
Webhooks arrive at least once, can be lost, and after a reorg may describe a log that is no longer on chain; Inngest deduplicates event ids for 24 hours only, and its concurrency limits count steps, not sleeping runs. Recovery combines request-derived event ids, a singleton run per request, on-chain reads before every write, and a reconciler that reads the contract's pending set.
The free RPC tier caps eth_getLogs at 10 blocks, so the prototype could only recover a stuck rating from the browser that requested it. The rebuilt contract stores everything recovery needs, readable a page at a time.
Production's first context graph never became active: OriginTrail's network kept it dormant, every mint was declined, and the run blamed LabsTrail's own node. A declined mint now stops as network-refused and the paper's page says the network has not accepted the record yet. Production moved to a newly registered graph, which minted its first paper on the first try.`,

  outcome: `Both flows (publish a paper, request and settle a rating) run on separate staging and production environments on Base Sepolia, with the DKG node, GROBID and an RPC proxy on a dedicated server. A webhook starts each rating and a cron restarts a stuck one, and production has its first published papers and settled ratings. LabsTrail is still under construction: human review is the next phase on the roadmap below.
The project is mostly evidence of engineering habits: decisions recorded in ADRs that the feature plans cite, behaviour observed on real systems written down as dated domain facts, and a test suite that drives whole durable workflows with fake step tools.
I built the repo in about three weeks, alongside my full-time job, and I could not have done it without **Claude Code**. It works inside a harness I set up: a CLAUDE.md per workspace, skills that plan a feature, write its tests first and review the branch, hooks that lint and test every edited file, and a read-only reviewer agent that blocks a pull request conflicting with an accepted ADR.`,

  outcomeMetrics: [
    "**36 ADRs** on main (numbered to 0042, with 6 folded into others), each amendment logged with a dated History line",
    "**1,841 Vitest tests** in 143 files across 7 workspaces, all passing",
    "**74 Foundry tests**: 61 unit and fuzz tests on RatingController, 12 on the deploy script, and an invariant suite of 6 properties; CI runs each fuzz test 5,000 times",
    "**Domain core coverage:** 100% of lines and 96.4% of branches, with CI failing below 90% of branches",
    "**14 reference papers** (12 in the field across every kind of study, 2 outside it) with expected answers written before the scorer first read them",
    "**3 RatingController deployments per environment** on Base Sepolia, past ones still read by the backend",
  ],

  transferablePatterns:
    "Read-before-write side effects that converge on retry; at-least-once event ingestion with deterministic event ids and a state-based reconciler; one serialized lane for a hot signing key, with fee bumps and nonce recovery; LLM output treated as untrusted and checked by code before anything is written; environment isolation enforced when config is validated. The same patterns fit payment and settlement backends, indexers and any agent workflow that writes to a chain.",

  limitations: [
    "**Testnet only, and requests are free.** LabsTrail pays the oracle's gas, the DKG publish and the LLM. The cap of 3 pending requests per address is easy to dodge with fresh addresses, so a throttle of 3 rating runs an hour is the real bound.",
    "**One shared DKG node** on one free VM serves staging and production. An outage takes down both, and the node's single admin token means staging's credential could in principle write the production graph; a config guard covers that for now.",
    "**Gemini free tier:** the scoring model allows 20 requests a day, shared by every environment.",
    "**The score measures reporting completeness only.** It says nothing about whether findings are right, a fabricated paper that reports everything would score well, and 14 reference papers are far too few to call it calibrated.",
    "**Scores still move between ratings.** Gemini 3.8 Flash has no documented seed, and temperature is deprecated for it, so judgement checks such as limitations can be answered differently; with scorer version 4, 14 runs on 3 papers spread by 0, 7 and 9 points.",
    "**One hot oracle key** per environment, holding a few days of gas and alerted on below a threshold.",
    "**One copy of each PDF**, on Pinata: the CID proves a file is unchanged but does not keep it available.",
    "**No end-to-end tests yet**; the pages have component tests.",
  ],

  roadmap: [
    "**Phase 2, transparent human review (next):** reviewers drawn at random with **Chainlink VRF**, whose proof is checked on chain, so no one can steer the draw and anyone can audit it. LabsTrail's node writes their score into the same rating asset and the oracle records it ([ADR 0012](" +
      blob("docs/adr/0012-three-phases-settled-by-the-oracle.md") +
      ")). Reviewer staking and pay are planned, not decided yet.",
    "**Payment, for people and AI agents:** today a requester pays only gas and LabsTrail pays the rest ([ADR 0015](" +
      blob("docs/adr/0015-rating-requests-are-free-on-testnet.md") +
      ")); a fee for publishing and rating is planned before mainnet.",
    "**An API for AI agents**, to read papers and ratings and to request ratings without the web app.",
    "**A lasting, decentralized copy of every PDF**, then **mainnet**.",
    "**Phase 3, wet-lab replication:** a lab repeats the experiments and a second round of human review checks its results before the oracle scores them.",
    "**Engineering:** end-to-end tests with Playwright, oracle signing in a KMS or dedicated signer, and one DKG token per graph.",
  ],

  stack: {
    all: [
      STACK.TYPESCRIPT,
      STACK.NEXT,
      STACK.REACT,
      STACK.ZOD,
      STACK.TANSTACK_QUERY,
      STACK.TANSTACK_TABLE,
      STACK.SHADCN,
      STACK.TAILWIND,
      STACK.WAGMI,
      STACK.VIEM,
      STACK.REOWN,
      STACK.SOLIDITY,
      STACK.FOUNDRY,
      STACK.OPEN_ZEPPELIN,
      STACK.ALCHEMY,
      STACK.IPFS,
      STACK.INNGEST,
      STACK.GEMINI,
      STACK.VITEST,
      STACK.ORIGINTRAIL,
      STACK.UPSTASH,
    ],
    main: [
      {
        key: "OriginTrail DKG",
        description:
          "Papers and ratings are Knowledge Assets in a per-environment context graph, written by a self-hosted node through a client whose every write reads state first.",
      },
      {
        key: "Solidity + Foundry + OpenZeppelin",
        description:
          "**RatingController** on Base Sepolia: request ids bound to their content, an enumerable pending set for recovery, owner and oracle kept apart. Unit, fuzz and invariant tests.",
      },
      {
        key: "Inngest",
        description:
          "Durable publish and rating runs, a serialized oracle function invoked with step.invoke, an hourly health check and a 30-minute reconciler cron.",
      },
      {
        key: "Gemini",
        description:
          "Flash-Lite checks a paper's field at publish time; 3.8 Flash answers the checklists of the paper's kinds of study with quotes, which code verifies before scoring.",
      },
      {
        key: "Alchemy Notify + viem",
        description:
          "HMAC-verified webhooks for request logs; viem for contract reads, Multicall3 batching on the pages, and the oracle's transactions.",
      },
      {
        key: "Next.js + wagmi + Reown AppKit",
        description:
          "Publish and paper pages, wallet connection, EIP-712 signing of submissions and on-chain rating requests from the visitor's wallet.",
      },
      {
        key: "Vitest + fast-check",
        description:
          "1,841 tests across the monorepo, with durable workflows driven through fake step tools and property-based tests for UAL parsing and asset names.",
      },
    ],
  },

  diagram: {
    title: "Rating pipeline",
    caption:
      "From an on-chain request to a recorded score. The reconciler restarts any request whose run stopped, and every write along the way reads state first.",
    definition: `flowchart TB
  U["Requester wallet"] -->|"requestPhase1"| C["RatingController (Base Sepolia)"]
  C -->|"log via Alchemy Notify"| W["Webhook route (Next.js)"]
  W -->|"event id from request id"| R["Rating run (Inngest)"]
  K["Cron reconciler"] -->|"restarts stuck requests"| R
  R -->|"reads the PDF"| P["IPFS"]
  R -->|"checklist + quotes"| G["Gemini"]
  R -->|"stores and mints the R-KA"| D["DKG node (own VM)"]
  R -->|"step.invoke"| O["Oracle function"]
  O -->|"fulfilPhase1"| C`,
  },

  images: ["/projects/labstrail/images/labstrail-landing.png"],
  videos: [],

  featured: {
    category: "Web3 Backend & Infrastructure",
    subtitle: "OriginTrail DKG & Base Sepolia",
    summary:
      "An open, verifiable rating for life-science papers, built by a former molecular biologist. The evidence lives on the **OriginTrail DKG**, the score on a **Base Sepolia** contract, and the off-chain pipeline between them is built to survive lost webhooks, retried mints and stuck transactions. Under construction: the machine score runs on testnets, and human review with **Chainlink VRF** is next.",
    bullets: [
      "**Every write converges:** stores, mints, fulfils and cancels read state first, and the LLM's score is computed once and read back from the minted asset, so retries and restarts never write twice.",
      "**At-least-once ingestion with recovery:** HMAC-verified **Alchemy Notify** webhooks, request-derived **Inngest** event ids, and a cron reconciler that reads the contract's pending set instead of scanning logs.",
      "**Decisions on record:** 36 ADRs, 1,841 Vitest tests and 74 Foundry tests (fuzz and invariants), with staging and production isolated down to contracts, graphs and oracle keys.",
    ],
  },

  links: {
    page: "/projects/labstrail",
    live: "https://labstrail.vercel.app",
    github: REPO,
    article: {
      href: "/articles/labstrail",
      label: "Read the LabsTrail article",
      iconName: "dna",
    },
  },
};
