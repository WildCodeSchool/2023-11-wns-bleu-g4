import { Box, Button, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { HomeIcon, MapPinIcon, MapIcon, GlobeEuropeAfricaIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { User } from "../../types";
import { useState } from "react";
import UserInfoModal from "../modal/UserInfoModal";


export default function UserInfos({ user }: { user?: User }) {


    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const toggleUpdateProductModal = () => setIsUpdateModalOpen(!isUpdateModalOpen);

    /** DARK / LIGHT MODE */
    const textColor = useColorModeValue("dark", "light")
    const bgHeading = useColorModeValue("cactus.50", "cactus.900")
    const labelColor = useColorModeValue("cactus.500", "cactus.200")
    const bgTableHeadColor = useColorModeValue("#d0d2d6", "cactus.900")
    const bgColor = useColorModeValue("footerBgLight", "cactus.600")
    const bgTableContent = useColorModeValue("lightgrey", "cactus.700")

    const userInfos = [
        {
            title: "ADDRESS",
            data: [
                {
                    icon: <HomeIcon className="size-5" color={labelColor} />,
                    label: 'Address',
                    userInfo: user?.address
                },
                {
                    icon: <MapPinIcon className="size-5" color={labelColor} />,
                    label: 'PostCode',
                    userInfo: user?.postcode
                },
                {
                    icon: <MapIcon className="size-5" color={labelColor} />,
                    label: 'City',
                    userInfo: user?.city
                },
                {
                    icon: <GlobeEuropeAfricaIcon className="size-5" color={labelColor} />,
                    label: 'Country',
                    userInfo: user?.country
                },
            ]
        },
        {
            title: "Contact",
            data: [
                {
                    icon: <PhoneIcon className="size-5" color={labelColor} />,
                    label: 'Phone',
                    userInfo: user?.phone
                },
                {
                    icon: <EnvelopeIcon className="size-5" color={labelColor} />,
                    label: 'Email',
                    userInfo: user?.email
                },
            ]
        },
    ]

    return (
        <Flex
            className="
            w-full
            flex flex-col 
            sm:h-full sm:max-w-full 
            lg:min-w-56">
            {/*************************** USER INFOS ***************************/}
            <Flex className="
            h-full w-full text-xs 
            flex flex-col justify-between items-start 
            sm:flex-row sm:grow sm:relative
            lg:flex-col lg:grow-0
            "
                bg={bgColor}
                color={textColor}
            >
                {userInfos && userInfos.map((info, i) => {
                    return (
                        <Flex key={i} className="flex flex-col w-full sm:h-full sm:flex-row lg:flex-col" >
                            <Flex className="flex flex-col justify-start w-full">
                                <Heading size={"xs"} className="p-3 text-center h-fit" bg={bgTableHeadColor}>
                                    {info.title}
                                </Heading>
                                <Flex gap='1' direction='column' className="px-5 py-3 h-full w-full">
                                    {
                                        info.data && info.data.map((el, i) => {
                                            return (
                                                <Flex key={i} gap={2} alignItems='center' className="w-full">
                                                    <Box>{el.icon}</Box>
                                                    <Text 
                                                    className="text-cactus-200 sm:hidden lg:flex w-3/12 whitespace-nowrap 2xl:block "
                                                    color={labelColor}
                                                    >
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
                <Flex className="w-full py-3 px-5 justify-end items-start h-fit 
                sm:absolute sm:bottom-3 sm:right-5 sm:p-0 sm:w-fit sm:bg-none
                lg:static lg:w-full lg:py-3 lg:px-5 
                "
                bg={bgTableHeadColor}
                color={textColor}
                >
                    {/* <Button onClick={toggleUpdateProductModal} size='xs' padding='3'>Update</Button> */}
                    <Button size='xs' padding='3'>Update</Button>
                    {/* <Button onClick={()=>{}} size='xs' padding='3' bg={"#E8330D"}>Delete Account</Button> */}
                </Flex>
            </Flex>


            {/*************************** MODAL ***************************/}
            {/* <UserInfoModal isOpen={isUpdateModalOpen} onClose={toggleUpdateProductModal} user={user} /> */}
        </Flex>
    )
}

