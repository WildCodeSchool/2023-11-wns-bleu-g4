import Pagination from "@/features/shop/Pagination";
import ProductFilter from "@/features/shop/filters/ProductFilter";
import TopFilters from "@/features/shop/filters/TopFilters";
import ProductGrid from "@/features/shop/product_grid/Productgrid";
import { useGetAllProductsQuery } from "@/graphql/Product/generated/getAllProducts.generated";
import { SortProduct } from "@/graphql/generated/schema";
import Layout from "@/layouts/Layout";
import { Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ShopPage() {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const router = useRouter();
    const sortOrderFromQuery = router.query.sortOrder as SortProduct | undefined;

    const [sortOrder, setSortOrder] = useState<SortProduct | null>(
        sortOrderFromQuery ?? null
    );
    const [page, setPage] = useState(0);

    const { data, error, loading, refetch } = useGetAllProductsQuery({
        variables: {
            sortOrder,
            limit: 12,
            offset: page * 12,
        },
    });

    useEffect(() => {
        refetch({ sortOrder });
    }, [sortOrder, refetch]);

    useEffect(() => {
        setSortOrder(sortOrderFromQuery ?? null);
    }, [sortOrderFromQuery]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // ? Filtrer les produits sans catégorie
    const products = data?.getAllProducts.products.filter(product => product.category) ?? [];
    const totalProducts = data?.getAllProducts.total ?? 0;
    const maxPages = Math.ceil(totalProducts / 12);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page: newPage },
        });
    };

    const handleSortChange = (newSortOrder: SortProduct | null) => {
        if (newSortOrder !== null) {
            setSortOrder(newSortOrder);
            router.push({
                pathname: router.pathname,
                query: { ...router.query, sortOrder: newSortOrder },
            });
        } else {
            const { sortOrder, ...queryWithoutSortOrder } = router.query;
            setSortOrder(null);
            router.push({
                pathname: router.pathname,
                query: queryWithoutSortOrder,
            });
        }
    };

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