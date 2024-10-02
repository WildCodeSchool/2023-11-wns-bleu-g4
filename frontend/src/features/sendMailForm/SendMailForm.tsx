import { ToastConfigLogin } from "@/config/ToastConfig";
import { useRequestPasswordResetMutation } from "@/graphql/User/generated/RequestPasswordReset.generated";
import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    LightMode,
    Text,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function sendMailForm() {

    const router = useRouter()
    const { t } = useTranslation("ResetPassword");
    const [requestResetPassword] = useRequestPasswordResetMutation()
    const [mailSend, setMailSend] = useState(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const formJSON: any = Object.fromEntries(formData.entries());

        try {
            await requestResetPassword({ variables: { email: formJSON.email } });
            toast.success("Mail Send", ToastConfigLogin);
            setMailSend(true)
        } catch (e: any) {
            if (e.message === "USER_NOT_FOUND") {
                // const errArr = e.message.replaceAll("_", " ");
                toast.error(t("The email address is not recognized"), ToastConfigLogin);
            }
            return;
        }
    }

    return (
        <>
            {
                mailSend ?
                    <Card variant="loginCard" boxShadow="md" w={{ base: "300px", sm: "480px" }} h="fit-content">
                        <CardHeader textAlign="center">
                            <Heading as="h1" color="black" fontWeight="500">
                                {t("CHECK YOUR MAILBOX")}
                            </Heading>
                        </CardHeader>
                        <Divider color="black" />
                        <CardBody>
                            <Text className="text-lg text-justify">
                                {t("If the email address you provided is saved in our data, you will receive a password reset email shortly (1 min) !")}
                            </Text>
                        </CardBody>

                        <CardFooter>
                            <Button className="w-full" variant={"loginButton"} onClick={() => router.push("/login")}>
                                {t("Return to login page")}
                            </Button>

                        </CardFooter>
                    </Card>
                    :
                    <Card variant="loginCard" boxShadow="md" w={{ base: "300px", sm: "396px" }} h="fit-content">
                        {/* TITLE */}
                        <CardHeader textAlign="center">
                            <Heading as="h1" color="black" fontWeight="500">
                                {t("Enter your email")}
                            </Heading>
                        </CardHeader>
                        <Divider color="black" />
                        <form onSubmit={handleSubmit}>
                            <CardBody>
                                <Flex direction="column" gap="15px">
                                    <Text>
                                        Please enter your email address.
                                        <br />
                                        If the address you enter is registered in our database, we will send you an email with a link to create a new password.
                                    </Text>
                                    {/* EMAIL */}
                                    <FormControl size="md">
                                        <FormLabel>Email</FormLabel>
                                        <LightMode>
                                            <InputGroup>
                                                <Input
                                                    type="email"
                                                    color="black"
                                                    placeholder="personnal_email@mail.com"
                                                    name="email"
                                                    size="md"
                                                    bg="bgLight"
                                                    borderRadius="lg"
                                                    required
                                                />
                                            </InputGroup>
                                        </LightMode>
                                    </FormControl>
                                </Flex>
                            </CardBody>
                            <CardFooter>
                                <Flex direction="column" className="w-full">
                                    {/* BUTTON */}
                                    <Button type="submit" className="w-full" variant="loginButton" m="0">
                                        {t("Send")}
                                    </Button>
                                </Flex>
                            </CardFooter>
                        </form>
                    </Card>
            }

        </>
    )





}