import { useGetBookingByIdQuery } from "@/graphql/Booking/generated/GetBookingById.generated";
import { Avatar, Box, Button, ButtonGroup, Flex, Heading, Text } from "@chakra-ui/react";
import { CalendarIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { t } from "i18next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function OrderInfos() {
    const router = useRouter()
    const { id } = router.query
    const { data } = useGetBookingByIdQuery({ variables: { bookingId: parseInt(id as string) } })
    const booking = data?.getBookingById

    const { t } = useTranslation("UserOrderInfos");

    const transformToDate = (dateToTransform: string) => {
        const newDate = new Date(dateToTransform)
        return newDate.toLocaleDateString()
    }

    const bookingInfo = [
        {
            label: t("Number"),
            info: booking?.invoice
        },
        {
            label: t("Booking Date"),
            info: transformToDate(booking?.bookingDate)
        },
        {
            label: t("From"),
            info: transformToDate(booking?.startDate)
        },
        {
            label: t("To"),
            info: transformToDate(booking?.endDate)
        },
        {
            label: t("Status"),
            info: booking?.status
        },
    ]

    return (
        <Flex className="w-full sm:max-w-48 flex flex-col bg-cactus-600 text-white h-fit text-xs lg:min-w-64">
            <Heading size='xs' className="p-5 bg-cactus-900  text-center">{t("Booking Info")}</Heading>
            <Flex direction={'column'} gap={2} className="p-5">

                {
                    bookingInfo && bookingInfo.map((el, i) => {
                        return (
                            <Flex key={i} gap={1} width={'100%'} className="flex sm:flex-col lg:flex-row mb-2">
                                <Text className="w-2/5 sm:w-full lg:w-2/5 whitespace-nowrap truncate text-ellipsis text-cactus-200">{el.label}</Text>
                                <Text className="w-3/5 sm:w-full lg:w-3/5 whitespace-nowrap overflow-hidden text-ellipsis">{el.info}</Text>
                            </Flex>
                        )
                    })
                }

            </Flex>
            <Flex className="w-full p-5 bg-cactus-900 gap-2">
                <Button className="w-1/2" size='xs' padding='4'>{t("Download")}</Button>
                <Button className="w-1/2" size='xs' padding='4'>{t("Print")}</Button>
            </Flex>
        </Flex>
    )
}