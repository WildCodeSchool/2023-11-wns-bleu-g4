import Layout from "@/layouts/Layout";
import React from "react";
import {Grid, GridItem, useBreakpointValue} from "@chakra-ui/react";
import ProductGrid from "@/features/shop/product_grid/Productgrid";
import ProductFilter from "@/features/shop/filters/ProductFilter";

export default function Shop() {
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Layout pageTitle="Shop">
            <Grid
                templateAreas={isMobile ? `"topFilter" "Filter" "ProductGrid" "Pagination"` : `"topFilter topFilter" "Filter ProductGrid" "Filter Pagination"`}
                gridTemplateRows={isMobile ? 'auto auto 1fr auto' : '50px 1fr 30px'}
                gridTemplateColumns={isMobile ? '1fr' : '1fr 4fr'}
                gap='1'
                fontWeight='bold'
            >
                <GridItem pl='2' bg='orange.300' area={'topFilter'}>
                    topFilter
                </GridItem>
                <GridItem pl='2'  area={'Filter'}  top={0}>
                    <ProductFilter/>
                </GridItem>
                <GridItem pl='2'  area={'ProductGrid'}>
                    <ProductGrid />
                </GridItem>
                <GridItem pl='2' bg='blue.300' area={'Pagination'}>
                    Pagination
                </GridItem>
            </Grid>
        </Layout>
    );
}