import React, { useState } from "react";
import { PencilSquareIcon, PhotoIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import { TableBodyProps } from "../product/types";
import { Brand } from "./types";
import { useDeleteBrandMutation } from "@/graphql/Brand/generated/deleteBrand.generated";
import BrandUpdateModal from "./BrandUpdateModal";
import { brandTableHeaders } from "../helpers/tableHeaders";
import BrandDeleteModal from "./BrandDeleteModal";
import BrandLogoModal from "./BrandLogoModal";
import Loading from "@/shared/components/Loading";
import { toast } from "react-toastify";

export default function BrandTableBody({ data, refetch, loading }: TableBodyProps) {
  const { t } = useTranslation("BrandTableBody");

  const [deleteBrand, { error }] = useDeleteBrandMutation();
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  const toggleLogoModal = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsLogoModalOpen(!isLogoModalOpen);
  };

  const toggleUpdateBrandModal = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsUpdateModalOpen(!isUpdateModalOpen);
  };

  const toggleDeleteBrandModal = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDeleteBrand = async (id: number) => {
    try {
      await deleteBrand({ variables: { brandId: id } });
      refetch && refetch();
      setIsDeleteModalOpen(!isDeleteModalOpen);
      toast.success(t("Brand deleted successfully"));
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
            {brandTableHeaders.map(menu => (
              <th
                key={menu.id}
                className="h-14 p-3 first:pl-8 last:pr-8 text-left uppercase text-sm font-bold whitespace-nowrap 
                border-b border-gray-200 dark:border-gray-600">
                {menu.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm">
          {loading && (
            <tr>
              <td className="p-4 text-center" colSpan={3}>
                <Loading loading={loading} />
              </td>
            </tr>
          )}
          {!loading && data.length === 0 ? (
            <tr>
              <td className="p-4 text-center" colSpan={4}>
                {t("No brands found")}
              </td>
            </tr>
          ) : (
            data.map((brand: Brand, index: number) => (
              <tr
                key={brand.id}
                className={`${index % 2 === 0 && "bg-cactus-50 dark:bg-cactus-600"} whitespace-nowrap h-12 hover:bg-cactus-300 dark:hover:text-black`}
              >
                <td className="whitespace-nowrap p-3 pl-8 w-1/2 min-w-max">{brand.name}</td>
                <td className="whitespace-nowrap p-3 w-1/2 min-w-max">
                  <button
                    type="button"
                    className="inline-block bg-cactus-400 rounded-md px-1.5 py-0.5 mr-2.5 align-middle"
                    aria-label="Edit button"
                    onClick={() => toggleLogoModal(brand)}
                  >
                    <PhotoIcon className="h-5 w-5 text-white" />
                  </button>
                </td>
                <td className="whitespace-nowrap p-3 pr-8 w-1/5 min-w-max text-left align-middle">
                  <div className="inline-block">
                    <button
                      type="button"
                      className="inline-block bg-[#4F636F] rounded-md px-1.5 py-0.5 mr-2.5 align-middle"
                      aria-label="Edit button"
                      onClick={() => toggleUpdateBrandModal(brand)}
                    >
                      <PencilSquareIcon className="h-5 w-5 text-white" />
                    </button>
                    <button
                      type="button"
                      className="inline-block bg-[#D23732] rounded-md px-1.5 py-0.5 align-middle"
                      aria-label="Delete button"
                      onClick={() => toggleDeleteBrandModal(brand)}
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
      {isLogoModalOpen && (
        <BrandLogoModal
          brand={selectedBrand!}
          isOpen={isLogoModalOpen}
          onClose={() => setIsLogoModalOpen(!isLogoModalOpen)}
        />
      )}
      {isUpdateModalOpen && (
        <BrandUpdateModal
          brand={selectedBrand!}
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(!isUpdateModalOpen)}
        />
      )}
      {isDeleteModalOpen && (
        <BrandDeleteModal
          brand={selectedBrand!}
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
          handleDelete={handleDeleteBrand}
        />
      )}
    </>
  );
}
