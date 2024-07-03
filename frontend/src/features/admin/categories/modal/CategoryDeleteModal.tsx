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
import { CategoryModalProps } from "../types";

export default function CategoryDeleteModal({ isOpen, onClose, category: { id, name }, variant, handleDeleteCategory }: CategoryModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant={variant} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete {name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>Are you sure you want to delete <b>{name} category</b>? This action cannot be undone.</ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button colorScheme="red" ml={3} type="submit"
            onClick={() => { handleDeleteCategory && handleDeleteCategory(id) }}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
