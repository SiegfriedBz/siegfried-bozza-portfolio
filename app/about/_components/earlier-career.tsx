import { RichText } from "@/app/_components/rich-text";
import { TypographyH2 } from "@/app/_components/typography/h2";
import { TypographyH3 } from "@/app/_components/typography/h3";
import { TypographyH5 } from "@/app/_components/typography/h5";
import { TypographyP } from "@/app/_components/typography/p";
import { WORK_EXPERIENCE } from "@/app/_constants/work-xp";
import { Badge } from "@/components/ui/badge";
import { ExternalLinkIcon } from "lucide-react";

export const EarlierCareer = () => {
  const entries = WORK_EXPERIENCE.filter((w) => w.section === "earlier");

  return (
    <>
      <TypographyH2 className="font-extrabold">
        Earlier career (pre-software)
      </TypographyH2>

      <TypographyP className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        Before transitioning to software engineering, I spent roughly fifteen
        years performing molecular biology research and environmental
        engineering fieldwork across France, Canada, and Switzerland.
      </TypographyP>

      <ul className="mt-6 flex flex-col gap-y-6 text-sm sm:text-base">
        {entries.map((w) => {
          const {
            id,
            company,
            location,
            position,
            from,
            to,
            description,
            link,
            references,
          } = w;

          return (
            <li key={id} className="space-y-2">
              <div className="flex max-sm:flex-col max-sm:gap-1 sm:justify-between sm:items-center">
                <TypographyH3 className="text-base sm:text-lg font-extrabold">
                  {company}
                </TypographyH3>
                <span className="inline-flex text-sm shrink-0">{`${from} - ${to}`}</span>
              </div>

              <div className="flex flex-col gap-1">
                {position ? (
                  <span className="text-accent-blue font-bold">{position}</span>
                ) : null}
                <span className="text-muted-foreground ps-2 sm:ps-4">
                  {location}
                </span>
              </div>

              <ul className="space-y-2 list-disc ps-6 sm:ps-12">
                {description.map((item, idx) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static
                  <li key={idx}>
                    <TypographyH5>
                      <RichText text={item} />
                    </TypographyH5>
                  </li>
                ))}

                {references?.map((ref) => (
                  <li key={ref.href} className="list-none -ms-4 sm:-ms-6">
                    <Badge variant="outline" asChild>
                      <a
                        href={ref.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-accent-blue hover:underline"
                      >
                        {ref.label}
                        <ExternalLinkIcon className="ms-1 inline size-3" />
                      </a>
                    </Badge>
                  </li>
                ))}

                {link?.href?.trim() ? (
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
                ) : null}
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
};
