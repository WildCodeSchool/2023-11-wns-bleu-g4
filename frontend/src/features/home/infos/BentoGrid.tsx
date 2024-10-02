import { AccordionItem, Box, Divider, Flex, Grid, GridItem, Text, useColorModeValue } from "@chakra-ui/react";
import {
  ArrowLongRightIcon,
  FaceSmileIcon,
  MagnifyingGlassCircleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { motion, useAnimation } from "framer-motion";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Facebook from "../../../../public/svg/facebookLight.svg";
import Instagram from "../../../../public/svg/instagramLight.svg";

export default function BentoGrid() {
  const { t } = useTranslation("Bento");

  const isDark = useColorModeValue(false, true);

  const item1 = useColorModeValue("primary", "primaryDark");
  const item2 = useColorModeValue("secondary", "secondaryDark");
  const item3 = useColorModeValue("#1A130A", "light");

  const text1 = useColorModeValue("light", "dark");
  const text2 = useColorModeValue("light", "light");

  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 300 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  return (
    <Grid
      templateColumns={{ base: "1fr", xl: "repeat(5, 1fr)" }}
      templateRows={{ base: "repeat(4, 1fr)", xl: "repeat(2, 1fr)" }}
      gap={[2, 4]}
      px={{ base: 5, xl: 24 }}
      py={{ base: 8, xl: 0 }}
      templateAreas={{
        base: `
          "item1"
          "item2"
          "item3"
          "item4"
        `,
        xl: `
          "item1 item1 item1 item1 item2"
          "item3 item3 item3 item4 item4"
        `,
      }}
    >
      <GridItem
        as={motion.div}
        custom={0}
        initial="hidden"
        animate={controls}
        variants={variants}
        ref={ref}
        gridArea="item1"
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        h="auto"
        bg={item1}
        borderRadius={"2xl"}
        py={{ base: 1.5, xl: 8 }}
        px={2.5}
        gap={[2.5, 7]}
      >
        <Text fontSize={{ base: "24px", lg: "96px" }} color={text2} align="center">
          {t("Over")} <span className="lg:text-9xl sm:text-3xl font-bold">{t("100+")}</span> {t("gear")}
        </Text>
        <Text color={text2} align="center">
          {t("and more incoming...")}
        </Text>
      </GridItem>
      <GridItem
        as={motion.div}
        custom={1}
        initial="hidden"
        animate={controls}
        variants={variants}
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
        <Text fontSize={{ base: "16px", lg: "24px" }} color={text2} align="center">
          {t("More than")}
        </Text>
        <Text color={text2} fontSize={{ base: "32px", lg: "64px" }} fontWeight="700">
          {t("50")}
        </Text>
        <Text fontSize={{ base: "16px", lg: "24px" }} color={text2}>
          {t("agencies")}
        </Text>
      </GridItem>
      <GridItem
        as={motion.div}
        custom={2}
        initial="hidden"
        animate={controls}
        variants={variants}
        gridArea="item3"
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        h="auto"
        bg={item3}
        borderRadius={"2xl"}
        py={{ base: 1.5, xl: 8 }}
        gap={[2.5, 2.5, 2.5, 7]}
      >
        <Text fontSize={{ base: "14px", md: "16px", lg: "32px" }} color={text1} align="center">
          {t("Renting equipment hase never been easier")}
        </Text>
        <Flex width={"full"} justifyContent={"space-around"} overflow="hidden" alignItems={"center"}>
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center items-center flex-col"
          >
            <Box width={["30px", "30px", "50px", "80px"]}>
              <MagnifyingGlassCircleIcon fill={isDark ? "dark" : "white"} />
            </Box>
            <Text fontSize={{ base: "16px", lg: "24px" }} color={text1}>
              {t("Search")}
            </Text>
          </motion.div>
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex justify-center items-center flex-col"
          >
            <Box width={["30px", "30px", "50px", "80px"]}>
              <ArrowLongRightIcon fill={isDark ? "dark" : "white"} />
            </Box>
          </motion.div>
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center items-center flex-col"
          >
            <Box width={["30px", "30px", "50px", "80px"]}>
              <ShoppingCartIcon fill={isDark ? "dark" : "white"} />
            </Box>
            <Text fontSize={{ base: "16px", lg: "24px" }} color={text1}>
              {t("Rent")}
            </Text>
          </motion.div>
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex justify-center items-center flex-col"
          >
            <Box width={["30px", "30px", "50px", "80px"]}>
              <ArrowLongRightIcon fill={isDark ? "dark" : "white"} />
            </Box>
          </motion.div>
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center items-center flex-col"
          >
            <Box width={["30px", "30px", "50px", "80px"]}>
              <FaceSmileIcon fill={isDark ? "dark" : "white"} />
            </Box>
            <Text fontSize={{ base: "16px", lg: "24px" }} color={text1}>
              {t("Enjoy")}
            </Text>
          </motion.div>
        </Flex>
      </GridItem>
      <GridItem
        as={motion.div}
        custom={3}
        initial="hidden"
        animate={controls}
        variants={variants}
        gridArea="item4"
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        h="auto"
        bg="accent"
        borderRadius={"2xl"}
        py={{ base: 1.5, xl: 8 }}
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
