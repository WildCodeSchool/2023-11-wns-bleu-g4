import { Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const FaqSideTitle = () => {
    const { t } = useTranslation("faq");

    return (
        <Flex
            flexDirection="column"
            width={{ base: "100%", md: "40%" }}
            mb={{ base: "10px", md: "0" }}
            mt={{ base: "30px", md: "0" }}
        >
            <Text
                fontSize={{ base: "24px", md: "72px" }}
                fontWeight="700"
                fontFamily={"Poppins"}
            >
                FAQ
            </Text>
            <Text fontSize={{ base: "16px", md: "24px" }} fontWeight="600">
                {t("Answers to some questions you might have")}
            </Text>
        </Flex>
    );
}