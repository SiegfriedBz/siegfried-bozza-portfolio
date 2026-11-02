import { type FC, Fragment, type ReactNode } from "react";

type Props = {
  text: string;
};

const INLINE_PATTERN = /(\*\*[^*]+?\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
const LINK_PATTERN = /^\[([^\]]+)\]\(([^)]+)\)$/;

function renderInlineSegment(segment: string, key: string): ReactNode {
  if (segment.startsWith("**") && segment.endsWith("**")) {
    return <strong key={key}>{segment.slice(2, -2)}</strong>;
  }

  // Inline code, styled like the articles' (post-prose.css)
  if (segment.length > 2 && segment.startsWith("`") && segment.endsWith("`")) {
    return (
      <code
        key={key}
        className="rounded-md bg-muted/85 px-[0.35em] py-[0.1em] font-mono text-[0.875em] font-medium"
      >
        {segment.slice(1, -1)}
      </code>
    );
  }

  const linkMatch = LINK_PATTERN.exec(segment);
  if (linkMatch) {
    const [, label, href] = linkMatch;
    return (
      <a
        key={key}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-blue underline underline-offset-2 hover:text-accent-foreground dark:hover:text-white"
      >
        {label}
      </a>
    );
  }

  return <span key={key}>{segment}</span>;
}

export const RichText: FC<Props> = ({ text }) => (
  <>
    {text.split("\n").map((line, li) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: static CMS strings
      <Fragment key={li}>
        {/* A real newline between lines: block spans alone read as one run-on sentence to text extractors. */}
        {li > 0 ? "\n" : null}
        <span className="mb-2 block last:mb-0">
          {line
            .split(INLINE_PATTERN)
            .map((segment, si) =>
              segment ? renderInlineSegment(segment, `${li}-${si}`) : null,
            )}
        </span>
      </Fragment>
    ))}
  </>
);
