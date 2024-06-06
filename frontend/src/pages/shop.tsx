import Layout from "@/layouts/Layout";
import React from "react";
import {Grid, GridItem} from "@chakra-ui/react";
import ProductGrid from "@/features/shop/product_grid/Productgrid";
import ProductFilter from "@/features/shop/filters/ProductFilter";

export default function Shop() {
    return (
        <Layout pageTitle="Shop">
            <Grid
                templateAreas={`"topFilter topFilter"
                  "Filter ProductGrid"
                  "Filter Pagination"`}
                gridTemplateRows={'50px 1fr 30px'}
                gridTemplateColumns={'1fr 4fr'}
                gap='1'
                fontWeight='bold'
            >
                <GridItem pl='2' bg='orange.300' area={'topFilter'}>
                    topFilter
                </GridItem>
                <GridItem pl='2'  area={'Filter'}>
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