import { TypographyP } from "@/app/_components/typography/p"
import { BIOVERIFY_LINKS } from "@/app/_constants/projects"
import type { FC } from "react"
import { ArticleCta } from "./article-cta"
import { ArticleFooterLinks } from "./article-footer-links"
import { ArticleGif } from "./article-gif"
import { ArticleHeader } from "./article-header"
import { CalloutCard } from "./callout-card"
import { DiagramWrap } from "./diagram-wrap"
import { Figure1EventPipeline } from "./diagrams/figure-1-event-pipeline"
import { Figure2SubmissionAgent } from "./diagrams/figure-2-submission-agent"
import { Figure3Vrf } from "./diagrams/figure-3-vrf"
import { Figure4ReviewAgent } from "./diagrams/figure-4-review-agent"
import { OutcomesTable } from "./outcomes-table"
import { PhaseCard } from "./phase-card"
import { PullQuote } from "./pull-quote"
import { RecapCard } from "./recap-card"
import { TechTag } from "./tech-tag"
import { TldrCard } from "./tldr-card"

const h2 =
  "mb-5 mt-14 border-b border-border pb-3 font-[family-name:var(--font-serif)] text-[clamp(1.5rem,4vw,1.75rem)] font-normal leading-snug text-foreground first:mt-0 dark:border-white/10"

const h3 =
  "mb-3.5 mt-9 text-[15px] font-medium uppercase tracking-wide text-accent-blue dark:text-[#2dd4bf]"

const dashList =
  "mb-6 list-none space-y-2 pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-teal-600 [&>li]:before:content-['—'] dark:[&>li]:before:text-[#2dd4bf]"

