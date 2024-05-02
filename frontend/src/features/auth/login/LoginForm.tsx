import React, { FormEvent } from 'react'
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
import { ToastConfigLogin } from '@/config/ToastConfig';
import { toast } from 'react-toastify';

export default function LoginForm() {

    const [login] = useLoginMutation();
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement)
        const formJSON: any = Object.fromEntries(formData.entries());

        try {
            await login({ variables: { data: formJSON } });
            toast.info("LOGIN SUCCESSFULL", ToastConfigLogin)
            window.location.replace("/account");
        } catch (e: any) {
            const errArr = e.message.replace('_', ' ')
            toast.error(errArr, ToastConfigLogin)
            return
        }

    }

    return (

        <Card variant='loginCard' boxShadow='md' w={{ base: "300px", sm: '396px' }} h='fit-content' >
            {/* TITLE */}
            <CardHeader textAlign='center'>
                <Heading as='h1' color='black' fontWeight='500'>LOGIN</Heading>
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
                                        borderRadius='lg' />
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
                                            borderRadius='lg' />
                                        <InputRightElement width='4.5rem'>
                                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                {show ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </LightMode>
                            </FormControl>

                            {/* FORGOT PASSWORD */}
                            <Text className=' text-center text-sm py-2'>
                                Forgot your password ?&nbsp;
                                <Link href="#" className="underline text-orange-500">click here</Link>
                            </Text>
                        </Box>
                    </Flex>
                </CardBody>
                <CardFooter>
                    <Flex direction='column' className='w-full'>
                        {/* BUTTON */}
                        <Button type='submit' className='w-full' variant='loginButton' m='0'>Login</Button>
                        {/* FORGOT PASSWORD */}
                        <Text className=' text-center text-sm py-2' color='black'>
                            Not yet registered ?&nbsp;
                            <Link href="/signup" className="underline text-orange-500">sign up</Link>
                        </Text>
                    </Flex>
                </CardFooter>
            </form>
        </Card>

    )
}
