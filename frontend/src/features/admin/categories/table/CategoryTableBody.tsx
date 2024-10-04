import React, { useState } from "react";
import client from "@/graphql/client";
import { TableBodyProps } from "../../product/types";
import { categoryTableHeaders } from "../../helpers/tableHeaders";
import { PencilSquareIcon, PhotoIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import CategoryDeleteModal from "../modal/CategoryDeleteModal";
import { useDeleteCategoryMutation } from "@/graphql/Category/generated/deleteCategory.generated";
import { Category } from "../types";
import CategoryThumbnailModal from "../modal/CategoryThumbnailModal";
import CategoryUpdateModal from "../modal/CategoryUpdateModal";
import { GetAllCategoriesDocument, GetAllCategoriesQuery } from "@/graphql/Category/generated/getAllCats.generated";
import Loading from "@/shared/components/Loading";
import { toast } from "react-toastify";

export default function CategoryTableBody({ data, loading }: TableBodyProps) {
  const { t } = useTranslation("CategoryTableBody");

  const [deleteCategory, { error }] = useDeleteCategoryMutation();
  const [isThumbnailModalOpen, setIsThumbnailModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const toggleThumbnailModal = (category: Category) => {
    setSelectedCategory(category);
    setIsThumbnailModalOpen(!isThumbnailModalOpen);
  };

  const toggleUpdateCategoryModal = (category: Category) => {
    setSelectedCategory(category);
    setIsUpdateModalOpen(!isUpdateModalOpen);
  };

  const toggleDeleteCategoryModal = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteCategory({ variables: { categoryId: id } });
      await client.writeQuery<GetAllCategoriesQuery>({
        query: GetAllCategoriesDocument,
        data: {
          getAllCategories: data.filter((category: Category) => category.id !== id),
        },
      });
      setIsDeleteModalOpen(!isDeleteModalOpen);
      toast.success(t("Category deleted successfully"));
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
            {categoryTableHeaders.map(menu => (
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
          {loading && (
            <tr>
              <td className="p-4 text-center" colSpan={2}>
                <Loading loading={loading} />
              </td>
            </tr>
          )}
          {!loading && data.length === 0 ? (
            <tr>
              <td className="p-4 text-center" colSpan={4}>
                {t("No categories found")}
              </td>
            </tr>
          ) : (
            data.map((category: Category, index: number) => (
              <React.Fragment key={category.id}>
                <tr
                  className={`${index % 2 === 0 && "bg-cactus-50 dark:bg-cactus-600"} whitespace-nowrap h-12 
                  hover:bg-cactus-300 dark:hover:text-black`}
                >
                  <td className="whitespace-nowrap p-3 pl-8 w-1/3 min-w-max">{category.name}</td>
                  <td className="whitespace-nowrap p-3 w-1/3 min-w-max">
                    <button
                      type="button"
                      className="inline-block bg-cactus-400 rounded-md px-1.5 py-0.5 mr-2.5 align-middle"
                      aria-label="Edit button"
                      onClick={() => toggleThumbnailModal(category)}
                    >
                      <PhotoIcon className="h-5 w-5 text-white" />
                    </button>
                  </td>
                  <td className="whitespace-nowrap p-3 w-1/3 min-w-max">{category.parentCategory?.name}</td>
                  <td className="whitespace-nowrap p-3 pr-8 w-1/5 min-w-max text-left align-middle">
                    <div className="inline-block">
                      <button
                        type="button"
                        className="inline-block bg-[#4F636F] rounded-md px-1.5 py-0.5 mr-2.5 align-middle"
                        aria-label="Edit button"
                        onClick={() => toggleUpdateCategoryModal(category)}
                      >
                        <PencilSquareIcon className="h-5 w-5 text-white" />
                      </button>
                      <button
                        type="button"
                        className="inline-block bg-[#D23732] rounded-md px-1.5 py-0.5 align-middle"
                        aria-label="Delete button"
                        onClick={() => toggleDeleteCategoryModal(category)}
                      >
                        <TrashIcon className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
      {isThumbnailModalOpen && (
        <CategoryThumbnailModal
          category={selectedCategory!}
          isOpen={isThumbnailModalOpen}
          onClose={() => setIsThumbnailModalOpen(!isThumbnailModalOpen)}
        />
      )}
      {isUpdateModalOpen && (
        <CategoryUpdateModal
          category={selectedCategory!}
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(!isUpdateModalOpen)}
        />
      )}
      {isDeleteModalOpen && (
        <CategoryDeleteModal
          category={selectedCategory!}
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
          handleDelete={handleDeleteCategory}
        />
      )}
    </>
  );
}
