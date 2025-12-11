import { ExternalLinkIcon } from "lucide-react";
import { BoldText } from "@/app/_components/bold-text";
import { TypographyH2 } from "@/app/_components/typography/h2";
import { TypographyH5 } from "@/app/_components/typography/h5";
import { EDUCATION } from "@/app/_constants/education";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const Education = () => {
  return (
    <>
      <TypographyH2 className="font-extrabold">Education</TypographyH2>

      <ul className="mt-4 flex flex-col gap-y-8">
        {EDUCATION.map((ed) => {
          const { id, title, location, description, year, link } = ed;

          return (
            <li key={id} className="space-y-2">
              <div className="flex flex-col gap-1 ps-0">
                <span className="text-accent-blue font-bold">{title}</span>

                <div className="text-muted-foreground ps-2 sm:ps-4">
                  <span className="whitespace-nowrap">{year}</span> -{" "}
                  <span>{location}</span>
                </div>
              </div>

              <div className="ps-2 sm:ps-4">
                <TypographyH5>
                  <BoldText text={description} />
                </TypographyH5>

                {link && (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-x-2 text-accent-blue"
                  >
                    {link.label}
                    <ExternalLinkIcon className="size-4 text-accent-blue" />
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};
