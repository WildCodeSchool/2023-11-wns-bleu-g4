import Layout from "@/layouts/Layout";
import { Box, Flex, Heading } from "@chakra-ui/react";
import UserOrderDetailsTable from "@/features/account/table/UserOrderDetailsTable";
import OrderInfos from "@/features/account/profile/OrderInfos";
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function Order() {

  
  return (
    <Layout>
      <Flex justifyContent={"center"} alignItems={"center"} paddingTop={5} gap={5}>
        <ArrowLeftIcon className="size-10 hover:cursor-pointer hover:bg-slate-600 rounded p-1" onClick={history.back} />
        <Heading size='lg' className="text-center">Order Details</Heading>
      </Flex>

      <Flex className="w-full relative flex flex-col justify-center items-start px-5 gap-5 sm:flex-row">
        <OrderInfos />
        <UserOrderDetailsTable />
      </Flex>
    </Layout>
  )
}