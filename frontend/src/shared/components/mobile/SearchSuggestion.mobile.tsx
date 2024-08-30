import { Box, List, ListItem, Image, Text, Flex, Divider } from "@chakra-ui/react";
import { GetAllProductsQuery } from "@/graphql/Product/generated/getAllProducts.generated";

interface SearchSuggestionsMobileProps {
  suggestions: GetAllProductsQuery["getAllProducts"]["products"];
  onSuggestionClick: (productId: number) => void;
}

export default function SearchSuggestionsMobile({ suggestions, onSuggestionClick }: SearchSuggestionsMobileProps) {
  return (
    <Box width="auto" mt={4}>
      {suggestions.length > 0 && (
          <List>
            {suggestions.map((product) => (
                <ListItem
                    key={product.id}
                    px={4}
                    py={2}
                    _hover={{backgroundColor: "gray.100"}}
                    cursor="pointer"
                    onClick={() => onSuggestionClick(product.id)}
                >
                  <Flex align="center">
                    <Image
                        src={product.thumbnail}
                        alt={product.name}
                        boxSize="50px"
                        objectFit="cover"
                        borderRadius="md"
                        mr={4}
                    />
                    <Text>{product.name.toLowerCase()}</Text>
                  </Flex>
                  <Divider m={6} orientation='horizontal'/>
                </ListItem>

            ))}
          </List>
      )}
    </Box>
  );
}