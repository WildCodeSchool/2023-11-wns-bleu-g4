import ProductCreateModal from "@/features/admin/modal/productCreateModal";
import ProductTableBody from "@/features/admin/table/ProductTableBody";
import TableFooter from "@/features/admin/table/TableFooter";
import { useGetAllProductsQuery } from "@/graphql/Product/generated/getAllProducts.generated";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import { useDisclosure } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { getAllNamespaces } from "../../../../i18nUtils";

export default function Products() {
  const { data, refetch } = useGetAllProductsQuery();
  const products = data?.getAllProducts.products ?? [];
  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const itemsPerPage = 14;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + Math.min(itemsPerPage, products?.length ?? 0);
  const currentProducts = products.slice(startIndex, endIndex);

  const toggleCreateProductModal = () => {
    onOpen();
    isOpen ? onClose() : onOpen();
  };

  return (
    <LayoutAdmin pageTitle="Product list">
      <div className="flex justify-between items-center">
        <h1>Product list</h1>
        <button
          type="button"
          className="flex gap-2 items-center bg-accent font-semibold rounded-md text-white px-3 py-1"
          onClick={toggleCreateProductModal}
        >
          <PlusIcon className="h-6 w-6" />
          Add Product
        </button>
      </div>
      {isOpen && <ProductCreateModal isOpen={isOpen} onClose={onClose} refetch={refetch} />}
      <div className="overflow-x-auto">
        <ProductTableBody data={currentProducts} />
      </div>
      <TableFooter
        data={products}
        startIndex={startIndex}
        endIndex={endIndex}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </LayoutAdmin>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", getAllNamespaces())),
  },
});
