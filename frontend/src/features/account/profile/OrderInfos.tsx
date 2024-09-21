import { useGetBookingByIdQuery } from "@/graphql/Booking/generated/GetBookingById.generated";
import { Button, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { t } from "i18next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useGetBookingItemsByBookingIdQuery } from "@/graphql/BookingItem/generated/GetBookingItemsByBookingId.generated";
import generatePdf from "../helpers/GeneratePDF";
import { BookingItem, BookingPDF } from "../types";
import transformToDate from "../helpers/TransformDate";
import { useState } from "react";
import CancelBookingModal from "./modal/CancelBookingModal";
import { StatusBooking } from "@/graphql/generated/schema";
import TimeStampToDayDuration from "../helpers/TimeStampToDayDuration";

export default function OrderInfos() {
    /** DARK / LIGHT MODE */
    const textColor = useColorModeValue("dark", "light")
    const bgHeading = useColorModeValue("#d0d2d6", "cactus.900")
    const labelColor = useColorModeValue("cactus.500", "cactus.200")
    const bgColor = useColorModeValue("footerBgLight", "cactus.600")

    const { t } = useTranslation("UserOrderInfos");

    const router = useRouter()
    const { id } = router.query
    const { data } = useGetBookingByIdQuery({ variables: { bookingId: parseInt(id as string) } })

    const booking = data?.getBookingById
    const bookingId: number = parseInt(router.query.id as string)
    const bookingItems = useGetBookingItemsByBookingIdQuery({ variables: { bookingId: bookingId } })
    const bookingItemsArr: BookingItem[] = bookingItems.data?.getBookingItemsByBookingId || []
    const canceled = booking?.status !== StatusBooking.Canceled


    /* CHECK IF IT'S POSSIBLE TO CANCEL A BOOKING*/
    const today = new Date()
    const todayTimeStamp = today.getTime()
    const endDateBooking: Date = new Date(booking?.endDate)
    const endDateBookingTimestamp: number = endDateBooking.getTime()
    let cancelable = endDateBookingTimestamp > todayTimeStamp

    const [isCancelBookingModalOpen, setIsCancelBookingModalOpen] = useState(false);
    const toggleCancelBookingModal = () => setIsCancelBookingModalOpen(!isCancelBookingModalOpen);

    let totalAmount = 0
    let bookingItemsId: number[] = []

    for (let index = 0; index < bookingItemsArr.length; index++) {
        totalAmount += bookingItemsArr[index].product?.price as number
        bookingItemsId.push(bookingItemsArr[index].id as number)
    }

    const totalPrice = (price: number, dayFrom: Date, dayTo: Date) => {
        let days = TimeStampToDayDuration(dayFrom, dayTo)
        days = Math.floor(days)
        return (price * days).toFixed(2)
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
        {
            label: t("Total Price"),
            info: totalPrice(totalAmount, booking?.startDate as Date, booking?.endDate) + " €"
        },
    ]

    return (
        <Flex
            className="w-full sm:max-w-48 flex flex-col bg-cactus-600 text-white h-fit text-xs lg:min-w-64"
            color={textColor}
            bg={bgColor}
        >
            <Heading size='xs' className="p-5  text-center" bg={bgHeading}>
                {t("Booking Info")}
            </Heading>
            <Flex direction={'column'} gap={2} className="p-5">
                {
                    bookingInfo && bookingInfo.map((el, i) => {
                        // Doesn't display price on canceled booking
                        if (booking?.status === StatusBooking.Canceled && i === bookingInfo.length - 1) return
                        return (
                            <Flex key={i} gap={1} width={'100%'} className="flex sm:flex-col lg:flex-row mb-2">
                                <Text className="w-2/5 sm:w-full lg:w-2/5 whitespace-nowrap truncate text-ellipsis" color={labelColor}>{el.label}</Text>
                                <Text className="w-3/5 sm:w-full lg:w-3/5 whitespace-nowrap overflow-hidden text-ellipsis">{el.info}</Text>
                            </Flex>
                        )
                    })
                }

            </Flex>
            {
                canceled ?
                    <Flex className="w-full p-5 gap-2" bg={bgHeading}>
                        {
                            cancelable ?
                                <>
                                    <Button className="w-1/2" size='xs' padding='4' variant={"warningButton"} onClick={toggleCancelBookingModal}>{t("Cancel")}</Button>
                                    <CancelBookingModal isOpen={isCancelBookingModalOpen} onClose={toggleCancelBookingModal} bookingId={bookingId} bookingItemIds={bookingItemsId} />
                                </>
                                :
                                null
                        }
                        <Button
                            className={cancelable ? "w-1/2" : "w-full"}
                            size='xs'
                            padding='4'
                            variant={"accentButton"}
                            onClick={() => generatePdf(booking as BookingPDF, bookingItemsArr)}>
                            {t("Print")}
                        </Button>
                    </Flex>
                    :
                    null
            }
        </Flex>
    )
}