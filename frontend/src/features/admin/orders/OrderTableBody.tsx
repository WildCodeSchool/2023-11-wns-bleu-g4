import React, { useState } from "react";
import { OrderTableBodyProps } from "../product/types";
import { orderTableHeaders } from "../helpers/tableHeaders";
import { ArrowsUpDownIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import OrderDetailsDropdown from "./OrderDetailsRow";
import { Order } from "./types";

export default function OrderTableBody({
  data,
  handleDateSort,
  sortColumnName,
  sortOrder
}: OrderTableBodyProps) {
  const { t } = useTranslation("OrderTableBody");
  const [openOrderId, setOpenOrderId] = useState<number | null>(null);

  const handleOrderDetails = (orderId: number) => {
    setOpenOrderId(prevOrderId => (prevOrderId === orderId ? null : orderId));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <table className="min-w-full rounded border border-gray-200 border-separate border-spacing-0">
      <thead>
        <tr>
          {orderTableHeaders.map(menu => (
            <th
              className="h-14 p-3 first:pl-8 last:pr-8 text-left uppercase text-sm font-bold whitespace-nowrap 
              border-b border-gray-200"
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
        {data.length !== 0 ? (
          data.map((order: Order, index: number) => (
            <React.Fragment key={order.id}>
              <tr className={`${index % 2 === 0 && "bg-cactus-50"} whitespace-nowrap hover:bg-cactus-300`}>
                <td className="whitespace-nowrap p-3 pl-8 w-48 min-w-max">{order.id}</td>
                <td className="whitespace-nowrap p-3 w-96 min-w-max">
                  {order.user.firstname} {order.user.name}
                </td>
                <td className="whitespace-nowrap p-3 w-40 min-w-max">{order.agency.name}</td>
                <td className="whitespace-nowrap p-3 w-40 min-w-max">{formatDate(order.startDate)}</td>
                <td className="whitespace-nowrap p-3 w-40 min-w-max">{formatDate(order.endDate)}</td>
                <td className="whitespace-nowrap p-3 w-40 min-w-max">{order.status}</td>
                <td className="whitespace-nowrap p-3 pr-8 w-52 min-w-max justify-center">
                  <button
                    type="button"
                    className="flex bg-cactus-400 rounded-md px-1.5 py-0.5"
                    onClick={() => handleOrderDetails(order?.id!)}
                  >
                    <ChevronDownIcon
                      className={`h-5 w-5 text-white ${openOrderId === order.id ?
                        "transform duration-150 rotate-180" : "transform duration-150 rotate-0"}`}
                    />
                  </button>
                </td>
              </tr>
              {openOrderId === order.id && <OrderDetailsDropdown order={order} />}
            </React.Fragment>
          ))
        ) : (
          <tr>
            <td className="p-4 text-center" colSpan={7}>
              {t("No orders found")}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
