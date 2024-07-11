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
import { FormEvent, useState } from "react";
import { BrandModalProps } from "./types";
import { useUpdateBrandMutation } from "@/graphql/Brand/generated/updateBrand.generated";
import { GetBrandByIdDocument } from "@/graphql/Brand/generated/getBrandById.generated";
import uploadFile from "../helpers/uploadFile";

export default function BrandUpdateModal({ isOpen, onClose, brand }: BrandModalProps) {
  const [updateBrand] = useUpdateBrandMutation();
  const [imageURL, setImageURL] = useState(brand?.logo);
  const [formData, setFormData] = useState({
    name: brand?.name,
    logo: imageURL,
  });

  const brandId = brand?.id!;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const brandData = {
      ...formData,
      logo: imageURL,
    };

    updateBrand({
      variables: { data: brandData, brandId },
      refetchQueries: [{ query: GetBrandByIdDocument, variables: { brandId } }],
    })
      .then(onClose)
      .catch(console.error);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="baseStyle" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update {brand?.name} brand</ModalHeader>
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
            <FormControl isRequired>
              <FormLabel mb={1} htmlFor="thumbnail">
                Logo
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
