import { Product } from "@/features/product/ProductPage";
import { Flex, Image, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function ProductHeader({ product }: { product: Product }) {
  const { t } = useTranslation("productDetails");

  return (
    <Flex justifyContent="space-between">
      <Flex flexDirection="column">
        <Text size="18px" fontWeight="600">
          Ref: 05221489
        </Text>
        <Text fontWeight="600">
          {t("Brand")}: {product.brand.name}
        </Text>
      </Flex>
      <Image width="20%" src={product.brand.logo} alt="brand logo" />
    </Flex>
  );
}
