import { useState } from "react";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import TableFooter from "@/features/admin/table/TableFooter";
import data from "@/features/admin/helpers/dummyCustomers";
import CustomerTableBody from "@/features/admin/table/CustomerTableBody";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAllNamespaces } from "./../../../../i18nUtils";

export default function Customers() {
  const [sortedData, setSortedData] = useState<any[]>(data);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 14;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + Math.min(itemsPerPage, data?.length ?? 0);
  const currentCustomers = sortedData.slice(startIndex, endIndex);

  return (
    <LayoutAdmin pageTitle="Customer list">
      <h1>Customer list</h1>
      <div className="overflow-x-auto">
        <CustomerTableBody data={currentCustomers} />
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
