import {Box, Image, Text, Button, Flex, IconButton, Card} from "@chakra-ui/react";
import {ShoppingCartIcon } from "@heroicons/react/24/outline";
import {StarIcon} from "@heroicons/react/24/solid";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";

// Product data
const product = {
    id: '1234789046',
    name: 'Product 1',
    Brand: 'marque',
    note : 3,
    comment : '39',
    price: 24,
    image: 'https://www.pngplay.com/wp-content/uploads/3/Veste-Transparentes-PNG.png',
};

export default function ProductCard() {

    return (
        <Card variant="productCard" p="4" borderColor="gray" bg="white" borderWidth="1px" borderRadius="lg" overflow="hidden">
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
                            <StarIcon key={i} className={i < product.note ? "h-5 w-5 text-dark-900" : "h-5 w-5 text-gray-400"} />
                        ))}
                    <Flex as="span" ml="2" fontSize="sm" alignItems="center">
                        <ChatBubbleLeftEllipsisIcon className="h-5 w-5 mr-2" />
                        {product.comment}
                    </Flex>
                </Flex>

                <Flex mt="3" alignItems="center" justifyContent="space-between">
                    <Box  fontSize="xl">
                        {product.price}€
                        <Box  as="span" fontSize="xl">
                            / Days
                        </Box>
                    </Box>
                    <IconButton variant="cartButton" aria-label="shopping cart" icon={ <ShoppingCartIcon width="24"  />} />
                </Flex>
            </Box>
        </Card>
    );
}