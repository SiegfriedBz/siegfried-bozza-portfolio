import { RichText } from "@/app/_components/rich-text";

const ORIGIN =
  "I transitioned to software in **2022**, after an **M.Sc.** in Molecular Biology, an **M.Eng.** in Civil Engineering, three peer-reviewed publications, and roughly fifteen years across research and field engineering in **France**, **Canada**, and **Switzerland**.";

const REALIZATION =
  "Two fields, one realization. In the lab, peer review was opaque: reviewer identities hidden, incentives misaligned. In the field, compliance depended on individual diligence, not systemic enforcement. Integrity was optional in both.";

const WEB3_MOTIVATION =
  "That's what drew me to software, and eventually to **Web3**, as infrastructure rather than speculation: a place where the audit trail doesn't belong to anyone and integrity is a property of the system, not a courtesy.";

const CAREER =
  "I started at Renuo AG (agency, Zurich), then freelanced remotely from France and Bali, including [11 merged PRs](https://github.com/DeXter-on-Radix/website/pulls?q=is%3Apr+author%3ASiegfriedBz+is%3Amerged) to the DeXter-on-Radix DEX. Since 2024 I've been a full-stack engineer at Prismo.io, a production SaaS where I work daily with **Next.js**, **TypeScript**, **Supabase**, CQRS and hexagonal architecture, with **Vitest** and **Cypress** gating merges.";

const PROJECTS =
  "On my own time I build Web3 systems end to end, mostly the off-chain half that smart contracts depend on:";

const PROJECT_BULLETS = [
  "**VeriSci**: open reproducibility-readiness ratings for life-science papers: records on the **OriginTrail DKG**, scores on-chain, and every write safe to retry",
  "**Wallet Watcher**: a custody-backend slice: HD wallets, an append-only ledger and exactly-once withdrawals with **viem**",
  "**BioVerify**: peer review as a coordination game: **Chainlink VRF** reviewer selection, on-chain stakes and slashes, and multi-day human-in-the-loop agents (**LangGraph** + **Inngest**)",
  "Smaller studies: **Bet2Gether** (Chainlink-settled prediction market), **Forge** (atomic ERC-1155 crafting) and **GavL** (real-time auctions with Supabase and Stripe)",
];

const CLOSING =
  "I'm looking for a **full-time remote** role on a Web3 or DeSci team, and I'm open to relocating. I'm used to async work across time zones. Wherever I land, I'll show up ready to build, and find a mountain or a wave on Sundays.";

export const SelfIntro = () => {
  return (
    <div className="max-w-[68ch] text-base leading-relaxed md:text-lg space-y-4">
      <p>
        <RichText text={ORIGIN} />
      </p>
      <p>
        <RichText text={REALIZATION} />
      </p>
      <p>
        <RichText text={WEB3_MOTIVATION} />
      </p>

      <hr className="my-4 border-border" />

      <p>
        <RichText text={CAREER} />
      </p>
      <p>
        <RichText text={PROJECTS} />
      </p>

      <ul className="list-outside list-disc space-y-2 ps-6 sm:ps-12">
        {PROJECT_BULLETS.map((bullet) => (
          <li key={bullet}>
            <RichText text={bullet} />
          </li>
        ))}
      </ul>

      <hr className="my-4 border-border" />

      <p>
        <RichText text={CLOSING} />
      </p>
    </div>
  );
};
