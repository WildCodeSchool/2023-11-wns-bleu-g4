import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import "swiper/css";
import 'swiper/css/effect-cards';
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Mountain from "/public/images/Welcome-caroussel/mountain.webp";
import Outdoor from "/public/images/Welcome-caroussel/outdoor.webp";
import Sea from "/public/images/Welcome-caroussel/sea.webp";

export default function ImageCarousel() {
  return (
    <Flex >
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards, Autoplay]}
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
