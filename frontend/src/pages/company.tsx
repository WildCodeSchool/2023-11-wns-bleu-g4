import React from "react";
import Layout from "@/layouts/Layout";
import { useTranslation } from "react-i18next";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAllNamespaces } from "@root/i18nUtils";

export default function LEntreprise() {
  const { t } = useTranslation("Company");

  return (
    <Layout>
      <div className="px-2 md:px-60 xl:mx-24 xl:pb-5 mt-4 md:mt-0">
        <h1 className="text-3xl font-bold mb-6">{t("About GearGo")}</h1>

        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-4">{t("Our Mission")}</h2>
          <p className="text-sm md:text-base mb-4">
            {t(
              "At GearGo, we are passionate about connecting sports enthusiasts with the equipment " +
              "they need for their adventures. Our mission is to make high-quality sports equipment accessible " +
              "to everyone through an easy-to-use and efficient online rental platform.",
            )}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-4">{t("Our History")}</h2>
          <p className="text-sm md:text-base mb-4">
            {t(
              "GearGo was born from the collaboration between an established sports equipment rental " +
              "company and a team of innovative developers. Recognizing the need for a modern digital solution " +
              "in the sports rental industry, we set out to create a platform that would revolutionize the way " +
              "people access and enjoy sports equipment.",
            )}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-4">{t("What We Offer")}</h2>
          <ul className="text-sm md:text-base list-disc list-inside mb-4">
            <li>{t("A wide range of high-quality sports equipment for rent")}</li>
            <li>{t("A simple and easy online booking system")}</li>
            <li>{t("Flexible rental periods to suit your needs")}</li>
            <li>{t("Expert advice to choose the right equipment")}</li>
            <li>{t("Convenient pick-up and return options")}</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-4">{t("Our Team")}</h2>
          <p className="text-sm md:text-base mb-4">
            {t(
              "Behind GearGo is a dedicated team of sports enthusiasts and technology experts. " +
              "We combine our passion for outdoor activities with cutting-edge technology to provide you " +
              "with the best rental experience possible.",
            )}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-4">{t("Contact Information")}</h2>
          <p className="text-sm md:text-base mb-4">
            {t("Company Name")}: GearGo
            <br />
            {t("Legal Form")}: Société à Responsabilité Limitée (SARL)
            <br />
            {t("Headquarters")}: Paris
            <br />
            {t("Email")}: contact@geargo.com
            <br />
            {t("Phone")}: 09 87 65 43 21
            <br />
          </p>
        </section>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", getAllNamespaces())),
  },
});
