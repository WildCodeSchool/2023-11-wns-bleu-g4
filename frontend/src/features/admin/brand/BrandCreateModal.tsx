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
import { FormEvent, useState } from "react";
import { BrandModalProps } from "./types";
import uploadFile from "../helpers/uploadFile";
import { useCreateBrandMutation } from "@/graphql/Brand/generated/createBrand.generated";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function BrandCreateModal({ isOpen, onClose, refetch }: BrandModalProps) {
  const { t } = useTranslation("BrandCreateModal");
  const [createBrand, { error }] = useCreateBrandMutation();
  const [imageURL, setImageURL] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    logo: imageURL,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const brandData = { ...formData, logo: imageURL };

    try {
      await createBrand({ variables: { data: brandData } });
      refetch && refetch();

      onClose();
      toast.success(t("Brand added successfully"));
    } catch (e) {
      toast.error(error?.message);
      console.error(e);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="darkOverlayStyle" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a new brand</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired mb={4}>
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
            <FormControl isRequired>
              <FormLabel mb={1} htmlFor="logo">
                Logo
              </FormLabel>
              <input
                type="file"
                id="logo"
                name="logo"
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
