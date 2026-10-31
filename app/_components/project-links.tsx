import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, FC } from "react";
import type { IconType } from "react-icons/lib";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { cn } from "@/lib/utils";

type Base = {
  href: string;
  title: string;
  icon: LucideIcon | IconType;
  /** Prefix verb shown on lg+ screens. Defaults to "View". Pass null to suppress. */
  verb?: string | null;
};

type LinkT = (Base & { as: typeof Link }) | (Base & { as: "a" });

type Props = ComponentProps<typeof ButtonGroup> & {
  links: LinkT[];
  /** When true, the verb prefix is always visible. Defaults to false (responsive hide). */
  alwaysShowVerb?: boolean;
  /** Project name read after each label by screen readers, where cards repeat the same labels. */
  context?: string;
};

export const ProjectLinks: FC<Props> = (props) => {
  const {
    links = [],
    className,
    alwaysShowVerb = false,
    context,
    ...rest
  } = props;

  return (
    <ButtonGroup
      {...rest}
      // Below sm the buttons may wrap, so they stand apart instead of joining into
      // one bar (three of them don't fit a 360 px card on one line).
      className={cn(
        "max-sm:max-w-full max-sm:flex-wrap max-sm:gap-2 max-sm:[&>*:not(:first-child)]:rounded-l-md max-sm:[&>*:not(:first-child)]:border-l max-sm:[&>*:not(:last-child)]:rounded-r-md",
        className,
      )}
    >
      {links.map((link) => {
        const { href, title, icon, as, verb } = link;

        const As = as === "a" ? "a" : Link;
        const extraProps =
          as === "a"
            ? { target: "_blank", rel: "noopener noreferrer" }
            : undefined;

        const Icon = icon;
        // An aria-label rather than sr-only text: an absolutely positioned span would
        // escape the card's clipping and widen the page on narrow screens.
        const label = verb === null ? title : `${verb ?? "View"} ${title}`;

        return (
          <Button asChild variant={"outline"} key={href}>
            <As
              href={href}
              {...extraProps}
              aria-label={context ? `${label} (${context})` : undefined}
              className="group flex items-center gap-x-2"
            >
              <span className="text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200">
                {verb !== null ? (
                  <span
                    className={alwaysShowVerb ? "inline" : "hidden lg:inline"}
                  >
                    {verb ?? "View"}{" "}
                  </span>
                ) : null}
                <span className="font-semibold">{title}</span>
              </span>
              <Icon className="size-5 text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200" />
            </As>
          </Button>
        );
      })}
    </ButtonGroup>
  );
};
