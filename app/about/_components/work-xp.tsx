import { BoldText } from "@/app/_components/bold-text";
import { TypographyH3 } from "@/app/_components/typography/h3";
import { TypographyH5 } from "@/app/_components/typography/h5";
import { TypographyH6 } from "@/app/_components/typography/h6";
import { WORK_EXPERIENCE } from "@/app/_constants/work-xp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const WorkXP = () => {
  return (
    <ul className="space-y-2">
      {WORK_EXPERIENCE.map((w) => {
        const { id, company, location, position, from, to, description } = w;

        return (
          <li key={id}>
            <Card className="bg-transparent border-0 dark:border-0 gap-6">
              <CardHeader className="ps-0">
                <div className="flex max-sm:flex-col max-sm:gap-1 sm:justify-between sm:items-center">
                  <CardTitle>
                    <TypographyH3>{company}</TypographyH3>
                  </CardTitle>
                  <div className="text-muted-foreground text-sm">
                    <span>{from}</span>
                    <span> - </span>
                    <span>{to}</span>
                  </div>
                </div>
                <CardDescription className="flex flex-col gap-1">
                  <span className="text-accent-blue font-bold">{position}</span>
                  <span className="">{location}</span>
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul
                  className={cn(
                    "space-y-2",
                    description.length > 1 ? "list-disc max-sm:-ms-2" : "-ms-6",
                  )}
                >
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
                </ul>
              </CardContent>
            </Card>
          </li>
        );
      })}
    </ul>
  );
};
