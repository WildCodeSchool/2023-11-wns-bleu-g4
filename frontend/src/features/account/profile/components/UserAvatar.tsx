import { Heading, Flex, Avatar, Box, useColorModeValue } from '@chakra-ui/react'
import { User } from '../../types';

export default function UserAvatar({ user }: { user: User }) {

    /** DARK / LIGHT MODE */
    const textColor = useColorModeValue("dark", "light")
    const bgTableHeadColor = useColorModeValue("#d0d2d6", "cactus.900")

    return (
        <Flex
            color={textColor}
            bg={bgTableHeadColor}
            className='
            text-xs 
            py-3 px-5
            h-fit w-full 
            flex flex-col
            lg:flex-row
            '>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                <Avatar name={user?.firstname + ' ' + user?.name} src={user?.avatar} size='sm' />
                <Box>
                    <Heading size='xs'>{user?.firstname + ' ' + user?.name}</Heading>
                </Box>
            </Flex>
        </Flex>
    )
}