import { TableBodyProps } from "../types";
import { productStockTableHeaders } from "../helpers/tableHeaders";
import { useTranslation } from "react-i18next";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function ProductStockTableBody({ data }: TableBodyProps) {
  const { t } = useTranslation("ProductStockTableBody");

  return (
    <table className="min-w-full rounded border border-gray-200 border-separate border-spacing-0">
      <thead>
        <tr>
          {productStockTableHeaders.map(menu => (
            <th
              className="h-14 p-3 first:pl-8 last:pr-8 text-left uppercase text-sm font-bold whitespace-nowrap border-b border-gray-200"
              key={menu.id}
            >
              {menu.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-sm">
        {data?.length !== 0 ? (
          data.map((product: any, index: number) => (
            <tr
              key={product.id}
              className={`${index % 2 === 0 && "bg-cactus-50"} whitespace-nowrap h-12 hover:bg-cactus-300`}
            >
              <td className="whitespace-nowrap p-3 pl-8 w-auto min-w-max">{product.agency}</td>
              <td className="whitespace-nowrap p-3 w-60 min-w-max align-middle">
                <span className="inline-block mr-2">{product.quantity}</span>
                {product.quantity <= 3 && <ExclamationTriangleIcon className="inline-block h-6 w-6 text-[#D23742]" />}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="p-4 text-center" colSpan={2}>
              {t("No stocks found")}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
