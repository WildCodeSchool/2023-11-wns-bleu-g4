import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { CategoryModalProps } from "../types";

export default function CategoryThumbnailModal({ isOpen, onClose, category }: CategoryModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="baseStyle" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{category?.name} category thumbnail</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <img src={category?.thumbnail} alt={category?.name} className="rounded" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
