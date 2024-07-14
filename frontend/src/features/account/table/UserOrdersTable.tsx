import { Box, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { orderTableHeaders } from "../helpers/tableHeaders"
import { useGetBookingsByUserIdQuery } from "@/graphql/Booking/generated/GetBookingByUserId.generated";
import { useRouter } from "next/router";
import transformToDate from "../helpers/TransformDate";
import TableFooter from "./TableFooter";
import { useEffect, useState } from "react";

export default function UserOrdersTable() {
    /** Translations */
    const { t } = useTranslation("UserOrders");

    /** Router */
    const router = useRouter()
    const { query } = router;
    const goToDetails = (bookingId: number) => {
        router.push(`/account/orders/${bookingId}`)
    }

    /** Pagination 1/2 */
    const initialPage = query.page ? parseInt(query.page as string, 10) - 1 : 0;
    const [currentPage, setCurrentPage] = useState(initialPage);
    const itemsPerPage = 10;

    /** Queries - Mutations */
    const { data } = useGetBookingsByUserIdQuery({
        variables: {
            userId: parseInt(query?.id as string),
            limit: itemsPerPage,
            offset: currentPage * itemsPerPage
        }
    })
    const bookings = data?.getBookingsByUserId.bookings || []
    const totalProducts = data?.getBookingsByUserId.total

    /** Pagination 2/2 */
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + Math.min(itemsPerPage, bookings?.length ?? 0);
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        const nextPage = pageNumber + 1;
        console.log(query.id)
        router.push(`/account/user/${query.id}?page=${nextPage}`);
    };

    useEffect(() => {
        setCurrentPage(initialPage);
    }, [query.page]);

    const thClass = "h-14 p-3 text-center uppercase font-bold whitespace-nowrap"
    return (
        <Flex className="flex flex-col w-full sm:mx-auto lg:mx-0 sm:max-w-full xl:w-fit" gap={2}>
            <table className="text-xs rounded bg-cactus-700 max-w-full">
                <thead className="bg-cactus-900">
                    <tr>
                        {orderTableHeaders.map(menu => (
                            <th
                                className={thClass + " " + menu.thClass}
                                key={menu.id}
                            >
                                {menu.name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {bookings ? (
                        bookings.map((booking: any, index: number) => (
                            <tr
                                key={booking.id}
                                className={`${index % 2 === 0 && "bg-cactus-600"} whitespace-nowrap hover:bg-cactus-400 max-h-14 cursor-pointer`}
                                onClick={() => goToDetails(booking.id)}
                            >
                                <td className="text-center whitespace-nowrap p-3 min-w-25 max-w-40 xl:min-w-40 xl:max-w-72" title={t('invoice number')}>{booking.invoice}</td>
                                <td className="text-center whitespace-nowrap p-3 min-w-25 max-w-40 xl:min-w-40 xl:max-w-72" title={t('booking date')}>{transformToDate(booking.bookingDate)}</td>
                                <td className="text-center hidden whitespace-nowrap p-3 min-w-25 max-w-40 xl:min-w-40 xl:max-w-72 overflow-hidden text-ellipsis sm:table-cell" title={t('agency name')}>{booking.agency.name}</td>
                                <td className="text-center hidden whitespace-nowrap p-3 min-w-25 max-w-40 xl:min-w-40 xl:max-w-72 sm:table-cell" title={t('start booking date')}>{transformToDate(booking.startDate)}</td>
                                <td className="text-center hidden whitespace-nowrap p-3 min-w-25 max-w-40 xl:min-w-40 xl:max-w-72 sm:table-cell" title={t('end booking date')}>{transformToDate(booking.endDate)}</td>
                                <td className="text-center hidden whitespace-nowrap p-3 min-w-25 max-w-40 xl:min-w-40 xl:max-w-72 sm:table-cell" title={t('booking status')}>{booking.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="p-4 text-center" colSpan={4}>
                                No booking found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <TableFooter
                data={totalProducts}
                startIndex={startIndex}
                endIndex={endIndex}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                setCurrentPage={handlePageChange}
            />
        </Flex>
    )
}