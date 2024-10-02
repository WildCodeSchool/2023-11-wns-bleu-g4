import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Flex,
    Input,
    FormControl,
    FormLabel,
    Button,
    Box,
    Text,
    InputRightElement,
    InputGroup,
    LightMode,
    Divider,
    Heading,
} from "@chakra-ui/react"; import { toast } from "react-toastify";
import { ToastConfigWarning } from "@/config/ToastConfig";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { resetPasswordType } from "./types";
import { useRouter } from "next/router";
import { useResetPasswordMutation } from "@/graphql/User/generated/ResetPassword.generated";



export default function ResetPasswordForm() {

    const { t } = useTranslation("ResetPasswordForm");
    const router = useRouter();
    const token = router.query.token as string;

    /* Gestion de la saisie des mots de passe*/
    const [showPassword, setShowPassword] = useState(false)
    const handleClick = () => setShowPassword(!showPassword)

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
    const [resetPassword] = useResetPasswordMutation()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement);
        const formJSON: resetPasswordType = {
            password: formData.get("password") as string,
            newPassword: formData.get("newPassword") as string,
            token
        };

        try {
            validatePassword(formJSON.password, formJSON.newPassword)
            await resetPassword({ variables: { newPassword : formJSON.password, token } })
            toast.success("PASSWORD CHANGED SUCCESSFULLY", ToastConfigWarning);
            router.push("/login")
        } catch (error: any) {
            const errArr = error.message.replace("_", " ");
            toast.error(errArr, ToastConfigWarning);
            return
        }
    }

    return (
        <Card variant="loginCard" boxShadow="md" w={{ base: "300px", sm: "396px" }} h="fit-content">
            {/* TITLE */}
            <CardHeader textAlign="center">
                <Heading as="h1" color="black" fontWeight="500">
                    {t("RESET PASSWORD")}
                </Heading>
            </CardHeader>
            <Divider color="black" />
            <form onSubmit={handleSubmit}>
                <CardBody>
                    <Flex direction="column" gap="15px">
                        {/* PASSWORD */}
                        <Box>
                            <FormControl size="md">
                                <FormLabel>{t("Password")}</FormLabel>
                                <LightMode>
                                    <InputGroup>
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            color="black"
                                            placeholder="*****"
                                            name="password"
                                            size="md"
                                            bg="bgLight"
                                            borderRadius="lg"
                                            required
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                                                {showPassword ? t("Hide") : t("Show")}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </LightMode>
                            </FormControl>
                        </Box>

                        {/* REPEAT PASSWORD */}
                        <Box>
                            <FormControl size="md">
                                <FormLabel>{t("Repeat your password")}</FormLabel>
                                <LightMode>
                                    <InputGroup>
                                        <Input
                                            type={showNewPassword ? "text" : "password"}
                                            color="black"
                                            placeholder={t("Repeat your password")}
                                            name="repeatPassword"
                                            size="md"
                                            bg="bgLight"
                                            borderRadius="lg"
                                            required
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={handleNewPassClick}>
                                                {showNewPassword ? t("Hide") : t("Show")}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </LightMode>
                            </FormControl>
                        </Box>
                    </Flex>
                </CardBody>
                <CardFooter>
                    {/* BUTTON */}
                    <Button type="submit" className="w-full" variant="loginButton" m="0">
                        {t("Reset")}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}