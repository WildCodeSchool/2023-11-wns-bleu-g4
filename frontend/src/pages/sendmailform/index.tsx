import Layout from "@/layouts/Layout";
import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import SendMailForm from "@/features/sendMailForm/SendMailForm";

export default function ResetPassword() {

    const urlBg: string =
        "https://images.unsplash.com/photo-1565945985123-4c67ab31eb8d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA";


    return (
        <Layout pageTitle="Reset Password">
            <Flex
                justifyContent="center"
                py={{ md: "100px" }}
                bgImage={{ md: urlBg }}
                bgRepeat="no-repeat"
                bgPosition="center"
                bgSize="cover"
                className="p-5 lg:px-24 lg:pb-24"
            >
                <SendMailForm />
            </Flex>
        </Layout>
    )
}