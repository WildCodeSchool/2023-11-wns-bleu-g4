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
import { ChangeEvent, FormEvent, useState } from "react";
import { CharacteristicModalProps } from "./types";
import {
  useUpdateProductCharacteristicMutation
} from "@/graphql/ProductCharacteristic/generated/updateProductCharacteristic.generated";
import {
  GetProductCharacteristicByIdDocument
} from "@/graphql/ProductCharacteristic/generated/getProductCharacteristicsById.generated";

export default function CharacteristicUpdateModal({ isOpen, onClose, characteristic }: CharacteristicModalProps) {
  const [updateCharacteristic] = useUpdateProductCharacteristicMutation();
  const [formData, setFormData] = useState({ name: characteristic?.name });

  const productCharacteristicId = characteristic?.id!;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateCharacteristic({
      variables: { data: formData, productCharacteristicId },
      refetchQueries: [{ query: GetProductCharacteristicByIdDocument, variables: { productCharacteristicId } }],
    })
      .then(onClose)
      .catch(console.error);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="darkOverlayStyle" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a new characteristic</ModalHeader>
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
