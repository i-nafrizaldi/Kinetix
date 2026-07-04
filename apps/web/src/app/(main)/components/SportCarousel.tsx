import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function SportCarousel() {
  return (
    <Carousel className=" max-w-97.5 ">
      <CarouselContent className=" ml-0 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem className=" basis-[136px] p-0 first:ml-4 md:basis-[180px] md:first:ml-8 lg:basis-[220px]">
            <div className="">
              <Card className="rounded-none p-0">
                <CardContent className="flex aspect-square items-center justify-center  bg-green-300">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
                <CardFooter className="rounded-none">
                  <p>SPORT NAME</p>
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
