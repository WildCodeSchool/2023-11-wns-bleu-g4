import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import Layout from "@/layouts/Layout";
import ProductGrid from "@/features/shop/product_grid/Productgrid";
import Pagination from "@/features/shop/Pagination";
import ProductFilter from "@/features/shop/filters/ProductFilter";
import TopFilters from "@/features/shop/filters/TopFilters";
import { useGetAllProductsQuery } from "@/graphql/Product/generated/getAllProducts.generated";
import { SortProduct } from "@/graphql/generated/schema";
import Loading from "@/shared/components/Loading";

export default function ShopPage() {
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const [sortOrder, setSortOrder] = useState<SortProduct | null>(null);
  const [page, setPage] = useState<number>(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);

  useEffect(() => {
    const { sortOrder: querySort, page: queryPage, categoryId: queryCategoryId, search: querySearch } = router.query;

    setSortOrder(querySort as SortProduct | null);
    setPage(queryPage ? parseInt(queryPage as string, 10) - 1 : 0);
    setSelectedCategoryId(queryCategoryId ? parseInt(queryCategoryId as string, 10) : null);
    setSearchQuery(querySearch as string | undefined);
  }, []);

  const { data, error, loading, refetch } = useGetAllProductsQuery({
    variables: {
      sortOrder,
      limit: 12,
      offset: page * 12,
      name: searchQuery,
      categoryId: selectedCategoryId,
    },
  });

  const updateUrlQuietly = useCallback((newQuery: Record<string, string | number | null>) => {
    const query = { ...router.query, ...newQuery };
    Object.keys(query).forEach(key => query[key] === null && delete query[key]);
    router.push({ pathname: router.pathname, query }, undefined, { shallow: true });
  }, [router]);

  const handleFilterChange = useCallback((categoryId: number | null) => {
    setSelectedCategoryId(categoryId);
    setPage(0);
    updateUrlQuietly({ categoryId, page: 1 });
  }, [updateUrlQuietly]);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    updateUrlQuietly({ page: newPage + 1 });
  }, [updateUrlQuietly]);

  const handleSortChange = useCallback((newSortOrder: SortProduct | null) => {
    setSortOrder(newSortOrder);
    updateUrlQuietly({ sortOrder: newSortOrder });
  }, [updateUrlQuietly]);

  useEffect(() => {
    refetch({
      sortOrder,
      limit: 12,
      offset: page * 12,
      name: searchQuery,
      categoryId: selectedCategoryId,
    });
  }, [sortOrder, page, selectedCategoryId, searchQuery, refetch]);

  if (loading) return <Loading loading={loading} />;
  if (error) return <p>Error: {error.message}</p>;

  const products = data?.getAllProducts.products || [];
  const totalProducts = data?.getAllProducts.total || 0;
  const maxPages = Math.ceil(totalProducts / 12);

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
            <ProductFilter onFilterChange={handleFilterChange} />
          </GridItem>
          <GridItem area={"ProductGrid"}>
            <ProductGrid products={products} loading={loading} />
          </GridItem>
          <GridItem area={"Pagination"}>
            <Pagination setPage={handlePageChange} page={page} maxPages={maxPages} />
          </GridItem>
        </Grid>
      </Layout>
  );
}