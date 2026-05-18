import { BIOVERIFY_LINKS } from "@/app/_constants/projects";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { FC } from "react";

const LINKEDIN = process.env.NEXT_PUBLIC_LINKEDIN ?? "";

const BASE_SEPOLIA =
  "https://sepolia.basescan.org/address/0x76654c2cdadcf869e78928f0785797b6be20f11b";
const ETH_SEPOLIA =
  "https://sepolia.etherscan.io/address/0x7d52170db31be4ab3d0166fbba937a031dc6e1ff";

type Props = {
  className?: string;
};

export const ArticleFooterLinks: FC<Props> = (props) => {
  const { className } = props;

  const BIOVERIFY_LIVE = BIOVERIFY_LINKS.live;
  const BIOVERIFY_GITHUB = BIOVERIFY_LINKS.github;
  const architecture = BIOVERIFY_LINKS.architectureDoc ?? "";

  const links = [
    BIOVERIFY_LIVE ? { href: BIOVERIFY_LIVE, label: "Live demo" } : null,
    BIOVERIFY_GITHUB ? { href: BIOVERIFY_GITHUB, label: "Source" } : null,
    LINKEDIN ? { href: LINKEDIN, label: "LinkedIn" } : null,
    architecture ? { href: architecture, label: "Full architecture" } : null,
    { href: BASE_SEPOLIA, label: "Base Sepolia" },
    { href: ETH_SEPOLIA, label: "Ethereum Sepolia" },
  ].filter((item): item is { href: string; label: string } => item !== null);

  return (
    <nav
      className={cn(
        "mt-16 flex flex-wrap gap-3 border-t border-border pt-8 dark:border-white/10",
        className,
      )}
      aria-label="Article links"
    >
      {links.map((item) => (
        <Link
          key={`${item.label}-${item.href}`}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-teal-700/35 px-4 py-2 font-mono text-xs uppercase tracking-wide text-teal-700 transition-colors hover:bg-teal-500/10 dark:border-[#1a7a6e] dark:text-[#2dd4bf] dark:hover:bg-[rgba(45,212,191,0.1)]"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
