import BentoGrid from "@/features/home/infos/BentoGrid";
import Welcome from "@/features/home/welcome/Welcome";
import Layout from "@/layouts/Layout";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CardItemCarousel from "@/features/home/categories/CardItemCarousel";
import { getAllNamespaces } from "@root/i18nUtils";
import FaqSection from "@/features/home/faq/FaqSection";

export default function Home() {
  return (
    <Layout pageTitle="Home">
      <Welcome />
      <BentoGrid />
      <CardItemCarousel />
      <FaqSection />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", getAllNamespaces())),
  },
});
