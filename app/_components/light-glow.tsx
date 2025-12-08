import type { ComponentProps, FC } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"div">;

export const LightGlow: FC<Props> = (props) => {
  const { className, ...rest } = props;

  return (
    <div
      {...rest}
      className={cn(
        "absolute inset-0 -top-54 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_center,var(--accent-violet),transparent_60%)]",
        className,
      )}
    />
  );
};
