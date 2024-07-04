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

export default function CategoryDeleteModal({ isOpen, onClose, category, handleDelete }: CategoryModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="baseStyle" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete {category?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>Are you sure you want to delete <b>{category?.name} category</b>? This action cannot be undone.</ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button colorScheme="red" ml={3} type="submit"
            onClick={() => { handleDelete && handleDelete(category?.id!) }}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
