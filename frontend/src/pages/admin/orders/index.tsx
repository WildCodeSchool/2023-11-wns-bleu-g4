import { useEffect, useState } from "react";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import TableFooter from "@/features/admin/shared/TableFooter";
import OrderTableBody from "@/features/admin/orders/OrderTableBody";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAllNamespaces } from "@root/i18nUtils";
import { GetStaticProps } from "next";
import { useGetAllBookingQuery } from "@/graphql/Booking/generated/GetAllBooking.generated";
import { useRouter } from "next/router";
import SearchAdmin from "@/features/admin/shared/SearchAdmin";

export default function Orders() {
  const router = useRouter();
  const { query } = router;
  const initialPage = query.page ? parseInt(query.page as string, 10) - 1 : 0;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const searchTerm = query.search ? query.search as string : '';

  const { data, refetch } = useGetAllBookingQuery({
    variables: {
      limit: 14,
      offset: currentPage * 14,
      // agencyId: isNaN(parseInt(searchTerm)) ? undefined : parseInt(searchTerm),
      bookingId: isNaN(parseInt(searchTerm)) ? undefined : parseInt(searchTerm),
      userFirstname: searchTerm,
      userName: searchTerm,
    }
  });
  const [sortedData, setSortedData] = useState<any[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  const orders = data?.getAllBooking.bookings ?? [];
  const totalOrders = data?.getAllBooking.total ?? 0;

  const itemsPerPage = 14;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + Math.min(itemsPerPage, orders?.length ?? 0);

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

    const dataCopySorted = orders.slice().sort((a: any, b: any) => {
      if (newSortOrder === "asc") return newSortColumn ? (a[newSortColumn] > b[newSortColumn] ? 1 : -1) : 0;
      return newSortColumn ? (a[newSortColumn] < b[newSortColumn] ? 1 : -1) : 0;
    });
    setSortedData(dataCopySorted);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const nextPage = pageNumber + 1;
    const searchParam = searchTerm ? `&search=${searchTerm}` : '';
    router.push(`/admin/orders?page=${nextPage}${searchParam}`);
  };

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [query.page]);

  useEffect(() => {
    setSortedData(orders);
  }, [orders]);

  return (
    <LayoutAdmin pageTitle="Order list">
      <h1>Order list</h1>
      <SearchAdmin paramName="search" />
      <div className="overflow-x-auto">
        <OrderTableBody
          data={sortedData}
          refetch={refetch}
          sortOrder={sortOrder}
          sortColumnName={sortColumn}
          handleDateSort={handleDateSort}
        />
      </div>
      <TableFooter
        data={totalOrders}
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
