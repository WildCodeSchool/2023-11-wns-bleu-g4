import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { useGetAllProduct_PicturesQuery } from "@/graphql/ProductPicture/generated/GetAllProduct_pictures.generated";
import { Flex } from "@chakra-ui/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper/types";

export default function GaleryComponent() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const { data, error, loading } = useGetAllProduct_PicturesQuery();

  useEffect(() => {
    if (data) {
      setImages(data.getAllProduct_pictures.map(picture => picture.thumbnail));
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Flex w="55%" height="fit-content" direction="column-reverse" gap="10px" justifyContent="flex-end">
      <Swiper
        onSwiper={swiper => setThumbsSwiper(swiper)}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Image ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Image ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  );
}
