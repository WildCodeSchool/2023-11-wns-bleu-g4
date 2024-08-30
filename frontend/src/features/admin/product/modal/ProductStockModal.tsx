import {
  Box,
  Button,
  Checkbox,
  Flex,
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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { ProductCodeModalProps } from "../types";
import { useCreateProductCodeMutation } from "@/graphql/ProductCode/generated/CreateProductCode.generated";
import { ChangeEvent, FormEvent, useState } from "react";
import { Status } from "@/graphql/generated/schema";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function ProductStockModal({
  isOpen,
  onClose,
  agency,
  product,
  refetch
}: ProductCodeModalProps) {
  const { t } = useTranslation("ProductStockModal");
  const agencyId = agency?.id!;
  const productId = product?.id!;
  const [createProductCode, { error }] = useCreateProductCodeMutation();
  const [newProductCode, setNewProductCode] = useState({
    size: "",
    agencyId: agencyId,
    productId: productId,
    isSizeable: false,
    status: Status.Available,
  });
  const [quantity, setQuantity] = useState(0);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProductCode(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewProductCode(prev => ({
      ...prev,
      isSizeable: e.target.checked,
      size: e.target.checked ? prev.size : "",
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createProductCode({
        variables: { quantity: quantity, data: newProductCode }
      }).then(onClose)
      refetch && refetch();
      toast.success(t("Product code added successfully"));
    } catch (e) {
      toast.error(error?.message);
      console.error(e);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="darkOverlayStyle" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add stock quantity for {agency?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Flex gap={4}>
              <FormControl>
                <FormLabel mb={1} id="stock">
                  Quantity
                </FormLabel>
                <NumberInput allowMouseWheel min={0} step={1}
                  value={quantity}
                  onChange={(valueString) => setQuantity(parseInt(valueString, 10))}>
                  <NumberInputField placeholder="5" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel mb={1}>Sizeable</FormLabel>
                <Checkbox
                  type="checkbox"
                  name="isSizeable"
                  checked={newProductCode.isSizeable}
                  onChange={handleCheckboxChange}
                />
              </FormControl>
            </Flex>
            <FormControl>
              <FormLabel mb={1}>Size</FormLabel>
              <Input
                placeholder="Enter size (E.g. S, M, 46, 48)"
                id="size"
                name="size"
                value={newProductCode.size}
                onChange={handleInputChange}
                isDisabled={!newProductCode.isSizeable}
              />
            </FormControl>
            <ModalFooter paddingInline={0} pb={0} pt={8}>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="blue" ml={3} type="submit">
                Add
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
