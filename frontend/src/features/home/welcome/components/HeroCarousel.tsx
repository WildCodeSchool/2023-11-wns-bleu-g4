import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, Pagination, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Mountain from "/public/images/Welcome-caroussel/mountain.webp"
import Outdoor from "/public/images/Welcome-caroussel/outdoor.webp"
import Sea from "/public/images/Welcome-caroussel/sea.webp"
import { Flex } from "@chakra-ui/react";

export default function ImageCarousel() {
  return (
    <Flex >
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#e66300",
            "--swiper-pagination-bullet-size": "1rem",
          } as React.CSSProperties
        }
        cssMode={true}
        navigation={true}
        pagination={{ clickable: true }}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper3"
      >
        <SwiperSlide>
          <Image src={Outdoor} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Mountain} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Sea} alt="" />
        </SwiperSlide>
      </Swiper>
    </Flex>
  );
}
