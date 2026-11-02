import type { FC, PropsWithChildren } from "react";
import {
  TooltipContent,
  TooltipTrigger,
  Tooltip as TTip,
} from "@/components/ui/tooltip";

type Props = {
  desc: string;
};

export const Tooltip: FC<PropsWithChildren<Props>> = (props) => {
  const { desc, children } = props;

  return (
    <TTip>
      {/* asChild: the child (a link) is the trigger, so no button is nested inside it. */}
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{desc}</p>
      </TooltipContent>
    </TTip>
  );
};
