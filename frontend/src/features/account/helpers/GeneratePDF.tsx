import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { jsPDF } from "jspdf";
import { imgBase64 } from "./imgData"
import { signature } from "./Signature"
import { BookingPDF, BookingItem } from "../types";
import TimeStampToDayDuration from "./TimeStampToDayDuration";


const transformToDate = (dateToTransform: string) => {
    const dateChosen = new Date(dateToTransform)
    return dateChosen.toLocaleDateString()
}

export default function generatePdf(booking: BookingPDF, bookingItems: BookingItem[]) {

    const bookingItemsArraylength: number = bookingItems.length as number

    // MILLIMETERS BY DEFAULT
    let xInitial = 10
    let yInitial = 5
    let nbProduct = 0
    let totalTTC = 0

    const doc = new jsPDF();

    /* LOGO */
    doc.addImage(imgBase64, "JPEG", 75, yInitial, 60, 18)
    yInitial += 20
    doc.line(xInitial, yInitial, xInitial + 190, yInitial)
    yInitial += 10

    /* INVOICE NUMBER */
    doc.setFontSize(16)
    doc.text(booking?.invoice, 200, yInitial, { align: "right" });
    doc.setFontSize(10)
    doc.text("BOOKED ON " + transformToDate(booking?.bookingDate), 200, yInitial + 5, { align: "right" })

    /* AGENCY  */
    doc.setFontSize(10)
    const agency = [
        booking.agency.name,
        booking.agency.address,
        booking.agency.postcode + " " + booking.agency.city,
        booking.agency.country,
        "Phone : " + booking.agency.phone,
        "Email : " + booking.agency.email
    ]

    for (let index = 0; index < agency.length; index++) {
        doc.setFont("", index === 0 ? "bold" : "normal")
        doc.text(agency[index]?.toUpperCase() as string, xInitial, yInitial);
        yInitial += 4
    }

    /* CLIENT */
    const client = [
        booking.user.firstname + " " + booking.user.name,
        booking.user.address,
        booking.user.postcode + " " + booking.user.city,
        booking.user.country,
        "Phone : " + booking.user.phone,
        "Email : " + booking.user.email
    ]

    for (let index = 0; index < client.length; index++) {
        doc.setFont("", index === 0 ? "bold" : "normal")
        doc.text(client[index]?.toUpperCase() as string, 200, yInitial, { align: 'right' });
        yInitial += 4
    }
    yInitial += 15


    /* TABLE TITLE */
    doc.setFontSize(12)
    doc.setFont("", "bold")
    doc.text("BOOKING DETAILS ", xInitial, yInitial)
    yInitial += 5


    /* BOOKING DETAILS HEADERS */
    doc.setFontSize(10)
    const columnFrom = 110
    const columnTo = 130

    doc.line(xInitial, yInitial, xInitial + 190, yInitial)
    yInitial += 5
    doc.text(bookingItemsArraylength > 1 ? "PRODUCTS" : "PRODUCT", xInitial, yInitial)
    doc.text("FROM", xInitial + columnFrom, yInitial)
    doc.text("TO", xInitial + columnTo, yInitial)
    doc.text("DAY PRICE", 180, yInitial, { align: "right" })
    doc.text("TOTAL", 200, yInitial, { align: "right" })
    yInitial += 2
    doc.line(xInitial, yInitial, xInitial + 190, yInitial)

    /** BOOKING ITEMS */
    doc.setFont("", "normal")

    yInitial += 5
    for (let index = 0; index < bookingItemsArraylength; index++) {
        const productName: string = bookingItems[index].product?.name as string
        let price: number = bookingItems[index].product?.price as number
        const dateFrom: Date = bookingItems[index].startDate as Date
        const dateTo: Date = bookingItems[index].endDate as Date
        const totalAMount = price * TimeStampToDayDuration(dateFrom, dateTo)

        doc.text(productName, xInitial, yInitial, { maxWidth: 125 })
        doc.text(transformToDate(dateFrom.toString()), xInitial + columnFrom, yInitial)
        doc.text(transformToDate(dateTo.toString()), xInitial + columnTo, yInitial)
        doc.text(price.toFixed(2) + "€", 180, yInitial, { align: "right" })
        doc.text(totalAMount.toFixed(2) + "€", 200, yInitial, { align: "right" })
        totalTTC += totalAMount
        nbProduct++
        yInitial += index === bookingItemsArraylength - 1 ? 3 : 6
    }


    /* TOTAL */
    // yInitial -= 3
    doc.line(xInitial, yInitial, xInitial + 190, yInitial)
    yInitial += 5
    doc.setFont("", "bold")
    doc.text("INCLUDE TAX (20%)", 180, yInitial, { align: "right" })
    doc.text((totalTTC * 20 / 100).toFixed(2) + "€", 200, yInitial, { align: "right" })
    yInitial += 5
    doc.text("TOTAL", 180, yInitial, { align: "right" })
    doc.text(totalTTC.toFixed(2) + "€", 200, yInitial, { align: "right" })
    yInitial += 2


    /** SIGNATURE */
    doc.addImage(signature, "JPEG", 155, 255, 35, 20)
    doc.setFont("", "normal")
    doc.text("Signature", 150, 245)
    doc.line(150, 250, 200, 250)
    doc.line(150, 250, 150, 280)
    doc.line(150, 280, 200, 280)
    doc.line(200, 250, 200, 280)


    /** FOOTER */
    doc.setFont("", "italic")
    doc.setFontSize(8)
    let yEndPage = 285
    doc.line(xInitial, yEndPage, xInitial + 190, yEndPage)
    yEndPage += 5
    doc.text("GearGo SARL au capital de 1.000.000 € - N° Siret 362 521 879 00034", 105, yEndPage, { align: "center" })

    /* DOWNLOAD PDF */
    // doc.save(booking?.invoice + ".pdf");

    /* OPEN PDF IN NEW WINDOW */
    const invoice = doc.output("blob");
    let url = URL.createObjectURL(invoice);
    window.open(url);



    /**
     * un blob (Binary Large Object) est un objet représentant des données binaires immuables.
     */
}