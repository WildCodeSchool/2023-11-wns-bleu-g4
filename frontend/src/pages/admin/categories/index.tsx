import CategoryCreateModal from "@/features/admin/categories/modal/CategoryCreateModal";
import ParentCategoryCreateModal from "@/features/admin/categories/modal/ParentCategoryCreateModal";
import CategoryTableBody from "@/features/admin/categories/table/CategoryTableBody";
import ParentCategoryTableBody from "@/features/admin/categories/table/ParentCategoryTableBody";
import { useGetAllCategoriesQuery } from "@/graphql/Category/generated/getAllCats.generated";
import { useGetAllParentCategoriesQuery } from "@/graphql/ParentCategory/generated/getAllParentCategories.generated";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Categories() {
  const [createCategoryModalOpen, setCreateCategoryModalOpen] = useState(false);
  const [createParentCategoryModalOpen, setCreateParentCategoryModalOpen] = useState(false);

  const { data: categoriesData, loading: categoriesLoading } = useGetAllCategoriesQuery();
  const categories = categoriesData?.getAllCategories || [];
  const { data: parentCategoriesData, loading: parentCategoriesLoading } = useGetAllParentCategoriesQuery();
  const parentCategories = parentCategoriesData?.getAllParentCategories || [];

  const toggleCreateCategoryModal = () => setCreateCategoryModalOpen(!createCategoryModalOpen);
  const toggleCreateParentCategoryModal = () => setCreateParentCategoryModalOpen(!createParentCategoryModalOpen);

  return (
    <LayoutAdmin pageTitle="Categories">
      <h1>Categories</h1>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Parent Categories</Tab>
          <Tab>Categories</Tab>
        </TabList>
        <TabPanels>
          <TabPanel paddingX={0} className="flex flex-col items-end gap-4">
            <button
              type="button"
              className="flex gap-2 items-center bg-accent font-semibold rounded-md text-white px-3 py-1"
              onClick={toggleCreateParentCategoryModal}
            >
              <PlusIcon className="h-6 w-6" />
              Add Parent Category
            </button>
            {createParentCategoryModalOpen && (
              <ParentCategoryCreateModal
                isOpen={createParentCategoryModalOpen}
                onClose={toggleCreateParentCategoryModal}
              />
            )}
            <ParentCategoryTableBody data={parentCategories} loading={parentCategoriesLoading} />
          </TabPanel>
          <TabPanel paddingX={0} className="flex flex-col items-end gap-4">
            <button
              type="button"
              className="flex gap-2 items-center bg-accent font-semibold rounded-md text-white px-3 py-1"
              onClick={toggleCreateCategoryModal}
            >
              <PlusIcon className="h-6 w-6" />
              Add Category
            </button>
            {createCategoryModalOpen && (
              <CategoryCreateModal isOpen={createCategoryModalOpen} onClose={toggleCreateCategoryModal} />
            )}
            <CategoryTableBody data={categories} loading={categoriesLoading} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </LayoutAdmin>
  );
}
