import React from "react";
import Layout from "@/layouts/Layout";
import { useTranslation } from "react-i18next";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAllNamespaces } from "@root/i18nUtils";

export default function ConditionsGeneralesVente() {
  const { t } = useTranslation("SaleConditions");

  return (
    <Layout>
      <div className="px-2 md:px-10 lg:px-32 xl:px-60 xl:pb-5 mt-4">
        <h1 className="text-3xl font-bold mb-6">{t("General Terms and Conditions of Sale")}</h1>

        <p className="mb-4">
          <strong>{t("Article 1: Purpose")}</strong>
        </p>
        <p className="text-sm md:text-base mb-4">
          {t(
            "These general terms and conditions of sale (GTC) govern the contractual relationships " +
            "between the company GearGo (the 'Seller') and any natural or legal person (the 'Customer') " +
            "wishing to rent sports equipment via the GearGo website. By placing an order, the Customer " +
            "unreservedly accepts these GTC.",
          )}
        </p>

        <p className="mb-4">
          <strong>{t("Article 2: Products")}</strong>
        </p>
        <p className="text-sm md:text-base mb-4">
          {t(
            "The products offered for rent are described and presented with the greatest possible accuracy. " +
            "However, if errors or omissions occur in this presentation, GearGo cannot be held liable. " +
            "The photographs of the products are not contractual.",
          )}
        </p>

        <p className="mb-4">
          <strong>{t("Article 3: Order")}</strong>
        </p>
        <p className="text-sm md:text-base mb-4">
          {t(
            "The Customer places an order online via the GearGo website. The order will only be validated " +
            "after payment acceptance. GearGo reserves the right to cancel or refuse any order from a Customer " +
            "with whom there is a dispute regarding the payment of a previous order.",
          )}
        </p>

        <p className="mb-4">
          <strong>{t("Article 4: Prices and Payment")}</strong>
        </p>
        <p className="text-sm md:text-base mb-4">
          {t(
            "The prices of the products are indicated in euros, all taxes included (TTC). Payment is made " +
            "online by credit card via a secure system. GearGo reserves the right to modify its prices at any time, " +
            "but the products will be billed based on the rates in effect at the time of order validation.",
          )}
        </p>

        <p className="mb-4">
          <strong>{t("Article 5: Delivery")}</strong>
        </p>
        <p className="text-sm md:text-base mb-4">
          {t(
            "The rented products are delivered to the address indicated by the Customer when ordering. " +
            "Delivery times are given as an indication and GearGo cannot be held responsible for any delays. " +
            "In case of non-receipt of the order, the Customer must contact GearGo as soon as possible.",
          )}
        </p>

        <p className="mb-4">
          <strong>{t("Article 6: Use of Products")}</strong>
        </p>
        <p className="text-sm md:text-base mb-4">
          {t(
            "The Customer agrees to use the rented products in accordance with their intended purpose. " +
            "They are responsible for the maintenance and preservation of the products during the rental period. " +
            "Any deterioration or loss of the rented products engages the responsibility of the Customer who will " +
            "have to bear the costs of repair or replacement.",
          )}
        </p>

        <p className="mb-4">
          <strong>{t("Article 7: Withdrawal")}</strong>
        </p>
        <p className="text-sm md:text-base mb-4">
          {t(
            "In accordance with the legislation in force, the Customer has a period of 14 days from the " +
            "receipt of the products to exercise their right of withdrawal. To exercise this right, the Customer " +
            "must notify GearGo of their decision in writing and return the products in their original condition. " +
            "Return costs are the responsibility of the Customer.",
          )}
        </p>

        <p className="mb-4">
          <strong>{t("Article 8: Liability")}</strong>
        </p>
        <p className="text-sm md:text-base mb-4">
          {t(
            "GearGo cannot be held responsible for damages of any kind, whether material, immaterial, " +
            "or bodily, that may result from the misuse of the rented products. GearGo's liability will, in any " +
            "event, be limited to the amount of the order.",
          )}
        </p>

        <p className="mb-4">
          <strong>{t("Article 9: Personal Data")}</strong>
        </p>
        <p className="text-sm md:text-base mb-4">
          {t(
            "GearGo undertakes to respect the confidentiality of the personal data communicated by the " +
            "Customer when ordering and to process them in accordance with the legislation in force. The Customer " +
            "has the right to access, modify, and delete their data.",
          )}
        </p>

        <p className="mb-4">
          <strong>{t("Article 10: Applicable Law and Jurisdiction")}</strong>
        </p>
        <p className="text-sm md:text-base mb-4">
          {t(
            "These GTC are subject to French law. Any dispute relating to their interpretation and/or " +
            "execution falls under the jurisdiction of the competent French courts.",
          )}
        </p>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", getAllNamespaces())),
  },
});
