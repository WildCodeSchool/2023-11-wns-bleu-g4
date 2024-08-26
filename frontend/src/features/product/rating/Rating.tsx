import {useProductContext} from "@/context/ProductPageContext";
import {useGetAllReviewsQuery} from "@/graphql/Review/generated/getAllReviews.generated";
import {Box, Divider, Flex, Image, Stack, Text, useColorModeValue} from "@chakra-ui/react";
import {StarIcon as OutlineStarIcon} from "@heroicons/react/24/outline";
import {StarIcon} from "@heroicons/react/24/solid";
import {toNumber} from "lodash";

export default function Rating() {
  const colorScheme = useColorModeValue('#000', '#fff');
  const colorScheme2 = useColorModeValue('#000', '#000');
  const {state: {selectedProduct}} = useProductContext();
  const productId = selectedProduct?.id;

  const {data, loading, error} = useGetAllReviewsQuery({
    variables: {productId: productId ? toNumber(productId) : undefined}
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading reviews</Text>;
  if (!data || !data.getAllReviews || data.getAllReviews.length === 0) {
    return <Text>No reviews found.</Text>;
  }

  return (
    <Box width="100%" px={{base: 0, xl: "8rem"}} mt={{base: "3rem", xl: "6rem"}}>
      <Text fontSize="22px" fontWeight="700">Customer reviews</Text>
      <Divider borderColor={colorScheme} borderWidth={1} my="20px"/>
      <Stack spacing={4} mt={4} justifyContent="center">
        {data.getAllReviews.map((review) => (
          <Box
            key={review.id}
            px={{base: "20px", xl: "60px"}}
            py="23px"
            borderWidth={1}
            borderRadius="lg"
            display="flex"
            flexDirection="row"
            bg="#F5EEE5"
            gap="38px"
            alignItems="flex-start"
          >
            <Image src={review.user.avatar} alt="" width="5%" h="auto" display={{base: "none", md: "initial"}}/>
            <Flex flexDirection="column" w="100%" gap={2}>
              <Flex justifyContent="space-between" alignItems="center">
                <Flex gap={1} alignItems="center">
                  <Text
                    fontSize="18px"
                    fontWeight="700"
                    fontFamily="Poppins"
                    color={colorScheme2}
                  >
                    {review.user.firstname}
                  </Text>
                  <Text
                    fontSize="18px"
                    fontWeight="700"
                    fontFamily="Poppins"
                    color={colorScheme2}
                  >
                    {review.user.name.slice(0, 1)}.
                  </Text>
                </Flex>
                <Flex alignItems="center">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <div key={index}>
                      {index <= review.rate ? (
                        <StarIcon className="h-5 w-5 text-yellow-500"/>
                      ) : (
                        <OutlineStarIcon className="h-5 w-5 text-gray-300"/>
                      )}
                    </div>
                  ))}
                </Flex>
              </Flex>
              <Text fontWeight="500" color={colorScheme2}>{review.comment}</Text>
            </Flex>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
