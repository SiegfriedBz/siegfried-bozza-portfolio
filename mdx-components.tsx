import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import {
  Children,
  type ComponentProps,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { highlight } from "sugar-high";
import { MermaidBlock } from "@/app/_components/mermaid-block";
import { cn } from "@/lib/utils";

/** Turns a heading's text into a stable anchor id. */
const slugify = (node: ReactNode): string =>
  Children.toArray(node)
    .map((child) =>
      typeof child === "string" || typeof child === "number"
        ? String(child)
        : isValidElement<{ children?: ReactNode }>(child)
          ? slugify(child.props.children)
          : "",
    )
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const Heading =
  (Tag: "h2" | "h3") =>
  ({ children, ...rest }: ComponentProps<"h2">) => {
    const id = slugify(children);
    return (
      <Tag id={id} className="group scroll-mt-28" {...rest}>
        <a href={`#${id}`} className="no-underline">
          {children}
          <span
            aria-hidden
            className="ms-2 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
          >
            #
          </span>
        </a>
      </Tag>
    );
  };

type CodeProps = { className?: string; children?: ReactNode };

/** Fenced code: ```mermaid renders a diagram, anything else gets sugar-high highlighting. */
const Pre = ({ children, ...rest }: ComponentProps<"pre">) => {
  const code = Children.only(children) as ReactElement<CodeProps>;
  const language = code.props.className?.replace("language-", "") ?? "";
  const source = String(code.props.children ?? "").replace(/\n$/, "");

  if (language === "mermaid") {
    const id = `mdx-${source.length}-${source.slice(0, 24)}`;
    return (
      <figure className="not-prose my-8">
        <MermaidBlock definition={source} diagramId={id} />
      </figure>
    );
  }

  return (
    <div className="not-prose group relative my-6">
      {language ? (
        <span className="absolute right-3 top-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">
          {language}
        </span>
      ) : null}
      <pre
        {...rest}
        className="overflow-x-auto rounded-xl border border-border bg-[#0d1117] px-4 py-4 font-mono text-[13px] leading-relaxed text-slate-200"
      >
        <code
          // biome-ignore lint/security/noDangerouslySetInnerHtml: sugar-high escapes the source; content is our own MDX
          dangerouslySetInnerHTML={{ __html: highlight(source) }}
        />
      </pre>
    </div>
  );
};

const Anchor = ({ href = "", children, ...rest }: ComponentProps<"a">) => {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
};

const Table = (props: ComponentProps<"table">) => (
  <div className="my-6 overflow-x-auto">
    <table {...props} className="my-0" />
  </div>
);

/** Short summary box, placed right after an article's opening paragraph. */
export const TLDR = ({ children }: { children: ReactNode }) => (
  <aside className="not-prose my-8 rounded-xl border border-border border-l-[3px] border-l-accent-blue bg-muted/30 px-5 py-4">
    <p className="mb-2 font-mono text-xs font-medium text-accent-blue">TL;DR</p>
    <div className="text-sm leading-relaxed text-foreground/90 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.85em] [&_li]:my-1.5 [&_ul]:list-disc [&_ul]:ps-5 [&_ul]:marker:text-accent-blue">
      {children}
    </div>
  </aside>
);

/** Highlighted design rule or caveat. */
export const Callout = ({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) => (
  <aside className="not-prose my-8 rounded-xl border border-accent-blue/30 bg-accent-blue/5 px-5 py-4">
    {title ? (
      <p className="mb-2 font-semibold text-foreground">{title}</p>
    ) : null}
    <div className="text-sm leading-relaxed text-foreground/90 [&_a]:underline [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.85em] [&_p+p]:mt-3 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:ps-5">
      {children}
    </div>
  </aside>
);

const components: MDXComponents = {
  h2: Heading("h2"),
  h3: Heading("h3"),
  pre: Pre,
  a: Anchor,
  table: Table,
  img: ({ className, alt = "", ...rest }: ComponentProps<"img">) => (
    // biome-ignore lint/performance/noImgElement: MDX images are already sized assets
    <img
      alt={alt}
      className={cn("rounded-xl border border-border", className)}
      {...rest}
    />
  ),
  TLDR,
  Callout,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
