import SignupForm from "@/features/auth/signup/SignupForm";
import Layout from "@/layouts/Layout";
import { Flex } from "@chakra-ui/react";
import { getAllNamespaces } from "@root/i18nUtils";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Login() {
  const urlBg: string =
    "https://images.unsplash.com/photo-1565945985123-4c67ab31eb8d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0." +
    "3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <Layout pageTitle="Login">
      <Flex
        justifyContent="center"
        py={{ md: "100px" }}
        bgImage={{ md: urlBg }}
        bgRepeat="no-repeat"
        bgPosition="center"
        bgSize="cover"
        className="h-full xl:mx-24 xl:rounded-xl"
      >
        <SignupForm />
      </Flex>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", getAllNamespaces())),
  },
});
