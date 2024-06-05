import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ProductModalProps } from "../types";

export default function ProductUpdateModal({ isOpen, onClose, product }: ProductModalProps) {
  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Food" },
    { id: 3, name: "Clothes" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="baseStyle" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update {product.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <Flex justifyContent="space-between" gap={2} mb={4}>
              <Box>
                <FormLabel mb={1} id="name">
                  Name
                </FormLabel>
                <Input type="text" placeholder="Name" defaultValue={product.name} />
              </Box>
              <Box>
                <FormLabel mb={1} id="brand">
                  Brand
                </FormLabel>
                <Input type="text" placeholder="Brand" defaultValue={product.brand} />
              </Box>
            </Flex>
            <Box mb={4}>
              <Text mb={1}>Description</Text>
              <Textarea placeholder="Describe the product" maxHeight={200} defaultValue={product.description} />
            </Box>
            <Flex justifyContent="space-between" gap={2} mb={4}>
              <Box w="100%">
                <FormLabel mb={1} id="price">
                  Price
                </FormLabel>
                <NumberInput defaultValue={product.price} precision={2} allowMouseWheel min={0}>
                  <NumberInputField placeholder="5.99" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>
              <Box w="100%">
                <Text mb={1} id="category">
                  Category
                </Text>
                <Select placeholder="Select a category" defaultValue={product.category}>
                  {categories.map((category: any) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </Box>
            </Flex>
            <FormLabel mb={1} id="countInStock">
              Thumbnail
            </FormLabel>
            <input type="file" defaultValue={product.thumbnail} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button colorScheme="blue" ml={3} type="submit">
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
