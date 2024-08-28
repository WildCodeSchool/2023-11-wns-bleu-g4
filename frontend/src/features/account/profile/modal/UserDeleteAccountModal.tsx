import { Box, Button, Flex, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { UserModalProps } from "../../types";
import { toast } from "react-toastify";
import { ToastConfigWarning } from "@/config/ToastConfig";
import { useDeleteProfileMutation } from "@/graphql/User/generated/DeleteProfile.generated";

export default function UserDeleteAccountModal({ isOpen, onClose }: UserModalProps) {
    const [deleteProfile] = useDeleteProfileMutation()

    const deleteAccount = async (e: any) => {
        e.preventDefault()
        try {
            await deleteProfile();
            toast.success("ACCOUNT DELETED SUCCESSFULLY", ToastConfigWarning);
            setTimeout(() => {
                window.location.replace('/')
            }, 2000);
        } catch (error: any) {
            const errArr = error.message.replace("_", " ");
            toast.error(errArr, ToastConfigWarning);
            return
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} variant="darkOverlayStyle" isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete Account</ModalHeader>
                <ModalCloseButton />
                <hr />
                <Box padding={5}>
                    <Text>Are you sure you want to delete your account ?</Text>
                    <Text>This action is irreversible !</Text>
                </Box>
                <Flex justifyContent={"space-between"} padding={5}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={deleteAccount} variant={"warningButton"} ml={3}>Delete Account</Button>
                </Flex>

            </ModalContent>
        </Modal>
    )
}