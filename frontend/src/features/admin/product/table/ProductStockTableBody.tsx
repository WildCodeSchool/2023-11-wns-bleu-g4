import { TableBodyProps } from "../types";
import { productStockTableHeaders } from "../../helpers/tableHeaders";
import { useTranslation } from "react-i18next";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import ProductStockModal from "../modal/ProductStockModal";
import { Agency, Product, ProductCode } from "@/graphql/generated/schema";
import ProductStockDetails from "./ProductStockDetails";
import { useDeleteProductCodeMutation } from "@/graphql/ProductCode/generated/deleteProductCode.generated";
import { toast } from "react-toastify";

export interface AggregatedDataEntry {
  agency: Agency;
  count: number;
}

const groupByAgency = (productCodes: ProductCode[]): Record<number, AggregatedDataEntry> => {
  return productCodes.reduce((acc, productCode) => {
    const agencyId = productCode.agency?.id!;
    if (!acc[agencyId]) {
      acc[agencyId] = {
        agency: productCode.agency!,
        count: 0,
      };
    }
    acc[agencyId].count += 1;
    return acc;
  }, {} as Record<number, AggregatedDataEntry>);
};

export default function ProductStockTableBody({ data, refetch }: TableBodyProps) {
  const { t } = useTranslation("ProductStockTableBody");

  const [deleteProductCode, { error }] = useDeleteProductCodeMutation();
  const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [openProductCodeAgenceId, setProductCodeAgenceId] = useState<number | null>(null);

  const getProductCodesCountByAgency = (agencyId: number) => {
    return data.filter((productCode: ProductCode) => productCode.agency?.id === agencyId).length;
  };

  const product: Product = data[0]?.product;
  const aggregatedData = groupByAgency(data);
  const agencies = Object.values(aggregatedData);

  const toggleAddProductStockModal = (aggregatedData: AggregatedDataEntry, product: Product) => {
    setSelectedAgency(prev => (prev?.id === aggregatedData.agency?.id! ? null : aggregatedData.agency));
    setIsAddStockModalOpen(!isAddStockModalOpen);
  };

  const handleProductCodeAgenceDetails = (productCodeAgenceId: number) => {
    setProductCodeAgenceId(prevProductCodeAgenceId =>
      (prevProductCodeAgenceId === productCodeAgenceId ? null : productCodeAgenceId));
  };

  const handleDeleteProductCode = async (id: number) => {
    try {
      await deleteProductCode({ variables: { productCodeId: id } });
      refetch && refetch();
      toast.success(t("Product code deleted successfully"));
    } catch (e) {
      toast.error(error?.message);
      console.error(e);
    }
  };

  return (
    <>
      <table className="min-w-full rounded border border-gray-200 dark:border-gray-600 border-separate border-spacing-0">
        <thead>
          <tr>
            {productStockTableHeaders.map(menu => (
              <th
                className="h-14 p-3 first:pl-8 last:pr-8 text-left uppercase text-sm font-bold whitespace-nowrap 
              border-b border-gray-200 dark:border-gray-600"
                key={menu.id}
              >
                {menu.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm">
          {agencies.length !== 0 ? (
            agencies.map((aggregatedData: AggregatedDataEntry, index: number) => (
              <React.Fragment key={aggregatedData.agency.id}>
                <tr
                  className={`${index % 2 === 0 && "bg-cactus-50 dark:bg-cactus-600"} whitespace-nowrap h-12 hover:bg-cactus-300`}
                >
                  <td className="whitespace-nowrap p-3 pl-8 w-48 min-w-max">{aggregatedData.agency?.name}</td>
                  <td className="whitespace-nowrap p-3 w-48 min-w-max">
                    <span className="inline-block align-middle mr-2">
                      {getProductCodesCountByAgency(aggregatedData.agency!.id)}
                    </span>
                    {getProductCodesCountByAgency(aggregatedData.agency!.id) <= 3 && (
                      <ExclamationTriangleIcon className="inline-block h-6 w-6 text-[#D23742]" />
                    )}
                  </td>
                  <td className="whitespace-nowrap p-3 pr-8 w-48 min-w-max">
                    <div className="inline-block">
                      <button
                        type="button"
                        aria-label="agency details button"
                        className="inline-block bg-cactus-400 rounded-md px-1.5 py-0.5 mr-2.5 align-middle"
                        onClick={() => handleProductCodeAgenceDetails(aggregatedData.agency?.id!)}
                      >
                        <ChevronDownIcon
                          className={`h-5 w-5 text-white ${openProductCodeAgenceId === aggregatedData.agency.id ?
                            "transform duration-150 rotate-180" : "transform duration-150 rotate-0"}`}
                        />
                      </button>
                      <button
                        type="button"
                        className="bg-accent rounded-md px-1.5 py-0.5 inline-block align-middle"
                        aria-label="Add stock button"
                        onClick={() => toggleAddProductStockModal(aggregatedData, product)}
                      >
                        <PlusIcon className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  </td>
                </tr>
                {openProductCodeAgenceId === aggregatedData.agency.id && (
                  <ProductStockDetails
                    data={data}
                    aggregatedData={aggregatedData}
                    handleDeleteProductCode={handleDeleteProductCode}
                  />
                )}
              </React.Fragment>
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
      {isAddStockModalOpen && selectedAgency && (
        <ProductStockModal
          isOpen={isAddStockModalOpen}
          onClose={() => toggleAddProductStockModal(data, product)}
          agency={selectedAgency}
          product={product}
          refetch={refetch}
        />
      )}
    </>
  );
}
