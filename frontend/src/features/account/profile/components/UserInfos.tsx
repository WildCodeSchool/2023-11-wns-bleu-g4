import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { HomeIcon, MapPinIcon, MapIcon, GlobeEuropeAfricaIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { User } from "../types";
import { useState } from "react";
import UserMInfoModal from "../helpers/UserInfoModal";


export default function UserInfos({ user }: { user?: User }) {

    const address = [
        {
            icon: <HomeIcon className='size-5 text-cactus-100' />,
            label: 'Address',
            userInfo: user?.address
        },
        {
            icon: <MapPinIcon className='size-5 text-cactus-100' />,
            label: 'PostCode',
            userInfo: user?.postcode
        },
        {
            icon: <MapIcon className='size-5 text-cactus-100' />,
            label: 'City',
            userInfo: user?.city
        },
        {
            icon: <GlobeEuropeAfricaIcon className='size-5 text-cactus-100' />,
            label: 'Country',
            userInfo: user?.country
        },
    ]

    const contact = [
        {
            icon: <PhoneIcon className='size-5 text-cactus-100' />,
            label: 'Phone',
            userInfo: user?.phone
        },
        {
            icon: <EnvelopeIcon className='size-5 text-cactus-100' />,
            label: 'Email',
            userInfo: user?.email
        },
    ]

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const toggleUpdateProductModal = () => setIsUpdateModalOpen(!isUpdateModalOpen);

    return (
            <Flex maxW='md' direction={'column'} gap={10} padding={5} className='bg-cactus-600 text-white rounded'>
                <Box>
                    <Heading size={"sm"} marginBottom={3}>Address</Heading>
                    {
                        address && address.map((el, i) => {
                            return (
                                <Flex key={i} gap={4} width={'100%'}>
                                    <Box >{el.icon}</Box>
                                    <Text className="hidden md:block w-3/12">{el.label}</Text>
                                    <Text>{el.userInfo}</Text>
                                </Flex>
                            )
                        })
                    }
                </Box>
                <Box>
                    <Heading size={"sm"} marginBottom={3}>Contact</Heading>
                    {
                        contact && contact.map((el, i) => {
                            return (
                                <Flex key={i} gap={4}>
                                    <Box>{el.icon}</Box>
                                    <Text className="hidden md:block w-3/12">{el.label}</Text>
                                    <Text>{el.userInfo}</Text>
                                </Flex>
                            )
                        })
                    }
                </Box>

                <Flex justifyContent={'end'}>
                    <Button variant={'primaryButton'} onClick={toggleUpdateProductModal}>Update</Button>
                </Flex>
                <UserMInfoModal isOpen={isUpdateModalOpen} onClose={toggleUpdateProductModal} user={user} />
            </Flex>
    )
}

