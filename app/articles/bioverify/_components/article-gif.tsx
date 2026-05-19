import { cn } from "@/lib/utils";
import Image from "next/image";
import type { FC, ReactNode } from "react";

type Props = {
  src: string;
  alt: string;
  label: string;
  caption: ReactNode;
  className?: string;
  priority?: boolean;
};

export const ArticleGif: FC<Props> = (props) => {
  const { src, alt, label, caption, className, priority = false } = props;

  return (
    <figure
      className={cn(
        "my-12 -mx-4 overflow-hidden rounded-2xl border border-border bg-muted/20 p-6 sm:-mx-4 dark:border-[rgba(139,148,158,0.3)] dark:bg-[#161b22] sm:p-8",
        className,
      )}
    >
      <div className="mb-5 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        <span
          className="inline-block h-px w-5 bg-teal-500 dark:bg-[#2dd4bf]"
          aria-hidden
        />
        {label}
      </div>
      <div className="overflow-hidden rounded-lg border border-border/60">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={675}
          className="h-auto w-full"
          unoptimized
          {...(priority ? { priority: true } : { loading: "lazy" })}
        />
      </div>
      <figcaption className="mt-4 px-4 text-center font-[family-name:var(--font-serif)] text-sm italic leading-relaxed text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
};
