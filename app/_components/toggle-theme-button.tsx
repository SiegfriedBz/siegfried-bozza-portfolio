"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { type FC, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";

export const ToggleThemeButton: FC = () => {
  const { setTheme, theme } = useTheme();

  const Icon = useMemo(
    () => (theme === "dark" || theme === "system" ? SunIcon : MoonIcon),
    [theme],
  );

  const onToggle = useCallback(() => {
    setTheme((prev) =>
      prev === "dark" || prev === "system" ? "light" : "dark",
    );
  }, [setTheme]);

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full p-2 cursor-pointer"
      onClick={onToggle}
    >
      <span className="inline-flex justify-between items-center rounded-full bg-muted p-1">
        <Icon />
      </span>
    </Button>
  );
};
