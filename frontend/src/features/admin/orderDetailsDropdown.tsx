import { XMarkIcon } from "@heroicons/react/24/solid";
import { orderDetailsHeaders } from "./helpers/tableHeaders";
import { useTranslation } from "react-i18next";

export default function OrderDetailsDropdown({ order }: { order: any }) {
    const { t } = useTranslation("OrderDetailsDropdown");
    return (
        <tr className="p-4 min-w-full">
            <td colSpan={8} className="space-y-4 p-3 min-w-full border-y border-y-gray-200">
                <div>
                    <span className="font-bold">{t("Customer address")}:</span> {order.customer.address}, {order.customer.postcode} {order.customer.city}
                    <span className="ml-4 font-bold">{t("Customer phone")}:</span> {order.customer.phone}
                </div>
                <div>
                    <span className="font-bold">{t("Order details")}:</span>
                    <table className="w-full min-w-full">
                        <thead>
                            <tr>
                                {orderDetailsHeaders.map(menu => (
                                    <th
                                        className="h-14 p-3 first:pl-8 last:pr-8 text-gray-600 text-left uppercase text-sm font-bold whitespace-nowrap border-b border-gray-200"
                                        key={menu.id}
                                    >
                                        <span className="flex gap-2 items-center">{menu.name}</span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {order.booking_items?.map((product: any) => (
                                <tr key={product.id} className="border-y border-t-gray-200 border-b-0">
                                    <td className="whitespace-nowrap p-3 pl-8 w-56 min-w-max">{product.id}</td>
                                    <td className="whitespace-nowrap p-3 w-96 min-w-max">{product.name}</td>
                                    <td className="whitespace-nowrap p-3 w-56 min-w-max">{product.quantity}</td>
                                    <td className="whitespace-nowrap p-3 w-56 min-w-max">{product.price}</td>
                                    <td className="whitespace-nowrap p-3 w-40 min-w-max">
                                        <button type="button" className="flex bg-[#D23732] rounded-md px-1.5 py-0.5">
                                            <XMarkIcon className="h-5 w-5 text-white" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    );
};
