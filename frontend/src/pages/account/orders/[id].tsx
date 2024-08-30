import Layout from "@/layouts/Layout";
import { Flex, Heading, Tooltip } from "@chakra-ui/react";
import UserOrderDetailsTable from "@/features/account/table/UserOrderDetailsTable";
import OrderInfos from "@/features/account/profile/OrderInfos";
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function Order() {

  return (
    <Layout>
      <Flex justifyContent={"center"} alignItems={"center"} padding={5} gap={5} className="group">
        <ArrowLeftIcon className="size-10 group-hover:animate-pulse cursor-pointer" onClick={() => history.back()} />
        <Heading size='lg' className="text-center">Order Details</Heading>
      </Flex>

      <Flex className="w-full relative flex flex-col justify-center items-start px-5 gap-5 sm:flex-row">
        <OrderInfos />
        <UserOrderDetailsTable />
      </Flex>
    </Layout >
  )
}