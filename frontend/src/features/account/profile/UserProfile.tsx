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
            sm:flex-row sm:items-start sm:gap-5 sm:justify-center sm:w-full
            lg:flex-col lg:max-w-56 lg:pb-5 lg:items-start lg:gap-2
            xl:max-w-72 xl:min-w-56">
            <Flex
                className="min-w-56 w-full flex flex-col h-full gap-2
                sm:justify-between sm:max-w-56
                lg:justify-start lg:h-fit
                xl:max-w-72 xl:min-w-56">
                <UserAvatar user={currentUser?.profile as User} />
                <UserPassword />
            </Flex>
            <UserInfos user={currentUser?.profile as User} />

        </Flex>
    )
}