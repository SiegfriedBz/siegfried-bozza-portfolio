import type { FC } from "react";
import { StackBadge } from "@/app/_components/stack-badge";
import { STACK } from "@/app/_constants/stack";
import { Card, CardContent } from "@/components/ui/card";

export const AllSkillsBadges: FC = () => {
  return (
    <Card className="bg-transparent border-0 gap-3">
      <CardContent className="ps-0">
        <ul className="flex flex-wrap gap-2">
          {Object.values(STACK)?.map((s) => {
            return (
              <li key={s}>
                <StackBadge stack={s as STACK} />
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};
