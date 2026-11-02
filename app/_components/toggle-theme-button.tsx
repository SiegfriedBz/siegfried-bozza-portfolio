"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { type FC, useCallback } from "react";
import { Button } from "@/components/ui/button";

export const ToggleThemeButton: FC = () => {
  const { setTheme, resolvedTheme } = useTheme();

  // Toggle from what is actually displayed ("system" resolves to light or dark).
  const onToggle = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  // Both icons are rendered and CSS picks one, so server and client markup match
  // (the theme is unknown during SSR — branching on it caused a hydration error).
  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full p-2 cursor-pointer"
      onClick={onToggle}
      aria-label="Toggle dark mode"
    >
      <span className="inline-flex justify-between items-center rounded-full bg-muted p-1">
        <SunIcon className="hidden dark:block" />
        <MoonIcon className="dark:hidden" />
      </span>
    </Button>
  );
};
