import { ArrowsUpDownIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { AdminTableBodyProps } from "../types";
import orderTableHeaders from "../helpers/tableHeaders";

export default function AdminTableBody({ data, handleDateSort, sortColumnName, sortOrder }: AdminTableBodyProps) {
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);

  const handleOrderDetails = (orderId: string) => {
    setOpenOrderId(prevOrderId => (prevOrderId === orderId ? null : orderId));
  };

  return (
    <table className="min-w-full rounded border border-gray-200 border-separate border-spacing-0">
      <thead>
        <tr>
          {orderTableHeaders.map(menu => (
            <th
              className="p-3 first:pl-8 last:pr-8 text-gray-600 text-left uppercase text-sm font-bold whitespace-nowrap border-b border-gray-200"
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
                      className={`h-5 w-5 ${sortColumnName === menu.name && sortOrder && "text-accent"} group-hover:text-accent`}
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
          data.map((order: any, index: number) => (
            <React.Fragment key={order.id}>
              <tr className={`${index % 2 === 0 && "bg-cactus-50"} whitespace-nowrap`}>
                <td className="whitespace-nowrap p-3 pl-8 w-48 min-w-max">{order.orderNb}</td>
                <td className="whitespace-nowrap p-3 w-96 min-w-max">{order.customer.fullName}</td>
                <td className="whitespace-nowrap p-3 w-96 min-w-max">{order.customer.address}</td>
                <td className="whitespace-nowrap p-3 w-40 min-w-max">{order.agency}</td>
                <td className="whitespace-nowrap p-3 w-40 min-w-max">{order.from}</td>
                <td className="whitespace-nowrap p-3 w-40 min-w-max">{order.to}</td>
                <td className="whitespace-nowrap p-3 pr-8 w-40 min-w-max justify-center">
                  <button
                    type="button"
                    className="flex bg-cactus-400 rounded-md px-1.5 py-0.5"
                    onClick={() => handleOrderDetails(order.id)}
                  >
                    <ChevronDownIcon
                      className={`h-5 w-5 text-white ${openOrderId === order.id ? "transform duration-150 rotate-180" : "transform duration-150 rotate-0"}`}
                    />
                  </button>
                </td>
              </tr>
              {openOrderId === order.id && (
                <tr>
                  <td className="border-y border-b-gray-300 border-t-gray-200 p-4 text-center" colSpan={7}>
                    Order {order.orderNb}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))
        ) : (
          <tr>
            <td className="p-4 text-center" colSpan={7}>
              No orders found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
