import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70svh] max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground">
        This page doesn&apos;t exist, or it moved. The projects and articles are
        one click away.
      </p>
      <div className="flex gap-3">
        <Button asChild variant="outline">
          <Link href="/projects">Projects</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/articles">Articles</Link>
        </Button>
      </div>
    </div>
  );
}
