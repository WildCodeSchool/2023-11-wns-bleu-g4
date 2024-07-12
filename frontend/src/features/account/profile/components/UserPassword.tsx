import { Button, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";

export default function UserPassword() {

    /** DARK / LIGHT MODE */
    const textColor = useColorModeValue("dark", "light")
    const bgHeading = useColorModeValue("cactus.50", "cactus.900")
    const labelColor = useColorModeValue("cactus.500", "cactus.200")
    const bgTableHeadColor = useColorModeValue("#d0d2d6", "cactus.900")
    const bgColor = useColorModeValue("footerBgLight", "cactus.600")
    const bgTableContent = useColorModeValue("lightgrey", "cactus.700")

    return (
        <Flex 
            direction={'column'}
            className='bg-cactus-600 text-white text-xs min-w-56 h-fit '
            bg={bgColor}
            color={textColor}
            >
            <Heading size={"xs"} className="p-3 bg-cactus-900 text-center" bg={bgTableHeadColor}>PASSWORD</Heading>

            <Flex gap={4} justify={"space-between"} alignItems={'center'} className="px-5 py-3">
                <Text color={textColor}>*******</Text>
                <Button size='xs' padding='3' bg={bgTableHeadColor}>Modify</Button>
            </Flex>
        </Flex>
    )

}