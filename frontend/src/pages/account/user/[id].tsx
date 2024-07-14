import Layout from "@/layouts/Layout";
import UserProfile from "@/features/account/profile/UserProfile";
import { Flex, Heading } from "@chakra-ui/react";
import UserOrdersTableBody from "@/features/account/table/UserOrdersTable";


export default function UserDetails() {


  return (
    <Layout>
      <Heading size='lg' className="text-center pt-5">User Account</Heading>
      <Flex className="w-full flex flex-col justify-center items-start p-5 gap-5 lg:flex-row">
        <UserProfile />
        <UserOrdersTableBody />
      </Flex>
    </Layout>
  )
}