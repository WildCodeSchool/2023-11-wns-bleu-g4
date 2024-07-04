import { useProductContext } from "@/context/ProductPageContext";
import { Flex, Image, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function ProductHeader() {
  const { t } = useTranslation("productDetails");
  const { selectedProduct } = useProductContext();

  if (!selectedProduct) return null;

  return (
    <Flex justifyContent="space-between" align="center">
      <Flex flexDirection="column">
        <Text fontSize={18} fontWeight={600} fontFamily="Poppins">
          Ref: 05221489
        </Text>
        <Text fontWeight="600">
          {t("Brand")}: {selectedProduct.brand.name}
        </Text>
      </Flex>
      <Image width="20%" src={selectedProduct.brand.logo} alt="brand logo" />
    </Flex>
  );
}
