import { useProductContext } from "@/context/ProductPageContext";
import { Flex, Select, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function ProductDescription() {
  const { t } = useTranslation("productDetails");
  const { selectedProduct, agencies, setSelectedAgency, setSelectedSize } = useProductContext();

  if (!selectedProduct) return null;

  return (
    <Flex flexDirection="column" gap="10px">
      <Text fontSize="2xl" fontWeight="700" fontFamily="Poppins">
        {selectedProduct.name}
      </Text>
      <Text fontWeight="600">{selectedProduct.description}</Text>
      <Select
        placeholder="Sélectionner une agence"
        width="fit-content"
        mt={5}
        onChange={e => {
          const selectedId = parseInt(e.target.value);
          if (!isNaN(selectedId)) {
            setSelectedAgency(selectedId);
            setSelectedSize(null);
          }
        }}
      >
        {agencies.map((agency, index) => (
          <option key={index} value={agency.id.toString()}>
            {agency.name}
          </option>
        ))}
      </Select>
    </Flex>
  );
}
