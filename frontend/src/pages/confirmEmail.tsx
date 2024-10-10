import { useConfirmEmailMutation } from "@/graphql/User/generated/confirmEmail.generated";
import Layout from "@/layouts/Layout";
import { getAllNamespaces } from "@root/i18nUtils";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function ConfirmEmail() {
  const router = useRouter();
  const [confirmEmail] = useConfirmEmailMutation();
  const { t } = useTranslation("ConfirmEmail");

  const token = router.query.token as string;

  useEffect(() => {
    if (token)
      confirmEmail({ variables: { token } }).then(() => {
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      });
  }, [token, confirmEmail, router]);

  return (
    <Layout pageTitle="Email confirmed">
      <p className="mx-auto">
        {t("Thanks for confirming your email. You will be redirected to the login page in a few seconds.")}
      </p>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", getAllNamespaces())),
  },
});