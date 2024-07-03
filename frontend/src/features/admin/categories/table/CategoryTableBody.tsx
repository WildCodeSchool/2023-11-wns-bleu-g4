import React, { useState } from "react";
import client from "@/graphql/client";
import { TableBodyProps } from "../../product/types";
import { categoryTableHeaders } from "../../helpers/tableHeaders";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import CategoryDeleteModal from "../modal/CategoryDeleteModal";
// import ProductUpdateModal from "../modal/ProductUpdateModal";
import { Category } from "@/graphql/generated/schema";
import { GetAllCategoriesDocument, GetAllCategoriesQuery } from "@/graphql/Category/generated/getAllCategories.generated";
import { useDeleteCategoryMutation } from "@/graphql/Category/generated/deleteCategory.generated";

export default function CategoryTableBody({ data }: TableBodyProps) {
  const { t } = useTranslation("CategoryTableBody");

  const [deleteCategory] = useDeleteCategoryMutation();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

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
      client.writeQuery<GetAllCategoriesQuery>({
        query: GetAllCategoriesDocument,
        data: {
          getAllCategories: data.filter((category: Category) => category.id !== id),
        },
      });
      setIsDeleteModalOpen(!isDeleteModalOpen)
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <table className="min-w-full rounded border border-gray-200 border-separate border-spacing-0">
      <thead>
        <tr>
          {categoryTableHeaders.map(menu => (
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
        {data.length !== 0 ? (
          data.map((category: Category, index: number) => (
            <React.Fragment key={category.id}>
              <tr className={`${index % 2 === 0 && "bg-cactus-50"} whitespace-nowrap h-12 hover:bg-cactus-300`}>
                <td className="whitespace-nowrap p-3 pl-8 w-48 min-w-max">{category.name}</td>
                <td className="whitespace-nowrap p-3 w-48 min-w-max">{category.name}</td>
                <td className="whitespace-nowrap p-3 pr-8 w-48 min-w-max text-left align-middle">
                  <div className="inline-block">
                    <button
                      type="button"
                      className="inline-block bg-[#4F636F] rounded-md px-1.5 py-0.5 mr-2.5 align-middle"
                      aria-label="Edit button"
                      onClick={() => toggleUpdateCategoryModal(category)}
                    >
                      <PencilSquareIcon className="h-5 w-5 text-white" />
                    </button>
                    {/* {isUpdateModalOpen && (
                      <ProductUpdateModal
                        product={selectedCategory}
                        isOpen={isUpdateModalOpen}
                        onClose={() => setIsUpdateModalOpen(!isUpdateModalOpen)}
                        variant="baseStyle"
                      />
                    )} */}
                    <button
                      type="button"
                      className="inline-block bg-[#D23732] rounded-md px-1.5 py-0.5 align-middle"
                      aria-label="Delete button"
                      onClick={() => toggleDeleteCategoryModal(category)}
                    >
                      <TrashIcon className="h-5 w-5 text-white" />
                    </button>
                    {isDeleteModalOpen && (
                      <CategoryDeleteModal
                        category={selectedCategory!}
                        isOpen={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
                        handleDelete={handleDeleteCategory}
                      />
                    )}
                  </div>
                </td>
              </tr>
            </React.Fragment>
          ))
        ) : (
          <tr>
            <td className="p-4 text-center" colSpan={3}>
              {t("No categories found")}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
