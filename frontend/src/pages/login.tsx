import LoginForm from "@/features/auth/login/LoginForm";
import Layout from "@/layouts/Layout";
import { Flex } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAllNamespaces } from "../../i18nUtils";

export default function Login() {
  const urlBg: string =
    "https://images.unsplash.com/photo-1565945985123-4c67ab31eb8d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA";

  return (
    <Layout pageTitle="Login">
      <Flex
        justifyContent="center"
        py={{ md: "100px" }}
        bgImage={{ md: urlBg }}
        bgRepeat="no-repeat"
        bgPosition="center"
        bgSize="cover"
        borderRadius="10px"
      >
        <LoginForm />
      </Flex>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", getAllNamespaces())),
  },
});
