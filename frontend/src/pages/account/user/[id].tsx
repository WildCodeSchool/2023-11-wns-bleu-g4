import Layout from "@/layouts/Layout";
import { useRouter } from "next/router";
import UserProfile from "@/features/account/profile/UserProfile";


export default function UserDetails() {

  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
        <UserProfile/>
    </Layout>
  )
}