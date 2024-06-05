import React, { useState } from "react";
import { TableBodyProps } from "../types";
import { productTableHeaders } from "../helpers/tableHeaders";
import { ChevronDownIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import ProductDeleteModal from "../modal/productDeleteModal";
import ProductUpdateModal from "../modal/productUpdateModal";

export default function ProductTableBody({ data }: TableBodyProps) {
  const { t } = useTranslation("ProductTableBody");

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [openProductId, setOpenProductId] = useState<string | null>(null);

  const handleProductDetails = (productId: string) => {
    setOpenProductId(prevProductId => (prevProductId === productId ? null : productId));
  };

  const toggleUpdateProductModal = (project: any) => {
    setSelectedProduct(project);
    setIsUpdateModalOpen(!isUpdateModalOpen);
  };

  const toggleDeleteProductModal = (project: any) => {
    setSelectedProduct(project);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  return (
    <table className="min-w-full rounded border border-gray-200 border-separate border-spacing-0">
      <thead>
        <tr>
          {productTableHeaders.map(menu => (
            <th
              className="h-14 p-3 first:pl-8 last:pr-8 text-gray-600 text-left uppercase text-sm font-bold whitespace-nowrap border-b border-gray-200"
              key={menu.id}
            >
              {menu.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-sm">
        {data.length !== 0 ? (
          data.map((product: any, index: number) => (
            <React.Fragment key={product.id}>
              <tr className={`${index % 2 === 0 && "bg-cactus-50"} whitespace-nowrap h-12`}>
                <td className="whitespace-nowrap p-3 pl-8 w-48 min-w-max">{product.reference}</td>
                <td className="whitespace-nowrap p-3 w-96 min-w-max">{product.name}</td>
                <td className="whitespace-nowrap p-3 w-96 min-w-max">{product.brand}</td>
                <td className="whitespace-nowrap p-3 w-48 min-w-max">{product.price}</td>
                <td className="whitespace-nowrap p-3 pr-8 w-48 min-w-max text-left align-middle">
                  <div className="inline-block">
                    <button
                      type="button"
                      className="inline-block bg-cactus-400 rounded-md px-1.5 py-0.5 mr-2.5 align-middle"
                      onClick={() => handleProductDetails(product.id)}
                      aria-label="Product details button"
                    >
                      <ChevronDownIcon
                        className={`h-5 w-5 text-white ${openProductId === product.id ? "transform duration-150 rotate-180" : "transform duration-150 rotate-0"}`}
                      />
                    </button>
                    <button
                      type="button"
                      className="inline-block bg-[#4F636F] rounded-md px-1.5 py-0.5 mr-2.5 align-middle"
                      aria-label="Edit button"
                      onClick={() => toggleUpdateProductModal(product)}
                    >
                      <PencilSquareIcon className="h-5 w-5 text-white" />
                    </button>
                    {isUpdateModalOpen && (
                      <ProductUpdateModal
                        product={selectedProduct}
                        isOpen={isUpdateModalOpen}
                        onClose={() => setIsUpdateModalOpen(!isUpdateModalOpen)}
                      />
                    )}
                    <button
                      type="button"
                      className="inline-block bg-[#D23732] rounded-md px-1.5 py-0.5 align-middle"
                      aria-label="Delete button"
                      onClick={() => toggleDeleteProductModal(product)}
                    >
                      <TrashIcon className="h-5 w-5 text-white" />
                    </button>
                    {isDeleteModalOpen && (
                      <ProductDeleteModal
                        product={selectedProduct}
                        isOpen={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
                      />
                    )}
                  </div>
                </td>
              </tr>
              {openProductId === product.id && (
                <tr>
                  <td className="border-y border-b-gray-300 border-t-gray-200 p-4 text-center" colSpan={5}>
                    {t("Product")} {product.description}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))
        ) : (
          <tr>
            <td className="p-4 text-center" colSpan={5}>
              {t("No products found")}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
