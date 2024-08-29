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
  Textarea,
} from "@chakra-ui/react";
import { Brand, Category, ProductModalProps } from "../types";
import { useCreateProductMutation } from "@/graphql/Product/generated/createProduct.generated";
import { ChangeEvent, FormEvent, useState } from "react";
import { useGetAllBrandsQuery } from "@/graphql/Brand/generated/getAllBrands.generated";
import uploadFile from "../../helpers/uploadFile";
import { useGetAllCategoriesQuery } from "@/graphql/Category/generated/getAllCats.generated";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { on } from "events";

export default function ProductCreateModal({ isOpen, onClose, refetch }: ProductModalProps) {
  const { t } = useTranslation("ProductCreateModal");
  const [createProduct, { error }] = useCreateProductMutation();
  const [imageURL, setImageURL] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    brand: { id: 0 },
    description: "",
    price: 0,
    category: { id: 0 },
    thumbnail: imageURL,
  });

  const { data: categoriesData } = useGetAllCategoriesQuery();
  const categories = categoriesData?.getAllCategories ?? [];
  const { data: brandsData } = useGetAllBrandsQuery();
  const brands = brandsData?.getAllBrands.brands ?? [];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberInputChange = (valueAsString: string, valueAsNumber: number, name: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: valueAsNumber,
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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
      thumbnail: imageURL,
    };

    try {
      await createProduct({ variables: { data: productData } }).then(onClose);
      refetch && refetch();
      toast.success(t("Product created successfully"));
    } catch (e) {
      toast.error(error?.message);
      console.error(e);
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
                    {brands.map((brand: Brand) => (
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
                    {categories.map((category: Category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Flex>

            <FormControl isRequired mt={4}>
              <FormLabel mb={1} htmlFor="thumbnail">
                Thumbnail
              </FormLabel>
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                onChange={e => {
                  if (e.target.files?.[0]) uploadFile(e.target.files?.[0]).then(setImageURL);
                }}
              />
            </FormControl>
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
