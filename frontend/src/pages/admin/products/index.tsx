import { useState } from "react";
import TableFooter from "@/features/admin/table/TableFooter";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import data from "@/features/admin/helpers/dummyProducts";
import ProductTableBody from "@/features/admin/table/ProductTableBody";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAllNamespaces } from "../../../../i18nUtils";
import { GetStaticProps } from "next";

export default function Products() {
  const [sortedData, setSortedData] = useState<any[]>(data);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 14;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + Math.min(itemsPerPage, data?.length ?? 0);
  const currentProducts = sortedData.slice(startIndex, endIndex);

  return (
    <LayoutAdmin pageTitle="Product list">
      <h1>Product list</h1>
      <div className="overflow-x-auto">
        <ProductTableBody data={currentProducts} />
      </div>
      <TableFooter
        data={sortedData}
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