export const BioVerifyArticle: FC = () => {
  const BIOVERIFY_GITHUB = BIOVERIFY_LINKS.github
  const BIOVERIFY_LIVE = BIOVERIFY_LINKS.live
  const TELEGRAM_URL =
    process.env.NEXT_PUBLIC_BIOVERIFY_TELEGRAM_URL?.trim() ?? ""

  return (
    <>
      <ArticleHeader />

      <div className="article-prose text-[17px] font-light leading-[1.8] text-foreground [&>p]:mb-[1.6em]">
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          Peer review is broken: opaque, unpaid, and riddled with conflicts of
          interest. What if we could make it verifiable, fair, and economically
          aligned?
        </TypographyP>

        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          I built{" "}
          {BIOVERIFY_GITHUB ? (
            <a href={BIOVERIFY_GITHUB}>
              <strong>BioVerify</strong>
            </a>
          ) : (
            <strong>BioVerify</strong>
          )}
          : a full-stack agentic DApp where authors stake ETH on their research,
          reviewers are selected by Chainlink VRF, every artifact is
          content-addressed on <strong>IPFS</strong>, and AI agents coordinate
          the rest — with humans making every verdict call. You can try it on
          the{" "}
          {BIOVERIFY_LIVE ? (
            <a href={BIOVERIFY_LIVE}>live demo</a>
          ) : (
            "live demo"
          )}{" "}
          (Base Sepolia and Ethereum Sepolia, no setup), and the architecture
          and source are{" "}
          {BIOVERIFY_GITHUB ? (
            <a href={BIOVERIFY_GITHUB}>open on GitHub</a>
          ) : (
            "open on GitHub"
          )}
          .
        </TypographyP>

        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          This is a case study in trust-minimised coordination: the chain
          records what happened, and agents orchestrate what happens next.
          Having spent fifteen years in Molecular Biology and
          Civil/Environmental Engineering before software — and having been on
          the author side of peer review myself — I had a specific reason to
          care. Rather than describe the stack in the abstract, this article
          follows the system as a user experiences it, and introduces each piece
          of technology precisely at the moment the story needs it.
        </TypographyP>

        <PullQuote>
          &quot;Truth on-chain, orchestration off-chain — with humans involved in verdict calls.&quot;
        </PullQuote>

        <h2 className={h2}>Why decentralised peer review — and why now</h2>

        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          Peer review is a coordination game with a trust deficit: opaque
          processes, inconsistent conflict disclosure, and reviewers who are
          rarely compensated. Blockchain cannot fix science, but it can make
          parts of the process verifiable — stakes and outcomes settle on-chain,
          participants can prove what they signed, and for one specific
          subproblem (selecting reviewers fairly){" "}
          <TechTag variant="amber">Chainlink VRF</TechTag> attaches a
          cryptographic proof to the randomness so the draw can be audited.
        </TypographyP>

        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          BioVerify is an experiment in the coordination patterns that matter
          here: long-running workflows, randomly selected participants from a
          staked pool, human-in-the-loop delays, economic accountability, and
          settlement back on-chain.
        </TypographyP>

        <TldrCard
          items={[
            {
              key: "what",
              content: (
                <>
                  <strong>What it is</strong> — a DeSci peer-review case study:
                  stake, verifiable reviewer selection, AI screening, human
                  verdicts, on-chain settlement.
                </>
              ),
            },
            {
              key: "cqrs",
              content: (
                <>
                  <strong>CQRS as a first principle</strong> — the contract
                  emits events (writes); an off-chain Postgres projection
                  handles all reads. The chain is truth, not a database.
                </>
              ),
            },
            {
              key: "durable",
              content: (
                <>
                  <strong>Durable coordination</strong> — Inngest wraps agents
                  in durable <code>step.run</code> with retries and crash-resume
                  on serverless; LangGraph <code>interrupt()</code> pauses for
                  human signatures, and Postgres checkpointers persist graph
                  state between resumes.
                </>
              ),
            },
            {
              key: "hitl",
              content: (
                <>
                  <strong>Human-in-the-loop</strong> — AI agents coordinate the
                  workflow, but reviewers make every verdict call; agents record
                  and settle, they never override.
                </>
              ),
            },
          ]}
        />

        <hr className="my-14 border-border dark:border-white/10" />

        <PhaseCard
          number="01"
          label="Author flow"
          title="Submitting a publication"
        />

        <h3 className={h3}>Choosing a network</h3>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          An author wishing to submit their work first chooses the network:{" "}
          <TechTag variant="blue">Base Sepolia</TechTag> or{" "}
          <TechTag variant="blue">Ethereum Sepolia</TechTag>. BioVerify deploys{" "}
          <code>BioVerifyV3</code> independently on both testnets, each with its
          own contract address, reward and slash pools, and reviewer pool. The
          same Solidity source is deployed to both networks, producing the same
          ABI on each — only per-chain parameters such as the Chainlink VRF
          coordinator and subscription differ. This multi-chain design is
          deliberate: BioVerify is chain-agnostic across EVM-compatible
          networks; the same coordination patterns work without modifying
          application logic.
        </TypographyP>

        <h3 className={h3}>
          Building the submission: IPFS and content addressing
        </h3>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          The author fills a form with the components of their research: title,
          abstract, authors, body content, and any supporting files. Before
          anything touches the blockchain, each of these components is uploaded
          to <strong>IPFS</strong> — the InterPlanetary File System.
        </TypographyP>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          IPFS addresses files by content, not location: a <strong>CID</strong>{" "}
          (Content IDentifier) is a cryptographic hash of the bytes. Change a
          single byte and the CID changes — once recorded on-chain, it is a
          commitment to exactly those bytes.
        </TypographyP>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          BioVerify uses <TechTag>Pinata</TechTag> as the IPFS pinning service.
          Each component is uploaded individually, producing its own CID. The
          frontend then assembles a final <strong>research manifest</strong> — a
          structured JSON object containing all the component CIDs — and pins
          that too. The manifest&apos;s CID becomes the single identifier for
          the whole submission.
        </TypographyP>

        <h3 className={h3}>Calling the contract: stake and submission fee</h3>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          With the manifest CID in hand, the author calls{" "}
          <code>submitPublication(cid)</code> on the{" "}
          <TechTag variant="blue">BioVerifyV3</TechTag> contract — alongside two
          distinct ETH amounts:
        </TypographyP>
        <ul className={dashList}>
          <li>
            <strong>A stake.</strong> The author puts skin in the game. If the
            publication is rejected for plagiarism or fails peer review, this
            stake is slashed. If it passes, the stake is returned plus a
            reputation boost. That alignment makes the incentive structure
            legible: the author is incentivised to submit only non-plagiarised
            work and only work they believe will survive human peer review.
          </li>
          <li>
            <strong>A submission fee.</strong> This is not a platform fee — it
            funds <strong>Chainlink VRF</strong> (Verifiable Random Function).
            On-chain, the fee is <code>msg.value</code> minus the fixed
            publisher stake; callers may overpay so spikes in gas or VRF costs
            stay covered. When <code>pickReviewers</code> runs, the contract
            forwards <code>paidSubmissionFee</code> into the VRF subscription
            via <code>fundSubscriptionWithNative</code>, so each submission
            directly tops up the oracle budget. The frontend can estimate that
            fee in real time from current conditions while the contract enforces
            a minimum.
          </li>
        </ul>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          The contract records the author&apos;s address, the publication CID,
          and the paid submission fee, transitions the publication to{" "}
          <code>SUBMITTED</code> status, and emits{" "}
          <code>SubmitPublication</code>.
        </TypographyP>

        <hr className="my-14 border-border dark:border-white/10" />

        <PhaseCard
          number="02"
          label="Infrastructure"
          title="From on-chain event to off-chain intelligence"
        />

        <h3 className={h3}>Getter-less contract: CQRS as a first principle</h3>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          <code>BioVerifyV3</code> is deliberately getter-light. It emits a
          granular event for every state transition and avoids exposing view
          functions for UI queries. This is <strong>CQRS</strong> — Command
          Query Responsibility Segregation — applied at the chain boundary: the
          contract is the write model; an off-chain Postgres projection is the
          read model.
        </TypographyP>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          The contract benefits: smaller bytecode means cheaper deployment,
          lower ongoing interaction gas where it matters, and a smaller attack
          surface to audit. The frontend benefits: the UI reads a fast Postgres
          projection rather than orchestrating dozens of <code>eth_call</code>{" "}
          requests against the chain — work the EVM is not optimised for product
          lists — while Drizzle-backed queries support rich filtering, sorting,
          and pagination. The chain is the source of truth; Postgres reflects
          that truth and is the source of responsiveness, lowering UI latency.
        </TypographyP>

        <h3 className={h3}>Alchemy Notify: from block to webhook</h3>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          <TechTag variant="amber">Alchemy Notify</TechTag> is Alchemy&apos;s
          webhook service. For each network, BioVerify configures one webhook
          scoped to a single contract address — the deployed{" "}
          <code>BioVerifyV3</code> — so Alchemy POSTs a signed payload
          containing the event logs that contract emitted in each new confirmed
          block. Two such webhooks run in parallel — one for Base Sepolia, one
          for Ethereum Sepolia — both reacting to the same set of{" "}
          <code>BioVerifyV3</code> events and both POSTing to the Next.js API
          route at <code>/api/webhooks/alchemy/all-events</code>.
        </TypographyP>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          That route runs as a <strong>Vercel serverless function</strong>. The
          first thing it does is verify the webhook&apos;s{" "}
          <TechTag variant="blue">HMAC-SHA256 signature</TechTag>: Alchemy and
          the server share a per-network secret key, and any payload that does
          not match is rejected immediately. This prevents spoofed events from
          triggering agent actions or corrupting the read model.
        </TypographyP>

        <h3 className={h3}>The Neon Postgres read model: OCC projection</h3>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          Once the signature is verified, the raw log is decoded with{" "}
          <TechTag variant="blue">viem</TechTag> and dispatched to{" "}
          <code>processContractEvent()</code> — the core projector in the{" "}
          <code>@packages/cqrs</code> layer. This function translates on-chain
          events into typed updates and writes them into{" "}
          <TechTag variant="amber">Neon Postgres</TechTag>.
        </TypographyP>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          The correctness mechanism is{" "}
          <strong>Optimistic Concurrency Control (OCC)</strong>: each event
          carries a position stamp from the blockchain — its block number and
          log index. The projector only applies an update if the incoming event
          is more recent than what it has already stored. Late webhook
          deliveries can repeat; they cannot roll the read model backward. A{" "}
          <TechTag variant="blue">viem</TechTag> WebSocket subscription to{" "}
          <code>NewPublicationStatus</code> invalidates the matching TanStack
          Query keys the moment the event is mined, so open lists update without
          polling.
        </TypographyP>

        <CalloutCard label="Optimistic concurrency (OCC)">
          Webhooks can replay or arrive out of chronological order — that is
          intrinsic to networked indexers and retries. BioVerify attaches a
          deterministic ordering stamp from Ethereum —{" "}
          <strong>block number plus log index</strong> — to each upsert. An
          update applies only when the inbound event sorts strictly newer than
          what is already stored. Duplicates converge idempotently; stale
          deliveries cannot rewind fresher projections. That guards the
          projection against duplication and reorder chaos that webhook
          pipelines naturally introduce.
        </CalloutCard>

        <DiagramWrap
          label="Figure 1 — Event pipeline: from contract event to read model and agents"
          caption={
            <>
              Every event from the contract flows through the same pipeline —
              decoded, verified, projected to Postgres. Only two specific
              contract events also dispatch an Inngest event that wraps a{" "}
              <TechTag variant="purple">LangGraph</TechTag> agent.
            </>
          }
        >
          <Figure1EventPipeline />
        </DiagramWrap>

        <CalloutCard label="Event families on BioVerifyV3">
          Pools: <code>RewardPool</code>, <code>SlashPool</code>; members /
          stakes: <code>RewardMember</code>, <code>SlashMember</code>,{" "}
          <code>IsAvailableReviewer</code>, <code>MemberReputation</code>,{" "}
          <code>MemberAvailableStake</code>, <code>MemberLockedStake</code>,{" "}
          <code>MemberLockedStakeOnPubId</code>, <code>Claim</code>
          {"; "}
          publications: <code>SubmitPublication</code>,{" "}
          <code>LockedStakeOnPubId</code>, <code>NewPublicationStatus</code>
          {"; "}
          agent + VRF: <code>Agent_RequestVRF</code>,{" "}
          <code>Agent_PickReviewers</code>, <code>Agent_RecordReview</code>,{" "}
          <code>Agent_FinalizePublication</code>, treasury moves (
          <code>Agent_TransferSlashPoolToTreasury</code>,{" "}
          <code>Agent_MoveSlashPoolToRewardPool</code>). The projector in{" "}
          <code>@packages/cqrs</code> folds these into three Drizzle-backed
          tables: protocol, member, publication.
        </CalloutCard>

        <h3 className={h3}>
          Why Inngest, and why only two events trigger agents
        </h3>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          Almost every BioVerify contract event exists to update the Postgres
          read model. Only two events also mean{" "}
          <em>new long-running off-chain work must begin</em>:{" "}
          <code>SubmitPublication</code> kicks off plagiarism screening for a
          manuscript; <code>Agent_PickReviewers</code> means VRF has finished,
          reviewers for that submitted publication have been picked, and human
          verdict collection must start. Everything else — stake movements,
          status transitions after settlement, treasury plumbing — is
          bookkeeping the projector already knows how to fold into Drizzle
          tables.
        </TypographyP>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          Those two moments map to Inngest events{" "}
          <code>CHAIN_SUBMISSION_RECEIVED</code> (submission agent) and{" "}
          <code>CHAIN_PICKED_REVIEWERS_RECEIVED</code> (review agent). Each
          handler wraps a <TechTag variant="purple">LangGraph</TechTag>{" "}
          invocation inside a durable{" "}
          <TechTag variant="purple">Inngest</TechTag> <code>step.run</code>.
        </TypographyP>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          <strong>Why Inngest?</strong> Vercel serverless functions have tight
          per-invocation time limits and no guaranteed in-memory state between
          invocations. Inngest wraps each agent run in a durable execution
          shell: automatic retries, step isolation so successful steps are not
          replayed, and clean crash-recovery if a worker dies mid-run. It is{" "}
          <em>not</em> the mechanism that waits days for a reviewer — that pause
          lives in LangGraph.
        </TypographyP>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          <strong>Why LangGraph?</strong> Human review needs real suspension
          inside the graph: <code>interrupt()</code> stops execution until a
          verified EIP-712 payload arrives, while the Postgres checkpointer
          remembers partial progress (who already reviewed, whether escalation
          opened). When a Next.js server action resumes the thread with{" "}
          <code>Command({`{ resume }`})</code>, the checkpointer reloads that
          state so the agent continues without replaying completed nodes.
        </TypographyP>

        <RecapCard
          label="Recap — what has happened so far"
          items={[
            {
              key: "r1",
              content:
                "Author submits: manuscript uploaded to IPFS, CID + stake + submission fee recorded on-chain",
            },
            {
              key: "r2",
              content: (
                <>
                  Contract emits <code>SubmitPublication</code> → Alchemy Notify
                  → Next.js webhook (HMAC-verified)
                </>
              ),
            },
            {
              key: "r3",
              content:
                "Projector writes to Neon Postgres read model with OCC (no event can roll the state back)",
            },
            {
              key: "r4",
              content:
                "Inngest triggers the Submission Agent via a wrapped LangGraph call",
            },
          ]}
        />

        <hr className="my-14 border-border dark:border-white/10" />

        <PhaseCard
          number="03"
          label="Agent 1 — Submission screening"
          title="Plagiarism check, then pick or slash"
        />

        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          The submission agent runs a linear sequence of nodes — no branching
          until the very end, which keeps the logic easy to follow. Here is what
          it does, step by step.
        </TypographyP>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          <strong>Fetch from IPFS.</strong> The agent retrieves the full
          publication manifest by its CID. This is the same content the author
          uploaded — content-addressed, so the agent is guaranteed to read
          exactly what was submitted, unchanged.
        </TypographyP>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          <strong>Plagiarism check with Exa.</strong> The agent passes the
          abstract to <TechTag>Exa AI</TechTag> — a semantic web search API
          optimised for research literature. Exa returns a ranked list of
          potentially similar publications from across the public web and
          academic databases.
        </TypographyP>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          <strong>LLM synthesis with Gemini.</strong> The raw Exa results are
          passed to a <TechTag>Gemini</TechTag> language model, which
          synthesises the similarity signals and produces a structured verdict
          inside the graph: pass (continue to review) or fail (plagiarism). The
          LLM node itself never touches the chain — no contract calls happen
          inside that step. Crucially, the output is schema-constrained; after
          the graph finishes, <code>agent-start.ts</code> maps pass/fail to
          exactly one CQRS command path.
        </TypographyP>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          <strong>Branch: plagiarism detected → </strong>
          <code>earlySlashPublication()</code>. On fail, the agent invokes{" "}
          <code>earlySlashPublicationCommand</code>: the AI verdict is pinned to
          IPFS, then <code>earlySlashPublication(pubId, verdictCid)</code> is
          called through the agent&apos;s immutable wallet. The contract slashes
          the author&apos;s stake and transitions the publication to{" "}
          <code>EARLY_SLASHED</code>. The workflow ends here for this
          publication.
        </TypographyP>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          <strong>Branch: clean → </strong>
          <code>pickReviewers()</code>. On pass,{" "}
          <code>pickReviewersCommand</code> calls{" "}
          <code>pickReviewers(pubId)</code> on the contract. This triggers the
          Chainlink VRF request — which is where the randomness story begins.
        </TypographyP>

        <h3 className={h3}>Access control: agent-gated transitions</h3>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          Only the agent&apos;s immutable wallet address — set once at contract
          deployment and unchangeable afterwards — can call{" "}
          <code>earlySlashPublication</code>, <code>pickReviewers</code>,{" "}
          <code>recordReview</code>, <code>publishPublication</code>,{" "}
          <code>slashPublication</code>, and pool-management moves guarded by{" "}
          <code>onlyAgent</code>. Arbitrary callers cannot trigger those
          transitions — the contract simply checks <code>msg.sender</code>{" "}
          against the immutable agent address.
        </TypographyP>

        <DiagramWrap
          label="Figure 2 — Submission agent: linear screening → branch to earlySlash or pickReviewers"
          caption="The submission agent's nodes run in sequence; only the final command branches. Schema-constraining the LLM output ensures only two valid on-chain actions are possible."
        >
          <Figure2SubmissionAgent />
        </DiagramWrap>

        <TypographyP className="mb-4 mt-10 text-[17px] font-light leading-[1.8]">
          <strong>Demo — AI plagiarism detection and early slashing.</strong>{" "}
          <em>
            Dual-device view: User A (left, mobile, no wallet) on{" "}
            <code>/publications</code>; User B (right, tablet, wallet on{" "}
            <strong>Base Sepolia</strong>).
          </em>
        </TypographyP>
        <ArticleGif
          src="/projects/bioverify/gifs/early-slash-01-submit.gif"
          alt="User B on tablet submits a publication that duplicates existing literature; transaction confirmed on Base Sepolia"
          label="Step 1 — User B submits on Base Sepolia"
          caption={
            <>
              User B submits a publication that duplicates existing literature.
            </>
          }
        />
        <ArticleGif
          className="mt-4"
          src="/projects/bioverify/gifs/early-slash-02-realtime.gif"
          alt="User A on mobile sees the new publication row appear in real time over WebSocket without a wallet; status ends at EARLY_SLASHED"
          label="Step 2 — Realtime list → EARLY_SLASHED"
          caption={
            <>
              User A sees the row appear in real time over WebSocket — no
              wallet, no refresh. The publication ends at{" "}
              <strong>EARLY_SLASHED</strong> with the AI verdict loaded from
              IPFS.
            </>
          }
        />

        <hr className="my-14 border-border dark:border-white/10" />

        <PhaseCard
          number="04"
          label="Verifiable randomness"
          title="Fair reviewer selection via Chainlink VRF"
        />

        <h3 className={h3}>The reviewer pool: anyone can join by staking</h3>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          Any user can register as a reviewer by depositing a{" "}
          <strong>reviewer stake</strong> into the contract. This stake is the
          reviewer&apos;s skin in the game: if a reviewer delivers a verdict
          that is later deemed negligent (more on this below), their stake is
          slashed. Staking is also what makes Sybil attacks expensive: each fake
          reviewer account costs real ETH, and VRF only draws a handful of
          reviewers per publication, so the probability that any given fake
          account is drawn falls as the honest pool grows.
        </TypographyP>

        <h3 className={h3}>Why VRF, and why it matters when stakes are real</h3>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          Blockchains are deterministic. Any randomness derived from public
          on-chain fields (<code>blockhash</code>, <code>block.timestamp</code>)
          is predictable or influenceable in principle — not sufficient when
          selection has economic consequences.
        </TypographyP>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          <TechTag variant="amber">Chainlink VRF v2.5</TechTag> follows the
          usual hybrid smart-contract pattern: random words are produced
          off-chain together with a cryptographic proof; the consumer contract
          verifies that proof on-chain before consuming the words. The draw is
          not merely opaque — it is <strong>verifiable</strong>. Think of it as
          a public lottery where you do not have to trust the organiser: anyone
          can re-check the draw afterward.
        </TypographyP>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          In BioVerify&apos;s flow: the agent calls <code>pickReviewers()</code>{" "}
          → the contract calls <code>requestRandomWords()</code> → Chainlink
          fulfills via <code>fulfillRandomWords()</code> → the callback selects
          reviewers from the staked pool and emits{" "}
          <code>Agent_PickReviewers</code>. That event re-enters the exact same
          event pipeline — Alchemy Notify, HMAC-verified webhook, Neon Postgres
          projection — closing the loop without any special-casing.
        </TypographyP>

        <DiagramWrap
          label="Figure 3 — Chainlink VRF: verifiable reviewer selection"
          caption="Random words come back with a cryptographic proof; the contract verifies the proof on-chain before drawing reviewers from the staked pool."
        >
          <Figure3Vrf />
        </DiagramWrap>

        <TypographyP className="mb-4 mt-10 text-[17px] font-light leading-[1.8]">
          <strong>Demo — Submitting a publication (success path).</strong>{" "}
          <em>
            Split view: <strong>BioVerify Telegram bot</strong> (left) and DApp
            (right).
          </em>
        </TypographyP>
        <ArticleGif
          src="/projects/bioverify/gifs/submit-success-01-form.gif"
          alt="Author fills the publication form on the DApp with metadata and IPFS manifest, ready to submit"
          label="Step 1 — Fill the publication form"
          caption={
            <>
              The author fills in the publication form (metadata and IPFS
              manifest) and prepares to submit.
            </>
          }
        />
        <ArticleGif
          className="mt-4"
          src="/projects/bioverify/gifs/submit-success-02-tx.gif"
          alt="Author confirms the on-chain submitPublication transaction; the Telegram bot mirrors SUBMITTED then IN_REVIEW as the events are mined"
          label="Step 2 — Submitted → In Review"
          caption={
            <>
              The author confirms the on-chain transaction. The bot receives
              status notifications as the publication moves from{" "}
              <strong>SUBMITTED</strong> to <strong>IN_REVIEW</strong>.
            </>
          }
        />
        <ArticleGif
          className="mt-4"
          src="/projects/bioverify/gifs/submit-success-03-in-review.gif"
          alt="Publication detail page on the DApp showing IN_REVIEW status and the Chainlink VRF–selected reviewer addresses"
          label="Step 3 — VRF reviewers on the publication detail"
          caption={
            <>
              The publication detail page shows <strong>IN_REVIEW</strong> and
              the Chainlink VRF–selected reviewers.
            </>
          }
        />

        <hr className="my-14 border-border dark:border-white/10" />

        <PhaseCard
          number="05"
          label="Agent 2 — Human-in-the-loop review"
          title="Verdicts, escalation, and settlement"
        />

        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          After projection, <code>Agent_PickReviewers</code> fires{" "}
          <code>CHAIN_PICKED_REVIEWERS_RECEIVED</code> into Inngest, which kicks
          off the second LangGraph agent. This agent is the most complex part of
          the system — it manages a workflow that can pause for days, handles
          human escalation, and ultimately settles the publication on-chain.
        </TypographyP>

        <h3 className={h3}>
          Human-in-the-loop (HITL): what pausing actually means
        </h3>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          HITL is wired directly into the LangGraph itself. When the review
          workflow reaches <code>humanReviewsNode</code>, the graph calls{" "}
          <code>interrupt()</code> and stops. The Inngest step that wrapped the
          agent invocation finishes normally — the work is paused, not blocked —
          and LangGraph&apos;s Postgres checkpointer persists the partial graph
          state in Neon. Days later, when a reviewer signs their verdict, a
          Next.js server action verifies the EIP-712 payload and calls{" "}
          <code>resumeReviewersAgent</code>, which issues{" "}
          <code>Command({`{ resume }`})</code>. LangGraph reloads the thread
          state from the checkpointer, applies the new review, records{" "}
          <code>recordReview</code> on-chain once the payload checks out, and
          continues until the next interrupt or settlement.
        </TypographyP>

        <h3 className={h3}>
          How reviewers submit verdicts: EIP-712 gasless signing
        </h3>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          Reviewers are not push-notified by the system — they check the
          reviewer dashboard at <code>/publications/assignments</code>, find the
          publication they have been assigned to review, and step through the
          flow from there. They read the manuscript and submit their verdict —
          without paying gas for the review transaction itself. Instead, they
          sign using <TechTag variant="blue">EIP-712</TechTag>: typed structured
          data that yields a standard cryptographic signature without
          broadcasting a transaction.
        </TypographyP>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          The signed payload is posted to the backend off-chain. After viem
          verifies the signature and confirms the signer is exactly the reviewer
          assigned to this publication, the agent calls{" "}
          <code>recordReview(pubId, reviewer)</code> through the agent wallet.
          On-chain, that call only records that this reviewer has submitted
          their review for this publication; the qualitative verdict stays in
          LangGraph until settlement encodes honest versus negligent addresses.
        </TypographyP>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          Anyone can also follow the public{" "}
          {TELEGRAM_URL ? (
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 underline underline-offset-4 hover:underline dark:text-[#2dd4bf]"
            >
              BioVerify Telegram bot
            </a>
          ) : (
            <strong>BioVerify Telegram bot</strong>
          )}
          , which broadcasts contract state transitions in real time across both
          Base Sepolia and Ethereum Sepolia.
        </TypographyP>

        <h3 className={h3}>
          Peer reviewers, senior reviewers, and the escalation path
        </h3>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          BioVerify distinguishes two reviewer roles within a publication cycle
          (current Base Sepolia and Ethereum Sepolia deployments draw{" "}
          <code>I_VRF_NUM_WORDS = 3</code> candidates so there are two explicit
          peers plus one senior; the senior is whichever drawn reviewer has the
          highest on-chain reputation):
        </TypographyP>
        <ul className={dashList}>
          <li>
            <strong>Peer reviewers.</strong> The non-senior members of the VRF
            draw. They submit independent pass/fail verdicts. When both agree,
            the graph routes straight to settlement —{" "}
            <code>publishPublication</code> if the shared verdict is pass,{" "}
            <code>slashPublication</code> if it is fail; in that branch the
            settlement helper classifies both peers as honest: each gets their
            stake back, the reviewer reward, and a reputation bump — the senior
            reviewer is not invoked.
          </li>
          <li>
            <strong>Senior reviewer.</strong> Drawn alongside peers but
            designated as the highest-reputation reviewer of the three. If peers
            disagree, the workflow escalates to the senior reviewer (tie-break
            assisted by Gemini), who signs a binding verdict. The peer who
            aligned with the senior is honest; the dissenting peer is negligent
            and is slashed (stake to the slash pool, reputation drop). Even when
            peers agree, the senior remains economically aligned: settlement
            code unconditionally credits them as honest — their locked stake
            unlocks and they still receive the reviewer reward, on the grounds
            that they served as the standby escalation authority.
          </li>
        </ul>

        <h3 className={h3}>Possible outcomes and what triggers settlement</h3>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          The review agent settles the publication once the binding verdict is
          established — either by peer reviewer consensus or senior reviewer
          decision. It calls one of two contract functions through the agent
          address:
        </TypographyP>
        <ul className={dashList}>
          <li>
            <code>
              publishPublication(pubId, honest, negligent, verdictCid)
            </code>{" "}
            → <code>PUBLISHED</code>. The publisher&apos;s locked stake unlocks
            back into <code>availableStake</code> and their reputation
            increases. Every address listed as honest (peers who matched the
            decision plus the senior reviewer) unlocks stake, receives the
            configured reviewer reward, and gains reputation. Negligent
            reviewers lose their locked stake to the slash pool and take a
            reputation penalty.
          </li>
          <li>
            <code>slashPublication(pubId, honest, negligent, verdictCid)</code>{" "}
            → <code>SLASHED</code>. The publisher is slashed the same way as
            other failure paths. Honest reviewers — including those who caught
            the failure — still receive stake, reward, and reputation; negligent
            reviewers are slashed.
          </li>
        </ul>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          Settlement deliberately uses a <strong>pull payment pattern</strong>:
          instead of pushing ETH to every participant inside the settlement
          transaction — where one malicious or buggy <code>receive()</code> hook
          could revert and grief the entire cohort (a denial-of-service against
          honest actors) — the contract moves value into internal balances and
          lets each party call <code>claim()</code> on their own schedule. Gas
          isolates per claimant; failures stay local.
        </TypographyP>

        <DiagramWrap
          label="Figure 4 — Review agent: HITL, escalation, and settlement"
          caption={
            <>
              The review agent runs under Inngest for durable{" "}
              <code>step.run</code> boundaries while LangGraph owns human
              pauses: the checkpointer restores state after each{" "}
              <code>interrupt()</code> so the graph knows both what it last knew
              and what must happen next.
            </>
          }
        >
          <Figure4ReviewAgent />
        </DiagramWrap>

        <TypographyP className="mb-4 mt-10 text-[17px] font-light leading-[1.8]">
          <strong>
            Demo — Peer review with human-in-the-loop conflict resolution.
          </strong>{" "}
          Two peer reviewers return conflicting verdicts; the senior reviewer
          breaks the tie and settlement flips the publication to{" "}
          <strong>PUBLISHED</strong>.
        </TypographyP>
        <ArticleGif
          src="/projects/bioverify/gifs/peer-review-01-pass.gif"
          alt="First peer reviewer signs an EIP-712 pass verdict off-chain in their wallet; the agent records the review on-chain"
          label="Step 1 — First peer reviewer: PASS (EIP-712 signature)"
          caption={
            <>
              The first peer reviewer submits a <strong>pass</strong> verdict —
              signed off-chain via EIP-712 before the agent records it on-chain.
            </>
          }
        />
        <ArticleGif
          className="mt-4"
          src="/projects/bioverify/gifs/peer-review-02-fail.gif"
          alt="Second peer reviewer submits a fail verdict; the two reviews now conflict and the workflow escalates"
          label="Step 2 — Second peer reviewer: FAIL → conflict, escalation"
          caption={
            <>
              The second peer reviewer submits a <strong>fail</strong> verdict.
              The two reviews now conflict, which triggers the escalation path.
            </>
          }
        />
        <ArticleGif
          className="mt-4"
          src="/projects/bioverify/gifs/peer-review-03-senior-pass.gif"
          alt="Split view: Telegram bot shows both peer reviews and the agent's escalation decision; the senior reviewer submits a tie-breaking pass"
          label="Step 3 — Senior reviewer breaks the tie (PASS)"
          caption={
            <>
              <em>
                Split view: Telegram bot (left) and senior reviewer (right).
              </em>{" "}
              The bot shows both peer reviews and the agent&apos;s decision to
              escalate. The senior reviewer submits a tie-breaking{" "}
              <strong>pass</strong>.
            </>
          }
        />
        <ArticleGif
          className="mt-4"
          src="/projects/bioverify/gifs/peer-review-04-published.gif"
          alt="Telegram bot shows PUBLISHED status; the publication detail page resolves the final verdict CID from IPFS after the senior reviewer's tie-break"
          label="Step 4 — PUBLISHED with the verdict resolved from IPFS"
          caption={
            <>
              After the senior review, Telegram reflects{" "}
              <strong>PUBLISHED</strong> and the detail page shows the final
              verdict resolved from IPFS.
            </>
          }
        />

        <RecapCard
          label="Recap — full lifecycle"
          items={[
            {
              key: "l1",
              content:
                "Author uploads to IPFS → calls submitPublication with stake + submission fee",
            },
            {
              key: "l2",
              content: (
                <>
                  <code>SubmitPublication</code> → pipeline → Neon DB + Inngest
                  → Submission Agent
                </>
              ),
            },
            {
              key: "l3",
              content: (
                <>
                  Submission Agent: IPFS fetch → Exa plagiarism check → Gemini
                  verdict → <code>earlySlashPublication</code> or{" "}
                  <code>pickReviewers</code>
                </>
              ),
            },
            {
              key: "l4",
              content: (
                <>
                  <code>pickReviewers</code> → Chainlink VRF →{" "}
                  <code>Agent_PickReviewers</code> → the same webhook +
                  projector pipeline → Review Agent
                </>
              ),
            },
            {
              key: "l5",
              content: (
                <>
                  Review Agent: LangGraph <code>interrupt()</code> while
                  reviewers sign EIP-712 payloads → consensus or escalation →{" "}
                  <code>publishPublication</code> /{" "}
                  <code>slashPublication</code>
                </>
              ),
            },
            {
              key: "l6",
              content: (
                <>
                  Settlement: rewards honest actors and/or slashes negligent
                  ones; pull payments credit internal balances on-chain — each
                  party calls <code>claim()</code> themselves
                </>
              ),
            },
          ]}
        />

        <hr className="my-14 border-border dark:border-white/10" />

        <h2 className={h2}>Incentives: making honesty the rational choice</h2>

        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          The economic mechanics aim for honest participation to be the dominant
          strategy inside a trust-minimised system — not by assuming
          participants are virtuous, but by making dishonesty costly in every
          scenario the contract can observe.
        </TypographyP>

        <OutcomesTable />

        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          <strong>
            Honesty is measured against the binding verdict, not the
            paper&apos;s outcome.
          </strong>{" "}
          When peer reviewers agree, both peers aligned with that verdict are
          rewarded; the senior is always credited as honest at settlement so
          their standby stake and reward settle cleanly. When peers conflict,
          the senior reviewer&apos;s verdict is binding: the matching peer is
          honest; the dissenting peer is negligent. The system is intentionally
          simple, with a clear limitation: a wrong or compromised senior
          reviewer gets the final word — the roadmap addresses this with
          weighted majority voting based on on-chain reputation.
        </TypographyP>

        <hr className="my-14 border-border dark:border-white/10" />

        <h2 className={h2}>Security as a first-class concern</h2>

        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          <strong>CEI pattern</strong> (Checks–Effects–Interactions) is applied
          consistently across external state-mutating functions in{" "}
          <code>BioVerifyV3</code>. OpenZeppelin <code>nonReentrant</code>{" "}
          additionally guards ETH-out paths: <code>claim</code> and{" "}
          <code>transferSlashPoolToTreasury</code>.
        </TypographyP>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          <strong>Pull payments.</strong> As described above, pushing ETH to
          every recipient in one transaction would concentrate griefing risk:
          the contract itself becomes the caller, and a single reverting{" "}
          <code>receive()</code> could deny service to the entire cohort.
          Crediting internal balances plus user-initiated <code>claim()</code>{" "}
          transfers isolates failure modes and caps settlement gas for the
          agent.
        </TypographyP>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          <strong>Contract test coverage.</strong> <code>BioVerifyV3</code>{" "}
          ships with full coverage in Foundry: 50 tests across 12 suites — 100%
          lines, statements, branches, and functions. VRF flows use{" "}
          <code>VRFCoordinatorV2_5Mock</code> with deterministic fulfillment
          overrides and log assertions, including edge cases such as colliding
          random words.
        </TypographyP>

        <hr className="my-14 border-border dark:border-white/10" />

        <h2 className={h2}>The pattern generalises</h2>

        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          Peer review is the domain BioVerify is grounded in, but the
          coordination pattern is not specific to science. The same problems
          show up wherever multiple <strong>mutually untrusting actors</strong>{" "}
          need a trust-minimised process, with verifiable selection,
          long-running human-in-the-loop steps, and on-chain settlement.
        </TypographyP>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          These are not claims I have validated — they are domains where I see
          the same structural ingredients (verifiable selection, long-lived
          HITL, on-chain settlement) and think the coordination pattern could
          apply:
        </TypographyP>
        <ul className={dashList}>
          <li>
            <strong>Legal arbitration</strong> — verifiable evidence submission,
            randomly selected arbitrators from a staked pool, durable multi-week
            deliberation, tamper-evident record of proceedings.
          </li>
          <li>
            <strong>Insurance claims</strong> — multi-assessor processing where
            each step needs an audit trail and assessors have economic skin in
            the game.
          </li>
          <li>
            <strong>DAO governance</strong> — proposal review with randomly
            drawn delegates, slashing for negligent voters, durable agent
            coordination across asynchronous human input.
          </li>
          <li>
            <strong>Supply chain compliance</strong> — multi-party certification
            workflows where documents need content-addressed storage and auditor
            selection needs to be bias-resistant.
          </li>
        </ul>

        <blockquote className="my-8 rounded-r-lg border-l-[3px] border-teal-500 bg-teal-500/10 py-5 pl-7 pr-7 font-[family-name:var(--font-serif)] text-lg italic leading-relaxed text-muted-foreground dark:border-[#2dd4bf] dark:bg-[rgba(45,212,191,0.1)]">
          Verifiable fairness, economic accountability, durable coordination —
          the throughline is always the same trio. BioVerify is one
          instantiation.
        </blockquote>

        <hr className="my-14 border-border dark:border-white/10" />

        <h2 className={h2}>What this build is, and what it is not</h2>

        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          BioVerify is a case study, not a finished product. The current build
          covers the optimistic happy paths. The hardening backlog and roadmap
          include:
        </TypographyP>
        <ul className={dashList}>
          <li>
            <strong>Author escalation path</strong> — today a plagiarism false
            positive from the submission agent (or a peer-review verdict the
            author believes is wrong) is terminal: settlement runs immediately
            and the author has no contractual recourse. The roadmap addresses
            this with an opt-in escalation: the author posts a larger escalation
            stake within a bounded window, which triggers a second review cycle
            restricted to humans only, drawn from a fresh VRF cohort that
            excludes the original reviewers. The second verdict is binding and
            reconciles the first — confirmed means an additional slash;
            overturned means prior rewards and slashes are reversed and
            recomputed.{" "}
            <strong>
              This implies that terminal settlement effects must be deferred or
              reversible until the escalation window closes.
            </strong>
          </li>
          <li>
            <strong>Weighted majority voting</strong> — replaces the
            single-senior-reviewer tie-break with reputation-weighted consensus,{" "}
            <strong>removing the single point of failure</strong>.
          </li>
          <li>
            <strong>ZK reputation via Reclaim Protocol</strong> — lets reviewers
            prove off-chain credentials (ORCID, h-index, institutional
            affiliation) without doxxing themselves,{" "}
            <strong>
              enabling credentialed review without exposing identity
            </strong>
            .
          </li>
          <li>
            <strong>
              Encrypted access (Lit Protocol) and monetisation (x402)
            </strong>{" "}
            — manuscript confidentiality during review; post-publication
            micropayment gate routing revenue to researchers,{" "}
            <strong>closing the privacy and monetisation gaps</strong>.
          </li>
          <li>
            <strong>Internal corpus + RAG (Neon + pgvector)</strong> — Exa
            handles general web plagiarism; an internal pgvector index compares
            submissions against BioVerify&apos;s own historical publications.
          </li>
          <li>
            <strong>Known edge cases</strong> — empty or malformed IPFS payloads
            can leave a publication stuck in <code>SUBMITTED</code>; a gas spike
            during settlement can strand a publication in <code>IN_REVIEW</code>{" "}
            with no retry. The README documents these at the file level,
            including specific nodes and commands affected.
          </li>
        </ul>

        <hr className="my-14 border-border dark:border-white/10" />

        <h2 className={h2}>Tech stack at a glance</h2>
        <ul className={dashList}>
          <li>
            <strong>Blockchain &amp; contracts</strong> — Foundry, Solidity,
            Chainlink VRF v2.5, EIP-712
          </li>
          <li>
            <strong>Infrastructure</strong> — Alchemy Notify (contract-scoped
            webhooks), Vercel serverless functions
          </li>
          <li>
            <strong>Agents &amp; orchestration</strong> — LangGraph (graph state
            + HITL interrupts), Inngest (durable step.run, retries, crash
            recovery)
          </li>
          <li>
            <strong>Data &amp; storage</strong> — Neon Postgres (CQRS read model
            + LangGraph checkpointer), Drizzle ORM, IPFS via Pinata
          </li>
          <li>
            <strong>LLM &amp; search</strong> — Gemini, Exa AI
          </li>
          <li>
            <strong>Frontend</strong> — Next.js, wagmi, viem, Reown AppKit,
            TanStack Query, TanStack Table, nuqs
          </li>
          <li>
            <strong>Schema validation</strong> — Zod
          </li>
        </ul>

        <hr className="my-14 border-border dark:border-white/10" />

        <h2 className={h2}>Closing</h2>

        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          What drew me into this build was the interplay between two layers with
          distinct responsibilities: the chain as the{" "}
          <strong>Truth layer</strong> — where stakes settle, agent-gated
          transitions execute, and VRF proofs are verified — and agents as the{" "}
          <strong>Orchestration layer</strong> — where multi-actor, multi-day
          workflows actually play out.
        </TypographyP>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          BioVerify is the case study I used to wire that idea end-to-end. The
          interesting work lives in the seams — between Inngest and LangGraph,
          between Alchemy webhooks and the OCC projector, between EIP-712
          signatures and on-chain settlement — and in the contract incentives
          themselves: tuning staking, rewards, and slashing so that long-running
          review cycles stay economically coherent over days. That is what I
          want to keep building.
        </TypographyP>
        <TypographyP className="mb-[1.6em] text-[17px] font-light leading-[1.8]">
          The contracts are deployed on Base Sepolia and Ethereum Sepolia, and
          the source is open.
        </TypographyP>

        <ArticleCta />
        <ArticleFooterLinks />
      </div>
    </>
  )
}
