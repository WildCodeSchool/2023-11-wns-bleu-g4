import { Checkbox, CheckboxGroup, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import {useGetAllCategoriesQuery} from "@/graphql/Category/generated/getAllCats.generated";

const ProductFilter: React.FC = () => {
    // État local pour suivre les cases à cocher sélectionnées
    const [checkedItems, setCheckedItems] = useState<(string | number)[]>([]);

    // Fonction pour réinitialiser les cases à cocher
    const clearFilter = () => setCheckedItems([]);

    // Utiliser la requête GraphQL générée par codegen pour récupérer les catégories
    const { loading, error, data } = useGetAllCategoriesQuery();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const categories = data?.getAllCategories || [];

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
                    {categories.map((category) => (
                        <Checkbox key={category.id} value={category.name} borderRadius="full">
                            {category.name}
                        </Checkbox>
                    ))}
                </Stack>
            </CheckboxGroup>
        </Flex>
    );
};

export default ProductFilter;