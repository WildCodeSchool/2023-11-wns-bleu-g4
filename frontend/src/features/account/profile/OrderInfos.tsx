import { useGetBookingByIdQuery } from "@/graphql/Booking/generated/GetBookingById.generated";
import { Button, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { t } from "i18next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { jsPDF } from "jspdf";
import { useGetBookingItemsByBookingIdQuery } from "@/graphql/BookingItem/generated/GetBookingItemsByBookingId.generated";

export default function OrderInfos() {
    /** DARK / LIGHT MODE */
    const textColor = useColorModeValue("dark", "light")
    const bgHeading = useColorModeValue("#d0d2d6", "cactus.900")
    const labelColor = useColorModeValue("cactus.500", "cactus.200")
    const bgColor = useColorModeValue("footerBgLight", "cactus.600")

    const router = useRouter()
    const { id } = router.query
    const { data } = useGetBookingByIdQuery({ variables: { bookingId: parseInt(id as string) } })
    const booking = data?.getBookingById
    const bookingId : number = parseInt(router.query.id as string)
    const { t } = useTranslation("UserOrderInfos");
    const bookingItems = useGetBookingItemsByBookingIdQuery({ variables: { bookingId: bookingId } })
    const bookingItemsArraylength : number = bookingItems.data?.getBookingItemsByBookingId.length as number
    console.log(bookingItems.data?.getBookingItemsByBookingId.length)
    
    const transformToDate = (dateToTransform: string) => {
        const newDate = new Date(dateToTransform)
        return newDate.toLocaleDateString()
    }

    const generatePdf = () => {
        const doc = new jsPDF();

        doc.setFontSize(16)
        doc.text("INVOICE N°"+ booking?.invoice, 10, 10);

        let yHeight : number = 20     

        doc.setFontSize(8)
        for (let index = 0; index < bookingItemsArraylength; index++) {
            const productName : string = bookingItems.data?.getBookingItemsByBookingId[index].product.name as string
            doc.setLineWidth(200)
            doc.text(productName,20,yHeight)
            yHeight+=20
        }
        
        doc.save(booking?.invoice + ".pdf");
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
        <Flex
            className="w-full sm:max-w-48 flex flex-col bg-cactus-600 text-white h-fit text-xs lg:min-w-64"
            color={textColor}
            bg={bgColor}
        >
            <Heading size='xs' className="p-5  text-center" bg={bgHeading}>{t("Booking Info")}</Heading>
            <Flex direction={'column'} gap={2} className="p-5">

                {
                    bookingInfo && bookingInfo.map((el, i) => {
                        return (
                            <Flex key={i} gap={1} width={'100%'} className="flex sm:flex-col lg:flex-row mb-2">
                                <Text className="w-2/5 sm:w-full lg:w-2/5 whitespace-nowrap truncate text-ellipsis" color={labelColor}>{el.label}</Text>
                                <Text className="w-3/5 sm:w-full lg:w-3/5 whitespace-nowrap overflow-hidden text-ellipsis">{el.info}</Text>
                            </Flex>
                        )
                    })
                }

            </Flex>
            <Flex className="w-full p-5 gap-2" bg={bgHeading}>
                <Button className="w-1/2" size='xs' padding='4'>{t("Download")}</Button>
                <Button className="w-1/2" size='xs' padding='4' onClick={generatePdf}>{t("Print")}</Button>
            </Flex>
        </Flex>
    )
}