import { useState } from "react";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import TableFooter from "@/features/admin/table/TableFooter";
import OrderTableBody from "@/features/admin/table/OrderTableBody";
import data from "@/features/admin/helpers/dummyOrders";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAllNamespaces } from "../../../../i18nUtils";
import { GetStaticProps } from "next";

export default function Orders() {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [sortedData, setSortedData] = useState<any[]>(data);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 14;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + Math.min(itemsPerPage, data?.length ?? 0);
  const currentOrders = sortedData.slice(startIndex, endIndex);

  const toggleSortOrder = (
    columnName: string,
    currentSortColumn: string | null,
    currentSortOrder: "asc" | "desc" | null,
  ): { sortColumnName: string | null; sortOrder: "asc" | "desc" | null } => {
    switch (true) {
      case currentSortColumn === columnName && currentSortOrder === "asc":
        return { sortColumnName: columnName, sortOrder: "desc" };
      case currentSortColumn === columnName && currentSortOrder === "desc":
        return { sortColumnName: null, sortOrder: null };
      default:
        return { sortColumnName: columnName, sortOrder: "asc" };
    }
  };

  const handleDateSort = (columnName: string) => {
    const { sortColumnName: newSortColumn, sortOrder: newSortOrder } = toggleSortOrder(
      columnName,
      sortColumn,
      sortOrder,
    );
    setSortColumn(newSortColumn);
    setSortOrder(newSortOrder);

    const dataCopySorted = data.slice().sort((a: any, b: any) => {
      if (newSortOrder === "asc") return newSortColumn ? (a[newSortColumn] > b[newSortColumn] ? 1 : -1) : 0;
      return newSortColumn ? (a[newSortColumn] < b[newSortColumn] ? 1 : -1) : 0;
    });
    setSortedData(dataCopySorted);
  };

  return (
    <LayoutAdmin pageTitle="Order list">
      <h1>Order list</h1>
      <div className="overflow-x-auto">
        <OrderTableBody
          data={currentOrders}
          sortOrder={sortOrder}
          sortColumnName={sortColumn}
          handleDateSort={handleDateSort}
        />
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