import {
  ArrowUpRightIcon,
  CalendarClockIcon,
  FileDownIcon,
} from "lucide-react";
import Link from "next/link";
import type { CSSProperties, FC } from "react";
import { LightGlow } from "@/app/_components/light-glow";
import { SiegAvatar } from "@/app/_components/sieg-avatar";
import { CV_HREF } from "@/app/_constants/cv";
import { PROFILE_LINKS } from "@/app/_constants/links";
import {
  AVAILABILITY,
  CORE_STACK,
  PITCH,
  ROLE,
} from "@/app/_lib/site-metadata";
import { Button } from "@/components/ui/button";

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

/**
 * Left: who, what, how to reach him. Right: three projects as proof. On mobile the CTAs
 * come before the proof so they stay in the first screen.
 */
export const Hero: FC<Props> = ({ proof }) => {
  return (
    <section className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pb-16 pt-24 text-left lg:min-h-dvh lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
      <LightGlow className="-left-1/4 right-1/4" />

      <div className="relative z-10 flex flex-col gap-6">
        <p className="font-mono text-sm text-accent-blue">Siegfried Bozza</p>

        <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          {ROLE.split(" ").map((word, index, all) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: static words
              key={index}
              className="hero-word"
              style={{ "--i": index } as CSSProperties}
            >
              {word}
              {index < all.length - 1 ? "\u00a0" : null}
            </span>
          ))}
        </h1>

        <p className="max-w-[58ch] text-pretty text-lg leading-relaxed text-foreground/80">
          {PITCH}
        </p>

        <ul className="flex flex-wrap gap-2" aria-label="Core stack">
          {CORE_STACK.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div
          className="hero-reveal flex flex-col gap-4"
          style={{ "--delay": "200ms" } as CSSProperties}
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a
                href={PROFILE_LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CalendarClockIcon className="size-4" />
                Book a call
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/about">
                <SiegAvatar className="size-5" />
                About me
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <a href={CV_HREF} target="_blank" rel="noopener noreferrer">
                <FileDownIcon className="size-4" />
                CV
              </a>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {AVAILABILITY.headline}.
            </span>{" "}
            {AVAILABILITY.detail}
          </p>
        </div>
      </div>

      {proof.length > 0 ? (
        <div
          className="hero-reveal relative z-10"
          style={{ "--delay": "350ms" } as CSSProperties}
        >
          <h2 className="mb-3 text-sm font-medium text-muted-foreground">
            Recent work
          </h2>
          <ul className="flex flex-col gap-3">
            {proof.map((p) => (
              <li key={p.slug}>
                <Link
                  href={p.href}
                  className="group flex items-start justify-between gap-4 rounded-xl border border-border bg-background/70 p-4 backdrop-blur-sm transition-colors hover:border-accent-blue active:translate-y-px"
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold">{p.name}</h3>
                    <p className="text-sm leading-snug text-muted-foreground">
                      {p.pitch}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground/80">
                      {p.period}
                    </p>
                  </div>
                  <ArrowUpRightIcon className="mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent-blue" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
};
