import React, { FormEvent, useEffect, useState } from 'react';
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
} from '@chakra-ui/react';
import { useLoginMutation } from '../../../graphql/generated/schema';
import Link from 'next/link';

export default function LoginForm() {
  const [error, setError] = useState('');
  const [login] = useLoginMutation();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());

    try {
      const res = await login({ variables: { data: formJSON } });
      window.location.replace('/account');
      // console.log({ res });
    } catch (e: any) {
      setError('Invalid email or password');
    }
  };

  // Error message disappears after 2 seconds
  useEffect(() => {
    if (error !== '') {
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  }, [error]);

  return (
    <>
      <Card variant="loginCard" boxShadow="md" w={{ base: '300px', sm: '396px' }} zIndex="5" h="fit-content">
        {/* TITLE */}
        <CardHeader>
          <Text className="text-center tracking-widest">LOGIN</Text>
        </CardHeader>

        <Divider />
        <form onSubmit={handleSubmit}>
          <CardBody>
            <Flex direction="column" gap="15px">
              {/* EMAIL */}
              <FormControl>
                <FormLabel>Email</FormLabel>
                <LightMode>
                  <Input
                    type="email"
                    color="black"
                    placeholder="Email"
                    name="email"
                    size="md"
                    bg="bgLight"
                    borderRadius="lg"
                  />
                </LightMode>
              </FormControl>

              <Box>
                {/* PASSWORD */}
                <FormControl size="md">
                  <FormLabel>Password</FormLabel>
                  <LightMode>
                    <InputGroup>
                      <Input
                        color="black"
                        type={show ? 'text' : 'password'}
                        placeholder="Password"
                        name="password"
                        size="md"
                        bg="bgLight"
                        borderRadius="lg"
                        onFocus={() => setError('')}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                          {show ? 'Hide' : 'Show'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </LightMode>
                </FormControl>

                {/* FORGOT PASSWORD */}
                <Text className=" py-2 text-center">
                  Forgot your password ?&nbsp;
                  <Link href="#" className="text-orange-500 underline">
                    click here
                  </Link>
                </Text>
              </Box>
            </Flex>
          </CardBody>

          <CardFooter>
            <Flex direction="column" className="w-full">
              <Box h="50px" textAlign="center" m="0">
                {error !== '' && (
                  <Text bg="red.500" color="light" className="w-full rounded-lg p-1">
                    {error.toUpperCase()}
                  </Text>
                )}
              </Box>
              {/* BUTTON */}
              <Button type="submit" className="w-full" variant="loginButton" m="0">
                Login
              </Button>
            </Flex>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
