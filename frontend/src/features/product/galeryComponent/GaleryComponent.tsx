import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Flex } from "@chakra-ui/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper/types";

interface GaleryComponentProps {
  images: string[];
}

export default function GaleryComponent({ images }: GaleryComponentProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <Flex w="55%" flexDirection="column" gap="10px" className="galeryComponent">
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image}               
            style={{ width: "100%", height: "100%", objectFit: "contain" }} 
            alt={`Image ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img               
            style={{ width: "100%", height: "100%", objectFit: "contain" }} 
            src={image} alt={`Image ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  );
}