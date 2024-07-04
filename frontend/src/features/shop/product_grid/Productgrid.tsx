import ProductCard from "@/features/shop/product_card/ProductCard";
import { useGetAllProductsByCategoryIdQuery } from "@/graphql/Product/generated/getAllProductsByCategoryID.generated";
import { Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";

interface ProductGridProps {
  categoryId: number;
}

export default function ProductGrid({ categoryId }: ProductGridProps) {
  const gridTemplateColumns = useBreakpointValue({ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" });
  const {
    data: productData,
    error: productError,
    loading: productLoading,
  } = useGetAllProductsByCategoryIdQuery({
    variables: { categoryId },
    skip: typeof categoryId === "undefined",
  });

  if (productLoading) return <p>Loading...</p>;
  if (productError) return <p>Error: {productError.message}</p>;

  return (
    <Grid templateColumns={gridTemplateColumns} gap={6} padding="20px">
      {productData?.getAllProducts.map(product => (
        <GridItem key={product.id} colSpan={1} rowSpan={1}>
          <ProductCard product={product} />
        </GridItem>
      ))}
    </Grid>
  );
}
