import { Checkbox, CheckboxGroup, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const ProductFilter: React.FC = () => {
  // Liste des catégories
  const categories = ["Jackets", "Fleece", "Sweatshirts & Hoodies", "Sweaters"];

  // État local pour suivre les cases à cocher sélectionnées
  const [checkedItems, setCheckedItems] = useState<(string | number)[]>([]);

  // Fonction pour réinitialiser les cases à cocher
  const clearFilter = () => setCheckedItems([]);

  return (
    <Flex direction="column" justifyContent="space-between" alignItems="start" padding="1rem">
      <Flex justifyContent="space-between" alignItems="center" width="100%">
        <Text fontSize={{ base: "1xl", md: "lg" }} fontWeight="bold">
          Filter
        </Text>
        <Text
          fontSize={{ base: "1xl", md: "lg" }}
          color="accent"
          cursor="pointer"
          onClick={clearFilter}
          textDecoration="underline"
          fontWeight="400"
        >
          Clear Filter
        </Text>
      </Flex>
      <Text fontSize={{ base: "1xl", md: "lg" }} fontWeight="bold" mt="6">
        Categories
      </Text>
      <CheckboxGroup colorScheme="teal" value={checkedItems} onChange={setCheckedItems}>
        <Stack spacing={3} mt="2">
          {categories.map((category, index) => (
            <Checkbox key={index} value={category} borderRadius="full">
              {category}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </Flex>
  );
};

export default ProductFilter;
