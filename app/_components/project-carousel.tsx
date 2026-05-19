import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import type { FC } from "react";

type Props = {
  images: string[];
  /** Used for descriptive alt text on each slide. */
  projectName: string;
};

export const ProjectCarousel: FC<Props> = (props) => {
  const { images, projectName } = props;

  return (
    <Carousel
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {images.map((img, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: stable order
          <CarouselItem key={index}>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer">
              <Image
                src={img}
                fill
                alt={`${projectName} — screenshot ${index + 1}`}
                className="object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
