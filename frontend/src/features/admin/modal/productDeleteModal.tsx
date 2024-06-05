import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { ProductDeleteModalProps } from "../types";

export default function ProductDeleteModal({ isOpen, onClose, product }: ProductDeleteModalProps) {

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            variant="baseStyle"
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete {product.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    Are you sure you want to delete {product.name}? This action cannot be undone.
                </ModalBody>

                <ModalFooter>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button colorScheme='red' ml={3}>
                        Delete
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

