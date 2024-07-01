import HeroCarousel from "@/features/home/welcome/components/HeroCarousel";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import HeroImageMobile from "/public/images/HeroMobile.png";

export default function Welcome() {
  const { t } = useTranslation("Welcome");
  return (
    <Flex
      position="relative"
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align="center"
      w="full"
      m={{ base: "none", md: "6.25rem 0 6.25rem 0" }}
      className="lg:px-24"
    >
      <Image src={HeroImageMobile} alt="Hero Mobile" className="absolute w-full h-full object-cover md:hidden z-1  " />
      <div className="absolute w-full h-full bg-gradient-to-r opacity-50 from-black to-30 md:hidden z-2 " />
      <Box
        flex={1} m={{ base: "1.25rem", lg: "1.25rem 2rem 1.25rem 1.25rem" }}
        className="relative w-full md:w-1/2 z-3 p-5 md:p-0">
        <Heading
          as="h1"
          fontSize={{ base: "4xl", md: "7xl" }}
          fontWeight="bold"
          lineHeight="100%"
          mb={2}
          className="text-white md:text-current "
        >
          {t("Welcome on GearGo")}
          <br />

        </Heading>
        <Text
          fontSize={{ base: "2xl", md: "4xl" }}
          lineHeight="100%"
          className="text-white md:text-current"
          mb={{ base: 2, md: 5 }}
        >
          {t("The first outdoor equipment rental platform.")}
        </Text>
        <Text fontSize={{ base: "1xl", md: "2xl" }} className="text-white md:text-current">
          {t("Explore our outdoor equipment rental service for the mountains and the sea.")} <br />
          {t(
            "GearGo offers a wide selection of quality gear. Simply rent what you need and embark on your " +
            "adventure with ease."
          )}
        </Text>
        <br />
        <Text fontSize={{ base: "xs", md: "xs" }} className="text-white md:text-current" >
          {t("outdoor")}
        </Text>
      </Box>
      <Box w={{ base: "full", md: "55%" }} className="hidden md:block">
        <HeroCarousel />
      </Box>
    </Flex>
  );
}
