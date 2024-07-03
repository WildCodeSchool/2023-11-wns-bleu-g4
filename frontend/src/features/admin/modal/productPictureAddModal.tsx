import {
  Button,
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
} from "@chakra-ui/react";
import { ProductModalProps } from "../types";
import { ChangeEvent, FormEvent, useState } from "react";
import { GetProductByIdDocument } from "@/graphql/Product/generated/getProductById.generated";
import uploadFile from "../helpers/uploadFile";
import { useCreateProduct_PictureMutation } from "@/graphql/ProductPicture/generated/CreateProduct_picture.generated";

interface Product_Picture {
  thumbnail: string;
  alt: string;
}

export default function ProductPictureAddModal({ isOpen, onClose, product, variant }: ProductModalProps) {
  const productId = product.id;
  const [addProductPicture] = useCreateProduct_PictureMutation();
  const [newPicture, setNewPicture] = useState<Product_Picture>({ thumbnail: '', alt: '' });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPicture((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const newImageUrl = await uploadFile(e.target.files[0]);
      setNewPicture((prev) => ({
        ...prev,
        thumbnail: newImageUrl,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const pictureData = {
      ...newPicture,
      productId: { id: product.id },
    };

    addProductPicture({
      variables: { data: pictureData },
      refetchQueries: [{ query: GetProductByIdDocument, variables: { productId } }],
    })
      .then(onClose)
      .catch(console.error);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant={variant} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update {product.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <FormControl isRequired>
              <FormLabel mb={1} htmlFor="alt">
                Picture Alt
              </FormLabel>
              <Input
                type="text"
                id="alt"
                name="alt"
                value={newPicture.alt}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel mb={1} htmlFor="pictures">
                Picture
              </FormLabel>
              <input
                id="pictures"
                name="pictures"
                type="file"
                onChange={handleFileChange}
              />
            </FormControl>
            <ModalFooter paddingInline={0} pb={0} pt={8}>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="blue" ml={3} type="submit">
                Update
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal >
  );
}
