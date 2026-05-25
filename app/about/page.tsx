import { SITE_NAME } from "@/app/_lib/site-metadata"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { EarthIcon } from "lucide-react"
import type { Metadata } from "next"
import { SiegAvatar } from "../_components/sieg-avatar"
import { TypographyH1 } from "../_components/typography/h1"
import { TypographyH2 } from "../_components/typography/h2"
import { TypographyH6 } from "../_components/typography/h6"
import { AboutSidebar } from "./_components/about-sidebar"
import { AllSkillsBadges } from "./_components/all-skills-badges"
import { BadgeExternalLinks } from "./_components/badge-external-links"
import { BookCallBadge } from "./_components/book-call-badge"
import { EarlierCareer } from "./_components/earlier-career"
import { Education } from "./_components/education"
import { FeaturedProjects } from "./_components/featured-projects"
import { SelfIntro } from "./_components/self-intro"
import { WorkXP } from "./_components/work-xp"

const ABOUT_TITLE = `About | ${SITE_NAME}`
const ABOUT_DESCRIPTION =
  "M.Sc. Molecular Biology · M.Eng. Civil Engineering · 2+ years pro software. BioVerify DeSci case study, Prismo full-stack, open to remote or global relocation."

export const metadata: Metadata = {
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    url: "/about",
  },
  twitter: {
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
  },
}

export default function Page() {
  return (
    <main className="w-full max-w-6xl mx-auto">
      <AboutSidebar className="max-sm:hidden" />

      <div className="sm:ml-32 lg:ml-48 2xl:ml-0 grid grid-cols-1 lg:grid-cols-5 lg:gap-x-8 xl:gap-x-16">
        <div className="max-sm:min-h-[60svh] gap-y-4 sm:gap-y-2 flex z-10 flex-col  justify-center items-center lg:fixed lg:left-48 min-[1135px]:left-54! min-[1285px]:left-64! lg:top-1/4 lg:-translate-y-1/4 lg:max-w-40 col-span-1">
          <SiegAvatar className="size-28 sm:size-32" />

          <div className="flex gap-x-3 items-center">
            <EarthIcon className="text-amber-500 size-5" />
            <TypographyH6 className="font-semibold">EU</TypographyH6>
          </div>

          <TypographyH6 className="font-semibold -mt-2">
            Open to global relocation
          </TypographyH6>

          <div className="flex gap-x-6">
            <Badge className="font-bold">French</Badge>
            <Badge className="font-bold">English</Badge>
          </div>
        </div>

        <div className="z-10 flex flex-col gap-2 items-center lg:items-start col-span-1 max-sm:mt-0 max-lg:mt-8 lg:col-span-4 lg:col-start-2">
          <div className="flex flex-col gap-y-12 max-sm:px-4 text-left w-full">
            <div
              id="introduction"
              className="scroll-mt-26 sm:scroll-mt-32 flex flex-col gap-2 items-center lg:items-start w-full"
            >
              <div className="max-sm:min-h-[32svh]">
                <div className="flex justify-center lg:justify-start">
                  <BookCallBadge />
                </div>

                <TypographyH1 className="my-2 max-[424px]:text-3xl sm:text-4xl md:text-5xl lg:text-left">
                  Siegfried Bozza
                </TypographyH1>
                <TypographyH2 className="text-center text-muted-foreground sm:text-xl md:text-2xl lg:text-3xl lg:text-left text-balance">
                  <span className="whitespace-nowrap">Full-stack engineer</span>{" "}
                  <span className="whitespace-nowrap">
                    <span aria-hidden="true">·</span> Web3
                  </span>{" "}
                  <span className="whitespace-nowrap">
                    <span aria-hidden="true">·</span> AI integrations
                  </span>
                </TypographyH2>
              </div>

              <p className="mt-1 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground sm:text-sm lg:text-left">
                Prior 15 years in molecular biology research and environmental
                engineering · building <span className="text-foreground">full-stack software since 2022</span>
              </p>

              <div className="mt-2 mb-4">
                <BadgeExternalLinks />
              </div>

              <p className="w-full text-left text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-1">
                From wet labs to Web3
              </p>

              <SelfIntro />
            </div>

            <div id={"work"} className="scroll-mt-24">
              <WorkXP />
            </div>

            <Separator className="-mt-2 hidden dark:inline-block dark:sm:hidden" />

            <div id={"projects"} className="scroll-mt-24">
              <FeaturedProjects />
            </div>

            <Separator className="-mt-2 hidden dark:inline-block dark:sm:hidden" />

            <div id="earlier" className="scroll-mt-24">
              <EarlierCareer />
            </div>

            <Separator className="-mt-2 hidden dark:inline-block dark:sm:hidden" />

            <div id={"education"} className="scroll-mt-24">
              <Education />
            </div>

            <Separator className="-mt-2 hidden dark:inline-block dark:sm:hidden" />

            <div id={"skills"} className="scroll-mt-24">
              <TypographyH2 className="font-extrabold">
                Technical Skills
              </TypographyH2>
              <AllSkillsBadges />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
