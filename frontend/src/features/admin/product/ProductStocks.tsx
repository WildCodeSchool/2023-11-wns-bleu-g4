import { useEffect, useState } from "react";
import ProductStockTableBody from "./table/ProductStockTableBody";
import TableFooter from "../shared/TableFooter";
import { Product } from "./types";
import {
  useGetProductCodesByProductIdQuery
} from "@/graphql/ProductCode/generated/GetProductCodesByProductId.generated";
import { useRouter } from "next/router";

export default function ProductStocks({ product }: { product: Product }) {
  const router = useRouter();
  const { query } = router;
  const initialPage = query.page ? parseInt(query.page as string, 10) - 1 : 0;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const { data, refetch } = useGetProductCodesByProductIdQuery({
    variables: {
      limit: 14,
      offset: currentPage * 14,
      productId: product?.id!,
    }
  });
  const productCodes = data?.getProductCodesByProductId.productCodes ?? [];
  const totalProductCodes = data?.getProductCodesByProductId.total ?? 0;

  const itemsPerPage = 14;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + Math.min(itemsPerPage, productCodes.length ?? 0);

  const uniqueAgencies = new Set<number>(
    productCodes.map((productCode: any) => productCode.agency.id)
  );
  const totalProductCodesAgencies = uniqueAgencies.size;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const nextPage = pageNumber + 1;
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        productCodes: `page=${nextPage}`,
      },
    });
  };

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [query.page]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-2 items-center">
        <h3>Stocks</h3>
        <span className="text-xl">({totalProductCodes})</span>
      </div>
      <ProductStockTableBody data={productCodes} refetch={refetch} />
      <TableFooter
        data={totalProductCodesAgencies}
        startIndex={startIndex}
        endIndex={endIndex}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={handlePageChange}
      />
    </div>
  );
}
