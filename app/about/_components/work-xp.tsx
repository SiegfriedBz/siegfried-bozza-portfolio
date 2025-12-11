import { ExternalLinkIcon } from "lucide-react";
import { BoldText } from "@/app/_components/bold-text";
import { TypographyH2 } from "@/app/_components/typography/h2";
import { TypographyH3 } from "@/app/_components/typography/h3";
import { TypographyH5 } from "@/app/_components/typography/h5";
import { WORK_EXPERIENCE } from "@/app/_constants/work-xp";
import { cn } from "@/lib/utils";

export const WorkXP = () => {
  return (
    <>
      <TypographyH2 className="font-extrabold">Work Experience</TypographyH2>

      <ul className="mt-4 flex flex-col gap-y-8">
        {WORK_EXPERIENCE.map((w) => {
          const {
            id,
            company,
            location,
            position,
            from,
            to,
            description,
            link,
          } = w;

          return (
            <li key={id} className="space-y-2">
              <div className="flex max-sm:flex-col max-sm:gap-1 sm:justify-between sm:items-center">
                <TypographyH3 className="font-extrabold">
                  {company}
                </TypographyH3>
                <span className="inline-flex text-sm">{`${from} - ${to}`}</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-accent-blue font-bold">{position}</span>
                <span className="text-muted-foreground ps-2 sm:ps-4">
                  {location}
                </span>
              </div>

              <ul className={cn("space-y-2 list-disc ps-6 sm:ps-12")}>
                {description.map((item, idx) => {
                  return (
                    // biome-ignore lint/suspicious/noArrayIndexKey: static
                    <li key={idx}>
                      <TypographyH5>
                        <BoldText text={item} />
                      </TypographyH5>
                    </li>
                  );
                })}

                {link && (
                  <li>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-x-2 text-accent-blue"
                    >
                      {link.label}
                      <ExternalLinkIcon className="size-4 text-accent-blue" />
                    </a>
                  </li>
                )}
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
};
