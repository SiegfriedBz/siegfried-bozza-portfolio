import { RichText } from "@/app/_components/rich-text"

const ORIGIN =
  "I transitioned to software in **2022** — after an **M.Sc.** in Molecular Biology, an **M.Eng.** in Civil Engineering, three peer-reviewed publications, and roughly fifteen years across research and field engineering in **France**, **Canada**, and **Switzerland**."

const REALIZATION =
  "Two fields, one realization: in the lab, peer review was opaque — reviewer identities hidden, incentives misaligned. In the field, compliance depended on individual diligence, not systemic enforcement. Integrity was optional in both."

const WEB3_MOTIVATION =
  "That's what drew me to software, and eventually to **Web3** — not as speculation, but as infrastructure. A place where the audit trail doesn't belong to anyone and integrity is a property of the system, not a courtesy."

const CAREER =
  "I built the experience methodically: starting at Renuo AG (agency, Zurich), then freelance across Europe and Bali, and now as a full-stack engineer at Prismo.io — a production SaaS where I work daily with **Next.js**, **TypeScript**, **CQRS**, hexagonal architecture, **Supabase**, and test coverage (**Vitest** + **Cypress**)."

const PROJECTS =
  "Alongside that, I've shipped four end-to-end personal projects: three **Web3** DApps on Base and Ethereum Sepolia and one full-stack **Web2** auction platform. The most recent — **BioVerify** — treats peer review as a coordination game:"

const BIOVERIFY_BULLETS = [
  "Research artifacts content-addressed on **IPFS**",
  "Reviewer selection via **Chainlink VRF**",
  "Stakes, rewards, and slashes settled on-chain",
  "Multi-day human-in-the-loop review via **LangGraph** + **Inngest**, surviving serverless cold starts",
]

const PRODUCTION_SIGNALS =
  "Beyond Web3, I build and ship production systems daily — real-time backends, event-driven architecture, **Stripe** integrations, **i18n**."

const CLOSING =
  "Open to **remote** and **global relocation** — full-time or part-time — across Web2, Web3, and agentic systems. Wherever I land, I'll show up ready to build — and find a mountain or a wave on Sundays."

export const SelfIntro = () => {
  return (
    <div className="text-sm sm:text-base md:text-lg tracking-wider space-y-3">
      <div>
        <RichText text={ORIGIN} />
      </div>
      <div>
        <RichText text={REALIZATION} />
      </div>
      <div>
        <RichText text={WEB3_MOTIVATION} />
      </div>

      <hr className="my-4 border-border" />

      <div>
        <RichText text={CAREER} />
      </div>
      <div>
        <RichText text={PROJECTS} />
      </div>

      <ul className="list-outside list-disc space-y-2 ps-6 sm:ps-12">
        {BIOVERIFY_BULLETS.map((bullet) => (
          <li key={bullet}>
            <RichText text={bullet} />
          </li>
        ))}
      </ul>

      <div>
        <RichText text={PRODUCTION_SIGNALS} />
      </div>

      <hr className="my-4 border-border" />

      <div>
        <RichText text={CLOSING} />
      </div>
    </div>
  )
}