"use client";

import { type FC, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  /** Accessible description of what the recording shows. */
  label: string;
  /** Intrinsic size: reserves the box before the poster loads (no layout shift). */
  width?: number;
  height?: number;
  className?: string;
};

/** Poster frames are generated next to each recording: foo.mp4 → foo.jpg */
export const posterFor = (src: string) => src.replace(/\.mp4$/, ".jpg");

/**
 * Muted, looping screen recording. Nothing is downloaded until the video is near the
 * screen (preload="none", poster set lazily), and it pauses when scrolled or swiped away.
 */
export const AutoplayVideo: FC<Props> = (props) => {
  const { src, label, width, height, className } = props;
  const ref = useRef<HTMLVideoElement>(null);
  // The poster is an image download too: fetch it only once the video is near the
  // viewport (off-screen carousel slides would otherwise all load at page load).
  const [near, setNear] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    // Play only while at least half of the video is on screen. isIntersecting alone
    // would start it at the first visible pixel and pause it only once fully gone.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5) {
          video.play().catch(() => {
            // Autoplay can be refused (e.g. low-power mode); controls remain usable.
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={near ? posterFor(src) : undefined}
      aria-label={label}
      width={width}
      height={height}
      muted
      loop
      playsInline
      controls
      preload="none"
      className={cn("h-full w-full bg-muted/30", className)}
    />
  );
};
