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
import { CreateUserMutation, useCreateUserMutation } from '../../../graphql/generated/schema';
import Link from 'next/link';
import { ToastConfigLogin } from '@/config/ToastConfig';
import { toast } from 'react-toastify';
import { FetchResult } from '@apollo/client';

export default function SignupForm() {

    const [signup] = useCreateUserMutation();

    const [showPass, setShowPass] = React.useState(false)
    const handleClickPass = () => setShowPass(!showPass)

    const [showRepPass, setShowRepPass] = React.useState(false)
    const handleClickRepeatPass = () => setShowRepPass(!showRepPass)

    function validatePassword(password: string, repeatPassword: string): boolean {
        let validate: boolean = true
        if (password !== repeatPassword) {
            toast.error("Passwords must be the same", ToastConfigLogin)
            validate = false
        }
        if (password.length < 8) {
            toast.error("Password must be at least 8 chars long", ToastConfigLogin)
            validate = false
        }
        if (password.search(/[a-z]/) < 0) {
            toast.error("Password must contain a lowercase", ToastConfigLogin)
            validate = false
        }
        if (password.search(/[A-Z]/) < 0) {
            toast.error("Password must contain an uppercase letter", ToastConfigLogin)
            validate = false
        }
        if (password.search(/[0-9]/) < 0) {
            toast.error("Password must contain a number", ToastConfigLogin)
            validate = false
        }

        if (password.search(/\D+\S+\W/) < 0) {
            toast.error("Password must contain at least 1 special character", ToastConfigLogin)
            validate = false
        }

        return validate
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        let formJSON: any = Object.fromEntries(formData.entries());

        if (validatePassword(formJSON.password, formJSON.repeatPassword)) {
            try {
                delete formJSON.repeatPassword; 

                const res: FetchResult<CreateUserMutation> = await signup({ variables: { data: formJSON } });
                const toastInfo: string = `Account created`
                toast.success(toastInfo, {...ToastConfigLogin, autoClose:3000})
                setTimeout(()=> {
                    window.location.replace("/account/"+res.data?.createUser.id);
                },3000)
            } catch (e: any) {
                const errArr = e.message.replaceAll('_', ' ')
                toast.error(errArr, ToastConfigLogin)
                return
            }
        }
    }

    return (

        <Card variant='loginCard' boxShadow='md' w={{ base: "300px", sm: '396px' }} h='fit-content' >
            {/* TITLE */}
            <CardHeader textAlign='center'>
                <Heading as='h1' color='black' fontWeight='500'>REGISTER</Heading>
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
                                        placeholder='email@address.com'
                                        name='email'
                                        size='md'
                                        bg='bgLight'
                                        borderRadius='lg'
                                        required />
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
                                            type={showPass ? 'text' : 'password'}
                                            color='black'
                                            placeholder='*****'
                                            name='password'
                                            size='md'
                                            bg='bgLight'
                                            borderRadius='lg'
                                            required />
                                        <InputRightElement width='4.5rem'>
                                            <Button h='1.75rem' size='sm' onClick={handleClickPass}>
                                                {showPass ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </LightMode>
                            </FormControl>
                        </Box>

                        {/* REPEAT PASSWORD */}
                        <Box>
                            <FormControl size='md'>
                                <FormLabel>Repeat your password</FormLabel>
                                <LightMode>
                                    <InputGroup>
                                        <Input
                                            type={showRepPass ? 'text' : 'password'}
                                            color='black'
                                            placeholder='Repeat your password'
                                            name='repeatPassword'
                                            size='md'
                                            bg='bgLight'
                                            borderRadius='lg'
                                            required />
                                        <InputRightElement width='4.5rem'>
                                            <Button h='1.75rem' size='sm' onClick={handleClickRepeatPass}>
                                                {showRepPass ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </LightMode>
                            </FormControl>
                        </Box>

                    </Flex>
                </CardBody>
                <CardFooter>
                    <Flex direction='column' className='w-full'>
                        {/* BUTTON */}
                        <Button type='submit' className='w-full' variant='loginButton' m='0'>Signup</Button>
                        {/* FORGOT PASSWORD */}
                        <Text className=' text-center text-sm py-2' color='black'>
                            Already registered ?&nbsp;
                            <Link href="/login" className="underline text-orange-500">login</Link>
                        </Text>
                    </Flex>
                </CardFooter>
            </form>
        </Card>

    )
}
