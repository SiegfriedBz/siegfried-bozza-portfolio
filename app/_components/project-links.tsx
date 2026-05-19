import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, FC } from "react";
import type { IconType } from "react-icons/lib";

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
};

export const ProjectLinks: FC<Props> = (props) => {
  const { links = [], className, alwaysShowVerb = false, ...rest } = props;

  return (
    <ButtonGroup {...rest} className={className}>
      {links.map((link) => {
        const { href, title, icon, as, verb } = link;

        const As = as === "a" ? "a" : Link;
        const extraProps =
          as === "a"
            ? { target: "_blank", rel: "noopener noreferrer" }
            : undefined;

        const Icon = icon;

        return (
          <Button asChild variant={"outline"} key={href}>
            <As
              href={href}
              {...extraProps}
              className="group flex items-center gap-x-2"
            >
              <span className="text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200">
                {verb !== null ? (
                  <span
                    className={
                      alwaysShowVerb
                        ? "inline"
                        : "max-[380px]:hidden sm:hidden lg:inline"
                    }
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
