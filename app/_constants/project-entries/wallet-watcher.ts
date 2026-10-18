/** Wallet Watcher — figures verified against the repo and Sepolia on 2026-10-18. */
import { STACK } from "@/app/_constants/stack";
import type { Project } from "@/app/_types/project";

const GITHUB = "https://github.com/SiegfriedBz/wallet-watcher";
const SEPOLIA_TX =
  "https://sepolia.etherscan.io/tx/0x6e8ec949adf6c92f17fe2bb109bf8c79441788312e67a60f1fbe560c5ad1e4a0";

export const walletWatcherProject: Project = {
  slug: "wallet-watcher",
  languages: ["TypeScript"],
  // First commit 30 Sep 2026, last merge (PR #8) 17 Oct 2026.
  constructionPeriod: "Sep–Oct 2026",
  title: {
    h1: "Wallet Watcher",
    h2: "Custody Backend: HD Wallets, ETH Ledger and Signed Withdrawals",
    short: "Exactly-Once Withdrawal Ledger",
  },
  description: {
    short:
      "Custody backend slice on Sepolia: HD wallets, an append-only ETH ledger, and EIP-1559 withdrawals booked exactly once from their receipts.",
    problem:
      "Backends that move money fail in boring ways: a withdrawal counted twice, wei rounded through a float, a spend approved on a stale balance, an RPC key leaked into a log, a transaction signed for the wrong chain. None of them needs an attacker, and each one leaves the books disagreeing with the chain.",
    solution:
      "**Wallet Watcher** derives N wallets from one BIP-39 mnemonic, polls their ETH balances into an append-only **SQLite** ledger, and builds and signs **EIP-1559** withdrawals behind a localhost admin API. Outflows are written once from the **transaction receipt**, amounts stay **bigint** wei end to end, balances come from one **Multicall3** snapshot pinned to its block, and only **signer.ts** ever signs.",
    overview: `Wallet Watcher is a single **Node.js** and **TypeScript** service on **Ethereum Sepolia**, built to a written spec. It derives 1 to 20 wallets at the BIP-44 path m/44'/60'/0'/0/i, polls every balance at startup and then every 8 minutes, and exposes a localhost API to list wallets, read each wallet's ledger, and build, sign and optionally broadcast withdrawals.
The money logic sits in three pure modules with no I/O (withdrawal planning, settlement, change detection), and everything that touches the chain, the database or HTTP stays at the edges. A broadcast is recorded as **pending**; the poller later writes **one** outflow from the receipt, so a withdrawal can never be booked twice.
The repo documents its own limits (no confirmation depth, one withdrawal in flight per wallet, keys in process memory) and a path to production: KMS/MPC signing, write-ahead broadcasts with idempotency keys, a reorg-aware ledger and nonce management.`,
  },

  features: [
    {
      key: "Exactly-Once Outflows",
      description:
        "A broadcast is stored as **pending** and the ledger is left alone. The poller writes **one** outflow from the receipt (amount + **gasUsed × effectiveGasPrice**, or the fee alone if reverted), together with the status and new balance in a single SQLite transaction. While a withdrawal is pending, that wallet's balance diff is skipped, so the drop is never booked twice.",
    },
    {
      key: "Exact Amounts, No Floats",
      description:
        "Every amount is a **bigint** in wei, stored as **TEXT** in SQLite (an INTEGER stops at about 9.22 ETH) and sent as strings in JSON. The API only accepts amounts as strings with at most 18 decimals, converted once with **parseEther**: a JSON number has already lost precision by the time it is parsed.",
    },
    {
      key: "Block-Consistent Balance Snapshots",
      description:
        "Each round reads every balance and the block number in **one Multicall3 eth_call** (never split, no silent failures). The poller keeps a **block floor** and never compares against an older block than a receipt or snapshot it already relied on, so a lagging node behind a load-balanced RPC cannot create a false inflow.",
    },
    {
      key: "Worst-Case Fee Check",
      description:
        "A withdrawal is signed only if **balance ≥ value + gasLimit × maxFeePerGas**, on a balance, a pending-tag nonce, fees and a gas estimate read fresh from the chain. Otherwise the API returns **422** with the max sendable amount. It is exact when the node can estimate gas (one wei more is refused). When the amount is at or above the balance the node may refuse to estimate, the code falls back to 21,000 gas, and the figure is an upper bound.",
    },
    {
      key: "Key Isolation and Least Privilege",
      description:
        "Only **signer.ts** signs, deriving one wallet's key per signature; no private key is stored, logged or returned. The HTTP layer receives functions (read, sign, broadcast), never the mnemonic or the RPC client, and the RPC client has no account. Signing requires an admin key compared in constant time, and logged errors drop the RPC URL that carries the provider key.",
    },
    {
      key: "Testnet Enforced at Startup",
      description:
        "The service checks **eth_chainId** before opening the database or starting the poller and refuses anything but Sepolia. Chain id **11155111** is signed into every transaction, and the database file is named after it, so two networks never share a ledger.",
    },
    {
      key: "Deterministic HD Wallets",
      description:
        "BIP-39 mnemonic validated with its checksum, BIP-44 derivation at **m/44'/60'/0'/0/i**: the same index is always the same address, raising N appends and lowering it keeps a prefix. Verified against Hardhat's published test vectors.",
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
    "**Ledger matches chain:** wallet #0's on-chain balance on 18 Oct 2026 (476,816,928,473,000 wei) equals its last ledger row",
    "**Max sendable exact to the wei when gas can be estimated:** the computed amount is accepted, one wei more is refused (tested); an upper bound when the node refuses to estimate",
  ],

  transferablePatterns:
    "**Receipt-driven settlement** for any system that books on-chain spends; **block-pinned snapshots** (one eth_call plus a block floor) for indexers and pollers behind load-balanced RPCs; **worst-case cost checks** on fresh state before signing; and **injecting capabilities instead of secrets** (sign, broadcast, read as functions), which turns a later move to KMS or MPC signing into a one-function change.",

  limitations: [
    "**No confirmation depth:** balances are read at latest and a withdrawal settles on its first receipt, so a reorg could undo a recorded change.",
    "**One withdrawal in flight per wallet**, and the pending check is not atomic: two simultaneous broadcasts can both pass.",
    "**A never-mined transaction** keeps its wallet pending; there is no replacement or cancellation yet.",
    "**A failed broadcast is ambiguous:** a 502 records nothing, but the node may have accepted the transaction, and a retry gets the next nonce.",
    "**The block floor lives in memory** and is lost on restart.",
    "**Deposits are merged per poll interval** and carry no transaction hash; one admin key is shared by every operator.",
  ],

  roadmap: [
    "**Keys out of the process:** KMS/HSM or MPC signing, and watch-only address derivation from the account xpub.",
    "**Write-ahead broadcasts:** idempotency keys and signed bytes persisted before sending, so a retry resends the same transaction.",
    "**Transaction lifecycle:** a per-wallet nonce manager and lock, with replace-by-fee for stuck transactions.",
    "**Reorg-aware ledger:** block number and hash on every row, credit at safe or finalized, reversing rows on reorg.",
    "**Deposit attribution:** EIP-7708 Transfer logs where the chain emits them, indexers or traces elsewhere.",
    "**Operations:** Postgres with migrations, RPC failover, metrics, and an alert on every external outflow.",
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
        key: "Node.js 24 + TypeScript (strict)",
        description:
          "One process with a composition root, pure money modules and I/O at the edges; strict mode with **noUncheckedIndexedAccess**.",
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
          "Three tables (balances, ledger, withdrawals), amounts as **TEXT**, and related writes in one transaction.",
      },
      {
        key: "Vitest",
        description:
          "**156 offline tests**: Hardhat test vectors, real signing, in-memory SQLite and fake chain clients.",
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
      "A small custody backend built to a written spec: HD wallets, an append-only ETH ledger and signed EIP-1559 withdrawals, where each withdrawal is booked once from its receipt and the HTTP layer never touches a key.",
    bullets: [
      "**Exactly-once outflows:** a broadcast is stored as pending, and the poller writes one outflow from the receipt (amount + real fee), never from a balance diff.",
      "**Consistent, exact reads:** every balance in one **Multicall3** eth_call pinned to its block, **bigint** wei end to end, and a worst-case fee check before signing.",
      "**Key isolation:** only **signer.ts** signs, deriving one key per signature; 156 offline tests, CI green on main.",
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
