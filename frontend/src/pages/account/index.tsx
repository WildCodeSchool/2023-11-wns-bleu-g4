import Layout from "@/layouts/Layout";
import UserProfile from "@/features/account/profile/UserProfile";
import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import UserOrdersTableBody from "@/features/account/table/UserOrdersTable";

export default function UserDetails() {
  const textColor = useColorModeValue("black", "white");

  return (
    <Layout pageTitle="Account">
      <Heading size="lg" className="w-full text-center py-5 " color={textColor}>
        User Account
      </Heading>
      <Flex className="w-full flex flex-col justify-center items-center gap-5 xl:flex-row xl:items-start">
        <UserProfile />
        <UserOrdersTableBody />
      </Flex>
    </Layout>
  );
}
