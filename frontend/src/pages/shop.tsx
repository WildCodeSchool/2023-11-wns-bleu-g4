import Layout from "@/layouts/Layout";
import { Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import TopFilters from "@/features/shop/filters/TopFilters";
import ProductFilter from "@/features/shop/filters/ProductFilter";
import ProductGrid from "@/features/shop/product_grid/Productgrid";
import Pagination from "@/features/shop/Pagination";

export default function Shop() {
  const isMobile = useBreakpointValue({ base: true, md: false });

interface Product {
    // Define the properties of a product
}

const products: Product[] = []; 
  const totalProducts = 0; 
  const maxPages = 0; 
  const page = 0; 
  const sortOrder = null; 

  const handlePageChange = (newPage: number) => {
    
  };

  const handleSortChange = (newSortOrder: any) => {
    
  };

  return (
    <Layout pageTitle="Shop">
      <Grid
        templateAreas={
          isMobile
            ? `"topFilter" "Filter" "ProductGrid" "Pagination"`
            : `"topFilter topFilter" "Filter ProductGrid" "Filter Pagination"`
        }
        gridTemplateRows={isMobile ? "auto auto 1fr auto" : "50px 1fr 30px"}
        gridTemplateColumns={isMobile ? "1fr" : "1fr 4fr"}
        gap="10"
        fontWeight="bold"
        className="px-5 lg:px-24"
      >
        <GridItem area={"topFilter"} display="flex" justifyContent="flex-end">
          <TopFilters selectedSort={sortOrder} onSortChange={handleSortChange} />
        </GridItem>
        <GridItem area={"Filter"} top={0}>
          <ProductFilter />
        </GridItem>
        <GridItem area={"ProductGrid"}>
          <ProductGrid products={products} />
        </GridItem>
        <GridItem area={"Pagination"}>
          <Pagination setPage={handlePageChange} page={page} maxPages={maxPages} />
        </GridItem>
      </Grid>
    </Layout>
  );
}