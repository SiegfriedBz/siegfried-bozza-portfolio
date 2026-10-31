import Image from "next/image";
import type { FC } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AutoplayVideo } from "./autoplay-video";

type Props = {
  images: string[];
  videos: string[];
  /** Used for descriptive alt text on each slide. */
  projectName: string;
};

export const ProjectCarousel: FC<Props> = (props) => {
  const { images, videos, projectName } = props;

  const slides = [
    ...images.map((src) => ({ kind: "image" as const, src })),
    ...videos.map((src) => ({ kind: "video" as const, src })),
  ];

  if (slides.length === 0) return null;

  return (
    <Carousel
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={slide.src}>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted/30">
              {slide.kind === "image" ? (
                <Image
                  src={slide.src}
                  fill
                  alt={`${projectName} — screenshot ${index + 1}`}
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  // The first slide is the page's LCP element (Next 16 deprecates `priority`).
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  className="object-cover"
                />
              ) : (
                <AutoplayVideo
                  src={slide.src}
                  label={`${projectName} — screen recording ${index + 1}`}
                  className="object-contain"
                />
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {slides.length > 1 ? (
        <>
          <CarouselPrevious className="left-2 max-sm:hidden" />
          <CarouselNext className="right-2 max-sm:hidden" />
        </>
      ) : null}
    </Carousel>
  );
};
