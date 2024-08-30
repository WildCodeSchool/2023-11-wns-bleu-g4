import { useTranslation } from "react-i18next";
import { orderDetailsHeaders } from "../helpers/tableHeaders";
import { BookingItem } from "./types";

export default function OrderDetailsTable({ bookingItems }: { bookingItems: BookingItem[] | undefined }) {
    const { t } = useTranslation("OrderDetailsTable");

    return (
        <td colSpan={7} className="p-4 align-top border-y border-gray-200">
            <span className="font-bold min-w-full">{t("Order details")}:</span>
            <table className="w-full min-w-full">
                <thead>
                    <tr>
                        {orderDetailsHeaders.map(menu => (
                            <th
                                className="h-14 p-3 first:pl-0 last:pr-8 text-left uppercase text-sm font-bold whitespace-nowrap 
                                    border-b border-gray-200"
                                key={menu.id}
                            >
                                <span className="flex gap-2 items-center">{menu.name}</span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {bookingItems?.map((bookingItem: BookingItem) => (
                        <tr key={bookingItem.id} className="border-y border-t-gray-200 border-b-0">
                            <td className="whitespace-nowrap p-3 pl-0 w-2/4 min-w-max">{bookingItem.productCode.id}</td>
                            <td className="whitespace-nowrap p-3 w-2/4 min-w-max">{bookingItem.product.name}</td>
                            <td className="whitespace-nowrap p-3 w-1/4 min-w-max">{bookingItem.product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </td>
    );
};
