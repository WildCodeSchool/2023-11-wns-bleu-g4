import { ToastConfigLogin } from "@/config/ToastConfig";
import { useLoginMutation } from "@/graphql/User/generated/Login.generated";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  LightMode,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { LoginType } from "../types/authTypes";

export default function LoginForm() {
  const { t } = useTranslation("LoginForm");

  const [login] = useLoginMutation();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: LoginType = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    try {
      await login({ variables: { data: formJSON } });
      toast.success("LOGIN SUCCESSFULL", ToastConfigLogin);
      router.push("/");
    } catch (e: any) {
      const errArr = e.message.replace("_", " ");
      toast.error(errArr, ToastConfigLogin);
      return;
    }


  };

  return (
    <Card variant="loginCard" boxShadow="md" w={{ base: "300px", sm: "396px" }} h="fit-content">
      {/* TITLE */}
      <CardHeader textAlign="center">
        <Heading as="h1" color="black" fontWeight="500">
          {t("LOGIN")}
        </Heading>
      </CardHeader>
      <Divider color="black" />
      <form onSubmit={handleSubmit}>
        <CardBody>
          <Flex direction="column" gap="15px">
            {/* EMAIL */}
            <FormControl size="md">
              <FormLabel>Email</FormLabel>
              <LightMode>
                <InputGroup>
                  <Input
                    type="email"
                    color="black"
                    placeholder="Email"
                    name="email"
                    size="md"
                    bg="bgLight"
                    borderRadius="lg"
                    required
                  />
                </InputGroup>
              </LightMode>
            </FormControl>

            {/* PASSWORD */}
            <Box>
              <FormControl size="md">
                <FormLabel>{t("Password")}</FormLabel>
                <LightMode>
                  <InputGroup>
                    <Input
                      type={show ? "text" : "password"}
                      color="black"
                      placeholder={t("Password")}
                      name="password"
                      size="md"
                      bg="bgLight"
                      borderRadius="lg"
                      required
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? t("Hide") : t("Show")}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </LightMode>
              </FormControl>

              {/* FORGOT PASSWORD */}
              <Text className=" text-center text-sm py-2">
                <Link href="/sendmailform" className="hover:underline hover:text-orange-500">
                  {t("Forgot your password ?")}
                </Link>
              </Text>
            </Box>
          </Flex>
        </CardBody>
        <CardFooter>
          <Flex direction="column" className="w-full">
            {/* BUTTON */}
            <Button name="Login" type="submit" className="w-full" variant="loginButton" m="0">
              {t("Login")}
            </Button>
            {/* FORGOT PASSWORD */}
            <Text className=" text-center text-sm py-2" color="black">
              {t("Not yet registered ?")}&nbsp;
              <Link href="/signup" className="underline text-orange-500">
                {t("sign up")}
              </Link>
            </Text>
          </Flex>
        </CardFooter>
      </form>
    </Card>
  );
}
