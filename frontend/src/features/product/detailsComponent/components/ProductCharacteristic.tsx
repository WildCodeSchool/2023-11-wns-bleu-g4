import { useProductContext } from "@/context/ProductPageContext";
import { Divider, Flex, ListItem, Text, UnorderedList, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function ProductCharacteristic() {
  const { t } = useTranslation("ProductCharacteristic");
  const {
    state: { selectedProduct },
  } = useProductContext();
  const colorScheme = useColorModeValue("gray.600", "gray.300");

  if (!selectedProduct) return null;

  return (
    <Flex direction="column" mt={19}>
      <Text fontSize="xl" fontWeight="700" fontFamily="Poppins">
        {t("Characteristics")}
      </Text>
      <Divider borderColor={colorScheme} borderWidth={1} m="20px 0" />
      <UnorderedList spacing={3}>
        {selectedProduct.characteristics.map((characteristic, index) => (
          <ListItem key={index}>
            <Text fontSize={18} fontWeight={500}>
              {characteristic.name}
            </Text>
          </ListItem>
        ))}
      </UnorderedList>
    </Flex>
  );
}
