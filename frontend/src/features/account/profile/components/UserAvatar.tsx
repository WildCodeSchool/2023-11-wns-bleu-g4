import { Heading, Flex, Avatar, Box, Text } from '@chakra-ui/react'
import { CalendarIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

export default function UserAvatar() {
    return (
        <Flex maxW='md' direction={'column'} gap={4} padding={5} className='bg-cactus-400 text-white rounded'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                <Box className='relative'>
                    <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                    <PencilSquareIcon width={20} fill='white' className='absolute -bottom-2 -right-2' />
                </Box>

                <Box>
                    <Heading size='sm'>Segun Adebayo</Heading>
                    <Text>Creator, Chakra UI</Text>
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