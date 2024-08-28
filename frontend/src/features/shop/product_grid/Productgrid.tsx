import ProductCard from "@/features/shop/product_card/ProductCard";
import { Product } from "@/graphql/generated/schema";
import { Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import {useRouter} from "next/router";

interface ProductGridProps {
  products: any[] | Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const router = useRouter();
  const gridTemplateColumns = useBreakpointValue({
    base: "repeat(auto-fill, minmax(150px, auto))",
    md: "repeat(auto-fill, minmax(200px, auto))"
  });

  if (!products) return <p>Loading...</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
      <Grid templateColumns={gridTemplateColumns} gap={10}>
        {products.map((product) => (
            <GridItem key={product.id} colSpan={1} rowSpan={1}>
              <ProductCard product={product} />
            </GridItem>
        ))}
      </Grid>
  );
}
