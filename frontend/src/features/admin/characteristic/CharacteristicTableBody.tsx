import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import { ParentCategory, ProductCharacteristic } from "@/graphql/generated/schema";
import { characteristicTableHeaders } from "../helpers/tableHeaders";
import { TableBodyProps } from "../product/types";
import {
  useDeleteProductCharacteristicMutation
} from "@/graphql/ProductCharacteristic/generated/deleteProductCharacteristic.generated";
import { Characteristic } from "./types";
import CharacteristicUpdateModal from "./CharacteristicUpdateModal";
import CharacteristicDeleteModal from "./CharacteristicDeleteModal";
import Loading from "@/shared/components/Loading";
import { toast } from "react-toastify";

export default function CharacteristicTableBody({ data, refetch, loading }: TableBodyProps) {
  const { t } = useTranslation("CharacteristicTableBody");

  const [deleteCharacteristic, { error }] = useDeleteProductCharacteristicMutation();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCharacteristic, setSelectedCharacteristic] = useState<Characteristic | null>(null);

  const toggleUpdateParentCategoryModal = (characteristic: Characteristic) => {
    setSelectedCharacteristic(characteristic);
    setIsUpdateModalOpen(!isUpdateModalOpen);
  };

  const toggleDeleteParentCategoryModal = (characteristic: Characteristic) => {
    setSelectedCharacteristic(characteristic);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDeleteCharacteristic = async (id: number) => {
    try {
      await deleteCharacteristic({ variables: { productCharacteristicId: id } });
      refetch && refetch();
      setIsDeleteModalOpen(!isDeleteModalOpen);
      toast.success(t("Characteristic deleted successfully"));
    } catch (e) {
      toast.error(error?.message);
      console.error(e);
    }
  };

  return (
    <>
      <table className="min-w-full rounded border border-gray-200 border-separate border-spacing-0">
        <thead>
          <tr>
            {characteristicTableHeaders.map(menu => (
              <th
                className="h-14 p-3 first:pl-8 last:pr-8 text-left uppercase text-sm font-bold whitespace-nowrap 
              border-b border-gray-200"
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
              <td className="p-4 text-center" colSpan={2}>
                <Loading loading={loading} />
              </td>
            </tr>
          )}
          {!loading && data.length === 0 ? (
            <tr>
              <td className="p-4 text-center" colSpan={3}>
                {t("No characteristics found")}
              </td>
            </tr>
          ) : (
            data.map((parentCategory: ParentCategory, index: number) => (
              <tr
                key={parentCategory.id}
                className={`${index % 2 === 0 && "bg-cactus-50"} whitespace-nowrap h-12 hover:bg-cactus-300`}
              >
                <td className="whitespace-nowrap p-3 pl-8 w-4/5 min-w-max">{parentCategory.name}</td>
                <td className="whitespace-nowrap p-3 pr-8 w-1/5 min-w-max text-left align-middle">
                  <div className="inline-block">
                    <button
                      type="button"
                      className="inline-block bg-[#4F636F] rounded-md px-1.5 py-0.5 mr-2.5 align-middle"
                      aria-label="Edit button"
                      onClick={() => toggleUpdateParentCategoryModal(parentCategory)}
                    >
                      <PencilSquareIcon className="h-5 w-5 text-white" />
                    </button>
                    <button
                      type="button"
                      className="inline-block bg-[#D23732] rounded-md px-1.5 py-0.5 align-middle"
                      aria-label="Delete button"
                      onClick={() => toggleDeleteParentCategoryModal(parentCategory)}
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
        <CharacteristicUpdateModal
          characteristic={selectedCharacteristic!}
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(!isUpdateModalOpen)}
        />
      )}
      {isDeleteModalOpen && (
        <CharacteristicDeleteModal
          characteristic={selectedCharacteristic!}
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
          handleDelete={handleDeleteCharacteristic}
        />
      )}
    </>
  );
}
