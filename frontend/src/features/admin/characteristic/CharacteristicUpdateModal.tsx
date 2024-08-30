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
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import client, { cache } from "@/graphql/client";
import { GetAllProductCharacteristicsDocument, GetAllProductCharacteristicsQuery } from "@/graphql/ProductCharacteristic/generated/getAllProductCharacteristics.generated";
import { getQueryVariables } from "../helpers/query";

export default function CharacteristicUpdateModal({ isOpen, onClose, characteristic }: CharacteristicModalProps) {
  const { t } = useTranslation("CharacteristicUpdateModal");
  const [updateCharacteristic, { error }] = useUpdateProductCharacteristicMutation();
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

    try {
      await updateCharacteristic({
        variables: { data: formData, productCharacteristicId },
      });

      const variables = getQueryVariables("getAllProductCharacteristics");

      const existingData = client.readQuery<GetAllProductCharacteristicsQuery>({
        query: GetAllProductCharacteristicsDocument,
        variables: variables,
      })!;

      const updatedData = existingData.getAllProductCharacteristics.productCharacteristics.map(
        (productCharacteristic) =>
          productCharacteristic.id === productCharacteristicId
            ? { ...productCharacteristic, ...formData }
            : productCharacteristic
      );

      client.writeQuery({
        query: GetAllProductCharacteristicsDocument,
        variables,
        data: {
          getAllProductCharacteristics: {
            ...existingData.getAllProductCharacteristics,
            productCharacteristics: updatedData,
          },
        },
      });

      onClose();
      toast.success(t("Product characteristic updated successfully"));
    } catch (e) {
      toast.error(error?.message);
      console.error(e);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="darkOverlayStyle" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update {characteristic?.name} characteristic</ModalHeader>
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
