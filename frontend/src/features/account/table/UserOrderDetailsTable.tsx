import { Flex, Heading, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { orderDetailsHeaders } from "../helpers/tableHeaders";
import { useRouter } from "next/router";
import transformToDate from "../helpers/TransformDate";
import TimeStampToDayDuration from "../helpers/TimeStampToDayDuration";
import { BookingItem } from "../types";
import { useGetBookingItemsByBookingIdQuery } from "@/graphql/BookingItem/generated/GetBookingItemsByBookingId.generated";

export default function UserOrdersDetailsTable() {
  const { t } = useTranslation("UserOrderDetails");

  /** Class */
  const genericBookingItemClass = "text-center whitespace-nowrap max-w-40 p-3 min-w-25 xl:min-w-28 xl:max-w-40";
  const hiddenBookingItemClass = "hidden  xl:table-cell";

  /** DARK / LIGHT MODE */
  const textColor = useColorModeValue("dark", "light");
  const bgTableHeadColor = useColorModeValue("#d0d2d6", "cactus.900");
  const bgColor = useColorModeValue("footerBgLight", "cactus.600");
  const bgTableContent = useColorModeValue("lightgrey", "cactus.700");

  /** Router */
  const router = useRouter();
  const { query } = router;
  const { data } = useGetBookingItemsByBookingIdQuery({ variables: { bookingId: parseInt(query.id as string) } });
  const bookingItems = data?.getBookingItemsByBookingId || [];

  const totalPrice = (price: number, dayFrom: Date, dayTo: Date) => {
    let days = TimeStampToDayDuration(dayFrom, dayTo);
    days = Math.floor(days);
    return (price * days).toFixed(2);
  };

  return (
    <Flex className="w-full flex flex-col xl:w-fit" gap={2} color={textColor}>
      <Table className="w-full rounded text-xs overflow-hidden">
        <Thead>
          <Tr bg={bgTableHeadColor}>
            {orderDetailsHeaders.map(menu => (
              <Th
                className={"h-14 p-3 w-fit text-center uppercase font-bold whitespace-nowrap " + menu.thClass}
                key={menu.id}
              >
                <Heading size="md" className="text-center">
                  {menu.name}
                </Heading>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {bookingItems ? (
            bookingItems.map((item: BookingItem, index: number) => (
              <Tr bg={index % 2 === 0 ? bgColor : bgTableContent} key={item.id} className="whitespace-nowrap">
                <Td className={"w-28 text-center min-w-25 max-w-40 xl:max-w-60 hidden  xl:table-cell"}>
                  <img src={item.product?.thumbnail as string} alt={item.product?.name as string} className="rounded" />
                </Td>
                <Td className={genericBookingItemClass + " sm:max-w-2/3"}>
                  <Text className="text-center whitespace-normal">{item.product?.name}</Text>
                </Td>
                <Td className={genericBookingItemClass + " hidden  2xl:table-cell"}>
                  <Text className="text-center">{transformToDate(item.startDate as Date)}</Text>
                </Td>
                <Td className={genericBookingItemClass + " hidden  2xl:table-cell"}>
                  <Text className="text-center">{transformToDate(item.endDate as Date)}</Text>
                </Td>
                <Td className={genericBookingItemClass + " hidden  xl:table-cell"}>
                  <Text className="text-center">{item.product?.price?.toFixed(2)} €</Text>
                </Td>
                <Td className={genericBookingItemClass}>
                  <Text className="text-center">
                    {totalPrice(item.product?.price as number, item.startDate as Date, item.endDate as Date)} €
                  </Text>
                </Td>
                <Td className={genericBookingItemClass + " hidden  xl:table-cell"}>
                  <Text className="text-center">{item.status}</Text>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td className="p-4 text-center" colSpan={4}>
                {t("No booking found")}
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Flex>
  );
}
