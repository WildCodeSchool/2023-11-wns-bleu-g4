import { Box, Image, Text, Button, Flex } from "@chakra-ui/react";
import {ShoppingCartIcon, StarIcon} from "@heroicons/react/16/solid";

// Product data
const product = {
    id: '1234789046',
    name: 'Product 1',
    Brand: 'marque',
    note : 3,
    comment : '39',
    price: 24,
    image: 'https://dub.sh/S9sgKg2',
};

export default function ProductCard() {
    return (
        <Box p="4" borderColor="gray" bg="white" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Text  fontWeight="bold">id :{product.id}</Text>
            <Flex justifyContent="center" alignItems="center">
                <Image my="2" width="80%"  src={product.image} alt={product.name} />
            </Flex>
            <Box >
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
                <Text>{product.Brand}</Text>
                <Flex  mt="2" alignItems="center">
                    {Array(5)
                        .fill("")
                        .map((_, i) => (
                            <StarIcon key={i} className={i < product.note ? "h-5 w-5 text-teal-500" : "h-5 w-5 text-gray-300"} />
                        ))}
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                        {product.comment}
                    </Box>
                </Flex>

                <Flex mt="3" alignItems="center" justifyContent="space-between">
                    <Box fontSize="xl">
                        {product.price}€
                        <Box  as="span" color="gray.600" fontSize="xl">
                            / Days
                        </Box>
                    </Box>
                    <Button colorScheme="teal">
                        <ShoppingCartIcon className="h-6 w-6 text-white" />
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
}