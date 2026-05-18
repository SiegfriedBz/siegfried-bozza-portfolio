import { RichText } from "@/app/_components/rich-text";
import { TypographyH2 } from "@/app/_components/typography/h2";
import { TypographyH3 } from "@/app/_components/typography/h3";
import { TypographyH5 } from "@/app/_components/typography/h5";
import { EDUCATION } from "@/app/_constants/education";
import { ICONS } from "@/app/_constants/icons";
import { Badge } from "@/components/ui/badge";
import { ExternalLinkIcon } from "lucide-react";

const EDUCATION_SECTIONS = [
  { section: "software" as const, label: "Software & Web3" },
  { section: "earlier" as const, label: "Earlier engineering & science" },
];

export const Education = () => {
  return (
    <>
      <TypographyH2 className="font-extrabold">Education</TypographyH2>

      <div className="mt-4 flex flex-col gap-y-10">
        {EDUCATION_SECTIONS.map(({ section, label }) => {
          const entries = EDUCATION.filter((e) => e.section === section);

          return (
            <div key={section} className="space-y-6">
              <TypographyH3 className="text-lg font-bold text-muted-foreground">
                {label}
              </TypographyH3>

              <ul className="flex flex-col gap-y-8">
                {entries.map((ed) => {
                  const { id, title, location, description, year, link } = ed;
                  const publications = ed.publications ?? [];

                  return (
                    <li key={id} className="space-y-2">
                      <div className="flex flex-col gap-1 ps-0">
                        <span className="text-accent-blue font-bold">
                          {title}
                        </span>

                        <div className="text-muted-foreground ps-2 sm:ps-4">
                          {year ? (
                            <>
                              <span className="whitespace-nowrap">{year}</span>
                              {" - "}
                            </>
                          ) : null}
                          <span>{location}</span>
                        </div>
                      </div>

                      <div className="ps-2 sm:ps-4">
                        <TypographyH5>
                          <RichText text={description} />
                        </TypographyH5>

                        {publications.length > 0 ? (
                          <ul className="mt-2 flex flex-wrap gap-2 list-none ps-0">
                            {publications.map((pub) => (
                              <li key={pub.href}>
                                <Badge variant="outline" asChild>
                                  <a
                                    href={pub.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-medium text-accent-blue hover:underline"
                                  >
                                    {pub.label}
                                    <ExternalLinkIcon className="ms-1 inline size-3" />
                                  </a>
                                </Badge>
                              </li>
                            ))}
                          </ul>
                        ) : null}

                        {link?.href?.trim()
                          ? (() => {
                              const LeadingIcon = link.iconName
                                ? ICONS[link.iconName]
                                : null;
                              return (
                                <a
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-2 inline-flex items-center gap-x-2 text-accent-blue hover:underline"
                                >
                                  {LeadingIcon ? (
                                    <LeadingIcon className="size-4 text-accent-blue" />
                                  ) : null}
                                  {link.label}
                                  <ExternalLinkIcon className="size-4 text-accent-blue" />
                                </a>
                              );
                            })()
                          : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
};
