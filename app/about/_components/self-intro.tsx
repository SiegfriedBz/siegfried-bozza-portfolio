import { RichText } from "@/app/_components/rich-text";

const ORIGIN =
  "I transitioned to software in **2022**, after an **M.Sc.** in Molecular Biology, an **M.Eng.** in Civil Engineering, three peer-reviewed publications, and roughly fifteen years across research and field engineering in **France**, **Canada**, and **Switzerland**.";

const REALIZATION =
  "Research and engineering showed me the same problem. In the lab, peer review was opaque: reviewers stayed anonymous and their incentives didn't match the work. In the field, compliance depended on each person's diligence. Neither system enforced integrity.";

const WEB3_MOTIVATION =
  "That's what drew me to software, and later to **Web3**. I'm interested in it as infrastructure: an audit trail that no single party owns, and rules that hold because the system enforces them.";

const CAREER =
  "I started at Renuo AG (agency, Zurich), then spent a year studying full-stack and Web3 development while travelling in France, Vietnam and Indonesia. Since August 2024 I've been a full-stack engineer at Prismo.io, a production SaaS. I work daily with **Next.js**, **TypeScript**, **Supabase**, CQRS and hexagonal architecture, and **Vitest** and **Cypress** tests have to pass before anything merges.";

const PROJECTS =
  "On my own time I build Web3 projects end to end, on testnets so far. Most of the work goes into the backend around the contracts:";

const PROJECT_BULLETS = [
  "**VeriSci**: open reproducibility-readiness ratings for life-science papers: records on the **OriginTrail DKG**, scores on Base Sepolia, and every write safe to retry",
  "**Wallet Watcher**: a custody-backend slice: HD wallets, an append-only ledger and each withdrawal booked once from its receipt, with **viem**",
  "**BioVerify**: peer review as a coordination game: **Chainlink VRF** reviewer selection, on-chain stakes and slashes, and agents that pause for days of human review (**LangGraph**, with **Inngest** retries)",
  "Smaller studies: **Bet2Gether** (prediction market resolved by Chainlink Automation), **Forge** (atomic ERC-1155 crafting) and **GavL** (auctions with Supabase and Stripe)",
];

const CLOSING =
  "I'm looking for a **full-time** role on a Web3 or DeSci team. I'd happily **relocate** for it, to Asia-Pacific most of all. **Remote** works for me too.";

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
