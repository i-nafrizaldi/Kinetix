import ProductCard from "@/components/ProductCard";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const NewArrivalCarousel = () => {
  return (
    <div>
      <Carousel className=" max-w-97.5 ">
        <CarouselContent className=" ml-0 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem className=" basis-[136px] p-0 first:ml-4 md:basis-[180px] md:first:ml-8 lg:basis-[220px]">
              <div className="">
                <ProductCard />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default NewArrivalCarousel;
