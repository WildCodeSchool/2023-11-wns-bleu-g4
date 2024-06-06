import { Flex, Text, Image } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Product } from "@/features/product/ProductPage";

export default function ProductHeader({ product }: { product: Product }) {
  const { t } = useTranslation("productDetails");

  return (
    <Flex justifyContent="space-between">
      <Flex flexDirection="column">
        <Text size="18px" fontWeight="600">
          Ref: 05221489
        </Text>
        <Text fontWeight="600">
          {t("Brand")}: {product.brand}
        </Text>
      </Flex>
      <Image width="20%" src="https://velos-cargo.com/wp-content/uploads/2023/05/logo-trek-.png" alt="product" />
    </Flex>
  );
}
