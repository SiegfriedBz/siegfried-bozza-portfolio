"use client";

import { MermaidBlock } from "@/app/_components/mermaid-block";
import { TypographyH3 } from "@/app/_components/typography/h3";
import { TypographyP } from "@/app/_components/typography/p";
import { Card, CardContent } from "@/components/ui/card";
import type { FC } from "react";

type Props = {
  title: string;
  caption?: string;
  definition: string;
  diagramId: string;
};

export const ProjectDiagramCard: FC<Props> = (props) => {
  const { title, caption, definition, diagramId } = props;

  return (
    <Card className="overflow-hidden border-border/50 shadow-none">
      <CardContent className="space-y-2 pt-6">
        <TypographyH3 className="text-balance">{title}</TypographyH3>
        {caption ? (
          <TypographyP className="text-sm text-muted-foreground">
            {caption}
          </TypographyP>
        ) : null}
        <MermaidBlock diagramId={diagramId} definition={definition} />
      </CardContent>
    </Card>
  );
};
