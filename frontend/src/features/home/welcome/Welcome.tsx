import HeroCarousel from "@/features/home/welcome/components/HeroCarousel";
import {Box, Flex, Heading, Text} from "@chakra-ui/react";
import Image from "next/image";
import {useTranslation} from "react-i18next";
import HeroImageMobile from "/public/images/HeroMobile.png";

export default function Welcome() {
  const {t} = useTranslation("Welcome");
  return (
    <Flex
      position="relative"
      direction={{base: "column", lg: "row"}}
      justify="space-between"
      align="center"
      w="full"
      m={{base: "none", xl: "6.25rem 0 6.25rem 0"}}
      className="xl:px-24"
      overflow="hidden"
      gap={{base: 0, md: "20px", lg: "40px"}}
    >
      <Image src={HeroImageMobile} alt="Hero Mobile" className="absolute w-full h-full object-cover xl:hidden z-1  "/>
      <div className="absolute w-full h-full bg-gradient-to-r opacity-50 from-black to-30 xl:hidden z-2 "/>
      <Box
        flex={1}
        m={{base: "1.25rem", xl: "1.25rem 2rem 1.25rem 1.25rem"}}
        className="relative w-full xl:w-1/2 z-3 p-5 xl:p-0"
      >
        <Heading
          as="h1"
          fontSize={{base: "4xl", lg: "7xl"}}
          fontWeight="bold"
          lineHeight="100%"
          mb={2}
          className="text-white xl:text-current "
        >
          {t("Welcome on GearGo")}
          <br/>
        </Heading>
        <Text
          fontSize={{base: "2xl", lg: "4xl"}}
          lineHeight="100%"
          className="text-white xl:text-current"
          mb={{base: 2, xl: 5}}
        >
          {t("The first outdoor equipment rental platform.")}
        </Text>
        <Text display={{base: "none", lg: "initial"}} fontSize={{base: "1xl", lg: "2xl"}}
              className="text-white xl:text-current">
          {t("Explore our outdoor equipment rental service for the mountains and the sea.")} <br/>
          {t(
            "GearGo offers a wide selection of quality gear. Simply rent what you need and embark on your " +
            "adventure with ease.",
          )}
        </Text>
        <br/>
        <Text fontSize={{base: "xs", md: "xs"}} className="text-white xl:text-current">
          {t("outdoor")}
        </Text>
      </Box>
      <Box w={{base: "full", xl: "55%"}} className="hidden xl:block">
        <HeroCarousel/>
      </Box>
    </Flex>
  );
}
