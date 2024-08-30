import {Flex, Text, useColorModeValue} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {Autoplay, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import CardItem from "./CardItem";
import {useGetAllCategoriesQuery} from "@/graphql/Category/generated/getAllCats.generated";

interface Category {
  id: number;
  name: string;
  thumbnail: string;
}

export default function CardItemCarousel() {
  const color = useColorModeValue("#F5F5F5", "transparent");
  const {t} = useTranslation("Welcome");

  const {data, error, loading} = useGetAllCategoriesQuery();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  const categories: Category[] = data?.getAllCategories || [];

  return (
    <Flex
      flexDirection="column"
      gap={{base: "10px", xl: "30px"}}
      bg={color}
      p={{base: "1.87rem 0", xl: "6.25rem 0 6.25rem 0"}}
    >
      <Flex gap="10px" flexDirection="column" px={{base: "1.25rem", xl: "6.25rem"}}>
        <Text fontSize={{base: "24px", xl: "72px"}} fontWeight="bold" fontFamily="Poppins" lineHeight="100%">
          {t("CATEGORIES")}
        </Text>
        <Text fontSize={{base: "16px", xl: "24px"}} fontWeight="semibold" fontFamily="Nunito" lineHeight="100%">
          {t("Select the category of your choice.")}
        </Text>
      </Flex>
      <Flex className="xl:px-24" ml={{base: "1.25rem", xl: "0"}}>
        <Swiper
          style={
            {
              "--swiper-navigation-color": "#e66300",
              "--swiper-pagination-color": "#e66300",
            } as React.CSSProperties
          }
          slidesPerView="auto"
          spaceBetween={14}
          pagination={{
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Pagination, Autoplay]}
          loop={true}
          className="mySwiper4"
        >
          {categories.map(category => (
            <SwiperSlide key={category.id}>
              <CardItem text={category.name} image={category.thumbnail} id={category.id}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </Flex>
    </Flex>
  );
}
