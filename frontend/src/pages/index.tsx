import CardItem from "@/features/home/categories/CardItem";
import BentoGrid from "@/features/home/infos/BentoGrid";
import Welcome from "@/features/home/welcome/Welcome";
import Layout from "@/layouts/Layout";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAllNamespaces } from "../../i18nUtils";

export default function Home() {
  return (
    <Layout pageTitle="Home">
      <Welcome />
      <BentoGrid />
      <CardItem />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", getAllNamespaces())),
  },
});
