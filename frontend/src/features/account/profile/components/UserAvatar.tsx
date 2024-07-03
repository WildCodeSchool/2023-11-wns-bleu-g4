import { Heading, Flex, Avatar, Box, Text } from '@chakra-ui/react'
import { CalendarIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { User } from '../types';

export default function UserAvatar({user} : {user : User}) {
    
    const { t } = useTranslation("UserAvatar");

    return (
        <Flex maxW='md' direction={'column'} gap={4} padding={5} className='bg-cactus-600 text-white rounded'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                <Box className='relative'>
                    <Avatar name={user?.firstname + ' ' + user?.name} src={user?.avatar} />
                    <PencilSquareIcon width={20} className='absolute -bottom-2 -right-2' />
                </Box>

                <Box>
                    <Heading size='sm'>{user?.firstname + ' ' + user?.name}</Heading>
                    <Text>Creator, Chakra UI</Text>{user?.role}
                </Box>
            </Flex>


            <Flex alignItems={'center'}>
                <CalendarIcon width={16} />
                &nbsp;
                <Text>
                    Member since January 20, 2024
                </Text>
            </Flex>
        </Flex>
    )
}