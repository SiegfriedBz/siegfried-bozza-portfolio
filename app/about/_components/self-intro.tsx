import { RichText } from "@/app/_components/rich-text";

const LEAD_1 =
  "An **M.Sc.** in Molecular Biology and an **M.Eng.** in Civil / Environmental Engineering — both earned in **France**, with three peer-reviewed publications and roughly fifteen years across research and field engineering in **France**, **Canada**, and **Switzerland** — before transitioning to software four years ago. In the lab, peer review was opaque — reviewer identities hidden, conflicts undisclosed. In the field, compliance depended on individual diligence, not systemic enforcement. Two fields, one realization: in traditional systems, integrity is optional — a choice left to individuals.";

const LEAD_2 =
  "I started coding **four years ago**, and blockchain was what made it click — not as speculation, but as infrastructure. A place where the audit trail doesn't belong to anyone and integrity is a property of the system, not a courtesy. I learned **Web2** properly first, then deepened into **Web3** across multiple projects, and recently built BioVerify as a case study: a **full-stack agentic DApp** that treats peer review as a **coordination game** and addresses three core failures:";

const BULLETS = [
  "**Integrity:** Research artifacts content-addressed on **IPFS**.",
  "**Fairness:** Reviewer selection via **Chainlink VRF**.",
  "**Incentives:** Stakes, rewards, and slashes settled on-chain.",
];

const OUTRO =
  "The thing I couldn't build when I was in the lab.\nI'm based in France, **open to remote roles or global relocation**. Wherever I land, I'll show up ready to build — and I'll find a mountain or a wave on Sundays.";

export const SelfIntro = () => {
  return (
    <div className="text-sm sm:text-base md:text-lg tracking-wider space-y-3">
      <div>
        <RichText text={LEAD_1} />
      </div>
      <div>
        <RichText text={LEAD_2} />
      </div>

      <ul className="list-outside list-disc space-y-2 ps-6 sm:ps-12">
        {BULLETS.map((bullet) => (
          <li key={bullet}>
            <RichText text={bullet} />
          </li>
        ))}
      </ul>

      <div>
        <RichText text={OUTRO} />
      </div>
    </div>
  );
};
