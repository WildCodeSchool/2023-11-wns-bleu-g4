import { Box, Image, Text, Button } from "@chakra-ui/react";

// Product data
const product = {
    id: '1',
    name: 'Product 1',
    Brand: 'Product 1 description',
    note : '4',
    comment : '39',
    price: 24,
    image: 'https://dub.sh/S9sgKg2',
};

export default function ProductCard() {
    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src={product.image} alt={product.name} />

            <Box p="6">
                <Box  alignItems="baseline">
                    <Text
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        isTruncated
                    >
                        {product.name}
                    </Text>
                </Box>

                <Box>
                    {product.price}€
                    <Box as="span" color="gray.600" fontSize="sm">
                        / unité
                    </Box>
                </Box>

                <Box  mt="2" alignItems="center">
                    {Array(5)
                        .fill("")
                        .map((_, i) => (
                            <Box
                                key={i}
                                as="span"
                            >
                                ★
                            </Box>
                        ))}
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                        {product.comment} commentaires
                    </Box>
                </Box>

                <Button mt="3" colorScheme="teal" variant="outline">
                    Ajouter au panier
                </Button>
            </Box>
        </Box>
    );
}