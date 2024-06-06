import { Flex, Text, Select } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Agency, Product } from "@/features/product/ProductPage";

export default function ProductDescription({
  product,
  agencies,
  selectedAgency,
  setSelectedAgency,
  setSelectedSize
}: {
  product: Product;
  agencies: Agency[];
  selectedAgency: number | null;
  setSelectedAgency: (id: number | null) => void;
  setSelectedSize: (size: string | number | null) => void;
}) {
  const { t } = useTranslation("productDetails");

  return (
    <Flex flexDirection="column" gap="10px">
      <Text fontSize="2xl" fontWeight="700" fontFamily="Poppins"></Text>
      <Text fontWeight="600">{product.description}</Text>
      <Select
        placeholder="Sélectionner une agence"
        width="fit-content"
        onChange={e => {
          const selectedId = parseInt(e.target.value);
          setSelectedAgency(selectedId);
          setSelectedSize(null); // Réinitialiser la taille sélectionnée lors du changement d'agence
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
