import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ProductModalProps } from "../types";

export default function ProductDeleteModal({ isOpen, onClose, product: { id, name }, variant, handleDeleteProduct }: ProductModalProps) {

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant={variant} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete {name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>Are you sure you want to delete <b>{name}</b>? This action cannot be undone.</ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button colorScheme="red" ml={3} type="submit"
            onClick={() => { handleDeleteProduct && handleDeleteProduct(id!) }}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
