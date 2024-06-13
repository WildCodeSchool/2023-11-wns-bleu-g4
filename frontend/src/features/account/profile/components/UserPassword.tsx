import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

export default function UserPassword() {

    return (
        <Flex maxW='md' direction={'column'} gap={5} padding={5} className='bg-cactus-400 text-white rounded'>
            <Heading size={"lg"}>PASSWORD</Heading>

            <Flex gap={4} justify={"space-between"} alignItems={'center'}>
                <Text>*******</Text>
                <Button variant={'profilButton'}>Modify</Button>
            </Flex>
        </Flex>
    )

}