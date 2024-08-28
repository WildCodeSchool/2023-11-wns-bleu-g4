import { Flex, Heading, Table, Tbody, Td, Text, Th, Tr, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { orderDetailsHeaders } from "../helpers/tableHeaders"
import { useRouter } from "next/router";
import transformToDate from "../helpers/TransformDate";
import { useGetBookingItemsByBookingIdQuery } from "@/graphql/BookingItem/generated/GetBookingItemsByBookingId.generated";
import TimeStampToDayDuration from "../helpers/TimeStampToDayDuration";

export default function UserOrdersDetailsTable() {

    const { t } = useTranslation("UserOrderDetails");

    /** DARK / LIGHT MODE */
    const textColor = useColorModeValue("dark", "light")
    const bgTableHeadColor = useColorModeValue("#d0d2d6", "cactus.900")
    const bgColor = useColorModeValue("footerBgLight", "cactus.600")
    const bgTableContent = useColorModeValue("lightgrey", "cactus.700")

    /** Router */
    const router = useRouter()
    const { query } = router;

    const { data } = useGetBookingItemsByBookingIdQuery({
        variables: {
            bookingId: parseInt(query.id as string)
        }
    })
    const bookingItems = data?.getBookingItemsByBookingId || []

    const totalPrice = (price: number, dayFrom: Date, dayTo: Date) => {
        let days = TimeStampToDayDuration(dayFrom, dayTo)
        days = Math.floor(days)
        return (price * days).toFixed(2)
    }

    return (
        <Flex className="w-full flex flex-col xl:w-fit" gap={2} color={textColor}>
            <Table className="w-full rounded text-xs">
                <Tr bg={bgTableHeadColor}>

                    {orderDetailsHeaders.map(menu => (
                        <Td
                            className={"h-14 p-3 w-fit text-center uppercase font-bold whitespace-nowrap " + menu.thClass}
                            key={menu.id}
                        >
                            <Heading size='xs' className="text-center">
                                {menu.name}
                            </Heading>
                        </Td>
                    ))}
                </Tr>
                <Tbody >
                    {bookingItems ? (
                        bookingItems.map((item: any, index: number) => (
                            <Tr
                                bg={index % 2 === 0 ? bgColor : bgTableContent}
                                key={item.id}
                                className={`${index % 2 === 0 && "bg-cactus-600"} whitespace-nowrap`}>
                                <Td className="w-28 text-center whitespace-nowrap p-3 min-w-25 max-w-40 xl:max-w-60">
                                    <img src={item.product.thumbnail} alt="" className=" rounded" />
                                </Td>
                                <Td className="text-center hidden whitespace-nowrap p-3 min-w-25 max-w-40 xl:min-w-48 xl:max-w-60 overflow-hidden text-ellipsis sm:table-cell">
                                    <Text className="text-center">{item.product.name}</Text>
                                </Td>
                                <Td className="text-center hidden whitespace-nowrap p-3 min-w-25 max-w-36 xl:min-w-36 xl:max-w-40 overflow-hidden text-ellipsis lg:table-cell">
                                    <Text className="text-center">{transformToDate(item.startDate)}</Text>
                                </Td>
                                <Td className="text-center hidden whitespace-nowrap p-3 min-w-25 max-w-36 xl:min-w-36 xl:max-w-40 overflow-hidden text-ellipsis lg:table-cell">
                                    <Text className="text-center">{transformToDate(item.endDate)}</Text>
                                </Td>
                                <Td className="text-center whitespace-nowrap p-3 min-w-25 max-w-36 xl:min-w-36 xl:max-w-40">
                                    <Text className="text-center">{item.product.price.toFixed(2) as number} €</Text>
                                </Td>
                                <Td className="text-center whitespace-nowrap p-3 min-w-25 max-w-36 xl:min-w-36 xl:max-w-40">
                                    <Text className="text-center">{totalPrice(item.product.price, item.startDate, item.endDate)} €</Text>
                                </Td>
                                <Td className="text-center hidden whitespace-nowrap p-3 min-w-25 max-w-36 xl:min-w-36 xl:max-w-40 overflow-hidden text-ellipsis lg:table-cell">
                                    <Text className="text-center">{item.status}</Text>
                                </Td>
                            </Tr>
                        ))
                    ) : (
                        <Tr>
                            <Td className="p-4 text-center" colSpan={4}>
                                {t("No booking found")}
                            </Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
        </Flex>
    )
}