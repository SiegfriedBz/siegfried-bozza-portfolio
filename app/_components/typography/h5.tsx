import type { ComponentProps, FC, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"p">;

export const TypographyH5: FC<PropsWithChildren<Props>> = (props) => {
  const { className, children, ...rest } = props;

  return (
    // Rendered as <p>: used for body text and labels, not as section headings.
    <p
      {...rest}
      className={cn("text-sm sm:text-base md:text-lg tracking-wide", className)}
    >
      {children}
    </p>
  );
};
