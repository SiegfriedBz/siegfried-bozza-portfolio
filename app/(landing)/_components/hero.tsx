"use client";

import { ChevronRightIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { LightGlow } from "@/app/_components/light-glow";
import { Button } from "@/components/ui/button";
import { SiegAvatar } from "../../_components/sieg-avatar";
import { TypographyH1 } from "../../_components/typography/h1";

export const Hero = () => {
  return (
    <section
      className="relative 
				flex flex-col items-center justify-center text-center 
        pt-20 lg:pt-32 xl:pt-12 px-4 overflow-hidden
        min-h-svh
        animate-fade-in
      "
    >
      {/* Light glow behind the title */}
      <LightGlow />

      <Button
        asChild
        className="relative 
					overflow-hidden 
					border 
					bg-background 
					dark:bg-input/30 
					border-border dark:border-accent-blue
					group mb-8 shadow-lg 
					
					transition-all duration-300
					hover:dark:shadow-sm
					hover:dark:shadow-accent-blue
				"
      >
        <Link
          href="/projects"
          className="rounded-lg inline-flex justify-between items-center"
        >
          <span
            className="font-bold 
						text-accent-blue
						group-hover:text-white
						dark:group-hover:text-background 
						transition-all z-1 duration-300
					"
          >
            Featured work
          </span>
          {/* sliding background layer */}
          <span
            className="absolute 
							inset-0 
							bg-accent-blue
							-translate-x-full
							group-hover:translate-x-0
							transition-transform duration-300
							z-0
						"
          />
        </Link>
      </Button>

      <TypographyH1
        className="z-10 

					drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]
				"
      >
        {"From Biology & Engineering to JavaScript Web Development."
          .split(" ")
          .map((word, index) => (
            <motion.span
              // biome-ignore lint/suspicious/noArrayIndexKey: static
              key={index}
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              className="mx-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
      </TypographyH1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.8 }}
        className="relative mt-2 z-10 mx-auto max-w-xl pt-4 text-center text-lg md:text-xl font-normal text-muted-foreground"
      >
        I&apos;m <span className="font-bold">Siegfried</span>, I build clean,
        efficient user experiences with{" "}
        <span className="font-bold text-accent-foreground">React</span> and{" "}
        <span className="font-bold text-accent-foreground">Next.js</span>. After
        hours, I build my own projects and{" "}
        <span className="font-bold text-accent-foreground opacity-75">
          Web3
        </span>{" "}
        is a growing curiosity.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
        className="relative z-10 mt-8 lg:mt-12 flex flex-wrap items-center justify-center gap-4"
      >
        <Button
          asChild
          className="group shadow-lg transition-transform duration-300 transform hover:scale-x-105"
          variant={"outline"}
        >
          <Link
            href="/about"
            className="rounded-lg inline-flex justify-between items-center"
          >
            <SiegAvatar className="size-6 -ml-2" />
            <span className="mr-2">About - Siegfried Bozza</span>
            <ChevronRightIcon className="absolute right-0.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </Button>
      </motion.div>
    </section>
  );
};
