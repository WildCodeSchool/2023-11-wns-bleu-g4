import { Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { User, UserModalProps } from "../../types";
import { toast } from "react-toastify";
import { ToastConfigWarning } from "@/config/ToastConfig";
import { useUpdatePasswordMutation } from "@/graphql/User/generated/UpdatePassword.generated";
import { useState } from "react";

export default function UserPasswordModal({ isOpen, onClose }: UserModalProps) {
    /* Gestion de la saisie des mots de passe*/
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const handleClick = () => setShowPassword(!showPassword)

    const [newPassword, setNewPassword] = useState("")
    const [showNewPassword, setShowNewPassword] = useState(false)
    const handleNewPassClick = () => setShowNewPassword(!showNewPassword)

    function validatePassword(password: string, newPassword: string): boolean {
        let validate: boolean = true;
        if (password !== newPassword) {
            toast.error(("Passwords must be the same").toUpperCase(), ToastConfigWarning);
            return false;
        }
        if (password.length < 8) {
            toast.error(("Password must be at least 8 chars long").toUpperCase(), ToastConfigWarning);
            return false;
        }
        if (password.search(/[a-z]/) < 0) {
            toast.error(("Password must contain a lowercase").toUpperCase(), ToastConfigWarning);
            return false;
        }
        if (password.search(/[A-Z]/) < 0) {
            toast.error(("Password must contain an uppercase letter").toUpperCase(), ToastConfigWarning);
            return false;
        }
        if (password.search(/[0-9]/) < 0) {
            toast.error(("Password must contain a number").toUpperCase(), ToastConfigWarning);
            return false;
        }

        if (password.search(/\D+\S+\W/) < 0) {
            toast.error(("Password must contain at least 1 special character").toUpperCase(), ToastConfigWarning);
            return false;
        }

        return true;
    }

    /* Gestion de l'enregistrement en db du mot de passe*/
    const [updatePassword] = useUpdatePasswordMutation()

    const updateUserPassword = async () => {
        try {
            await updatePassword({ variables: { password } })
            toast.success("PASSWORD UPDATED SUCCESSFULLY", ToastConfigWarning);
        } catch (error: any) {
            const errArr = error.message.replace("_", " ");
            toast.error(errArr, ToastConfigWarning);
            return
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Password</ModalHeader>
                <ModalCloseButton />
                <hr />
                <ModalBody>
                    <FormControl>
                        <Box gap={2} mb={5}>
                            <FormLabel mb={1} htmlFor="password">Password</FormLabel>
                            <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your new password"
                                    name="password"
                                    id="password"
                                    onChange={e => setPassword(e.target.value)} />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                        {showPassword ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </Box>
                        <Box gap={2}>
                            <FormLabel mb={1} htmlFor="newPassword">Verify Password</FormLabel>
                            <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    type={showNewPassword ? 'text' : 'password'}
                                    placeholder="Verify your new password"
                                    name="newPassword"
                                    id="newPassword"
                                    onChange={e => setNewPassword(e.target.value)} />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleNewPassClick}>
                                        {showNewPassword ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </Box>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Flex justifyContent={"space-between"}>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={(e) => {
                            e.preventDefault()
                            if (validatePassword(password, newPassword)) {
                                updateUserPassword().then(onClose)
                            }
                        }}
                            colorScheme="blue" ml={3} type="submit" variant={"accentButton"}>Update</Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}