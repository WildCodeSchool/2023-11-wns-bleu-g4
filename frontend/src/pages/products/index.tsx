import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import { SortProduct } from "@/graphql/generated/schema";
import { useGetAllProductsByCategoryIdQuery } from "@/graphql/Product/generated/getAllProductsByCategorieID.generated";
import Layout from "@/layouts/Layout";
import ProductGrid from "@/features/shop/product_grid/Productgrid";
import Pagination from "@/features/shop/Pagination";
import ProductFilter from "@/features/shop/filters/ProductFilter";
import TopFilters from "@/features/shop/filters/TopFilters";
import Loading from "@/shared/components/Loading";

export default function ProductByCategory() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const router = useRouter();
  const { categoryId, sortOrder: sortOrderFromQuery, page: pageFromQuery } = router.query;

  const [sortOrder, setSortOrder] = useState<SortProduct | null>(null);
  const [page, setPage] = useState<number>(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const { data, error, loading, refetch } = useGetAllProductsByCategoryIdQuery({
    variables: {
      categoryId: selectedCategoryId,
      sortOrder,
      limit: 12,
      offset: page * 12,
    },
    skip: selectedCategoryId === null,
  });

  const updateUrlQuietly = useCallback(
    (newQuery: Record<string, string | number | null>) => {
      const query = { ...router.query, ...newQuery };
      Object.keys(query).forEach(key => query[key] === null && delete query[key]);
      router.push({ pathname: router.pathname, query }, undefined, { shallow: true });
    },
    [router],
  );

  useEffect(() => {
    console.log("URL changed, categoryId:", categoryId);
    if (categoryId) {
      const newCategoryId = parseInt(categoryId as string, 10);
      setSelectedCategoryId(newCategoryId);
      setPage(0);
    }
  }, [categoryId]);

  useEffect(() => {
    console.log("sortOrderFromQuery changed:", sortOrderFromQuery);
    setSortOrder((sortOrderFromQuery as SortProduct | null) || null);
  }, [sortOrderFromQuery]);

  useEffect(() => {
    console.log("pageFromQuery changed:", pageFromQuery);
    setPage(parseInt((pageFromQuery as string) || "1", 10) - 1);
  }, [pageFromQuery]);

  useEffect(() => {
    console.log("Refetching with:", { selectedCategoryId, sortOrder, page });
    if (selectedCategoryId !== null) {
      refetch({
        categoryId: selectedCategoryId,
        sortOrder,
        limit: 12,
        offset: page * 12,
      });
    }
  }, [selectedCategoryId, sortOrder, page, refetch]);

  const handleFilterChange = useCallback(
    (newCategoryId: number | null) => {
      console.log("Filter changed to:", newCategoryId);
      setSelectedCategoryId(newCategoryId);
      setPage(0);
      updateUrlQuietly({ categoryId: newCategoryId, page: 1 });
    },
    [updateUrlQuietly],
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      console.log("Page changed to:", newPage);
      const totalProducts = data?.getAllProducts.total ?? 0;
      const maxPages = Math.ceil(totalProducts / 12);
      if (newPage >= 0 && newPage < maxPages) {
        setPage(newPage);
        updateUrlQuietly({ page: newPage + 1 });
      }
    },
    [data?.getAllProducts.total, updateUrlQuietly],
  );

  const handleSortChange = useCallback(
    (newSortOrder: SortProduct | null) => {
      console.log("Sort changed to:", newSortOrder);
      setSortOrder(newSortOrder);
      updateUrlQuietly({ sortOrder: newSortOrder });
    },
    [updateUrlQuietly],
  );

  if (loading) return <Loading loading={loading} />;
  if (error) return <p>Error: {error.message}</p>;

  const products = data?.getAllProducts.products ?? [];
  const totalProducts = data?.getAllProducts.total ?? 0;
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
          <ProductFilter onFilterChange={handleFilterChange} selectedCategoryId={selectedCategoryId} />
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
