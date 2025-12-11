import { TypographyH5 } from "@/app/_components/typography/h5";
import { EDUCATION } from "@/app/_constants/education";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const Education = () => {
  return (
    <ul className="space-y-2">
      {EDUCATION.map((ed) => {
        const {
          id,
          title,
          location,
          description,
          year,
          // link
        } = ed;

        return (
          <li key={id}>
            <Card className="bg-transparent border-0 gap-3">
              <CardHeader className="flex flex-col gap-1 ps-0">
                <span className="text-accent-blue font-bold">{title}</span>

                <div className="text-muted-foreground">
                  <span className="whitespace-nowrap">{year}</span> -{" "}
                  <span>{location}</span>
                </div>
              </CardHeader>

              <CardContent className="ps-0">
                <TypographyH5>{description}</TypographyH5>
              </CardContent>
            </Card>
          </li>
        );
      })}
    </ul>
  );
};
