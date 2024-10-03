import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Box,
  Textarea,
} from "@chakra-ui/react";
import { UserModalProps } from "../../types";
import { useUpdateProfileMutation } from "@/graphql/User/generated/UpdateProfile.generated";
import { FormEvent, useState } from "react";
import uploadFile from "@/features/admin/helpers/uploadFile";
import { toast } from "react-toastify";
import { ToastConfigLogin } from "@/config/ToastConfig";
import { useApolloClient } from "@apollo/client";
import { ProfileDocument, ProfileQuery } from "@/graphql/User/generated/Profile.generated";

export default function UserInfoModal({ isOpen, onClose, user }: UserModalProps) {
  const [imageURL, setImageURL] = useState(user?.avatar);
  const [updateProfile] = useUpdateProfileMutation();

  // Use Apollo Client Cache
  const client = useApolloClient();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    if (imageURL !== "") formJSON.avatar = imageURL;

    try {
      // Hot reload data
      const { profile } = client.readQuery({ query: ProfileDocument });
      client.writeQuery<ProfileQuery>({ query: ProfileDocument, data: { profile: { ...profile, ...formJSON } } });
      await updateProfile({ variables: { data: formJSON } });
      toast.success("PROFILE UPDATE SUCCESSFULL", ToastConfigLogin);
    } catch (e: any) {
      const errArr = e.message.replace("_", " ");
      toast.error(errArr, ToastConfigLogin);
      return;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="darkOverlayStyle" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update informations</ModalHeader>
        <ModalCloseButton />

        <hr />

        <form onSubmit={e => handleSubmit(e).then(onClose)}>
          <ModalBody pb={6}>
            <FormControl>
              {/*********************************** Name / Firstname */}
              <Flex justifyContent="space-between" gap={2} mb={4}>
                <Box>
                  <FormLabel mb={1} htmlFor="name">
                    Name
                  </FormLabel>
                  <Input type="text" placeholder="Name" defaultValue={user?.name} name="name" id="name" />
                </Box>
                <Box>
                  <FormLabel mb={1} htmlFor="firstname">
                    Firstname
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Firstname"
                    defaultValue={user?.firstname}
                    name="firstname"
                    id="firstname"
                  />
                </Box>
              </Flex>

              {/*********************************** Address */}
              <Box mb={4}>
                <FormLabel mb={1} htmlFor="address">
                  Address
                </FormLabel>
                <Textarea
                  placeholder="Address"
                  name="address"
                  id="address"
                  maxHeight={200}
                  defaultValue={user?.address}
                />
              </Box>

              {/*********************************** PostCode / City  */}
              <Flex justifyContent="space-between" gap={2} mb={4}>
                <Box>
                  <FormLabel mb={1} htmlFor="postcode">
                    PostCode
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="PostCode"
                    defaultValue={user?.postcode}
                    name="postcode"
                    id="postcode"
                  />
                </Box>
                <Box>
                  <FormLabel mb={1} htmlFor="city">
                    City
                  </FormLabel>
                  <Input type="text" placeholder="City" defaultValue={user?.city} name="city" id="city" />
                </Box>
              </Flex>

              {/************************************ Country / Phone */}
              <Flex gap={2} mb={4}>
                <Box>
                  <FormLabel mb={1} htmlFor="country">
                    Country
                  </FormLabel>
                  <Input type="text" placeholder="Country" defaultValue={user?.country} name="country" id="country" />
                </Box>
                <Box>
                  <FormLabel mb={1} htmlFor="phone">
                    Phone
                  </FormLabel>
                  <Input type="tel" placeholder="Phone number" defaultValue={user?.phone} name="phone" id="phone" />
                </Box>
              </Flex>

              {/* <Box>
                  <FormLabel mb={1} htmlFor="email">Email</FormLabel>
                  <Input type="email" placeholder="Email" defaultValue={user?.email} name="email" id="email"/>
                </Box> */}

              <FormLabel mb={1}>Avatar</FormLabel>
              <input
                type="file"
                onChange={e => {
                  if (e.target.files?.[0]) {
                    uploadFile(e.target.files?.[0]).then(setImageURL);
                  }
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme="blue" ml={3} type="submit">
              Update
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
