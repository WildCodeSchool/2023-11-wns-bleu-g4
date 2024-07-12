import Layout from "@/layouts/Layout";
import UserProfile from "@/features/account/profile/UserProfile";
import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import UserOrdersTableBody from "@/features/account/table/UserOrdersTable";


export default function UserDetails() {
  
  const textColor = useColorModeValue("black", "white")

  return (
    <Layout >
      <Heading size='lg' className="text-center py-5" color={textColor}>User Account</Heading>
      <Flex 
      className="px-2 w-full flex flex-col justify-center items-start gap-5 lg:flex-row">
        <UserProfile />
        <UserOrdersTableBody />
      </Flex>
    </Layout>
  )
}