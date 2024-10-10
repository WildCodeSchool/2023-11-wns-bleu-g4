import { Flex, Heading, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { orderTableHeaders } from "../helpers/tableHeaders";
import { useGetBookingsByUserIdQuery } from "@/graphql/Booking/generated/GetBookingByUserId.generated";
import { useRouter } from "next/router";
import transformToDate from "../helpers/TransformDate";
import TableFooter from "./TableFooter";
import { useEffect, useState } from "react";
import { StatusBooking } from "@/graphql/generated/schema";

export default function UserOrdersTable() {
  /** Translations */
  const { t } = useTranslation("UserOrders");

  /** DARK / LIGHT MODE */
  const bgTableHeadColor = useColorModeValue("#d0d2d6", "cactus.900");
  const bgColor = useColorModeValue("footerBgLight", "cactus.600");
  const bgTableContent = useColorModeValue("lightgrey", "cactus.700");
  const bgWarning = useColorModeValue("#ab1313", "#620C0C");
  const textColor = useColorModeValue("dark", "light");
  const hoverTableColor = useColorModeValue("gray.400", "cactus.400");
  const hoverTableCancelColor = useColorModeValue("red.800", "orange.800");

  /** Router */
  const router = useRouter();
  const { query } = router;
  const goToDetails = (bookingId: number) => {
    router.push(`/account/orders/${bookingId}`);
  };

  /** Pagination 1/2 */
  const initialPage = query.page ? parseInt(query.page as string, 10) - 1 : 0;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const itemsPerPage = 10;

  /** Queries - Mutations */
  const { data } = useGetBookingsByUserIdQuery({
    variables: {
      limit: itemsPerPage,
      offset: currentPage * itemsPerPage,
    },
  });
  const bookings = data?.getBookingsByUserId.bookings || [];
  const totalProducts = data?.getBookingsByUserId.total;

  /** Pagination 2/2 */
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + Math.min(itemsPerPage, bookings?.length ?? 0);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const nextPage = pageNumber + 1;
    router.push(`/account?page=${nextPage}`);
  };

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [query.page]);

  const handleBGColor = (index: number) => {
    if (bookings[index].status === StatusBooking.Canceled) return bgWarning;
    return index % 2 === 0 ? bgColor : bgTableContent;
  };

  const thClass = "h-14 p-3 text-center uppercase font-bold whitespace-nowrap";
  return (
    <Flex className="flex flex-col w-full" gap={2}>
      <Table className="text-md max-w-full rounded overflow-hidden">
        <Thead color={textColor}>
          <Tr bg={bgTableHeadColor}>
            {orderTableHeaders.map(menu => (
              <Th className={thClass + " " + menu.thClass} key={menu.id}>
                <Heading size="md" className="text-center">
                  {menu.name}
                </Heading>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {bookings ? (
            bookings.map((booking: any, index: number) => (
              <Tr
                bg={handleBGColor(index)}
                textColor={booking.status === StatusBooking.Canceled ? "white" : textColor}
                key={booking.id}
                _hover={{ bg: booking.status === StatusBooking.Canceled ? hoverTableCancelColor : hoverTableColor }}
                className={`hover:text-white whitespace-nowrap max-h-14 cursor-pointer`}
                onClick={() => goToDetails(booking.id)}
              >
                <Td
                  className="text-center whitespace-normal p-3 min-w-fit max-w-96 xl:max-w-48 2xl:max-w-60"
                  title={t("invoice number")}
                >
                  <Text className="text-center">{booking.invoice}</Text>
                </Td>
                <Td
                  className="text-center hidden whitespace-nowrap p-3 min-w-fit max-w-96 xl:max-w-48 md:table-cell"
                  title={t("booking date")}
                >
                  <Text className="text-center">{transformToDate(booking.bookingDate)}</Text>
                </Td>
                <Td
                  className="text-center hidden whitespace-nowrap p-3 min-w-fit max-w-96  xl:max-w-48 overflow-hidden
                  text-ellipsis sm:table-cell"
                  title={t("agency name")}
                >
                  <Text className="text-center">{booking.agency.name}</Text>
                </Td>
                <Td
                  className="text-center hidden whitespace-nowrap p-3 min-w-fit max-w-28 xl:max-w-48 2xl:table-cell"
                  title={t("start booking date")}
                >
                  <Text className="text-center">{transformToDate(booking.startDate)}</Text>
                </Td>
                <Td
                  className="text-center hidden whitespace-nowrap p-3 min-w-fit max-w-28 xl:max-w-48 2xl:table-cell"
                  title={t("end booking date")}
                >
                  <Text className="text-center">{transformToDate(booking.endDate)}</Text>
                </Td>
                <Td
                  className="text-center hidden whitespace-nowrap p-3 min-w-fit max-w-28 xl:max-w-48 xl:table-cell"
                  title={t("booking status")}
                >
                  <Text className="text-center">{booking.status}</Text>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td className="p-4 text-center" colSpan={4}>
                No booking found...
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
      <TableFooter
        data={totalProducts}
        startIndex={startIndex}
        endIndex={endIndex}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={handlePageChange}
      />
    </Flex>
  );
}
