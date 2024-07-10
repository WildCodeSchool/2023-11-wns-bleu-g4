import { useEffect, useState } from "react";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import TableFooter from "@/features/admin/table/TableFooter";
import CustomerTableBody from "@/features/admin/table/CustomerTableBody";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAllNamespaces } from "@root/i18nUtils";
import { useGetAllUsersQuery } from "@/graphql/User/generated/GetAllUsers.generated";
import { useRouter } from "next/router";

export default function Customers() {
  const router = useRouter();
  const { query } = router;
  const initialPage = query.page ? parseInt(query.page as string, 10) - 1 : 0;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const { data } = useGetAllUsersQuery({
    variables: {
      limit: 14,
      offset: currentPage * 14,
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
    router.push(`/admin/customers?page=${nextPage}`);
  };

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [query.page]);

  return (
    <LayoutAdmin pageTitle="Customer list">
      <h1>Customer list</h1>
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
