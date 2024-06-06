import { TableBodyProps } from "../types";
import { productStockTableHeaders } from "../helpers/tableHeaders";
import { useTranslation } from "react-i18next";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ProductStockModal from "../modal/productStockModal";

export default function ProductStockTableBody({ data }: TableBodyProps) {
  const { t } = useTranslation("ProductStockTableBody");
  const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState<any>();

  const toggleAddProductStockModal = (agency: any) => {
    setSelectedAgency(agency);
    setIsAddStockModalOpen(!isAddStockModalOpen);
  };

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
              <td className="whitespace-nowrap p-3 w-60 min-w-max">
                <span className="inline-block align-middle mr-2">{product.quantity}</span>
                {product.quantity <= 3 && <ExclamationTriangleIcon className="inline-block h-6 w-6 text-[#D23742]" />}
              </td>
              <td className="whitespace-nowrap p-3 pr-8 w-40 min-w-max">
                <button
                  type="button"
                  className="bg-accent rounded-md px-1.5 py-0.5 inline-block align-middle"
                  aria-label="Add stock button"
                  onClick={() => toggleAddProductStockModal(product.agency)}
                >
                  <PlusIcon className="h-5 w-5 text-white" />
                </button>
                {isAddStockModalOpen && (
                  <ProductStockModal
                    isOpen={isAddStockModalOpen}
                    onClose={() => toggleAddProductStockModal(selectedAgency)}
                    product={selectedAgency}
                    variant="baseStyle"
                  />
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="p-4 text-center" colSpan={3}>
              {t("No stocks found")}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
