import { XMarkIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import { orderDetailsHeaders } from "../helpers/tableHeaders";
import { BookingItem, Order } from "./types";
import { useGetBookingItemsByBookingIdQuery } from "@/graphql/BookingItem/generated/getBookingItemByBookingId.generated";

export default function OrderDetailsDropdown({ order }: { order: Order }) {
  const { t } = useTranslation("OrderDetailsDropdown");
  const { data: BookingItemsData } = useGetBookingItemsByBookingIdQuery({
    variables: {
      bookingId: order?.id!
    }
  });
  const bookingItems = BookingItemsData?.getBookingItemsByBookingId;

  return (
    <tr className="p-4 min-w-full">
      <td colSpan={8} className="space-y-4 p-3 min-w-full border-y border-y-gray-200">
        <div>
          <span className="font-bold">{t("Customer address")}:</span> {order.user.address},{" "}
          {order.user.postcode} {order.user.city}
          <span className="ml-4 font-bold">{t("Customer phone")}:</span> {order.user.phone}
        </div>
        <div>
          <span className="font-bold">{t("Order details")}:</span>
          <table className="w-full min-w-full">
            <thead>
              <tr>
                {orderDetailsHeaders.map(menu => (
                  <th
                    className="h-14 p-3 first:pl-8 last:pr-8 text-left uppercase text-sm font-bold whitespace-nowrap 
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
                  <td className="whitespace-nowrap p-3 pl-8 w-1/3 min-w-max">{bookingItem.productCode.id}</td>
                  <td className="whitespace-nowrap p-3 w-1/3 min-w-max">{bookingItem.product.name}</td>
                  <td className="whitespace-nowrap p-3 w-1/3 min-w-max">{bookingItem.product.price}</td>
                  <td className="whitespace-nowrap p-3 w-1/5 min-w-max">
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
}
