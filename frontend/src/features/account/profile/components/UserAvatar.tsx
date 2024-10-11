import { Heading, Flex, Avatar, Box, useColorModeValue } from "@chakra-ui/react";
import { User } from "../../types";

export default function UserAvatar({ user }: { user: User }) {
  /** DARK / LIGHT MODE */
  const textColor = useColorModeValue("dark", "light");
  const bgTableHeadColor = useColorModeValue("#d0d2d6", "cactus.900");

  return (
    <Flex
      color={textColor}
      bg={bgTableHeadColor}
      flex="1"
      gap="4"
      alignItems="center"
      flexWrap="wrap"
      className="text-md py-3 px-5 h-28 w-full flex rounded min-w-fit lg:flex-col xl:flex-row"
    >
      <Avatar name={user?.firstname + " " + user?.name} src={user?.avatar} size="sm" />
      <Heading size="md">{user?.firstname + " " + user?.name}</Heading>
    </Flex>
  );
}
