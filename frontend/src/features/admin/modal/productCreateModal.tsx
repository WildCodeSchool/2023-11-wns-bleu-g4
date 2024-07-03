"use client";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
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
import { useGetAllCategoriesQuery } from "@/graphql/Category/generated/getAllCategories.generated";
import { useCreateProductMutation } from "@/graphql/Product/generated/createProduct.generated";
import { ChangeEvent, FormEvent, useState } from "react";
import { useGetAllBrandsQuery } from "@/graphql/Brand/generated/getAllBrands.generated";

export default function ProductCreateModal({ isOpen, onClose, refetch }: ProductModalProps) {
  const [createProduct] = useCreateProductMutation();
  const [formData, setFormData] = useState({
    name: "",
    brand: { id: 0 },
    description: "",
    price: 0,
    category: { id: 0 },
    thumbnail: "",
  });

  const { data: categoriesData } = useGetAllCategoriesQuery();
  const categories = categoriesData?.getAllCategories ?? [];
  const { data: brandsData } = useGetAllBrandsQuery();
  const brands = brandsData?.getAllBrands ?? [];


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberInputChange = (valueAsString: string, valueAsNumber: number, name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: valueAsNumber,
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: { id: parseInt(value, 10) },
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: parseFloat(formData.price.toString()),
      category: { id: formData.category.id },
      brand: { id: formData.brand.id },
    };

    try {
      await createProduct({ variables: { data: productData } });
      refetch && refetch();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="darkOverlayStyle" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a new product</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <Flex justifyContent="space-between" gap={2} mb={4}>
              <Box>
                <FormControl isRequired>
                  <FormLabel mb={1} htmlFor="name">
                    Name
                  </FormLabel>
                  <Input
                    type="text"
                    id=""
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel mb={1} htmlFor="brand">
                    Brand
                  </FormLabel>
                  <Select
                    placeholder="Select a brand"
                    id="brand"
                    name="brand"
                    value={formData.brand.id}
                    onChange={handleSelectChange}
                  >
                    {brands.map((brand: any) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Flex>
            <Box mb={4}>
              <FormControl isRequired>
                <FormLabel mb={1}>Description</FormLabel>
                <Textarea
                  placeholder="Describe the product"
                  maxHeight={200}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Box>
            <Flex justifyContent="space-between" gap={2} mb={4}>
              <Box w="100%">
                <FormControl isRequired>
                  <FormLabel mb={1} htmlFor="price">
                    Price
                  </FormLabel>
                  <NumberInput
                    precision={2}
                    allowMouseWheel
                    min={0}
                    name="price"
                    value={formData.price}
                    onChange={(valueAsString, valueAsNumber) =>
                      handleNumberInputChange(valueAsString, valueAsNumber, "price")
                    }
                  >
                    <NumberInputField placeholder="5.99" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </Box>
              <Box w="100%">
                <FormControl isRequired>
                  <FormLabel mb={1} htmlFor="category">
                    Category
                  </FormLabel>
                  <Select
                    placeholder="Select a category"
                    name="category"
                    value={formData.category.id}
                    onChange={handleSelectChange}
                  >
                    {categories.map((category: any) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Flex>
            <FormLabel mb={1} htmlFor="thumbnail">
              Thumbnail
            </FormLabel>
            <input type="file" id="thumbnail" name="thumbnail" />
            <ModalFooter paddingInline={0} pb={0} pt={8}>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="blue" ml={3} type="submit">
                Create
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
