import { useState } from "react";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import TableFooter from "@/features/admin/table/TableFooter";
import data from "@/features/admin/helpers/dummyCustomers";
import CustomerTableBody from "@/features/admin/table/CustomerTableBody";

export default function Customers() {
  const [sortedData, setSortedData] = useState<any[]>(data);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 16;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + Math.min(itemsPerPage, data?.length ?? 0);
  const currentCustomers = sortedData.slice(startIndex, endIndex);

  return (
    <LayoutAdmin pageTitle="Customer list">
      <h1>Customer list</h1>
      <div className="overflow-x-auto">
        <CustomerTableBody
          data={currentCustomers}
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
