import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { BrandModalProps } from "./types";

export default function BrandLogoModal({ isOpen, onClose, brand }: BrandModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="darkOverlayStyle" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{brand?.name} brand logo</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <img src={brand?.logo} alt={brand?.name} className="rounded" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
