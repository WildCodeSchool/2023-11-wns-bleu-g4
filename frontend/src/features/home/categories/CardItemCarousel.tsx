import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CardItem from "./CardItem";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function CardItemCarousel() {
    const color = useColorModeValue("#F5F5F5", "transparent");
    const { t } = useTranslation("Welcome");
    return (
        <Flex
            flexDirection="column"
            gap={{ base: "10px", lg: "30px" }}
            bg={color} p={{ base: "1.87rem 0", lg: "6.25rem 0 6.25rem 0" }} >
            <Flex gap="10px" flexDirection="column" px={{ base: "1.25rem", lg: "6.25rem" }}>
                <Text fontSize={{ base: "24px", lg: "72px" }} fontWeight="bold" fontFamily="Poppins" lineHeight="100%">
                    {t("CATEGORIES")}
                </Text>
                <Text fontSize={{ base: "16px", lg: "24px" }} fontWeight="semibold" fontFamily="Nunito" lineHeight="100%">
                    {t("Select the category of your choice.")}
                </Text>
            </Flex>
            <Flex className="lg:px-24" ml={{ base: "1.25rem", lg: "0" }}>
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
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    loop={true}
                    className="mySwiper4"
                >
                    <SwiperSlide >
                        <CardItem
                            text={t("Ski")}
                            image="https://www.blizzard-tecnica.com/storage/ProductCategory/bac6d6b77f4d9f059ddaa1a4b1f74bfc.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardItem
                            text={t("Hiking")}
                            image="https://www.shape.com/thmb/oAnU3qGLLeS9CDt7gceJRTo0-po=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/endurance-4d8dfc8fd70741f5a8ee810d816f52d0.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardItem
                            text={t("Surf")}
                            image="https://img.redbull.com/images/c_crop,x_1457,y_0,h_3456,w_2592/c_fill,w_450,h_600/q_auto:low,f_auto/redbullcom/2022/11/23/ugejjjmmgpr91xifbxds/ian-walsh-surf-tube" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardItem
                            text={t("Kayak")}
                            image="https://res.cloudinary.com/outtrip/image/fetch/f_auto,q_auto,w_2048/https://cms.outtrip.fr/assets/leMag/peut-on-faire-du-kayak-librement-1.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardItem
                            text={t("Bike")}
                            image="https://www.tourismeshawinigan.com/app/uploads/2022/04/Parc-des-chutes-19-aout-2021_VT15175_Marc-Antoine-Lacourse_Im-The-Race-e1651430581200.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardItem
                            text={t("Climb")}
                            image="https://upload.wikimedia.org/wikipedia/commons/c/c5/Hebrides_climbing_-_Sugar_Cane_Country_-_01.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardItem
                            text={t("Diving")}
                            image="https://contents.mediadecathlon.com/s813993/k$f1f8dc9a352f19d9c66202661575910d/1800x0/854pt528/1408xcr1056/diving.jpg?format=auto" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardItem
                            text={t("Snow")}
                            image="https://images.blue-tomato.com/is/image/bluetomato/305099185_style1.jpg-xyVWCK8l5zcRQg6Fgg_hU1T57TM/Kin+2024+Snowboard.jpg?$m4$" />
                    </SwiperSlide>
                </Swiper>
            </Flex>
        </Flex>
    );
}