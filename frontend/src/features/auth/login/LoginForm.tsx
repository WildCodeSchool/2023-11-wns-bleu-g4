import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Flex,
    Input,
    FormControl,
    FormLabel,
    Button,
    Box,
    Text
} from '@chakra-ui/react'

export default function LoginForm() {

    const verifyEmail = (e : string) => {
        const isEmailValid : boolean = false
        if (e === "" || e.length < 5) return isEmailValid
        return 
    }

    return (
        <Card 
        variant='loginCard' 
        boxShadow='md' 
        gap="10px" 
        size="lg" 
        w="396px"
        className="z-50" >
            {/* TITLE */}
            <CardHeader>
                <Text className='text-center tracking-widest font-normal'>
                    LOGIN
                </Text>
            </CardHeader>

            <CardBody>
                <Flex direction='column' gap='10px'>

                    {/* EMAIL */}
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input type='email' placeholder='Email' id='email' size='sm' bg='bgLight' borderRadius='base' />
                    </FormControl>

                    <Box>

                        {/* PASSWORD */}
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input type='password' placeholder='Password' size='sm' bg='bgLight' borderRadius='base' />
                        </FormControl>

                        {/* FORGOT PASSWORD */}
                        <Text className='text-sm text-center py-2'>
                            Forgot your password ?&nbsp;
                            <a href="#" className="underline text-orange-500">click here</a>
                        </Text>
                    </Box>
                </Flex>
            </CardBody>

            {/* BUTTON */}
            <CardFooter>
                <Button className='w-full' variant='loginButton'>Login</Button>
            </CardFooter>
        </Card>
    )
}
