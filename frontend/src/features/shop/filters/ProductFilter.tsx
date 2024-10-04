import React, { useState } from "react";
import { Checkbox, Flex, Stack, Text } from "@chakra-ui/react";
import { useGetAllCategoriesQuery } from "@/graphql/Category/generated/getAllCats.generated";

interface ProductFilterProps {
  onFilterChange?: (categoryId: number | null) => void;
  selectedCategoryId?: number | null;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  onFilterChange,
  selectedCategoryId: initialSelectedCategoryId,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(initialSelectedCategoryId || null);

  const { loading, error, data } = useGetAllCategoriesQuery();

  const handleCategoryChange = (categoryId: number) => {
    const newCategoryId = selectedCategoryId === categoryId ? null : categoryId;
    setSelectedCategoryId(newCategoryId);
    if (onFilterChange) {
      onFilterChange(newCategoryId);
    }
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories: {error.message}</p>;

  const categories = data?.getAllCategories || [];

  return (
    <Flex direction="column" justifyContent="space-between" alignItems="start" padding="1rem">
      <Text fontSize={{ base: "1xl", md: "lg" }} fontWeight="bold">
        Filter by Category
      </Text>
      <Stack spacing={3} mt="2" width="100%">
        {categories.map(category => (
          <Flex key={category.id} alignItems="center" width="100%">
            <Checkbox
              isChecked={selectedCategoryId === Number(category.id)}
              onChange={() => handleCategoryChange(Number(category.id))}
              mr={2}
            />
            <Text fontSize="sm" cursor="default" userSelect="none" onClick={e => e.preventDefault()}>
              {category.name}
            </Text>
          </Flex>
        ))}
      </Stack>
    </Flex>
  );
};

export default ProductFilter;
