import React, { FormEvent, useEffect, useState } from 'react'
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
    Text,
    InputRightElement,
    InputGroup,
    LightMode,
    Divider,
    Heading,
} from '@chakra-ui/react'
import { useLoginMutation } from '../../../graphql/generated/schema';
import Link from 'next/link';

export default function LoginForm() {

    const [error, setError] = useState("");
    const [login] = useLoginMutation();
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement)
        const formJSON: any = Object.fromEntries(formData.entries());

        try {
            const res = await login({ variables: { data: formJSON } });
            window.location.replace("/account");
            // console.log({ res });
        } catch (e: any) {
            setError("Invalid email or password");
        }

    }

    return (
        <>
            <Card variant='loginCard' boxShadow='md' w={{ base: "300px", sm: '396px' }} zIndex='5' h='fit-content'>
                {/* TITLE */}
                <CardHeader textAlign='center'>
                    <Heading as='h1' color='black'>LOGIN</Heading>
                </CardHeader>
                <Divider color='black' />
                <form onSubmit={handleSubmit}>
                    <CardBody>
                        <Flex direction='column' gap='15px'>
                            {/* EMAIL */}
                            <FormControl size='md'>
                                <FormLabel>Email</FormLabel>
                                <LightMode>
                                    <InputGroup>
                                        <Input
                                            type='email'
                                            color='black'
                                            placeholder='Email'
                                            name='email'
                                            size='md'
                                            bg='bgLight'
                                            borderRadius='lg'
                                            onFocus={() => setError("")} />
                                    </InputGroup>
                                </LightMode>
                            </FormControl>

                            {/* PASSWORD */}
                            <Box>
                                <FormControl size='md'>
                                    <FormLabel>Password</FormLabel>
                                    <LightMode>
                                        <InputGroup>
                                            <Input
                                                type={show ? 'text' : 'password'}
                                                color='black'
                                                placeholder='Password'
                                                name='password'
                                                size='md'
                                                bg='bgLight'
                                                borderRadius='lg'
                                                onFocus={() => setError("")} />
                                            <InputRightElement width='4.5rem'>
                                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                    {show ? 'Hide' : 'Show'}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </LightMode>
                                </FormControl>

                                {/* FORGOT PASSWORD */}
                                <Text className=' text-center py-2'>
                                    Forgot your password ?&nbsp;
                                    <Link href="/signup" className="underline text-orange-500">click here</Link>
                                </Text>
                            </Box>
                        </Flex>
                    </CardBody>
                    <CardFooter>
                        <Flex direction='column' className='w-full'>
                            <Box h='50px' textAlign='center' m='0'>
                                {error !== "" && <Text bg='red.500' color='light' className='w-full p-1 rounded-lg'>{error.toUpperCase()}</Text>}
                            </Box>
                            {/* BUTTON */}
                            <Button type='submit' className='w-full' variant='loginButton' m='0'>Login</Button>
                        </Flex>
                    </CardFooter>
                </form>
            </Card>
        </>
    )
}
