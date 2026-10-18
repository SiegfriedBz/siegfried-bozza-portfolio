"use client";

import { type FC, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  /** Accessible description of what the recording shows. */
  label: string;
  className?: string;
};

/** Poster frames are generated next to each recording: foo.mp4 → foo.jpg */
export const posterFor = (src: string) => src.replace(/\.mp4$/, ".jpg");

/**
 * Muted, looping screen recording. Nothing is downloaded until the video is on
 * screen (preload="none" + poster), and it pauses again when scrolled or swiped away.
 */
export const AutoplayVideo: FC<Props> = (props) => {
  const { src, label, className } = props;
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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
      poster={posterFor(src)}
      aria-label={label}
      muted
      loop
      playsInline
      controls
      preload="none"
      className={cn("h-full w-full bg-muted/30", className)}
    />
  );
};
