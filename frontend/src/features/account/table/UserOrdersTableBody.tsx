import { Flex, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { orderTableHeaders} from "../profile/helpers/tableHeaders"
import { OrderTableBodyProps } from "../profile/types";

export default function UserOrdersTableBody({ data, handleDateSort, sortColumnName, sortOrder }: OrderTableBodyProps) {

    const { t } = useTranslation("UserOrders");

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
                    {/* {data.length !== 0 ? (
                        data.map((customer: any, index: number) => (
                            <tr
                                key={customer.id}
                                className={`${index % 2 === 0 && "bg-cactus-50"} whitespace-nowrap hover:bg-cactus-300`}
                            >
                                <td className="flex gap-3 whitespace-nowrap px-3 py-2 pl-8 w-60 min-w-max items-center">
                                    <img src={customer.avatar} alt={customer.name} className="h-8 w-8 rounded-full" />
                                    {customer.name} {customer.firstname}
                                </td>
                                <td className="whitespace-nowrap p-3 w-96 min-w-max">{customer.address}</td>
                                <td className="whitespace-nowrap p-3 w-60 min-w-max">{customer.city}</td>
                                <td className="whitespace-nowrap p-3 w-96 min-w-max">{customer.email}</td>
                                <td className="whitespace-nowrap p-3 w-60 min-w-max">{customer.phone}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="p-4 text-center" colSpan={4}>
                                No customer found
                            </td>
                        </tr>
                    )} */}
                </tbody>
            </table>
        </Flex>
    )
}