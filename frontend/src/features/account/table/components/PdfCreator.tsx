import { Booking, BookingItem } from '../../types';
import transformToDate from "../../helpers/TransformDate";
import jsPDF from 'jspdf';

const booking: Booking = {
    invoice: "GG-20240712001",
    agency: [{ id: 1, name: "GearGo Capitole" }],
    bookingDate: new Date().toDateString(),
    startDate: new Date().toDateString(),
    endDate: new Date().toDateString(),
    status: "Booked"
}

const bookingItems: BookingItem[] = [
    {
        product: {
            name: "Ski",
            brand: 'Rossignol',
            description: "Paire de ski",
            price: 99,
            thumbnail: 'paire de ski',
        },
        status: "booked",
        startDate: new Date().toDateString(),
        endDate: new Date().toDateString(),
    },
    {
        product: {
            name: "Ski",
            brand: 'Rossignol',
            description: "Paire de ski",
            price: 99,
            thumbnail: 'paire de ski',
        },
        status: "booked",
        startDate: new Date().toDateString(),
        endDate: new Date().toDateString(),
    },
]


let generateData = function () {
    let result = [];
    let data = {
        product: "Product",
        name: "GameGroup",
        from: "From",
        endDate: "25",
    };

    for (let i = 0; i < amount; i += 1) {
        data.id = (i + 1).toString();
        result.push(Object.assign({}, data));
    }
    return result;
};

function createHeaders(keys : string[]) {
    let result = [];
    for (let i = 0; i < keys.length; i += 1) {
        result.push({
            id: keys[i],
            name: keys[i],
            prompt: keys[i],
            width: 65,
            align: "center",
            padding: 0
        });
    }
    return result;
}

const headers = createHeaders([
    "Product",
    "Start Date",
    "End Date",
    "Unit Price",
]);


const doc = new jsPDF({
    orientation: "portrait",
    unit: 'cm',
    format: 'a4',
});

doc.text("GearGo", 2, 2)
doc.table(1, 1, generateData(), headers, { autoSize: true });


doc.save("Invoice.pdf")

// Create Document Component
export default function PdfCreator() {
    return (
        <></>
    )
}
