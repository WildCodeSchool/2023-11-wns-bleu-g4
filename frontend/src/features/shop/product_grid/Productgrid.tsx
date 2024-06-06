import {Grid, GridItem, useBreakpointValue} from "@chakra-ui/react";
import ProductCard from "@/features/shop/product_card/ProductCard";

export default function ProductGrid() {
    const gridTemplateColumns = useBreakpointValue({ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" });

    return (
        <Grid
            templateColumns={gridTemplateColumns}
            templateRows="repeat(3, 1fr)"
            gap={6}
            padding="20px"
        >
            <GridItem colSpan={1} rowSpan={1} >
                <ProductCard/>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} >
                <ProductCard/>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} >
                <ProductCard/>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} >
                <ProductCard/>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} >
                <ProductCard/>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} >
                <ProductCard/>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} >
                <ProductCard/>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} >
                <ProductCard/>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} >
                <ProductCard/>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} >
                <ProductCard/>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} >
                <ProductCard/>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} >
                <ProductCard/>
            </GridItem>
        </Grid>
    );
}