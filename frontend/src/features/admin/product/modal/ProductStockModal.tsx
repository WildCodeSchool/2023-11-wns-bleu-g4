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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { ProductModalProps } from "../../types";

export default function ProductStockModal({ isOpen, onClose, product, variant }: ProductModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant={variant} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add stock quantity for {product}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel mb={1} id="stock">
              Quantity
            </FormLabel>
            <NumberInput allowMouseWheel min={0} step={1}>
              <NumberInputField placeholder="5" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button colorScheme="blue" ml={3} type="submit">
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
