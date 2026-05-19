import type { Article } from "@/app/_types/article";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MoveRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

type Props = {
  article: Article;
  className?: string;
};

export const ArticleCard: FC<Props> = ({ article, className }) => {
  const { title, subtitle, excerpt, date, href, cover, tags } = article;

  return (
    <Card
      className={cn(
        "group gap-0 overflow-hidden border-border/80 bg-card/40 p-0 transition-all duration-300 hover:border-accent-blue/50 hover:shadow-md hover:shadow-accent-blue/10",
        className,
      )}
    >
      <Link href={href} className="block h-full focus-visible:outline-none">
        {cover ? (
          <div className="relative aspect-[16/7] w-full overflow-hidden bg-muted">
            <Image
              src={cover}
              alt={`${title} — cover`}
              fill
              className="object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
            <div
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent"
              aria-hidden
            />
          </div>
        ) : (
          <div className="aspect-[16/7] w-full bg-linear-to-br from-accent-blue/15 to-muted" />
        )}

        <CardContent className="flex flex-col gap-3 p-5 text-left sm:p-6">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[10px] font-semibold uppercase tracking-wide text-accent-blue"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <h2 className="text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-accent-blue sm:text-2xl">
            {title}
          </h2>

          <p className="text-sm italic leading-snug text-muted-foreground sm:text-base">
            {subtitle}
          </p>

          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {excerpt}
          </p>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-muted-foreground">
            <span>
              {new Date(date).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="inline-flex items-center gap-1 font-medium text-accent-blue group-hover:underline">
              Read article
              <MoveRightIcon className="size-4" />
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
