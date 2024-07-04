"use client";
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
import { useCreateCategoryMutation } from "@/graphql/Category/generated/createCategory.generated";

export default function CategoryCreateModal({ isOpen, onClose, refetch }: CategoryModalProps) {
  const [createCategory] = useCreateCategoryMutation();
  const [imageURL, setImageURL] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    thumbnail: imageURL,
    parentCategory: { id: 0 },
  });

  const { data: parentCategoriesData } = useGetAllParentCategoriesQuery();
  const parentCategories = parentCategoriesData?.getAllParentCategories ?? [];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: { id: parseInt(value, 10) },
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const categoryData = {
      ...formData,
      parentCategory: { id: formData.parentCategory.id },
      thumbnail: imageURL,
    };

    try {
      await createCategory({ variables: { data: categoryData } });
      refetch && refetch();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="darkOverlayStyle" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a new category</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired mb={4}>
              <FormLabel mb={1} htmlFor="name">
                Name
              </FormLabel>
              <Input
                type="text"
                id=""
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
                value={formData.parentCategory.id}
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
                onChange={(e) => {
                  if (e.target.files?.[0])
                    uploadFile(e.target.files?.[0]).then(setImageURL);
                }}
              />
            </FormControl>
            <ModalFooter paddingInline={0} pb={0} pt={8}>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="blue" ml={3} type="submit">
                Create
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
