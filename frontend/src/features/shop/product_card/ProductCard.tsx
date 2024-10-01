import {Box, Card, Flex, IconButton, Image, Text} from "@chakra-ui/react";
import {ChatBubbleLeftEllipsisIcon, StarIcon as OutlineStarIcon, ShoppingCartIcon} from "@heroicons/react/24/outline";
import {StarIcon as SolidStarIcon} from "@heroicons/react/24/solid";
import {useRouter} from "next/router";

interface ProductCardProps {
  product: any;
}

export default function ProductCard({product}: ProductCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  const averageRating = product.reviews?.length
    ? product.reviews.reduce((acc: number, review: any) => acc + review.rate, 0) / product.reviews.length
    : 0;

  const totalReviews = product.reviews?.length || 0;

  return (
      <Card
          variant="productCard"
          p="4"
          bg="white"
          borderRadius="lg"
          boxShadow="lg"
          overflow="hidden"
          cursor="pointer"
          w={{ base: "100%", md: "250px" }}
          h="380px"
          _hover={{
            boxShadow: "dark-lg",
            transition: "0.6s"
          }}
      >
        <Flex justifyContent="center" alignItems="center">
          <Image src={product.thumbnail} alt={product.name} width="100%" />
        </Flex>
        <Box>
          <Text mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
            {product.name}
          </Text>
          <Text>{product.brand.name}</Text>
          <Flex mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <div key={i}>
                {i < averageRating ? (
                  <SolidStarIcon className="h-5 w-5 text-yellow-500"/>
                ) : (
                  <OutlineStarIcon className="h-5 w-5 text-gray-300"/>
                )}
              </div>
            ))}
          <Flex as="span" ml="2" fontSize="sm" alignItems="center">
            <ChatBubbleLeftEllipsisIcon className="h-5 w-5 mr-2"/>
            {totalReviews}
          </Flex>
          </Flex>
          <Flex mt="3" alignItems="center" justifyContent="space-between">
            <Box fontSize="xl">
              {product.price.toFixed(2)}€
              <Box as="span" fontSize="xl">
                / Day
              </Box>
            </Box>
            <IconButton variant="accentButton" aria-label="shopping cart" icon={<ShoppingCartIcon width="24" />} />
          </Flex>
        </Box>
      </Card>
  );
}