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
} from "@chakra-ui/react";
import { CategoryModalProps } from "../types";
import { ChangeEvent, FormEvent, useState } from "react";
import { useUpdateParentCategoryMutation } from "@/graphql/ParentCategory/generated/updateParentCategory.generated";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import {
  GetAllParentCategoriesDocument, GetAllParentCategoriesQuery
} from "@/graphql/ParentCategory/generated/getAllParentCategories.generated";
import client from "@/graphql/client";

export default function ParentCategoryUpdateModal({ isOpen, onClose, parentCategory }: CategoryModalProps) {
  const { t } = useTranslation("ParentCategoryUpdateModal");
  const [updateParentCategory, { error }] = useUpdateParentCategoryMutation();
  const [formData, setFormData] = useState({ name: parentCategory?.name });

  const parentCategoryId = parentCategory?.id!;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateParentCategory({
        variables: { data: formData, parentCategoryId },
      })

      const existingData = client.readQuery<GetAllParentCategoriesQuery>(
        { query: GetAllParentCategoriesDocument }
      )!;

      const updatedData = existingData.getAllParentCategories.map(
        parentCategory =>
          parentCategory.id === parentCategoryId
            ? { ...parentCategory, ...formData }
            : parentCategory
      );

      client.writeQuery({
        query: GetAllParentCategoriesDocument,
        data: { getAllParentCategories: updatedData },
      });

      onClose();
      toast.success(t("Parent category updated successfully"));
    } catch (e) {
      toast.error(error?.message);
      console.error(e);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="darkOverlayStyle" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a new product</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
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
