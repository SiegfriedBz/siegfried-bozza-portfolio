"use client";

import Link from "next/link";
import { type ComponentProps, type FC, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Menu items
const items = [
  {
    title: "Introduction",
    url: "#introduction",
  },
  {
    title: "Work Experience",
    url: "#work",
  },
  {
    title: "Featured Projects",
    url: "#projects",
  },
  {
    title: "Earlier Career",
    url: "#earlier",
  },
  {
    title: "Education",
    url: "#education",
  },
  {
    title: "Technical Skills",
    url: "#skills",
  },
  {
    title: "Short bio",
    url: "#bio",
  },
] as const;

const sectionIds = items.map((item) => item.url.slice(1));

type Props = ComponentProps<"ul">;

export const AboutSidebar: FC<Props> = (props) => {
  const { className, ...rest } = props;
  const [activeId, setActiveId] = useState("introduction");

  useEffect(() => {
    const validIds = new Set(sectionIds);

    const syncFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash && validIds.has(hash)) setActiveId(hash);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length === 0) return;

        const centerY = window.innerHeight / 2;
        const best = intersecting.reduce((a, b) => {
          const ar = a.boundingClientRect;
          const br = b.boundingClientRect;
          const aMid = ar.top + ar.height / 2;
          const bMid = br.top + br.height / 2;
          return Math.abs(aMid - centerY) <= Math.abs(bMid - centerY) ? a : b;
        });
        setActiveId(best.target.id);
      },
      { root: null, rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      observer.disconnect();
    };
  }, []);

  return (
    <ul
      {...rest}
      className={cn(
        "fixed top-1/2 -translate-y-1/2 left-4 pl-4 flex flex-col items-start gap-8",
        className,
      )}
    >
      {items.map((item) => {
        const id = item.url.slice(1);
        const isActive = activeId === id;

        return (
          <li key={item.title}>
            <Link
              href={item.url}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "block border-l-2 py-0.5 ps-3 text-sm font-medium transition-colors",
                isActive
                  ? "border-accent-blue text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {item.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
