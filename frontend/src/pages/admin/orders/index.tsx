import { useState } from "react";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import AdminTableFooter from "@/features/admin/table/AdminTableFooter";
import AdminTableBody from "@/features/admin/table/AdminTableBody";
import data from "@/features/admin/helpers/dummyOrders";

export default function Orders() {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [sortedData, setSortedData] = useState<any[]>(data);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 16;
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
      <div className="overflow-x-auto overflow-y-hidden">
        <AdminTableBody
          data={currentOrders}
          sortOrder={sortOrder}
          sortColumnName={sortColumn}
          handleDateSort={handleDateSort}
        />
      </div>
      <AdminTableFooter
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
