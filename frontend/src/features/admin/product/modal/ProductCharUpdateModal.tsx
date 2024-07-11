import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ProductModalProps } from "../types";
import { Characteristic } from "../../characteristic/types";
import { FormEvent, useEffect, useState } from "react";
import { useUpdateProductMutation } from "@/graphql/Product/generated/updateProduct.generated";
import { GetProductByIdDocument } from "@/graphql/Product/generated/getProductById.generated";
import {
  useGetAllProductCharacteristicsQuery
} from "@/graphql/ProductCharacteristic/generated/getAllProductCharacteristics.generated";
import Select, { MultiValue } from "react-select";

export default function ProductCharUpdateModal({ isOpen, onClose, product }: ProductModalProps) {
  const [updateProduct] = useUpdateProductMutation();
  const [formData, setFormData] = useState({
    characteristics: product?.characteristics,
  });
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<Characteristic[]>([]);
  const { data: characteristicsData } = useGetAllProductCharacteristicsQuery();
  const characteristics = characteristicsData?.getAllProductCharacteristics.productCharacteristics ?? [];

  const productId = product?.id!;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const productData = {
      ...formData,
      characteristics: selectedCharacteristics.map((c: any) => ({ id: c.id })),
    };

    updateProduct({
      variables: { data: productData, productId },
      refetchQueries: [{ query: GetProductByIdDocument, variables: { productId } }],
    })
      .then(onClose)
      .catch(console.error);
  };

  useEffect(() => {
    if (!product) return;
    setSelectedCharacteristics(
      product.characteristics.map((c: Characteristic) => ({
        id: c.id,
        label: c.name,
        value: c.id?.toString(),
      })),
    );
  }, [product?.characteristics]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="darkOverlayStyle" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update {product?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel mb={1} htmlFor="characteristics">
                Characteristics
              </FormLabel>
              <Select
                id="characteristics"
                name="characteristics"
                options={characteristics}
                getOptionValue={(o: any) => o.value || (o.id.toString() as any)}
                getOptionLabel={(o: any) => o.label || o.name}
                isMulti
                value={selectedCharacteristics}
                closeMenuOnSelect={false}
                onChange={(characteristics: MultiValue<Characteristic>) => {
                  setSelectedCharacteristics(characteristics as Characteristic[]);
                  setFormData({
                    ...formData,
                    characteristics: characteristics.map((c: Characteristic) => ({ id: c.id })),
                  });
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
