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
import { useCreateParentCategoryMutation } from "@/graphql/ParentCategory/generated/createParentCategory.generated";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import client from "@/graphql/client";
import {
  GetAllParentCategoriesDocument,
  GetAllParentCategoriesQuery,
} from "@/graphql/ParentCategory/generated/getAllParentCategories.generated";

export default function ParentCategoryCreateModal({ isOpen, onClose }: CategoryModalProps) {
  const { t } = useTranslation("ParentCategoryCreateModal");
  const [createParentCategory, { error }] = useCreateParentCategoryMutation();
  const [formData, setFormData] = useState({ name: "" });

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
      await createParentCategory({ variables: { data: formData } });

      const existingData = client.readQuery<GetAllParentCategoriesQuery>({ query: GetAllParentCategoriesDocument })!;

      const updatedData = [...existingData.getAllParentCategories, formData];

      client.writeQuery({
        query: GetAllParentCategoriesDocument,
        data: { getAllParentCategories: updatedData },
      });

      onClose();
      toast.success(t("Parent category added successfully"));
    } catch (e) {
      toast.error(error?.message);
      console.error(e);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="darkOverlayStyle" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a new parent category</ModalHeader>
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
                Create
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
