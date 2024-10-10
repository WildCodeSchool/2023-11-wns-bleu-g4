import Layout from "@/layouts/Layout";
import UserProfile from "@/features/account/profile/UserProfile";
import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import UserOrdersTableBody from "@/features/account/table/UserOrdersTable";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAllNamespaces } from "@root/i18nUtils";
import { useTranslation } from "react-i18next";

export default function UserDetails() {
  const textColor = useColorModeValue("black", "white");
  const { t } = useTranslation("Account");

  return (
    <Layout pageTitle="Account">
      <Heading size="lg" className="w-full text-center py-5 " color={textColor}>
        {t("Your Account")}
      </Heading>
      <div className="flex flex-col justify-center items-center gap-5 xl:flex-row xl:items-start mb-8 lg:mb-0 mx-4 xl:mx-24">
        <UserProfile />
        <UserOrdersTableBody />
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", getAllNamespaces())),
  },
});
