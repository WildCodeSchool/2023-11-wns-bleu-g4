import { Flex, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { orderDetailsHeaders } from "../helpers/tableHeaders"
import { useGetBookingItemsByBookingIdQuery } from "@/graphql/BookingItem/generated/GetBookingItemsByBookingId.generated";
import { useRouter } from "next/router";
import transformToDate from "../helpers/TransformDate";
import TableFooter from "./TableFooter";
import { useEffect, useState } from "react";

export default function UserOrdersDetailsTable() {

    const { t } = useTranslation("UserOrderDetails");

    /** Router */
    const router = useRouter()
    const { query } = router;

    /** Pagination 1/2 */
    const initialPage = query.page ? parseInt(query.page as string, 10) - 1 : 0;
    const [currentPage, setCurrentPage] = useState(initialPage);
    const itemsPerPage = 10;
    const startIndex = currentPage * itemsPerPage;

    const { data } = useGetBookingItemsByBookingIdQuery({
        variables: {
            bookingId: parseInt(query.id as string)
        }
    })
    const bookingItems = data?.getBookingItemsByBookingId || []

    const goToDetails = (bookingId: number) => {
        router.push(`/account/orders/${bookingId}`)
    }


    /** Queries - Mutations */
    // const { data } = useGetBookingsByUserIdQuery({
    //     variables: {
    //         userId: parseInt(query?.id as string),
    //         limit: itemsPerPage,
    //         offset: currentPage * itemsPerPage
    //     }
    // })
    // const bookings = data?.getBookingsByUserId.bookings || []
    // const totalProducts = data?.getBookingsByUserId.total

    /** Pagination 2/2 */
    // const endIndex = startIndex + Math.min(itemsPerPage, bookings?.length ?? 0);
    // const handlePageChange = (pageNumber: number) => {
    //     setCurrentPage(pageNumber);
    //     const nextPage = pageNumber + 1;
    //     console.log(query.id)
    //     router.push(`/account/user/${query.id}?page=${nextPage}`);
    // };

    useEffect(() => {
        setCurrentPage(initialPage);
    }, [query.page]);

    const classTh = "h-14 p-3 text-center uppercase font-bold whitespace-nowrap "

    return (
        <Flex className="w-full flex flex-col text-center xl:w-fit" gap={2}>
            <table className="w-full rounded  bg-cactus-700 text-xs">
                <thead className="bg-cactus-900">
                    <tr>
                        {orderDetailsHeaders.map(menu => (
                            <th
                                className={classTh + " " + menu.thClass}
                                key={menu.id}
                            >
                                {menu.name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody >
                    {bookingItems ? (
                        bookingItems.map((item: any, index: number) => (
                            <tr
                                key={item.id}
                                className={`${index % 2 === 0 && "bg-cactus-600"} whitespace-nowrap`}>
                                <td className="w-28 text-center whitespace-nowrap p-3 min-w-25 max-w-40 xl:max-w-60">
                                    <img src={item.product.thumbnail} alt="" className=" rounded" />
                                </td>
                                <td className="text-center hidden whitespace-nowrap p-3 min-w-25 max-w-40 xl:min-w-48 xl:max-w-60 overflow-hidden text-ellipsis sm:table-cell">{item.product.name}</td>
                                <td className="text-center hidden whitespace-nowrap p-3 min-w-25 max-w-36 xl:min-w-36 xl:max-w-40 overflow-hidden text-ellipsis lg:table-cell">{transformToDate(item.startDate)}</td>
                                <td className="text-center hidden whitespace-nowrap p-3 min-w-25 max-w-36 xl:min-w-36 xl:max-w-40 overflow-hidden text-ellipsis lg:table-cell">{transformToDate(item.endDate)}</td>
                                <td className="text-center whitespace-nowrap p-3 min-w-25 max-w-36 xl:min-w-36 xl:max-w-40">{item.product.price} €</td>
                                <td className="text-center hidden whitespace-nowrap p-3 min-w-25 max-w-36 xl:min-w-36 xl:max-w-40 overflow-hidden text-ellipsis lg:table-cell">{item.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="p-4 text-center" colSpan={4}>
                                {t("No booking found")}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* <TableFooter
                data={totalProducts}
                startIndex={startIndex}
                endIndex={endIndex}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                setCurrentPage={handlePageChange}
            /> */}
        </Flex>
    )
}