import { Heading, Flex, Avatar, Box, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next';
import { User } from '../../types';

export default function UserAvatar({ user }: { user: User }) {

    const { t } = useTranslation("UserAvatar");

    return (
        <Flex
            className='text-white bg-cactus-900 
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