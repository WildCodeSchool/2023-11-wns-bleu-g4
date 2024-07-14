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

export default function ParentCategoryDeleteModal({
  isOpen,
  onClose,
  parentCategory,
  handleDelete,
}: CategoryModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="darkOverlayStyle" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete {parentCategory?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          Are you sure you want to delete <b>{parentCategory?.name} parent category</b>? This action cannot be undone.
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            colorScheme="red"
            ml={3}
            type="submit"
            onClick={() => {
              handleDelete && handleDelete(parentCategory?.id!);
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
