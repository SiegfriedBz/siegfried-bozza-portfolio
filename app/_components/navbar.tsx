import { CircleUserRoundIcon, Grid2x2Icon, HouseIcon } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { ToggleThemeButton } from "./toggle-theme-button";

export const Navbar: FC = () => {
  return (
    <div className="fixed z-999 top-8 left-1/2 -translate-x-1/2 flex gap-8 bg-background rounded-l-full rounded-r-full">
      <ButtonGroup>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full p-2 cursor-pointer"
          asChild
        >
          <Link href="/">
            <span className="inline-flex justify-between items-center rounded-full bg-muted p-1">
              <HouseIcon />
            </span>
          </Link>
        </Button>

        <Button variant="outline" className="cursor-pointer" asChild>
          <Link
            href="/about"
            className="inline-flex justify-between items-center gap-x-2"
          >
            <CircleUserRoundIcon /> About
          </Link>
        </Button>

        <Button variant="outline" className="cursor-pointer" asChild>
          <Link
            href="/projects"
            className="inline-flex justify-between items-center gap-x-2"
          >
            <Grid2x2Icon /> Projects
          </Link>
        </Button>

        <ToggleThemeButton />
      </ButtonGroup>
    </div>
  );
};
