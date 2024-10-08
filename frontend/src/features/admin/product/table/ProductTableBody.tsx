import React, { useState } from "react";
import { TableBodyProps } from "../types";
import { productTableHeaders } from "../../helpers/tableHeaders";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import ProductDeleteModal from "../modal/ProductDeleteModal";
import ProductUpdateModal from "../modal/ProductUpdateModal";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { Product } from "@/graphql/generated/schema";
import { useDeleteProductMutation } from "@/graphql/Product/generated/deleteProduct.generated";
import Loading from "@/shared/components/Loading";
import { toast } from "react-toastify";

export default function ProductTableBody({ data, refetch, loading }: TableBodyProps) {
  const { t } = useTranslation("ProductTableBody");
  const router = useRouter();

  const [deleteProduct, { error }] = useDeleteProductMutation();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const toggleUpdateProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsUpdateModalOpen(!isUpdateModalOpen);
  };

  const toggleDeleteProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct({ variables: { productId: id } });
      refetch && refetch();
      setIsDeleteModalOpen(!isDeleteModalOpen);
      toast.success(t("Product deleted successfully"));
    } catch (e) {
      toast.error(error?.message);
      console.error(e);
    }
  };

  return (
    <>
      <table className="min-w-full rounded border border-gray-400 border-separate border-spacing-0">
        <thead>
          <tr>
            {productTableHeaders.map(menu => (
              <th
                className="h-14 p-3 first:pl-8 last:pr-8 text-left uppercase text-sm font-bold whitespace-nowrap 
              border-b border-gray-400"
                key={menu.id}
              >
                {menu.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm">
          {loading && (
            <tr>
              <td className="p-4 text-center" colSpan={6}>
                <Loading loading={loading} />
              </td>
            </tr>
          )}
          {!loading && data.length === 0 ? (
            <tr>
              <td className="p-4 text-center" colSpan={6}>
                {t("No products found")}
              </td>
            </tr>
          ) : (
            data.map((product: Product, index: number) => (
              <tr
                key={product.id}
                className={`${index % 2 === 0 && "bg-cactus-300/50"} 
                whitespace-nowrap h-12 hover:bg-cactus-300 hover:text-dark`}
              >
                <td className="whitespace-nowrap p-3 pl-8 w-48 min-w-max">{product.id}</td>
                <td className="whitespace-nowrap p-3 w-80 min-w-max truncate max-w-80" title={product.name}>
                  {product.name}
                </td>
                <td className="whitespace-nowrap p-3 w-40 min-w-max truncate max-w-40">{product.brand.name}</td>
                <td className="whitespace-nowrap p-3 w-48 min-w-max">{product.category.name}</td>
                <td className="whitespace-nowrap p-3 w-48 min-w-max">{product.price.toFixed(2)}</td>
                <td className="whitespace-nowrap p-3 pr-8 w-48 min-w-max text-left align-middle">
                  <div className="inline-block">
                    <button
                      type="button"
                      className="inline-block bg-cactus-600 rounded-md px-1.5 py-0.5 mr-2.5 align-middle"
                      onClick={() => router.push(`/admin/products/${product.id}`)}
                      aria-label="Product details button"
                    >
                      <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                    </button>
                    <button
                      type="button"
                      className="inline-block bg-[#38464f] rounded-md px-1.5 py-0.5 mr-2.5 align-middle"
                      aria-label="Edit button"
                      onClick={() => toggleUpdateProductModal(product)}
                    >
                      <PencilSquareIcon className="h-5 w-5 text-white" />
                    </button>
                    <button
                      type="button"
                      className="inline-block bg-[#D23732] rounded-md px-1.5 py-0.5 align-middle"
                      aria-label="Delete button"
                      onClick={() => toggleDeleteProductModal(product)}
                    >
                      <TrashIcon className="h-5 w-5 text-white" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {isUpdateModalOpen && (
        <ProductUpdateModal
          product={selectedProduct!}
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(!isUpdateModalOpen)}
        />
      )}
      {isDeleteModalOpen && (
        <ProductDeleteModal
          product={selectedProduct!}
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
          handleDeleteProduct={handleDeleteProduct}
        />
      )}
    </>
  );
}
