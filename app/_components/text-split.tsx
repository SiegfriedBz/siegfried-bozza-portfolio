import { FC } from "react";

type Props = {
  text: string 
}

export const TextSplit: FC<Props> = (props) => {
  const { text } = props

  const formattedText = text.split('\n').map((line, i) => (
    <span key={i} className="inline-block mb-2">
      {line}
    </span>
  ));

  return <>{formattedText}</>;
}
