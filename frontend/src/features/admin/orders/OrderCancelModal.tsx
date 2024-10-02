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
import { OrderModalProps } from "./types";

export default function OrderCancelModal({ isOpen, onClose, order, handleCancel }: OrderModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="darkOverlayStyle" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cancel order ID : {order?.id}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>Are you sure you want to cancel this order? This action cannot be undone.</ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            colorScheme="red"
            ml={3}
            type="submit"
            onClick={() => {
              handleCancel && handleCancel(order?.id!);
            }}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
