import Link from "next/link";
import type { FC } from "react";
import { ExternalLinks } from "./external-links";
import { TypographyH6 } from "./typography/h6";

export const Footer: FC = () => {
  return (
    <footer className="flex py-8 gap-4 max-sm:flex-col items-center justify-between">
      <div className="flex gap-2">
        <TypographyH6 className="text-muted-foreground">
          © {new Date().getFullYear()} /
        </TypographyH6>
        <Link href={"/"} scroll>
          <TypographyH6 className="font-semibold">Siegfried Bozza</TypographyH6>
        </Link>
      </div>

      <ExternalLinks />
    </footer>
  );
};
