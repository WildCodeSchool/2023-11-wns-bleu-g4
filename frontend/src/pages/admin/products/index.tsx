import { useState } from "react";
import TableFooter from "@/features/admin/table/TableFooter";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import data from "@/features/admin/helpers/dummyProducts";
import ProductTableBody from "@/features/admin/table/ProductTableBody";

export default function Products() {
  const [sortedData, setSortedData] = useState<any[]>(data);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 16;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + Math.min(itemsPerPage, data?.length ?? 0);
  const currentOrders = sortedData.slice(startIndex, endIndex);

  return (
    <LayoutAdmin pageTitle="Product list">
      <h1>Product list</h1>
      <div className="overflow-x-auto">
        <ProductTableBody data={currentOrders} />
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
