"use client"

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"

export type MermaidBlockProps = {
  definition: string
  diagramId: string
  className?: string
}

export function MermaidBlock({
  definition,
  diagramId,
  className,
}: MermaidBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  )
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!definition.trim()) {
      setStatus("error")
      return
    }

    const container = containerRef.current
    if (!container) {
      return
    }

    let cancelled = false
    setStatus("loading")

    async function draw() {
      try {
        const mermaid = (await import("mermaid")).default
        const isDark = resolvedTheme === "dark"
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "neutral",
          securityLevel: "strict",
          fontFamily:
            "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
        })

        const safeId = `mmd-${diagramId}`.replace(/[^a-zA-Z0-9_-]/g, "-")
        const { svg, bindFunctions } = await mermaid.render(
          safeId,
          definition.trim(),
        )

        if (cancelled || !container) {
          return
        }

        container.innerHTML = svg
        bindFunctions?.(container)
        const svgEl = container.querySelector("svg")
        svgEl?.setAttribute("width", "100%")
        svgEl?.style.setProperty("max-width", "100%")
        svgEl?.style.setProperty("height", "auto")
        setStatus("ready")
      } catch {
        if (!cancelled && container) {
          container.innerHTML = ""
        }
        if (!cancelled) {
          setStatus("error")
        }
      }
    }

    void draw()
    return () => {
      cancelled = true
    }
  }, [definition, resolvedTheme, diagramId])

  return (
    <div
      className={cn(
        "relative overflow-x-auto rounded-xl border border-border/40 bg-muted/10 px-2 py-5 sm:px-4",
        status === "loading" && "min-h-[200px]",
        className,
      )}
    >
      {status === "loading" ? (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden
        >
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-accent-blue border-t-transparent" />
        </div>
      ) : null}
      <div
        ref={containerRef}
        className="flex justify-center text-foreground [&_svg]:max-h-[min(520px,70vh)] [&_svg]:w-full [&_svg]:max-w-full"
      />
      {status === "error" ? (
        <p className="px-2 text-center text-sm text-muted-foreground">
          Diagram could not be rendered.
        </p>
      ) : null}
    </div>
  )
}
