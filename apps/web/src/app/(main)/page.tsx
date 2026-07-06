import { CarouselPlugin } from "./components/CardCarouselMain";
import NewArrivalCarousel from "./components/NewArrivalCarousel";
import { SportCarousel } from "./components/SportCarousel";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      {/* HERO SECTION */}
      <section>
        <CarouselPlugin />
        <div className="p-6 flex flex-col gap-4">
          <h1 className="font-bold text-xl text-center">Where Sport Meets Style — 100% Authentic Gear</h1>
          <p className="font-light text-sm text-center">
            Made to Move • Gear for Every Game • Chosen by Thousands • Shipping
            Nationwide
          </p>
        </div>
      </section>
      {/* SHOP BY SPORT */}
      <div className="flex flex-col gap-6 ">
        <div className=" flex w-full justify-between px-4 ">
          <h1>Shop bt Sport</h1>
          <p>View All</p>
        </div>
        <div>
          <SportCarousel />
        </div>
      </div>
      {/* NEW ARRIVAL */}
      <div className="flex flex-col gap-6 ">
        <div className=" flex w-full justify-between px-4 ">
          <h1>New Arrival</h1>
          <p>View All</p>
        </div>
        <div>
          <NewArrivalCarousel />
        </div>
      </div>
    </div>
  );
}
