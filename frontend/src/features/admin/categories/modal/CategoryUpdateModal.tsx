import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import uploadFile from "../../helpers/uploadFile";
import { CategoryModalProps, ParentCategory } from "../types";
import { useGetAllParentCategoriesQuery } from "@/graphql/ParentCategory/generated/getAllParentCategories.generated";
import { useUpdateCategoryMutation } from "@/graphql/Category/generated/updateCategory.generated";
import { GetCategoryByIdDocument } from "@/graphql/Category/generated/getCategoryById.generated";

export default function CategoryUpdateModal({ isOpen, onClose, category }: CategoryModalProps) {
  const [updateCategory] = useUpdateCategoryMutation();
  const [imageURL, setImageURL] = useState(category?.thumbnail);
  const [formData, setFormData] = useState({
    name: category?.name,
    thumbnail: imageURL,
    parentCategory: category?.parentCategory.id!,
  });

  const categoryId = category?.id!;

  const { data: parentCategoriesData } = useGetAllParentCategoriesQuery();
  const parentCategories = parentCategoriesData?.getAllParentCategories ?? [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value, 10),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const categoryData = {
      ...formData,
      parentCategory: { id: formData.parentCategory },
      thumbnail: imageURL,
    };

    updateCategory({
      variables: { data: categoryData, categoryId },
      refetchQueries: [{ query: GetCategoryByIdDocument, variables: { categoryId } }],
    })
      .then(onClose)
      .catch(console.error);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="darkOverlayStyle" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update {category?.name} category</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired mb={4}>
              <FormLabel mb={1} htmlFor="name">
                Name
              </FormLabel>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel mb={1} htmlFor="parentCategory">
                Parent Category
              </FormLabel>
              <Select
                placeholder="Select a parent category"
                id="parentCategory"
                name="parentCategory"
                value={formData.parentCategory}
                onChange={handleSelectChange}
              >
                {parentCategories.map((parentCategory: ParentCategory) => (
                  <option key={parentCategory.id} value={parentCategory.id}>
                    {parentCategory.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel mb={1} htmlFor="thumbnail">
                Thumbnail
              </FormLabel>
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                onChange={e => {
                  if (e.target.files?.[0]) uploadFile(e.target.files?.[0]).then(setImageURL);
                }}
              />
            </FormControl>
            <ModalFooter paddingInline={0} pb={0} pt={8}>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="blue" ml={3} type="submit">
                Update
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
