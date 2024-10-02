import { ToastConfigLogin } from "@/config/ToastConfig";
import { useLoginMutation } from "@/graphql/User/generated/Login.generated";
import { useProfileQuery } from "@/graphql/User/generated/Profile.generated";
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
    InputRightElement,
    LightMode,
    Text,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function sendMailForm() {

    const router = useRouter()
    const { t } = useTranslation("ResetPassword");

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const formJSON: any = Object.fromEntries(formData.entries());

        try {
            //   await resetPassword({ variables: { data: formJSON } });
            toast.info("LOGIN SUCCESSFULL", ToastConfigLogin);
            router.push("/login");
        } catch (e: any) {
            const errArr = e.message.replace("_", " ");
            toast.error(errArr, ToastConfigLogin);
            return;
        }
    }

    return (
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
    )
}