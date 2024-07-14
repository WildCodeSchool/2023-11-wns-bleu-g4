import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { HomeIcon, MapPinIcon, MapIcon, GlobeEuropeAfricaIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { User } from "../../types";
import { useState } from "react";
import UserInfoModal from "../modal/UserInfoModal";


export default function UserInfos({ user }: { user?: User }) {

    const iconClass = 'size-5 text-cactus-200'

    const userInfos = [
        {
            title: "ADDRESS",
            data: [
                {
                    icon: <HomeIcon className={iconClass} />,
                    label: 'Address',
                    userInfo: user?.address
                },
                {
                    icon: <MapPinIcon className={iconClass} />,
                    label: 'PostCode',
                    userInfo: user?.postcode
                },
                {
                    icon: <MapIcon className={iconClass} />,
                    label: 'City',
                    userInfo: user?.city
                },
                {
                    icon: <GlobeEuropeAfricaIcon className={iconClass} />,
                    label: 'Country',
                    userInfo: user?.country
                },
            ]
        },
        {
            title: "Contact",
            data: [
                {
                    icon: <PhoneIcon className={iconClass} />,
                    label: 'Phone',
                    userInfo: user?.phone
                },
                {
                    icon: <EnvelopeIcon className={iconClass} />,
                    label: 'Email',
                    userInfo: user?.email
                },
            ]
        },
    ]

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const toggleUpdateProductModal = () => setIsUpdateModalOpen(!isUpdateModalOpen);

    return (
        <Flex
            className="
            w-full
            flex flex-col 
            sm:h-full sm:max-w-full 
            lg:min-w-56">
            {/*************************** USER INFOS ***************************/}
            <Flex className="
            h-full w-full
            bg-cactus-600 text-white text-xs 
            flex flex-col justify-between items-start 
            sm:flex-row sm:grow sm:relative
            lg:flex-col lg:grow-0
            ">
                {userInfos && userInfos.map((info, i) => {
                    return (
                        <Flex key={i} className="flex flex-col w-full sm:h-full sm:flex-row lg:flex-col" >
                            <Flex className="flex flex-col justify-start w-full">
                                <Heading size={"xs"} className="p-3 bg-cactus-900 text-center h-fit">
                                    {info.title}
                                </Heading>
                                <Flex gap='1' direction='column' className="px-5 py-3 h-full w-full">
                                    {
                                        info.data && info.data.map((el, i) => {
                                            return (
                                                <Flex key={i} gap={2} alignItems='center' className="w-full">
                                                    <Box>{el.icon}</Box>
                                                    <Text className="text-cactus-200 sm:hidden lg:flex w-3/12 whitespace-nowrap 2xl:block ">
                                                        {el.label}
                                                    </Text>
                                                    <Text className="whitespace-nowrap overflow-hidden text-ellipsis">
                                                        {el.userInfo}
                                                    </Text>
                                                </Flex>
                                            )
                                        })
                                    }
                                </Flex>
                            </Flex>
                        </Flex>
                    )
                })}
                {/*************************** UPDATE BUTTON ***************************/}
                <Flex className="w-full py-3 px-5 bg-cactus-900 text-center justify-end items-start h-fit 
                sm:absolute sm:bottom-3 sm:right-5 sm:p-0 sm:w-fit sm:bg-none
                lg:static lg:w-full lg:py-3 lg:px-5 lg:bg-cactus-900
                ">
                    <Button variant={'primaryButton'} onClick={toggleUpdateProductModal} size='xs' padding='3'>Update</Button>
                </Flex>
            </Flex>


            {/*************************** MODAL ***************************/}
            <UserInfoModal isOpen={isUpdateModalOpen} onClose={toggleUpdateProductModal} user={user} />
        </Flex>
    )
}

