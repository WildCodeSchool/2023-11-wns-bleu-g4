import { BanknotesIcon, CubeIcon, DocumentTextIcon, Squares2X2Icon, TagIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import ProductDeleteModal from "./modal/ProductDeleteModal";
import ProductUpdateModal from "./modal/ProductUpdateModal";
import { useDeleteProductMutation } from "@/graphql/Product/generated/deleteProduct.generated";
import { useRouter } from "next/router";
import ProductCharUpdateModal from "./modal/ProductCharUpdateModal";
import { Product } from "./types";
import { Characteristic } from "../characteristic/types";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function ProductDetails({ product }: { product: Product }) {
  const router = useRouter();
  const { t } = useTranslation("ProductDetails");
  const [deleteProduct, { error }] = useDeleteProductMutation();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCharacteristicsModalOpen, setIsCharacteristicsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const toggleUpdateProductModal = () => setIsUpdateModalOpen(!isUpdateModalOpen);
  const toggleCharacteristicsModal = () => setIsCharacteristicsModalOpen(!isCharacteristicsModalOpen);
  const toggleDeleteProductModal = () => setIsDeleteModalOpen(!isDeleteModalOpen);

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct({ variables: { productId: id } });
      router.push("/admin/products");
      toast.success(t("Product deleted successfully"));
    } catch (e) {
      toast.error(error?.message);
      console.error(e);
    }
  };

  return (
    <div className="bg-cactus-300/50 rounded flex flex-col gap-12 p-4 justify-between w-full max-w-96 2xl:max-w-md h-fit">
      <div className="flex flex-col gap-8">
        <div className="flex gap-4">
          {product?.thumbnail && (
            <img src={product.thumbnail} alt={product.name} className="h-40 w-40 rounded object-cover object-center" />
          )}
          <div className="mt-4">
            <h3>{product?.name}</h3>
            <span>Reference: {product?.id}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-3">
          <span className="flex font-bold text-slate-500">
            <Squares2X2Icon className="h-6 w-6 mr-2" />
            Category :
          </span>
          {product?.category.name}
          <span className=" flex font-bold text-slate-500">
            <TagIcon className="h-6 w-6 mr-2" />
            Brand :
          </span>
          {product?.brand.name}
          <span className="flex font-bold text-slate-500">
            <BanknotesIcon className="h-6 w-6 mr-2" />
            Price :
          </span>
          {product?.price} €
          <span className="flex font-bold text-slate-500 col-span-2">
            <DocumentTextIcon className="h-6 w-6 mr-2" />
            Description :
          </span>
          <p className="col-span-2">{product?.description}</p>
          <div className="flex justify-between items-center col-span-2">
            <span className="flex font-bold text-slate-500 col-span-2">
              <CubeIcon className="h-6 w-6 mr-2" />
              Characteristics :
            </span>
            <button
              type="button"
              className="bg-cactus-500 rounded px-3 py-1 text-white text-sm"
              onClick={toggleCharacteristicsModal}
            >
              Edit
            </button>
            {isCharacteristicsModalOpen && (
              <ProductCharUpdateModal
                product={product}
                isOpen={isCharacteristicsModalOpen}
                onClose={() => setIsCharacteristicsModalOpen(!isCharacteristicsModalOpen)}
              />
            )}
          </div>
          {product?.characteristics.length === 0 && <span className="col-span-2 italic">No characteristics</span>}
          {product?.characteristics.map((characteristic: Characteristic) => (
            <div key={characteristic.id} className="flex flex-col">
              <span>- {characteristic.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 justify-end h-12">
        <button type="button" className="bg-cactus-500 rounded px-3 py-1 text-white" onClick={toggleUpdateProductModal}>
          Edit Product
        </button>
        {isUpdateModalOpen && (
          <ProductUpdateModal
            product={product}
            isOpen={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(!isUpdateModalOpen)}
          />
        )}
        <button type="button" className="bg-[#D23732] rounded px-3 py-1 text-white" onClick={toggleDeleteProductModal}>
          Delete Product
        </button>
        {isDeleteModalOpen && (
          <ProductDeleteModal
            product={product}
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
            handleDeleteProduct={handleDeleteProduct}
          />
        )}
      </div>
    </div>
  );
}
