import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

export default function UserInfos() {

    const address = [
        {
            icon: "icon",
            label: 'Address',
            userInfo: "201 Fake Street"
        },
        {
            icon: "icon",
            label: 'PostCode',
            userInfo: "31000"
        },
        {
            icon: "icon",
            label: 'City',
            userInfo: "Toulouse"
        },
        {
            icon: "icon",
            label: 'Country',
            userInfo: "France"
        },
    ]

    const contact = [
        {
            icon: "icon",
            label: 'Phone',
            userInfo: "01.10.02.02.03"
        },
        {
            icon: "icon",
            label: 'Email',
            userInfo: "segun.adebayo@mail.fr"
        },
    ]

    return (
        <Flex maxW='md' direction={'column'} gap={5} padding={5} className='bg-cactus-400 text-white rounded'>
            <Box>
                <Heading size={"sm"}>Address</Heading>
                {
                    address && address.map((el, i) => {
                        return (
                            <Flex key={i} gap={4}>
                                {el.icon}
                                <Text>{el.label}</Text>
                                <Text>{el.userInfo}</Text>
                            </Flex>
                        )
                    })
                }
            </Box>
            <Box>
                <Heading size={"sm"}>Contact</Heading>
                {
                    contact && contact.map((el, i) => {
                        return (
                            <Flex key={i} gap={4}>
                                {el.icon}
                                <Text>{el.label}</Text>
                                <Text>{el.userInfo}</Text>
                            </Flex>
                        )
                    })
                }
            </Box>
            <Flex justifyContent={'end'}>
                <Button variant={'profilButton'}>Update</Button>
            </Flex>
        </Flex>
    )

}

