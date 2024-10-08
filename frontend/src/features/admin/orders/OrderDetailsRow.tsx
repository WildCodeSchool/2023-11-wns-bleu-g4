import { useTranslation } from "react-i18next";
import { Order } from "./types";
import OrderDetailsTable from "./OrderDetailsTable";
import OrderDetailsStatus from "./OrderDetailsStatus";
import { StatusBooking } from "@/graphql/generated/schema";
import { useGetBookingItemsByBookingIdQuery } from "@/graphql/BookingItem/generated/GetBookingItemsByBookingId.generated";

export default function OrderDetailsDropdown({ order }: { order: Order }) {
  const { t } = useTranslation("OrderDetailsDropdown");
  const { data: BookingItemsData } = useGetBookingItemsByBookingIdQuery({
    variables: {
      bookingId: order?.id!,
    },
  });
  const bookingItems = BookingItemsData?.getBookingItemsByBookingId;

  return (
    <tr className="min-w-full space-y-4">
      <td colSpan={2} className="p-4 border-y border-gray-400">
        <div className="flex flex-col gap-2 align-top">
          <span className="font-bold">{t("Customer address")}:</span> {order.user.address}, {order.user.postcode}{" "}
          {order.user.city}
          <span className="font-bold">{t("Customer phone")}:</span> {order.user.phone}
        </div>
        {order.status !== StatusBooking.Canceled && <OrderDetailsStatus order={order} />}
      </td>
      <OrderDetailsTable bookingItems={bookingItems} />
    </tr>
  );
}
