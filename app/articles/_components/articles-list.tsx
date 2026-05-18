import { ARTICLES } from "@/app/_constants/articles";
import type { FC } from "react";
import { ArticleCard } from "./article-card";

export const ArticlesList: FC = () => {
  return (
    <ul
      className={
        ARTICLES.length > 1
          ? "grid grid-cols-1 gap-8 md:grid-cols-2"
          : "mx-auto grid w-full max-w-md grid-cols-1 gap-8"
      }
    >
      {ARTICLES.map((article) => (
        <li key={article.slug}>
          <ArticleCard article={article} />
        </li>
      ))}
    </ul>
  );
};
