/** Wallet Watcher — figures verified against the repo and Sepolia on 2026-10-18; claims re-reviewed against origin/main (ee67e0e) on 2026-10-24 and against the rewritten README (0f8e5fd) on 2026-10-30. */
import { STACK } from "@/app/_constants/stack";
import type { Project } from "@/app/_types/project";

const GITHUB = "https://github.com/SiegfriedBz/wallet-watcher";
const SEPOLIA_TX =
  "https://sepolia.etherscan.io/tx/0x6e8ec949adf6c92f17fe2bb109bf8c79441788312e67a60f1fbe560c5ad1e4a0";

export const walletWatcherProject: Project = {
  slug: "wallet-watcher",
  languages: ["TypeScript"],
  // First commit 30 Sep 2026, last code merge (PR #8) 17 Oct 2026, README refresh (PR #9) 30 Oct 2026: shown as Oct 2026 (Siegfried, 2026-10-31).
  constructionPeriod: "Oct 2026",
  testnet: true,
  title: {
    h1: "Wallet Watcher",
    h2: "Custody Backend Slice: HD Wallets, ETH Ledger and Signed Withdrawals",
    short: "Each Withdrawal Booked Once, From Its Receipt",
    meta: "Custody Backend Slice",
  },
  description: {
    short:
      "Custody backend slice on Sepolia: HD wallets, an append-only ETH ledger, and EIP-1559 withdrawals, each booked once from its receipt.",
    problem:
      "Backends that move money fail in boring ways: a withdrawal counted twice, wei rounded through a float, a spend approved on a stale balance, an RPC key leaked into a log, a transaction signed for the wrong chain. None of them needs an attacker.",
    solution:
      "**Wallet Watcher** derives N wallets from one BIP-39 mnemonic, polls their ETH balances into an append-only **SQLite** ledger, and builds and signs **EIP-1559** withdrawals behind a localhost admin API. Each withdrawal is booked once, from its **transaction receipt**, amounts stay **bigint** wei end to end, balances come from one **Multicall3** snapshot pinned to its block, and only **signer.ts** ever signs.",
    overview: `Wallet Watcher is a single **Node.js** and **TypeScript** service on **Ethereum Sepolia**, built to a written spec. It derives 1 to 20 wallets at the BIP-44 path m/44'/60'/0'/0/i, polls every balance at startup and then every 8 minutes, and exposes a localhost API to list wallets, read each wallet's ledger, and build, sign and optionally broadcast withdrawals.
The money logic sits in three pure modules with no I/O (withdrawal planning, settlement, change detection), and everything that touches the chain, the database or HTTP stays at the edges. A broadcast is recorded as **pending**; the poller later writes at most **one** outflow for it, from the receipt, never from a balance diff.
The repo documents its own limits (no confirmation depth, one withdrawal in flight per wallet, keys in process memory, a known balance-after bug listed below) and a path to production: KMS/MPC signing, finality and reorg checks, nonce management, withdrawal policy and per-operator access.`,
  },

  features: [
    {
      key: "One Outflow per Withdrawal, From the Receipt",
      description:
        "A broadcast is stored as **pending** and the ledger is left alone. The poller writes **one** outflow from the receipt (amount + **gasUsed × effectiveGasPrice**, or the fee alone if reverted), together with the status and new balance in a single SQLite transaction. While a withdrawal is pending, that wallet's balance diff is skipped, so the drop is not booked twice. An outflow the service did not record (a lost 502, a transaction sent by hand) shows up as its own **external_outflow** type, so the event is flagged. This holds within one running process.",
    },
    {
      key: "Exact Amounts, No Floats",
      description:
        "Every amount is a **bigint** in wei, stored as **TEXT** in SQLite (an INTEGER stops at about 9.22 ETH) and sent as strings in JSON. The API only accepts amounts as strings with at most 18 decimals, converted once with **parseEther**: a JSON number has already lost precision by the time it is parsed.",
    },
    {
      key: "Block-Consistent Balance Snapshots",
      description:
        "Each round reads every balance and the block number in **one Multicall3 eth_call** (never split, no silent failures). The poller keeps a **block floor** and never compares against an older block than a receipt or snapshot it already relied on, so within a run a lagging node behind a load-balanced RPC cannot create a false inflow.",
    },
    {
      key: "Worst-Case Fee Check",
      description:
        "A withdrawal is signed only if **balance ≥ value + gasLimit × maxFeePerGas**, on a balance, a pending-tag nonce, fees and a gas estimate read fresh from the chain. Otherwise the API returns **422** with the max sendable amount, exact to the wei on fixed inputs (unit-tested). When the amount is at least the balance, the code skips the estimate (the node may refuse it) and assumes 21,000 gas, so the figure is an upper bound.",
    },
    {
      key: "Signing Behind One Module",
      description:
        "Only **signer.ts** signs; no private key is stored, logged or returned. The HTTP layer receives functions (read, sign, broadcast), never the mnemonic or the RPC client, and the RPC client has no account. This is a module boundary inside one process: the mnemonic is loaded into the environment and stays in memory. Signing requires an admin key compared in constant time, and logged errors drop the RPC URL that carries the provider key.",
    },
    {
      key: "Testnet Enforced at Startup",
      description:
        "The service checks **eth_chainId** before opening the database or starting the poller and refuses anything but Sepolia. Chain id **11155111** is signed into every transaction, and the database file is named after it, so two networks never share a ledger.",
    },
    {
      key: "Deterministic HD Wallets",
      description:
        "BIP-39 mnemonic validated with its checksum, BIP-44 derivation at **m/44'/60'/0'/0/i**: the same index is always the same address, raising N appends and lowering it keeps a prefix. Ledger rows are keyed by address, not index, so a mnemonic change cannot inherit another wallet's history. Verified against Hardhat's published test vectors.",
    },
  ],

  challenges: `Stopping a withdrawal from being booked twice. The transaction can be mined between the receipt check and the balance read, so a balance diff would record an external outflow and the settlement would record the same money again. The fix was to make the **receipt the only source of an outflow** and to skip the diff for any wallet with a pending withdrawal.
Reading one consistent state through a load-balanced RPC. Separate calls can reach nodes a block apart, and a receipt from block 100 followed by a balance from block 99 books a false inflow. **One Multicall3 eth_call** now returns the balances with their block number, and a block floor rejects any older snapshot (wait one block, read again, or skip the round).
Keeping amounts exact end to end. **JSON.parse** rounds numbers before validation runs and SQLite integers stop at 2^63 wei, so amounts travel as strings and TEXT and are **bigint** everywhere in code.
The testnet changed mid-project. After Sepolia's Glamsterdam upgrade, a first transfer to a never-used address estimates at **207,391 gas** instead of 21,000; the withdrawal path already relied on **eth_estimateGas**, so it kept working.`,

  outcome: `A working service on Sepolia, exercised end to end with a real deposit and a broadcast withdrawal: the poller wrote one outflow equal to the amount plus the fee from the receipt, and wallet #0's on-chain balance still matches its last ledger row. The README states what is missing for production and how each gap would be closed.`,

  outcomeMetrics: [
    "**156 tests in 12 files** (Vitest), offline and without secrets; typecheck, Biome lint and tests green in CI on **main**",
    `**One outflow row** of −0.000523183071527 ETH for a 0.0005 ETH withdrawal: the amount plus **21,000 gas × 1.103955787 gwei** from the receipt ([Sepolia tx](${SEPOLIA_TX}))`,
    "**Worst-case fee bound** checked before signing: 0.000024728757984 ETH, against 0.000023183071527 ETH actually paid",
    "**One RPC call** reads every balance per poll round (Multicall3), plus one receipt lookup per pending withdrawal",
    "**Ledger matched the chain in the walkthrough:** wallet #0's on-chain balance on 18 Oct 2026 (476,816,928,473,000 wei) equals its last ledger row",
    "**Max sendable exact to the wei on fixed chain inputs:** the computed amount is accepted, one wei more is refused (unit-tested); an upper bound when the estimate is skipped",
  ],

  transferablePatterns:
    "**Receipt-driven settlement** for any system that books on-chain spends; **block-pinned snapshots** (one eth_call plus a block floor) for indexers and pollers behind load-balanced RPCs; **worst-case cost checks** on fresh state before signing; and **injecting capabilities instead of secrets** (sign, broadcast, read as functions), which turns a later move to KMS or MPC signing into a one-function change.",

  limitations: [
    "**Known bug, balance-after:** if a deposit lands and a withdrawal settles before the poller has seen the deposit, the outflow row's balance-after is computed from the stale stored balance and can be too low, even negative, until the same round books the deposit as an inflow (or a later round, up to 8 minutes, if the balance read fails or the node is behind). The ledger's deltas stay right. The fix is to book the unseen inflow before the outflow.",
    "**At most one outflow per broadcast, in one process:** a crash between send and insert, or a 502 that actually went through, is booked as an external outflow; a receipt later reorged out stays booked.",
    "**No confirmation depth:** balances are read at latest and a withdrawal settles on its first receipt, so a reorg could undo a recorded change.",
    "**One withdrawal in flight per wallet**, and the pending check is not atomic: two simultaneous broadcasts can both pass.",
    "**A never-mined transaction** keeps its wallet pending: no new broadcast and no balance diff, so a deposit to that wallet is not recorded either. There is no replacement or cancellation yet.",
    "**A failed broadcast is ambiguous:** a 502 records nothing, but the node may have accepted the transaction, and a retry gets the next nonce, so both are sent.",
    "**The block floor lives in memory** and is lost on restart.",
    "**The 10-minute bound assumes a responsive RPC:** viem's timeouts and retries (about 41 s at worst for one request) and a 12-second wait for a lagging node can push a round past the 2-minute margin.",
    "**Deposits are merged per poll interval** and carry no transaction hash, and the ledger endpoint has no pagination; one admin key is shared by every operator.",
  ],

  roadmap: [
    "**Keys out of the process:** KMS/HSM or MPC signing, and watch-only address derivation from the account xpub.",
    "**Finality:** credit deposits after N confirmations or at safe/finalized, show pending and available balances apart, re-check settled receipts against reorgs, and store each snapshot's block number with its rows.",
    "**Transaction lifecycle:** a per-wallet nonce manager and lock, with replace-by-fee or cancellation for stuck transactions.",
    "**Withdrawal policy and access:** idempotency keys, limits, destination allowlists, a second approver above a threshold, an audit log, and per-operator identity instead of one shared key.",
    "**Deposits:** attribution from EIP-7708 Transfer logs where the chain emits them (indexers, traces or provider webhooks elsewhere), and sweeping deposit wallets into a hot/cold structure.",
    "**Operations:** Postgres with migrations, RPC failover, metrics, an alert on every external outflow, and a `/health` that reports poller freshness.",
    "**More assets and chains:** ERC-20 and L2s.",
  ],

  stack: {
    all: [
      STACK.TYPESCRIPT,
      STACK.VIEM,
      STACK.ZOD,
      STACK.VITEST,
      STACK.NODE,
      STACK.HONO,
      STACK.SQLITE,
    ],
    main: [
      {
        key: "Node.js 22.13+ and TypeScript (strict)",
        description:
          "One process with a composition root, pure money modules and I/O at the edges; strict mode with **noUncheckedIndexedAccess**; CI runs on Node 24.",
      },
      {
        key: "viem",
        description:
          "HD derivation, **EIP-1559** signing, the **Multicall3** balance snapshot, and a keyless public client that reads the chain and relays signed transactions.",
      },
      {
        key: "Hono",
        description:
          "Localhost admin API; **bearerAuth** (constant-time compare) guards the withdrawal endpoint, and unexpected errors return a generic 500.",
      },
      {
        key: "Zod",
        description:
          "Strict env and request validation: string-only ETH amounts, EIP-55 checksums, watched-wallet indexes, unknown fields refused.",
      },
      {
        key: "SQLite (node:sqlite)",
        description:
          "Three tables (balances, ledger, withdrawals), amounts as **TEXT**, and related writes in one transaction, rollback-tested by forcing a constraint failure mid-write.",
      },
      {
        key: "Vitest",
        description:
          "**156 offline tests**: Hardhat test vectors, real signing, in-memory SQLite, and a fake chain that changes between calls and during retries (including a block older than one already seen).",
      },
    ],
  },

  diagram: {
    title: "Withdrawal lifecycle",
    caption:
      "A broadcast is recorded as pending; the poller writes one outflow from the receipt (Wallet Watcher README).",
    definition: `sequenceDiagram
  actor Op as Operator
  participant API as api.ts
  participant RPC as Sepolia RPC
  participant DB as SQLite
  participant P as poller.ts
  Op->>API: POST /withdrawals, broadcast true
  API->>RPC: balance, pending nonce, fees, gas
  API->>API: worst-case fee check, sign in signer.ts
  API->>RPC: eth_sendRawTransaction
  API->>DB: withdrawal row, status pending
  API-->>Op: 202 pending with tx hash
  Note over DB: ledger untouched
  P->>RPC: eth_getTransactionReceipt
  P->>DB: status, fee, one outflow, new balance`,
  },

  images: [],
  videos: [],

  featured: {
    category: "Web3 Backend & Infrastructure",
    subtitle: "Sepolia · Node.js",
    summary:
      "A custody backend slice built to a written spec: HD wallets, an append-only ETH ledger and signed EIP-1559 withdrawals, with an HTTP layer that never receives the mnemonic.",
    bullets: [
      "**Receipt-driven settlement:** a broadcast is stored as pending, and the poller writes one outflow from the receipt (amount + real fee), never from a balance diff.",
      "**Consistent, exact reads:** every balance in one **Multicall3** eth_call pinned to its block, **bigint** wei end to end, and a worst-case fee check before signing.",
      "**Signing behind one module:** only **signer.ts** signs and no key is stored or logged; 156 offline tests, CI green on main.",
    ],
  },

  links: {
    page: "/projects/wallet-watcher",
    live: "",
    github: GITHUB,
    article: {
      href: "/articles/wallet-watcher",
      label: "Read the Wallet Watcher article",
      iconName: "book",
    },
  },

  // Real run from the README walkthrough (1 Oct 2026), poller log then GET /wallets/0/ledger,
  // trimmed to the fields that matter. Values cross-checked against the local DB and Sepolia.
  terminal: {
    title: "wallet-watcher · Sepolia",
    lines: [
      "[poller] wallet #0: outflow -523183071527000 wei (mined, tx 0x6e8e…)",
      "[poller] wallet #1: inflow 500000000000000 wei",
      "$ curl -s http://127.0.0.1:3000/wallets/0/ledger",
      "{",
      '  "index": 0,',
      '  "entries": [',
      '    { "type": "initial", "deltaEth": "0" },',
      '    { "type": "inflow", "deltaEth": "0.001" },',
      '    { "type": "outflow",',
      '      "deltaEth": "-0.000523183071527",',
      '      "balanceAfterEth": "0.000476816928473",',
      '      "txHash": "0x6e8ec949…5ad1e4a0" }',
      "  ]",
      "}",
    ],
  },
};
