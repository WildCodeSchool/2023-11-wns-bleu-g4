import ProductPage from "@/features/product/ProductPage";
import Layout from "@/layouts/Layout";
import { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAllNamespaces } from "../../../i18nUtils";

export default function Product({ id }: { id: string }) {
  return (
    <Layout>
      <ProductPage productId={id} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const id = params?.id;

  return {
    props: {
      id: id as string,
      ...(await serverSideTranslations(locale ?? "en", getAllNamespaces())),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = ["1", "2", "3"];
  const locales = ["en", "fr"];

  const paths = ids.flatMap(id =>
    locales.map(locale => ({
      params: { id },
      locale,
    })),
  );

  return {
    paths,
    fallback: false,
  };
};
