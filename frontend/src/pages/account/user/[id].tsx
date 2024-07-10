import Layout from "@/layouts/Layout";
import UserProfile from "@/features/account/profile/UserProfile";
import { Flex } from "@chakra-ui/react";
import UserOrdersTableBody from "@/features/account/table/UserOrdersTable";


export default function UserDetails() {


  return (
    <Layout>
        <Flex>
          <UserProfile />
          <UserOrdersTableBody/>
        </Flex>
    </Layout>
  )
}