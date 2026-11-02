import type { FC } from "react";

type Props = {
  /** Schema.org nodes for this page, emitted as one `@graph`. */
  nodes: Record<string, unknown>[];
};

/**
 * JSON-LD for the current page. `<` is escaped so no content string can close the
 * script tag early.
 */
export const JsonLd: FC<Props> = ({ nodes }) => {
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": nodes,
  }).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: serialized JSON with `<` escaped
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
};
