import ProductCreateModal from "@/features/admin/product/modal/ProductCreateModal";
import ProductTableBody from "@/features/admin/product/table/ProductTableBody";
import TableFooter from "@/features/admin/shared/TableFooter";
import { useGetAllProductsQuery } from "@/graphql/Product/generated/getAllProducts.generated";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import { PlusIcon } from "@heroicons/react/24/solid";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { getAllNamespaces } from "../../../../i18nUtils";
import { useRouter } from "next/router";
import SearchAdmin from "@/features/admin/shared/SearchAdmin";

export default function Products() {
  const router = useRouter();
  const { query } = router;
  const initialPage = query.page ? parseInt(query.page as string, 10) - 1 : 0;
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const searchTerm = query.search ? query.search as string : '';

  const { data, refetch } = useGetAllProductsQuery({
    variables: {
      limit: 14,
      offset: currentPage * 14,
      name: searchTerm,
    }
  });
  const products = data?.getAllProducts.products ?? [];
  const totalProducts = data?.getAllProducts.total ?? 0;

  const itemsPerPage = 14;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + Math.min(itemsPerPage, products?.length ?? 0);

  const toggleCreateProductModal = () => setIsCreateModalOpen(!isCreateModalOpen);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const nextPage = pageNumber + 1;
    const searchParam = searchTerm ? `&search=${searchTerm}` : '';
    router.push(`/admin/products?page=${nextPage}${searchParam}`);
  };

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [query.page]);

  return (
    <LayoutAdmin pageTitle="Product list">
      <div className="flex justify-between items-center">
        <h1>Product list</h1>
        <div className="flex gap-4">
          <button
            type="button"
            className="flex gap-2 items-center bg-accent font-semibold rounded text-white px-3 py-1"
            onClick={toggleCreateProductModal}
          >
            <PlusIcon className="h-6 w-6" />
            Add Product
          </button>
          <SearchAdmin />
        </div>
      </div>
      {isCreateModalOpen &&
        <ProductCreateModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(!isCreateModalOpen)}
          refetch={refetch}
        />
      }
      <div className="overflow-x-auto">
        <ProductTableBody data={products} refetch={refetch} />
      </div>
      <TableFooter
        data={totalProducts}
        startIndex={startIndex}
        endIndex={endIndex}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={handlePageChange}
      />
    </LayoutAdmin>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", getAllNamespaces())),
  },
});
