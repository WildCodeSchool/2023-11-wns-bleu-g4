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
            toast.info("Mail Send", ToastConfigLogin);
            setMailSend(true)

        } catch (e: any) {
            const errArr = e.message.replace("_", " ");
            toast.error(errArr, ToastConfigLogin);
            return;
        }
    }

    return (
        <>
            {
                mailSend ?
                    <Box bg={"white"} padding={10} className="rounded-lg flex flex-col gap-5 shadow-sm">
                        <Text className="text-center">CHECK YOUR MAILBOX !</Text>
                        <Text>If the email address you provided is saved in our data,<br/> you will receive a password reset email shortly!</Text>
                        <Button variant={"loginButton"} onClick={()=>router.push("/login")}>Return to login page</Button>
                    </Box>
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
                                    {/* EMAIL */}
                                    <FormControl size="md">
                                        <FormLabel>Email</FormLabel>
                                        <LightMode>
                                            <InputGroup>
                                                <Input
                                                    type="email"
                                                    color="black"
                                                    placeholder="Email"
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