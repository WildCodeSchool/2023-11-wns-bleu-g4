import Layout from "@/layouts/Layout";
import { Flex, Heading } from "@chakra-ui/react";
import UserOrderDetailsTable from "@/features/account/table/UserOrderDetailsTable";
import OrderInfos from "@/features/account/profile/OrderInfos";

export default function Order() {

  return (
    <Layout>
      <Heading size='lg' className="text-center pt-5">Order Details</Heading>
      <Flex className="w-full relative flex flex-col justify-center items-start p-5 gap-5 sm:flex-row">
        <OrderInfos />
        <UserOrderDetailsTable />
      </Flex>
    </Layout>
  )
}