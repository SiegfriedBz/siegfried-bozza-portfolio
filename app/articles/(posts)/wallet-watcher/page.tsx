import { getArticle } from "@/app/_constants/articles";
import { PostShell } from "@/app/articles/_components/post-shell";
import { articleMetadata } from "@/app/articles/_lib/article-metadata";
import Content from "./content.mdx";

const SLUG = "wallet-watcher";

export const metadata = articleMetadata(SLUG);

export default function Page() {
  return (
    <PostShell article={getArticle(SLUG)}>
      <Content />
    </PostShell>
  );
}
