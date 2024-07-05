import { useProductContext } from "@/context/ProductPageContext";
import { Box, Button, Flex, HStack, Text, useNumberInput } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function ProductPricing() {
  const { t } = useTranslation("productDetails");
  const { selectedProduct, quantity, setQuantity, totalPrice } = useProductContext();

  const { getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    value: quantity,
    min: 0,
    max: 10,
    step: 1,
    onChange: (valueAsString, valueAsNumber) => setQuantity(valueAsNumber),
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();

  if (!selectedProduct) return null;

  return (
    <Flex flexDirection="column">
      <Text color="accent" fontFamily="Poppins" fontWeight="600" fontSize="2xl" m="10px">
        {t("Price")} : {selectedProduct.price} € / {t("Day")}
      </Text>
      <Text color="accent" fontFamily="Poppins" fontWeight="600" fontSize="2xl" m="10px">
        {t("Total Price")} : {parseFloat(totalPrice.toFixed(2))} €
      </Text>
      <Flex flexDirection="column" gap="30px" p="19px 0">
        <Flex flexDirection="column" gap={2}>
          <Text fontWeight="700">{t("Quantity")}</Text>
          <HStack maxW="200px" bg="#EDF2F7" borderRadius="10px" p="14px 18px">
            <Button size="xs" variant="selectorButton" {...dec}>
              -
            </Button>
            <Box color="dark" width="xs" textAlign="center" fontSize="18px" fontWeight="700">
              {quantity}
            </Box>
            <Button size="xs" variant="selectorButton" {...inc}>
              +
            </Button>
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
}
