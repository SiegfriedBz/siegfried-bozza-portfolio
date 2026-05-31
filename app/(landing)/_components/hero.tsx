"use client"

import { LightGlow } from "@/app/_components/light-glow"
import { CV_HREF } from "@/app/_constants/cv"
import { Button } from "@/components/ui/button"
import { ChevronRightIcon, FileDownIcon } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"
import { SiegAvatar } from "../../_components/sieg-avatar"
import { TypographyH1 } from "../../_components/typography/h1"

export const Hero = () => {
  return (
    <section className="relative flex min-h-svh flex-col items-center px-4 pb-6 pt-24 text-center animate-fade-in sm:pt-20 md:pb-12 md:pt-20 [@media(max-height:640px)]:pb-3 [@media(max-height:640px)]:pt-12 [@media(max-height:480px)]:pb-2 [@media(max-height:480px)]:pt-8">
      {/* Light glow behind the title */}
      <LightGlow />

      {/* Top: Featured work + eyebrow */}
      <motion.div className="flex min-h-0 w-full max-w-4xl flex-col items-center gap-3 text-center sm:gap-5 [@media(max-height:640px)]:gap-2">
        <Button
          variant={"outline"}
          asChild
          className="relative overflow-hidden border border-border bg-accent-glow/25 transition-all duration-300 hover:dark:shadow-sm hover:dark:shadow-accent-blue dark:border-accent-blue dark:bg-input/30 group"
        >
          <Link
            href="/projects"
            className="rounded-lg inline-flex justify-between items-center"
          >
            <span className="font-bold transition-all z-1 duration-300 dark:text-accent-blue group-hover:text-white dark:group-hover:text-background">
              Featured work
            </span>
            {/* sliding background layer */}
            <span className="absolute inset-0 z-0 -translate-x-full bg-accent-blue transition-transform duration-300 group-hover:translate-x-0" />
          </Link>
        </Button>

        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="relative z-10 text-sm font-semibold uppercase tracking-widest text-accent-blue"
        >
          Siegfried Bozza
        </motion.p>
      </motion.div>

      {/* Golden ratio spacer — minor (1) above H1 */}
      <div className="flex-1 min-h-1 sm:min-h-4" />

      {/* Middle: H1 + bio */}
      <motion.div className="flex w-full min-h-0 max-w-4xl flex-col items-center gap-3 text-center sm:gap-6 md:gap-10 [@media(max-height:640px)]:gap-2 [@media(max-height:480px)]:gap-1">
        <TypographyH1 className="z-10 -translate-y-0.5 max-[374px]:text-2xl text-3xl drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] sm:-translate-y-[3px] sm:text-4xl md:-translate-y-1 md:text-5xl lg:text-5xl xl:text-6xl">
          {"Full-Stack Engineer · Web3 & AI Agents"
            .split(" ")
            .map((word, index) => (
              <motion.span
                // biome-ignore lint/suspicious/noArrayIndexKey: static array
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                className="mx-1 inline-block sm:mx-2"
              >
                {word}
              </motion.span>
            ))}
        </TypographyH1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="relative z-10 mx-auto max-w-xl px-1 text-center text-sm font-normal leading-relaxed text-muted-foreground sm:max-w-2xl sm:text-sm md:text-base lg:text-lg [@media(max-height:640px)]:text-xs [@media(max-height:480px)]:max-w-md"
        >
          I have been building{" "}
          <span className="font-bold text-accent-foreground">
            software since 2022
          </span>,{" "}
          following fifteen years in molecular biology research
          (<span className="font-bold text-accent-foreground">M.Sc.</span>)
          {" "} and environmental engineering (<span className="font-bold text-accent-foreground">M.Eng.</span>){" "}
          across {" "}
          <span className="font-bold text-accent-foreground">Canada</span>,{" "}
          <span className="font-bold text-accent-foreground">France</span>,{" "}and {" "}
          <span className="font-bold text-accent-foreground">Switzerland</span>.
          {" "}

          Today I build{" "}
          <span className="font-bold text-accent-foreground">
            production Web2 systems
          </span>
          ,{" "}
          <span className="font-bold text-accent-foreground">
            decentralized applications
          </span>
          , and{" "}
          <span className="font-bold text-accent-foreground">
            agentic backends
          </span>{" "}
          — mainly with{" "}
          <span className="font-bold text-accent-foreground">
            Next.js
          </span>,{" "}
          <span className="font-bold text-accent-foreground">
            TypeScript
          </span>,{" "}
          <span className="font-bold text-accent-foreground">
            Supabase
          </span>,{" "}
          <span className="font-bold text-accent-foreground">
            Foundry
          </span>,{" "}
          <span className="font-bold text-accent-foreground">
            Solidity
          </span>,{" "}
          <span className="font-bold text-accent-foreground">
            Chainlink
          </span>,{" "} and {" "}
          <span className="font-bold text-accent-foreground">
            LangGraph
          </span>.


        </motion.p>
      </motion.div>

      {/* Golden ratio spacer — major (φ) below H1 */}
      <div className="flex-[1.618] min-h-2 sm:min-h-6 md:min-h-8" />

      {/* Bottom: relocation pill + About */}
      <motion.div className="flex flex-col items-center gap-3 sm:gap-8 [@media(max-height:640px)]:gap-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.0 }}
          className="relative z-10 inline-block max-w-lg rounded-full border border-accent-blue/40 bg-accent-blue/10 px-4 py-1.5 text-center text-xs font-medium text-accent-blue sm:max-w-none sm:text-sm [@media(max-height:480px)]:py-1"
        >
          <span>
            Open to remote roles or <span className="font-bold">global</span>{" "}
            relocation
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.2 }}
          className="relative z-10 flex shrink-0 flex-nowrap items-center justify-center gap-4"
        >
          <Button
            asChild
            className="group shadow-lg transition-transform duration-300 transform hover:scale-x-105"
            variant={"outline"}
          >
            <Link
              href="/about"
              className="relative rounded-lg inline-flex items-center justify-center gap-2 min-[425px]:justify-between"
            >
              <SiegAvatar className="size-6 ml-0" />
              <span className="mr-0 min-[425px]:mr-2">
                About
                <span className="max-[424px]:hidden"> me</span>
              </span>
              <ChevronRightIcon className="absolute right-0.5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          </Button>

          <Button
            asChild
            className="group shadow-lg transition-transform duration-300 transform hover:scale-x-105"
            variant={"outline"}
          >
            <a
              href={CV_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg inline-flex justify-between items-center gap-2"
            >
              <FileDownIcon className="size-4" />
              <span>
                <span className="max-[424px]:hidden">Download </span>CV
              </span>
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
