import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import HeroImg from "/public/images/Hero.png";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function ImageCarousel() {
  const renderArrowPrev = (onClickHandler: () => void, hasPrev: boolean, label: string) =>
    hasPrev && (
      <button
        type="button"
        onClick={onClickHandler}
        title={label}
        className="absolute z-10 top-1/2 left-4 transform -translate-y-1/2 w-12 h-12 bg-zinc-50 rounded-3xl cursor-pointer flex items-center justify-center"
      >
        <ChevronLeftIcon className="w-7 h-7 text-accent" />
      </button>
    );

  const renderArrowNext = (onClickHandler: () => void, hasNext: boolean, label: string) =>
    hasNext && (
      <button
        type="button"
        onClick={onClickHandler}
        title={label}
        className="absolute z-10 top-1/2 right-4 transform -translate-y-1/2 w-12 h-12 bg-zinc-50 rounded-3xl cursor-pointer flex items-center justify-center"
      >
        <ChevronRightIcon className="w-7 h-7 text-accent" />
      </button>
    );

  return (
    <Carousel autoPlay infiniteLoop renderArrowPrev={renderArrowPrev} renderArrowNext={renderArrowNext}>
      <div>
        <Image src={HeroImg} alt="Image 1" />
      </div>
      <div>
        <Image src={HeroImg} alt="Image 2" />
      </div>
      <div>
        <Image src={HeroImg} alt="Image 3" />
      </div>
    </Carousel>
  );
}
