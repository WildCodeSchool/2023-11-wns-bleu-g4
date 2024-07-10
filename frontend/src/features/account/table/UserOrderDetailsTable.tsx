import { Flex, Heading, transform } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { orderTableHeaders } from "../helpers/tableHeaders"
import { useGetBookingsByUserQuery } from "@/graphql/Booking/generated/GetBookingByUserId.generated";

export default function UserOrdersDetailsTable() {

    const { t } = useTranslation("UserOrders");

    const {data} = useGetBookingsByUserQuery({
        variables : {
            userId : 1
        }
    })
    const bookings = data?.getAllBooking || []

    const transformToDate = (dateToTransform: string) => {
        const newDate = new Date(dateToTransform)
        return newDate.toLocaleDateString() 
    }

    const goToDetails = (bookingId : number) => {
        return true
    }

    return (
        <Flex className="w-full lg:w-2/3 xl:w-3/4 2xl:4/5 flex-col px-0 lg:me-12 lg:pb-5" gap={2}>
            <Heading>Orders</Heading>
            <table className="min-w-full rounded  bg-cactus-900">
                <thead>
                    <tr>
                        {orderTableHeaders.map(menu => (
                            <th
                                className="h-14 p-3 first:pl-8 last:pr-8 text-left uppercase text-sm font-bold whitespace-nowrap "
                                key={menu.id}
                            >
                                {menu.name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {bookings ? (
                        bookings.map((booking: any, index: number) => (
                            <tr
                                key={booking.id}
                                className={`${index % 2 === 0 && "bg-cactus-500"} whitespace-nowrap hover:bg-cactus-400 cursor-pointer`}
                                onClick={()=>goToDetails(booking.id)}
                            >
                                <td className="whitespace-nowrap p-3 w-96 min-w-max">{booking.invoice}</td>
                                <td className="whitespace-nowrap p-3 w-60 min-w-max">{booking.agency.name}</td>
                                <td className="whitespace-nowrap p-3 w-96 min-w-max">{transformToDate(booking.startDate)}</td>
                                <td className="whitespace-nowrap p-3 w-60 min-w-max">{transformToDate(booking.endDate)}</td>
                                <td className="whitespace-nowrap p-3 w-60 min-w-max">{booking.status}</td>
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
        </Flex>
    )
}