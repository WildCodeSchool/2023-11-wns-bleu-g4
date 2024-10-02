import { Flex } from "@chakra-ui/react"
import UserAvatar from "./components/UserAvatar"
import UserInfos from "./components/UserInfos"
import UserPassword from "./components/UserPassword"
import { User } from '../types'
import { useProfileQuery } from "@/graphql/User/generated/Profile.generated"

export default function UserProfile() {

    const { data: currentUser } = useProfileQuery()

    return (
        <Flex
            className="w-full gap-2 flex flex-col items-center justify-center
            lg:gap-5
            xl:pb-5 xl:items-start xl:gap-2 xl:max-w-96
            2xl:min-w-64">
            <Flex
                className="min-w-28 max-w-96 w-full flex flex-col h-full gap-2
                sm:justify-between sm:max-w-2xl
                lg:flex-row lg:justify-start lg:h-fit lg:min-w-56
                xl:flex-col xl:min-w-64">
                <UserAvatar user={currentUser?.profile as User} />
                <UserPassword />
            </Flex>
            <UserInfos user={currentUser?.profile as User} />

        </Flex>
    )
}