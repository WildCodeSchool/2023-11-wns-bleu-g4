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
import { CharacteristicModalProps } from "./types";

export default function CharacteristicDeleteModal({
  isOpen,
  onClose,
  characteristic,
  handleDelete,
}: CharacteristicModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="baseStyle" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete {characteristic?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          Are you sure you want to delete <b>{characteristic?.name}</b>? This action cannot be undone.
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            colorScheme="red"
            ml={3}
            type="submit"
            onClick={() => {
              handleDelete && handleDelete(characteristic?.id!);
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
