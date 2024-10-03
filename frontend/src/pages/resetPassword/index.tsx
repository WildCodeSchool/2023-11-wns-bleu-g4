import Layout from "@/layouts/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ResetPasswordForm from '@/features/resetPasswordForm/ResetPasswordForm'
import { Flex } from "@chakra-ui/react";
import { useResetPasswordMutation } from "@/graphql/User/generated/ResetPassword.generated";

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
                <ResetPasswordForm />
            </Flex>
        </Layout>
    );
}
