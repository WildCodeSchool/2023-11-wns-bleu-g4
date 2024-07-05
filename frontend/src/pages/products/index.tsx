import ProductFilter from "@/features/shop/filters/ProductFilter";
import ProductGrid from "@/features/shop/product_grid/Productgrid";
import Layout from "@/layouts/Layout";
import { Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function ProductByCategory() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const router = useRouter();
  const { categoryId: categoryIdStr } = router.query;
  const categoryId = parseInt(categoryIdStr as string);

  return (
    <Layout pageTitle="ProductByCategory">
      <Grid
        templateAreas={
          isMobile
            ? `"topFilter" "Filter" "ProductGrid" "Pagination"`
            : `"topFilter topFilter" "Filter ProductGrid" "Filter Pagination"`
        }
        gridTemplateRows={isMobile ? "auto auto 1fr auto" : "50px 1fr 30px"}
        gridTemplateColumns={isMobile ? "1fr" : "1fr 4fr"}
        gap="1"
        fontWeight="bold"
        className="px-5 lg:px-24"
      >
        <GridItem pl="2" bg="orange.300" area={"topFilter"}>
          topFilter
        </GridItem>
        <GridItem pl="2" area={"Filter"} top={0}>
          <ProductFilter />
        </GridItem>
        <GridItem pl="2" area={"ProductGrid"}>
          <ProductGrid categoryId={Number(categoryId)} />
        </GridItem>
        <GridItem pl="2" bg="blue.300" area={"Pagination"}>
          Pagination
        </GridItem>
      </Grid>
    </Layout>
  );
}
