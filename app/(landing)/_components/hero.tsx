"use client";

import {
  ArrowUpRightIcon,
  CalendarClockIcon,
  ChevronRightIcon,
  FileDownIcon,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import type { FC } from "react";
import { LightGlow } from "@/app/_components/light-glow";
import { CV_HREF } from "@/app/_constants/cv";
import { PROFILE_LINKS } from "@/app/_constants/links";
import {
  AVAILABILITY,
  BACKGROUND,
  CORE_STACK,
  PITCH,
  ROLE,
} from "@/app/_lib/site-metadata";
import { Button } from "@/components/ui/button";
import { SiegAvatar } from "../../_components/sieg-avatar";
import { TypographyH1 } from "../../_components/typography/h1";

export type HeroProof = {
  slug: string;
  name: string;
  pitch: string;
  period: string;
  href: string;
};

type Props = {
  proof: HeroProof[];
};

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay },
});

export const Hero: FC<Props> = ({ proof }) => {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center gap-6 px-4 pb-10 pt-28 text-center sm:gap-8 sm:pt-28 md:pt-24">
      <LightGlow />

      {/* Who + what */}
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-4 sm:gap-5">
        <motion.p
          {...fadeIn(0)}
          className="text-sm font-semibold uppercase tracking-widest text-accent-blue"
        >
          Siegfried Bozza
        </motion.p>

        <TypographyH1 className="text-balance max-[374px]:text-3xl text-4xl drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] sm:text-5xl xl:text-6xl">
          {ROLE.split(" ").map((word, index) => (
            // A real space after each word: inline-block spans alone read as one glued word.
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
              {word}{" "}
            </motion.span>
          ))}
        </TypographyH1>

        <motion.p
          {...fadeIn(0.4)}
          className="max-w-2xl text-pretty text-base leading-relaxed text-foreground/85 sm:text-lg md:text-xl"
        >
          {PITCH}
        </motion.p>

        <motion.ul
          {...fadeIn(0.5)}
          className="flex flex-wrap items-center justify-center gap-2"
          aria-label="Core stack"
        >
          {CORE_STACK.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-border bg-background/60 px-2.5 py-1 font-mono text-xs text-muted-foreground"
            >
              {tech}
            </li>
          ))}
        </motion.ul>

        <motion.p
          {...fadeIn(0.6)}
          className="max-w-xl text-pretty text-xs leading-relaxed text-muted-foreground sm:text-sm"
        >
          {BACKGROUND}
        </motion.p>
      </div>

      {/* Proof, above the fold */}
      {proof.length > 0 ? (
        <motion.ul
          {...fadeIn(0.75)}
          className="relative z-10 grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3"
          aria-label="Recent work"
        >
          {proof.map((p) => (
            <li key={p.slug}>
              <Link
                href={p.href}
                className="group flex h-full flex-col gap-1 rounded-xl border border-border bg-background/70 p-4 text-left backdrop-blur-sm transition-colors hover:border-accent-blue"
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="font-bold">{p.name}</span>
                  <ArrowUpRightIcon className="size-4 text-muted-foreground transition-colors group-hover:text-accent-blue" />
                </span>
                <span className="text-sm leading-snug text-muted-foreground">
                  {p.pitch}
                </span>
                <span className="mt-auto pt-1 font-mono text-[11px] text-muted-foreground/80">
                  {p.period}
                </span>
              </Link>
            </li>
          ))}
        </motion.ul>
      ) : null}

      {/* Availability + calls to action */}
      <motion.div
        {...fadeIn(0.9)}
        className="relative z-10 flex flex-col items-center gap-4"
      >
        <div className="max-w-3xl rounded-full border border-accent-blue/40 bg-accent-blue/10 px-4 py-1.5 text-xs font-medium text-accent-blue sm:text-sm">
          <span className="font-bold">{AVAILABILITY.headline}</span>
          <span className="max-sm:hidden"> · {AVAILABILITY.detail}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            className="group shadow-lg transition-transform duration-300 hover:scale-x-105"
            variant="outline"
          >
            <Link
              href="/about"
              className="relative inline-flex items-center gap-2 rounded-lg"
            >
              <SiegAvatar className="ml-0 size-6" />
              <span>About me</span>
              <ChevronRightIcon className="size-4 opacity-60 transition-opacity group-hover:opacity-100" />
            </Link>
          </Button>

          <Button
            asChild
            className="shadow-lg transition-transform duration-300 hover:scale-x-105"
            variant="outline"
          >
            <a
              href={CV_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg"
            >
              <FileDownIcon className="size-4" />
              <span>CV</span>
            </a>
          </Button>

          <Button
            asChild
            className="shadow-lg transition-transform duration-300 hover:scale-x-105"
            variant="outline"
          >
            <a
              href={PROFILE_LINKS.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg"
            >
              <CalendarClockIcon className="size-4 text-accent-blue" />
              <span>Book a call</span>
            </a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
};
