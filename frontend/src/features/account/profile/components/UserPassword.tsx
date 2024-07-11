import { Button, Flex, Heading, Text } from "@chakra-ui/react";

export default function UserPassword() {

    return (
        <Flex direction={'column'}
            className='bg-cactus-600 text-white text-xs min-w-56 h-fit '>
            <Heading size={"xs"} className="p-3 bg-cactus-900 text-center">PASSWORD</Heading>

            <Flex gap={4} justify={"space-between"} alignItems={'center'} className="px-5 py-3">
                <Text>*******</Text>
                <Button variant={'primaryButton'} size='xs' padding='3'>Modify</Button>
            </Flex>
        </Flex>
    )

}