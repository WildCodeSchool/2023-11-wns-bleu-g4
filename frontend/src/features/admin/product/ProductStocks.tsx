import { useState } from "react";
import TableFooter from "../table/TableFooter";
import ProductStockTableBody from "../table/ProductStockTableBody";

export default function ProductStocks({ product }: { product: any }) {
  const [sortedData, setSortedData] = useState<any[]>(product.stocks);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 14;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + Math.min(itemsPerPage, product.stocks.length ?? 0);
  const currentProductStocks = sortedData?.slice(startIndex, endIndex);

  const totalStocks = product.stocks.reduce((total: any, stock: any) => total + stock.quantity, 0);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-2 items-center">
        <h2>Stocks</h2>
        <span className="text-xl">({totalStocks})</span>
      </div>
      <ProductStockTableBody data={currentProductStocks} />
      <TableFooter
        data={sortedData}
        startIndex={startIndex}
        endIndex={endIndex}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
