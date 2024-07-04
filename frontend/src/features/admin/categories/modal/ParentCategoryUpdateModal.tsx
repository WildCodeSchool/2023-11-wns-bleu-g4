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
} from "@chakra-ui/react";
import { CategoryModalProps } from "../types";
import { ChangeEvent, FormEvent, useState } from "react";
import { useUpdateParentCategoryMutation } from "@/graphql/ParentCategory/generated/updateParentCategory.generated";
import { GetParentCategoryByIdDocument } from "@/graphql/ParentCategory/generated/getParentCategoryById.generated";

export default function ParentCategoryUpdateModal({ isOpen, onClose, parentCategory }: CategoryModalProps) {
  const [updateParentCategory] = useUpdateParentCategoryMutation();
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

    updateParentCategory({
      variables: { data: formData, parentCategoryId },
      refetchQueries: [{ query: GetParentCategoryByIdDocument, variables: { parentCategoryId } }],
    })
      .then(onClose)
      .catch(console.error);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="neutralOverlayStyle" isCentered>
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
