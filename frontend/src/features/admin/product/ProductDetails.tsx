import { BanknotesIcon, DocumentTextIcon, Squares2X2Icon, TagIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import ProductDeleteModal from "../modal/productDeleteModal";
import ProductUpdateModal from "../modal/productUpdateModal";

export default function ProductDetails({ product }: { product: any }) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const toggleUpdateProductModal = () => setIsUpdateModalOpen(!isUpdateModalOpen);
  const toggleDeleteProductModal = () => setIsDeleteModalOpen(!isDeleteModalOpen);

  return (
    <div className="flex flex-col gap-4 w-full max-w-96 2xl:max-w-md">
      <h2>Informations</h2>
      <div className="bg-[#F5F5F5] rounded flex flex-col gap-12 p-4 justify-between">
        <div className="flex flex-col gap-8">
          <div className="flex gap-4">
            <img src={product.thumbnail} alt={product.name} className="h-40 w-40 rounded aspect-square" />
            <div className="mt-4">
              <h3>{product.name}</h3>
              <span>Reference: {product.reference}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-y-3">
            <span className="font-bold col-span-2">Details</span>
            <span className="flex font-semibold text-slate-500">
              <Squares2X2Icon className="h-6 w-6 mr-2" />
              Category :
            </span>
            {product.category}
            <span className=" flex font-semibold text-slate-500">
              <TagIcon className="h-6 w-6 mr-2" />
              Brand :
            </span>
            {product.brand}
            <span className="flex font-semibold text-slate-500">
              <BanknotesIcon className="h-6 w-6 mr-2" />
              Price :
            </span>
            {product.price} $
            <span className="flex font-semibold text-slate-500 col-span-2">
              <DocumentTextIcon className="h-6 w-6 mr-2" />
              Description :
            </span>
            <p className="col-span-2">{product.description}</p>
          </div>
        </div>
        <div className="flex gap-2 justify-end flex-grow">
          <button
            type="button"
            className="bg-cactus-400 rounded px-3 py-1 text-white"
            onClick={toggleUpdateProductModal}
          >
            Edit
          </button>
          {isUpdateModalOpen && (
            <ProductUpdateModal
              product={product}
              isOpen={isUpdateModalOpen}
              onClose={() => setIsUpdateModalOpen(!isUpdateModalOpen)}
              variant="darkOverlayStyle"
            />
          )}
          <button
            type="button"
            className="bg-[#D23732] rounded px-3 py-1 text-white"
            onClick={toggleDeleteProductModal}
          >
            Delete
          </button>
          {isDeleteModalOpen && (
            <ProductDeleteModal
              product={product}
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
              variant="darkOverlayStyle"
            />
          )}
        </div>
      </div>
    </div>
  );
}
