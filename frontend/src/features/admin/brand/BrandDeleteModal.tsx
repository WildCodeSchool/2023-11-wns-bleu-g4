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
import { BrandModalProps } from "./types";

export default function BrandDeleteModal({ isOpen, onClose, brand, handleDelete }: BrandModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="darkOverlayStyle" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete {brand?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          Are you sure you want to delete <b>{brand?.name} brand</b>? This action cannot be undone.
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            colorScheme="red"
            ml={3}
            type="submit"
            onClick={() => {
              handleDelete && handleDelete(brand?.id!);
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
