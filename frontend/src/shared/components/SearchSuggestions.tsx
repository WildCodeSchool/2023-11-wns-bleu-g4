import { Box, List, ListItem } from "@chakra-ui/react";
import { GetAllProductsQuery } from "@/graphql/Product/generated/getAllProducts.generated";

interface SearchSuggestionsProps {
  suggestions: GetAllProductsQuery["getAllProducts"]["products"];
  onSuggestionClick: (productId: number) => void;
}

export default function SearchSuggestions({ suggestions, onSuggestionClick }: SearchSuggestionsProps) {
  return (
    <Box width="full">
      {suggestions.length > 0 && (
        <List
          backgroundColor="white"
          borderWidth={1}
          borderRadius="md"
          boxShadow="md"
          maxHeight="300px"
          overflowY="auto"
        >
          {suggestions.map((product) => (
            <ListItem
              key={product.id}
              px={4}
              py={2}
              _hover={{ backgroundColor: "gray.100" }}
              cursor="pointer"
              onClick={() => onSuggestionClick(product.id)}
            >
              {product.name}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}