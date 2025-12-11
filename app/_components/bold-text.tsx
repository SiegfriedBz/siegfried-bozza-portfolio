import type { FC } from "react";

type Props = {
  text: string;
};

export const BoldText: FC<Props> = (props) => {
  const { text } = props;

  const segments = text.split(/(\*\*[^*]+?\*\*)/g); // Split but keep **...** as separate segments

  return (
    <span>
      {segments.map((segment, i) =>
        segment.startsWith("**") && segment.endsWith("**") ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: static
          <strong key={i}>{segment.slice(2, -2)}</strong>
        ) : (
          // biome-ignore lint/suspicious/noArrayIndexKey: static
          <span key={i}>{segment}</span>
        ),
      )}
    </span>
  );
};
