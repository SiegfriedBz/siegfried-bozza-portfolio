import Link from "next/link";
import type { ComponentProps, FC } from "react";
import { cn } from "@/lib/utils";

// Menu items
const items = [
  {
    title: "Introduction",
    url: "#introduction",
  },
  {
    title: "Work Expericence",
    url: "#work",
  },
  {
    title: "Education",
    url: "#education",
  },
  {
    title: "Skills",
    url: "#skills",
  },
];

type Props = ComponentProps<"ul">;

export const AboutSidebar: FC<Props> = (props) => {
  const { className, ...rest } = props;

  return (
    <ul
      {...rest}
      className={cn(
        "fixed top-1/2 -translate-y-1/2 left-4 pl-4 flex flex-col items-start gap-8",
        className,
      )}
    >
      {items.map((item) => {
        return (
          <li key={item.title} className="font-bold">
            <Link href={item.url}>- {item.title}</Link>
          </li>
        );
      })}
    </ul>
  );
};
