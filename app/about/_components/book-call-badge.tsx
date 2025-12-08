import { ChevronRightIcon, ClipboardClockIcon } from "lucide-react";
import type { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const BookCallBadge: FC = () => {
  return (
    <Badge
      variant="outline"
      className="
						group
						border border-accent-blue/50
						ps-3 py-1.5
						mb-4
						rounded-l-full rounded-r-full
						dark:bg-linear-to-r dark:from-accent-violet dark:to-transparent
					"
    >
      <span className="inline-flex items-center">
        <ClipboardClockIcon className="size-6 text-accent-blue" />
        <span className="text-base ms-4 me-3">Schedule a call</span>
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent rounded-full translate-x-1 cursor-pointer"
          asChild
        >
          <a
            href={process.env.NEXT_PUBLIC_CALENDLY_LINK ?? ""}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ChevronRightIcon className="size-4 font-extrabold group-hover:text-accent-blue" />
          </a>
        </Button>
      </span>
    </Badge>
  );
};
