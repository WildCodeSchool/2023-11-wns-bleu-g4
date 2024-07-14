import { useConfirmEmailMutation } from "@/graphql/User/generated/confirmEmail.generated";
import Layout from "@/layouts/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ConfirmEmail() {
  const router = useRouter();
  const [confirmEmail] = useConfirmEmailMutation();

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
        Thanks for confirming your email. You will be redirected to the login page in a few seconds.
      </p>
    </Layout>
  );
}
