import { useEffect, useState } from "react";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import TableFooter from "@/features/admin/shared/TableFooter";
import CustomerTableBody from "@/features/admin/table/CustomerTableBody";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAllNamespaces } from "../../../../i18nUtils";
import { useGetAllUsersQuery } from "@/graphql/User/generated/GetAllUsers.generated";
import { useRouter } from "next/router";
import SearchAdmin from "@/features/admin/shared/SearchAdmin";

export default function Customers() {
  const router = useRouter();
  const { query } = router;
  const initialPage = query.page ? parseInt(query.page as string, 10) - 1 : 0;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const searchTerm = query.search ? query.search as string : '';

  const { data } = useGetAllUsersQuery({
    variables: {
      limit: 14,
      offset: currentPage * 14,
      email: searchTerm,
      firstname: searchTerm,
      name: searchTerm,
    }
  });
  const users = data?.getAllUsers.users ?? [];
  const totalUsers = data?.getAllUsers.total ?? 0;

  const itemsPerPage = 14;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + Math.min(itemsPerPage, users?.length ?? 0);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const nextPage = pageNumber + 1;
    const searchParam = searchTerm ? `&search=${searchTerm}` : '';
    router.push(`/admin/customers?page=${nextPage}${searchParam}`);
  };

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [query.page]);

  return (
    <LayoutAdmin pageTitle="Customer list">
      <div className="flex justify-between items-center">
        <h1>Customer list</h1>
        <SearchAdmin />
      </div>
      <div className="overflow-x-auto">
        <CustomerTableBody data={users} />
      </div>
      <TableFooter
        data={totalUsers}
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
