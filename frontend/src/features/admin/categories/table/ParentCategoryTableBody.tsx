import React, { useState } from "react";
import { TableBodyProps } from "../../product/types";
import { parentCategoryTableHeaders } from "../../helpers/tableHeaders";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import { ParentCategory } from "@/graphql/generated/schema";
import { useDeleteParentCategoryMutation } from "@/graphql/ParentCategory/generated/deleteParentCategory.generated";
import {
  GetAllParentCategoriesDocument,
  GetAllParentCategoriesQuery,
} from "@/graphql/ParentCategory/generated/getAllParentCategories.generated";
import ParentCategoryDeleteModal from "../modal/ParentCategoryDeleteModal";
import ParentCategoryUpdateModal from "../modal/ParentCategoryUpdateModal";
import Loading from "@/shared/components/Loading";
import { toast } from "react-toastify";
import client from "@/graphql/client";

export default function ParentCategoryTableBody({ data, loading }: TableBodyProps) {
  const { t } = useTranslation("ParentCategoryTableBody");

  const [deleteParentCategory, { error }] = useDeleteParentCategoryMutation();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedParentCategory, setSelectedParentCategory] = useState<ParentCategory | null>(null);

  const toggleUpdateParentCategoryModal = (parentCategory: ParentCategory) => {
    setSelectedParentCategory(parentCategory);
    setIsUpdateModalOpen(!isUpdateModalOpen);
  };

  const toggleDeleteParentCategoryModal = (parentCategory: ParentCategory) => {
    setSelectedParentCategory(parentCategory);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteParentCategory({ variables: { parentCategoryId: id } });
      client.writeQuery<GetAllParentCategoriesQuery>({
        query: GetAllParentCategoriesDocument,
        data: {
          getAllParentCategories: data.filter((parentCategory: ParentCategory) => parentCategory.id !== id),
        },
      });
      setIsDeleteModalOpen(!isDeleteModalOpen);
      toast.success(t("Parent category deleted successfully"));
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
            {parentCategoryTableHeaders.map(menu => (
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
              <td className="p-4 text-center" colSpan={2}>
                <Loading loading={loading} />
              </td>
            </tr>
          )}
          {!loading && data.length === 0 ? (
            <tr>
              <td className="p-4 text-center" colSpan={3}>
                {t("No parent categories found")}
              </td>
            </tr>
          ) : (
            data.map((parentCategory: ParentCategory, index: number) => (
              <tr
                key={parentCategory.id}
                className={`${index % 2 === 0 && "bg-cactus-300/50"} whitespace-nowrap h-12 
                hover:bg-cactus-300 hover:text-black`}
              >
                <td className="whitespace-nowrap p-3 pl-8 w-4/5 min-w-max">{parentCategory.name}</td>
                <td className="whitespace-nowrap p-3 pr-8 w-1/5 min-w-max text-left align-middle">
                  <div className="inline-block">
                    <button
                      type="button"
                      className="inline-block bg-[#38464f] rounded-md px-1.5 py-0.5 mr-2.5 align-middle"
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
        <ParentCategoryUpdateModal
          parentCategory={selectedParentCategory!}
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(!isUpdateModalOpen)}
        />
      )}
      {isDeleteModalOpen && (
        <ParentCategoryDeleteModal
          parentCategory={selectedParentCategory!}
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
          handleDelete={handleDeleteCategory}
        />
      )}
    </>
  );
}
