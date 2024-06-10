import { Box, Flex, Grid, GridItem, Text, useColorModeValue } from "@chakra-ui/react";
import { FaceSmileIcon, MagnifyingGlassCircleIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Facebook from "../../../../public/svg/facebookLight.svg";
import Instagram from "../../../../public/svg/instagramLight.svg";
import { useTranslation } from "next-i18next";

export default function BentoGrid() {
  const { t } = useTranslation("Bento");

  const isDark = useColorModeValue(false, true);

  const item1 = useColorModeValue("primary", "primaryDark");
  const item2 = useColorModeValue("secondary", "secondaryDark");
  const item3 = useColorModeValue("#1A130A", "light");

  const text1 = useColorModeValue("light", "dark");
  const text2 = useColorModeValue("light", "light");

  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }}
      templateRows={{ base: "repeat(4, 1fr)", lg: "repeat(2, 1fr)" }}
      gap={[2, 4]}
      px={{ base: 5, lg: 24 }}
      py={{ base: 8, lg: 0 }}
      templateAreas={{
        base: `
        "item1"
        "item2"
        "item3"
        "item4"
      `,
        lg: `
        "item1 item1 item1 item1 item2"
        "item3 item3 item3 item4 item4"
      `,
      }}
    >
      <GridItem
        gridArea="item1"
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        h="auto"
        bg={item1}
        borderRadius={"2xl"}
        py={{ base: 1.5, lg: 8 }}
        px={2.5}
        gap={[2.5, 7]}
      >
        <Text fontSize={{ base: "24px", lg: "96px" }} color={text1} align="center">
          {t("Over")} <span className="lg:text-9xl sm:text-3xl font-bold">{t("100+")}</span> {t("gear")}
        </Text>
        <Text color={text1} align="center">
          {t("and more incoming...")}
        </Text>
      </GridItem>
      <GridItem
        gridArea="item2"
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        h="auto"
        bg={item2}
        borderRadius={"2xl"}
        px={2.5}
        py={{ base: 1.5, lg: 8 }}
        gap={[2.5, 2.5, 2.5, 7]}
      >
        <Text fontSize={{ base: "16px", lg: "24px" }} color={text1} align="center">
          {t("More than")}
        </Text>
        <Text color={text1} fontSize={{ base: "32px", lg: "64px" }} fontWeight="700">
          {t("50")}
        </Text>
        <Text fontSize={{ base: "16px", lg: "24px" }} color={text1}>
          {t("agencies")}
        </Text>
      </GridItem>
      <GridItem
        gridArea="item3"
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        h="auto"
        bg={item3}
        borderRadius={"2xl"}
        py={{ base: 1.5, lg: 8 }}
        gap={[2.5, 2.5, 2.5, 7]}
      >
        <Text fontSize={{ base: "14px", md: "16px", lg: "32px" }} color={text1} align="center">
          {t("Renting equipment hase never been easier")}
        </Text>
        <Flex width={"full"} justifyContent={"space-around"}>
          <Flex direction={"column"} alignItems={"center"}>
            <Box width={["30px", "30px", "50px", "80px"]}>
              <MagnifyingGlassCircleIcon fill={isDark ? "dark" : "white"} />
            </Box>
            <Text fontSize={{ base: "16px", lg: "24px" }} color={text1}>
              {t("Search")}
            </Text>
          </Flex>
          <Flex direction={"column"} alignItems={"center"}>
            <Box width={["30px", "30px", "50px", "80px"]}>
              <ShoppingCartIcon fill={isDark ? "dark" : "white"} />
            </Box>
            <Text fontSize={{ base: "16px", lg: "24px" }} color={text1}>
              {t("Rent")}
            </Text>
          </Flex>
          <Flex direction={"column"} alignItems={"center"}>
            <Box width={["30px", "30px", "50px", "80px"]}>
              <FaceSmileIcon fill={isDark ? "dark" : "white"} />
            </Box>
            <Text fontSize={{ base: "16px", lg: "24px" }} color={text1}>
              {t("Enjoy")}
            </Text>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem
        gridArea="item4"
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        h="auto"
        bg="accent"
        borderRadius={"2xl"}
        py={{ base: 1.5, lg: 8 }}
        px={2.5}
        gap={[2.5, 2.5, 2.5, 7]}
      >
        <Text fontSize={{ base: "16px", lg: "32px" }} color={text2} align="center">
          {t("Find us on social media")}
        </Text>
        <Flex gap={8}>
          <Box width={["30px", "40px"]}>
            <Image src={Instagram} alt="link to instagram" width={100} />
          </Box>
          <Box width={["30px", "40px"]}>
            <Image src={Facebook} alt="link to facebook" width={100} />
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  );
}
