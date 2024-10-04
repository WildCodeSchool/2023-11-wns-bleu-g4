import React, { useState } from "react";
import { orderTableHeaders } from "../helpers/tableHeaders";
import { ArrowsUpDownIcon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import OrderDetailsDropdown from "./OrderDetailsRow";
import { Order, OrderTableBodyProps } from "./types";
import OrderCancelModal from "./OrderCancelModal";
import { useCancelBookingMutation } from "@/graphql/Booking/generated/CancelBooking.generated";
import { StatusBooking } from "@/graphql/generated/schema";
import Loading from "@/shared/components/Loading";
import { toast } from "react-toastify";

export default function OrderTableBody({
  data,
  refetch,
  loading,
  handleDateSort,
  sortColumnName,
  sortOrder,
}: OrderTableBodyProps) {
  const { t } = useTranslation("OrderTableBody");
  const [cancelOrder, { error }] = useCancelBookingMutation();
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [openOrderId, setOpenOrderId] = useState<number | null>(null);

  const toggleCancelModal = (order: Order) => {
    setSelectedOrder(order);
    setCancelModalOpen(!cancelModalOpen);
  };

  const handleOrderDetails = (orderId: number) => {
    setOpenOrderId(prevOrderId => (prevOrderId === orderId ? null : orderId));
  };

  const handleCancelOrder = async (id: number) => {
    try {
      await cancelOrder({ variables: { bookingId: id } });
      refetch && refetch();
      setCancelModalOpen(false);
      toast.success(t("Order canceled successfully"));
    } catch (e) {
      toast.error(error?.message);
      console.error(e);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  };

  const setStatusStyle = (status: string) => {
    switch (status) {
      case StatusBooking.Late:
        return "bg-yellow-50 text-yellow-800 border-yellow-800/50";
      case StatusBooking.Canceled:
        return "bg-red-50 text-red-800 border-red-800/50";
      case StatusBooking.Booked:
        return "bg-blue-50 text-blue-800 border-blue-800/50";
      case StatusBooking.Retrieved:
        return "bg-cactus-100 text-cactus-800 border-cactus-800/50";
      default:
        return "";
    }
  };

  return (
    <>
      <table className="min-w-full rounded border border-gray-200 dark:border-gray-600 border-separate border-spacing-0">
        <thead>
          <tr>
            {orderTableHeaders.map(menu => (
              <th
                className="h-14 p-3 first:pl-8 last:pr-8 text-left uppercase text-sm font-bold whitespace-nowrap 
              border-b border-gray-200 dark:border-gray-600"
                key={menu.id}
              >
                <span className="flex gap-2 items-center">
                  {menu.name}
                  {(menu.name === "from" || menu.name === "to") && (
                    <button
                      type="button"
                      className="p-1 rounded hover:bg-gray-100 group"
                      onClick={() => handleDateSort(menu.name)}
                    >
                      <ArrowsUpDownIcon
                        className={`h-5 w-5 ${sortColumnName === menu.name && sortOrder && "text-accent"}
                       group-hover:text-accent`}
                      />
                    </button>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm">
          {loading && (
            <tr>
              <td className="p-4 text-center" colSpan={7}>
                <Loading loading={loading} />
              </td>
            </tr>
          )}
          {!loading && data.length === 0 ? (
            <tr>
              <td className="p-4 text-center" colSpan={7}>
                {t("No orders found")}
              </td>
            </tr>
          ) : (
            data.map((order: Order, index: number) => (
              <React.Fragment key={order.id}>
                <tr
                  className={`${index % 2 === 0 && "bg-cactus-50 dark:bg-cactus-600"} whitespace-nowrap 
                  hover:bg-cactus-300 dark:hover:text-black`}
                >
                  <td className="whitespace-nowrap p-3 pl-8 w-48 min-w-max">{order.id}</td>
                  <td className="whitespace-nowrap p-3 w-96 min-w-max">
                    {order.user.firstname} {order.user.name}
                  </td>
                  <td className="whitespace-nowrap p-3 w-40 min-w-max">{order.agency.name}</td>
                  <td className="whitespace-nowrap p-3 w-40 min-w-max">{formatDate(order.startDate)}</td>
                  <td className="whitespace-nowrap p-3 w-40 min-w-max">{formatDate(order.endDate)}</td>
                  <td className="whitespace-nowrap p-3 w-40 min-w-max">
                    <span className={`px-3 py-1 rounded border font-bold ${setStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap p-3 pr-8 w-52 min-w-max text-left align-middle">
                    <div className="inline-block">
                      <button
                        type="button"
                        aria-label="Order details button"
                        className="inline-block bg-cactus-400 rounded-md px-1.5 py-0.5 mr-2.5 align-middle"
                        onClick={() => handleOrderDetails(order?.id!)}
                      >
                        <ChevronDownIcon
                          className={`h-5 w-5 text-white ${
                            openOrderId === order.id
                              ? "transform duration-150 rotate-180"
                              : "transform duration-150 rotate-0"
                          }`}
                        />
                      </button>
                      {order.status.toLocaleLowerCase() !== "canceled" && (
                        <button
                          type="button"
                          aria-label="Cancel button"
                          className="inline-block bg-[#D23732] rounded-md px-1.5 py-0.5 align-middle"
                          onClick={() => toggleCancelModal(order)}
                        >
                          <XMarkIcon className="h-5 w-5 text-white" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                {openOrderId === order.id && <OrderDetailsDropdown order={order} />}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
      {cancelModalOpen && (
        <OrderCancelModal
          isOpen={cancelModalOpen}
          onClose={() => setCancelModalOpen(false)}
          order={selectedOrder!}
          handleCancel={handleCancelOrder}
        />
      )}
    </>
  );
}
