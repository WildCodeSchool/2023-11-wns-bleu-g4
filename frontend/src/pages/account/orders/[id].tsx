import Layout from "@/layouts/Layout";
import { Flex } from "@chakra-ui/react";
import UserOrderDetailsTable from "@/features/account/table/UserOrderDetailsTable";
import OrderInfos from "@/features/account/profile/OrderInfos";


export default function Order() {

  return (
    <Layout>
      <Flex>
        <OrderInfos />
        <UserOrderDetailsTable />
      </Flex>
    </Layout>
  )
}