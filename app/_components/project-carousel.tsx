import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image"
import { FC } from "react"

type Props = {
  images: string[]
}
export const ProjectCarousel: FC<Props> = (props) =>{
  const { images } = props

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
          <CarouselItem key={index}>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer">
              <Image 
                  src={img}
                  fill 
                  alt="project image" 
                  className="object-cover" 
                />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
