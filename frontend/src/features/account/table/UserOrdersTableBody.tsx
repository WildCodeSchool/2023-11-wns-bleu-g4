import { Flex, Heading, transform } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { orderTableHeaders } from "../profile/helpers/tableHeaders"
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useState } from "react";
import { useGetBookingsByUserQuery } from "@/graphql/Booking/generated/GetBookingByUserId.generated";
import { Booking } from "../profile/types";

export default function UserOrdersTableBody() {

    const { t } = useTranslation("UserOrders");

    const {data : orders} = useGetBookingsByUserQuery({
        variables : {
            userId : 1
        }
    })

    console.log(orders)

    const [rotate, setRotate] = useState(false)

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
                {/* <tbody className="text-sm">
                    {orders ? (
                        orders.map((el: any, index: number) => (
                            <tr
                                key={el.id}
                                className={`${index % 2 === 0 && "bg-cactus-500"} whitespace-nowrap hover:bg-cactus-400`}
                            >
                                <td className="whitespace-nowrap p-3 w-96 min-w-max">{el.invoice}</td>
                                <td className="whitespace-nowrap p-3 w-60 min-w-max">{el.agency.name}</td>
                                <td className="whitespace-nowrap p-3 w-96 min-w-max">{el.startDate}</td>
                                <td className="whitespace-nowrap p-3 w-60 min-w-max">{el.endDate}</td>
                                <td className="whitespace-nowrap p-3 w-60 min-w-max">{el.status}</td>
                                <td className="whitespace-nowrap p-3 w-60 min-w-max">
                                    <ChevronDownIcon className={`size-5 text-cactus-100 hover:text-cactus-200 cursor-pointer  ${rotate && "rotate-180"}`} onClick={()=>setRotate(!rotate)}/>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="p-4 text-center" colSpan={4}>
                                No booking found
                            </td>
                        </tr>
                    )}
                </tbody> */}
            </table>
        </Flex>
    )
}