import { Flex, Heading } from "@chakra-ui/react"
import UserAvatar from "./components/UserAvatar"
import UserInfos from "./components/UserInfos"
import UserPassword from "./components/UserPassword"
import { User } from '../types'
import { useProfileQuery } from "@/graphql/User/generated/Profile.generated"
import { CurrencyEuroIcon } from "@heroicons/react/24/outline"

export default function UserProfile() {
    const {data: currentUser} = useProfileQuery()
    return (
        <Flex className="w-full lg:w-1/3 xl:w-1/4 2xl:1/5 flex-col px-0 lg:mx-24 lg:pb-5" gap={2}>
            <Heading>INFORMATIONS</Heading>
            <UserAvatar user={currentUser?.profile as User}/>
            <UserInfos user={currentUser?.profile as User}/>
            <UserPassword />
        </Flex>
    )
}