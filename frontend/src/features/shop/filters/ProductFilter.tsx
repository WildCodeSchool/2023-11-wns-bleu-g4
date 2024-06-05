import React from 'react';
import { Flex, Text, Button, CheckboxGroup, Checkbox, Stack } from "@chakra-ui/react";

const ProductFilter: React.FC = () => {
    // Liste des catégories
    const categories = ['Catégorie 1', 'Catégorie 2', 'Catégorie 3', 'Catégorie 4'];

    return (
        <Flex direction="column" justifyContent="space-between" alignItems="start" padding="1rem">
            <Flex justifyContent="space-between" alignItems="center" width="100%">
                <Text fontSize="xl" fontWeight="bold">Filter</Text>
                <Text colorScheme="teal" cursor="pointer">Clear Filter</Text>
            </Flex>
            <Text fontSize="xl" fontWeight="bold" mt="2">Categorie</Text>
            <CheckboxGroup colorScheme="teal" defaultValue={[]}>
                <Stack spacing={3} mt="2">
                    {categories.map((category, index) => (
                        <Checkbox key={index} value={category} borderRadius="full">{category}</Checkbox>
                    ))}
                </Stack>
            </CheckboxGroup>
        </Flex>
    );
}

export default ProductFilter;