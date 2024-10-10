import { Flex } from "@chakra-ui/react";
import UserAvatar from "./components/UserAvatar";
import UserInfos from "./components/UserInfos";
import UserPassword from "./components/UserPassword";
import { User } from "../types";
import { useProfileQuery } from "@/graphql/User/generated/Profile.generated";

export default function UserProfile() {
  const { data: currentUser } = useProfileQuery();

  return (
    <Flex className="min-w-96 w-full gap-2 flex flex-col items-center justify-center
    lg:gap-5 xl:pb-5 xl:items-start xl:gap-2 xl:max-w-2xl"
    >
      <Flex className="w-full flex flex-col h-full gap-2 sm:justify-between 
      lg:flex-row lg:justify-start lg:h-fit xl:flex-col"
      >
        <UserAvatar user={currentUser?.profile as User} />
        <UserPassword />
      </Flex>
      <UserInfos user={currentUser?.profile as User} />
    </Flex>
  );
}
