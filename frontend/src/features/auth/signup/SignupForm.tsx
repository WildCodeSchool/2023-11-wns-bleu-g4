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
  Checkbox,
} from "@chakra-ui/react";
import { CreateUserMutation, useCreateUserMutation } from "../../../graphql/User/generated/CreateUser.generated";
import Link from "next/link";
import { ToastConfigLogin } from "@/config/ToastConfig";
import { toast } from "react-toastify";
import { FetchResult } from "@apollo/client";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { SignupType } from "../types/authTypes";
import { validatePassword } from "../helpers/validatePassword";

export default function SignupForm() {
  /** Hooks */
  const [disableButton, setDisableButton] = useState(true);
  const { t } = useTranslation("SignupForm");
  const [signup] = useCreateUserMutation();
  const router = useRouter();

  /** Show/Hide Password */
  const [showPass, setShowPass] = useState(false);
  const handleClickPass = () => setShowPass(!showPass);

  /** Show/Hide RepeatPassword */
  const [showRepPass, setShowRepPass] = useState(false);
  const handleClickRepeatPass = () => setShowRepPass(!showRepPass);

  /** Submit function */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    let formJSON: SignupType = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      repeatPassword: formData.get("repeatPassword") as string,
      acceptConditions: !disableButton,
    };

    if (validatePassword(formJSON.password, formJSON.repeatPassword as string)) {
      try {
        delete formJSON.repeatPassword;

        const res: FetchResult<CreateUserMutation> = await signup({ variables: { data: formJSON } });
        const toastInfo: string = `Account created. Please check your email to verify your account.`;
        const duration: number = 5000;
        form.reset();
        router.push("/");
        toast.success(toastInfo, { ...ToastConfigLogin, autoClose: duration });
      } catch (e: any) {
        const errArr = e.message.replaceAll("_", " ");
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
          <Flex direction="column" alignItems="center" className="w-full">
            {/* CHECKBOX */}
            <Checkbox className="pb-2" onChange={() => setDisableButton(!disableButton)} name="acceptConditions">
              <Link href="#" className="underline text-orange-500">
                I accept terms and conditions
              </Link>
            </Checkbox>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={disableButton}
              hidden={false}
              className={`bg-orange-500  h-10 w-full rounded-lg ${disableButton ? "hover:cursor-not-allowed" : "hover:cursor-pointer hover:bg-orange-400"}`}
            >
              {t("Signup")}
            </button>

            {/* GO TO LOGIN */}
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
