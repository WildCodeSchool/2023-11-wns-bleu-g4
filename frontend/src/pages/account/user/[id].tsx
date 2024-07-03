import Layout from "@/layouts/Layout";
import UserProfile from "@/features/account/profile/UserProfile";
import { Flex } from "@chakra-ui/react";


export default function UserDetails() {


  return (
    <Layout>
        <Flex>
          <UserProfile />
          {/* <UserOrdersTableBody/> */}
        </Flex>
    </Layout>
  )
}