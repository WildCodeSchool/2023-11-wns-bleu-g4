import { ToastConfigLogin } from "@/config/ToastConfig";
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
import React, { FormEvent } from "react";
import { toast } from "react-toastify";
import { useCreateUserMutation } from "../../../graphql/generated/schema";

export default function SignupForm() {
  const { t } = useTranslation("SignupForm");

  const [signup] = useCreateUserMutation();

  const [showPass, setShowPass] = React.useState(false);
  const handleClickPass = () => setShowPass(!showPass);

  const [showRepPass, setShowRepPass] = React.useState(false);
  const handleClickRepeatPass = () => setShowRepPass(!showRepPass);

  function validatePassword(password: string, repeatPassword: string): boolean {
    let validate: boolean = true;
    if (password !== repeatPassword) {
      toast.error("Passwords must be the same", ToastConfigLogin);
      validate = false;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 chars long", ToastConfigLogin);
      validate = false;
    }
    if (password.search(/[a-z]/) < 0) {
      toast.error("Password must contain a lowercase", ToastConfigLogin);
      validate = false;
    }
    if (password.search(/[A-Z]/) < 0) {
      toast.error("Password must contain an uppercase letter", ToastConfigLogin);
      validate = false;
    }
    if (password.search(/[0-9]/) < 0) {
      toast.error("Password must contain a number", ToastConfigLogin);
      validate = false;
    }

    return validate;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    let formJSON: any = Object.fromEntries(formData.entries());

    if (validatePassword(formJSON.password, formJSON.repeatPassword)) {
      try {
        delete formJSON.repeatPassword;

        const res = await signup({ variables: { data: formJSON } });
        const resEmail: string = res.data?.createUser.email || "User";
        const toastInfo: string = `${resEmail} has been registered`;
        toast.info(toastInfo, ToastConfigLogin);
        window.location.replace("/account");
      } catch (e: any) {
        const errArr = e.message.replace("_", " ");
        console.log(e);
        toast.error(errArr, ToastConfigLogin);
        return;
      }
    }
  };

  return (
    <Card variant="loginCard" boxShadow="md" w={{ base: "300px", sm: "396px" }} h="fit-content">
      {/* TITLE */}
      <CardHeader textAlign="center">
        <Heading as="h1" color="black" fontWeight="500">
          {t("REGISTER")}
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
                    placeholder="email@address.com"
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
                      type={showPass ? "text" : "password"}
                      color="black"
                      placeholder="*****"
                      name="password"
                      size="md"
                      bg="bgLight"
                      borderRadius="lg"
                      required
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClickPass}>
                        {showRepPass ? t("Hide") : t("Show")}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </LightMode>
              </FormControl>
            </Box>

            {/* REPEAT PASSWORD */}
            <Box>
              <FormControl size="md">
                <FormLabel>{t("Repeat your password")}</FormLabel>
                <LightMode>
                  <InputGroup>
                    <Input
                      type={showRepPass ? "text" : "password"}
                      color="black"
                      placeholder={t("Repeat your password")}
                      name="repeatPassword"
                      size="md"
                      bg="bgLight"
                      borderRadius="lg"
                      required
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClickRepeatPass}>
                        {showRepPass ? t("Hide") : t("Show")}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </LightMode>
              </FormControl>
            </Box>
          </Flex>
        </CardBody>
        <CardFooter>
          <Flex direction="column" className="w-full">
            {/* BUTTON */}
            <Button type="submit" className="w-full" variant="loginButton" m="0">
              {t("Signup")}
            </Button>
            {/* FORGOT PASSWORD */}
            <Text className=" text-center text-sm py-2" color="black">
              {t("Already registered ?")}&nbsp;
              <Link href="/login" className="underline text-orange-500">
                {t("login")}
              </Link>
            </Text>
          </Flex>
        </CardFooter>
      </form>
    </Card>
  );
}
