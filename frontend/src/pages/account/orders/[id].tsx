import Layout from "@/layouts/Layout";
import { Flex, Heading } from "@chakra-ui/react";
import UserOrderDetailsTable from "@/features/account/table/UserOrderDetailsTable";
import OrderInfos from "@/features/account/profile/OrderInfos";

export default function Order() {
  return (
    <Layout pageTitle="Order info">
      <Flex justifyContent={"center"} alignItems={"center"} className="w-full py-5 px-5 xl:px-36 2xl:px-96">
        <Heading size="lg">Order Details</Heading>
      </Flex>

      <Flex className="w-full flex flex-col justify-center items-start px-5 gap-5 sm:flex-row mb-8 lg:mb-0">
        <OrderInfos />
        <UserOrderDetailsTable />
      </Flex>
    </Layout>
  );
}
