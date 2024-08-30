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
  useCreateProductCharacteristicMutation
} from "@/graphql/ProductCharacteristic/generated/createProductCharacteristic.generated";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { getQueryVariables } from "../helpers/query";
import client from "@/graphql/client";
import { GetAllProductCharacteristicsDocument, GetAllProductCharacteristicsQuery } from "@/graphql/ProductCharacteristic/generated/getAllProductCharacteristics.generated";

export default function CharacteristicCreateModal({ isOpen, onClose }: CharacteristicModalProps) {
  const { t } = useTranslation("CharacteristicCreateModal");
  const [createCharacteristic, { error }] = useCreateProductCharacteristicMutation();
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
      const { data } = await createCharacteristic({ variables: { data: formData } });

      const newCharacteristic = data?.createProductCharacteristic;

      const variables = getQueryVariables("getAllProductCharacteristics");

      const existingData = client.readQuery<GetAllProductCharacteristicsQuery>({
        query: GetAllProductCharacteristicsDocument,
        variables: variables,
      })!;

      const updatedData = {
        ...existingData.getAllProductCharacteristics,
        productCharacteristics: [
          ...existingData.getAllProductCharacteristics.productCharacteristics,
          newCharacteristic
        ],
      };

      client.writeQuery({
        query: GetAllProductCharacteristicsDocument,
        variables: variables,
        data: { getAllProductCharacteristics: updatedData }
      });

      onClose();
      toast.success(t("Product characteristic created successfully"));
    } catch (e) {
      toast.error(error?.message);
      console.error(e);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="darkOverlayStyle" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a new product characteristic</ModalHeader>
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
