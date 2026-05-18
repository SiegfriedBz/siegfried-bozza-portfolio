import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ClipboardClockIcon } from "lucide-react";
import type { FC } from "react";

export const BookCallBadge: FC = () => {
  const calendly = process.env.NEXT_PUBLIC_CALENDLY_LINK?.trim() ?? "";

  if (!calendly) {
    return null;
  }

  return (
    <Badge
      variant="outline"
      className="group border border-accent-blue/50 ps-2 py-1 mb-3 rounded-l-full rounded-r-full dark:bg-linear-to-r dark:from-accent-glow dark:to-transparent min-[425px]:ps-3 min-[425px]:py-1.5 min-[425px]:mb-4"
    >
      <span className="inline-flex items-center">
        <ClipboardClockIcon className="size-4 text-accent-blue min-[425px]:size-6" />
        <span className="ms-3 me-2 text-sm min-[425px]:ms-4 min-[425px]:me-3 min-[425px]:text-base">
          Schedule a call
        </span>
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent rounded-full translate-x-1 cursor-pointer"
          asChild
        >
          <a href={calendly} target="_blank" rel="noopener noreferrer">
            <ChevronRightIcon className="size-4 font-extrabold group-hover:text-accent-blue" />
          </a>
        </Button>
      </span>
    </Badge>
  );
};
