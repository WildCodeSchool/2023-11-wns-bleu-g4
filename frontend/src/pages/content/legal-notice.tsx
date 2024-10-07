import React from "react";
import Layout from "@/layouts/Layout";
import { useTranslation } from "react-i18next";

export default function Legal_notice() {
  const { t } = useTranslation("LegalNotice");

  return (
    <Layout>
      <div className="px-60 xl:mx-24 xl:pb-5">
        <h1 className="text-3xl font-bold mb-6">{t("Legal Notice")}</h1>
        <p className="mb-4">
          <strong>{t("Site Publisher")}:</strong>
        </p>
        <p className="mb-4">
          {t("Company Name")}: GearGo
          <br />
          {t("Legal Form")}: Société à Responsabilité Limitée (SARL)
          <br />
          {t("Share Capital")}: 2 000 000
          <br />
          {t("Headquarters")}: Paris
          <br />
          {t("SIRET Number")}: 1092412094
          <br />
          {t("VAT Number")}: 18
          <br />
          {t("Email")}: contact@geargo.com
          <br />
          {t("Phone")}: 09 87 65 43 21
          <br />
        </p>

        <p className="mb-4">
          <strong>{t("Publication Director")}:</strong>
        </p>
        <p className="mb-4">
          Dimitri Nonchalan
          <br />
          {t("Email")}: dnonchalan@gmail.fr
          <br />
        </p>

        <p className="mb-4">
          <strong>{t("Site Hosting")}:</strong>
        </p>
        <p className="mb-4">
          {t("Hosting Company")}: Wild code school VPS
          <br />
          {t("Hosting Address")}: Paris 80 des marée
          <br />
          {t("Hosting Phone")}: 09 00 01 03 39
          <br />
          {t("Hosting Website")}: https://1123-bleu-4.wns.wilders.dev/
        </p>

        <p className="mb-4">
          <strong>{t("Intellectual Property")}:</strong>
        </p>
        <p className="mb-4">
          {t(
            "All content on the GearGo site, including but not limited to graphics, images, texts, " +
              "videos, animations, sounds, logos, gifs, and icons as well as their layout, are the " +
              "exclusive property of GearGo except for trademarks, logos, or content belonging " +
              "to other partner companies or authors. Any reproduction, distribution, modification, " +
              "adaptation, retransmission, or publication, even partial, of these various elements " +
              "is strictly prohibited without the express written consent of GearGo. " +
              "This representation or reproduction, by any means whatsoever, constitutes an infringement " +
              "punishable by articles L.335-2 and following of the Intellectual Property Code.",
          )}
        </p>

        <p className="mb-4">
          <strong>{t("Responsibility")}:</strong>
        </p>
        <p className="mb-4">
          {t(
            "The information provided on the GearGo site is presented for indicative and " +
              "general purposes. GearGo strives to keep it accurate and up-to-date, but cannot " +
              "guarantee the accuracy, completeness, or timeliness of the information. " +
              "The user fully assumes the risks associated with consulting the information on the site. " +
              "GearGo cannot be held responsible for direct or indirect damages resulting from the use " +
              "of the site or the inability to access it.",
          )}
        </p>

        <p className="mb-4">
          <strong>{t("Hypertext Links")}:</strong>
        </p>
        <p className="mb-4">{t("The GearGo site may contain hypertext links to other websites.")}</p>
      </div>
    </Layout>
  );
}
