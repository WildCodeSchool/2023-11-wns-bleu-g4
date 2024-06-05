import { Grid, GridItem } from "@chakra-ui/react";
import ProductCard from "@/features/shop/product_card/ProductCard";

export default function ProductGrid() {
    return (
        <Grid
            templateColumns="repeat(4, 1fr)"
            templateRows="repeat(3, 1fr)"
            gap={6}
            padding="20px"
        >
            <GridItem colSpan={1} rowSpan={1} bg="blue.200">
                <ProductCard/>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} bg="blue.200">
                <ProductCard/>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} bg="blue.200">
                <ProductCard/>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} bg="blue.200">
                <ProductCard/>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} bg="blue.200">
                <ProductCard/>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} bg="blue.200">
                <ProductCard/>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} bg="blue.200">
                <ProductCard/>
            </GridItem>
        </Grid>
    );
}