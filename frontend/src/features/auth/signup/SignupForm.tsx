import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
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
import { useCreateUserMutation } from "../../../graphql/User/generated/CreateUser.generated";
import Link from "next/link";
import { ToastConfigLogin } from "@/config/ToastConfig";
import { toast } from "react-toastify";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { SignupType } from "../types/authTypes";
import { validatePassword } from "../helpers/validatePassword";
import CheckPasswordAvailability from "@/features/resetPasswordForm/helpers/CheckPasswordAvailability";
import { CheckIcon } from "@heroicons/react/16/solid";
import ConfirmationMailSendCard from "@/features/auth/signup/ConfirmationMailSendCard/ConfirmationMailSendCard";

export default function SignupForm() {
  /** Hooks */
  const [disableButton, setDisableButton] = useState(true);
  const { t } = useTranslation("SignupForm");
  const [signup] = useCreateUserMutation();
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);

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
        await signup({ variables: { data: formJSON } });
        const toastInfo: string = `Account created. Please check your email to verify your account.`;
        toast.success(toastInfo, { ...ToastConfigLogin, autoClose: 3000 });
        setFormSubmit(true);
        form.reset();
      } catch (e: any) {
        const errArr = e.message.replaceAll("_", " ");
        toast.error(errArr, ToastConfigLogin);
        return;
      }
    }
  };

  function CustomIcon(props: any) {
    const { isChecked, ...rest } = props;

    return <>{isChecked ? <CheckIcon className="text-orange-500" /> : null}</>;
  }

  return formSubmit ? (
    <ConfirmationMailSendCard />
  ) : (
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
                      onChange={e => setFirstPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClickPass}>
                        {showPass ? t("Hide") : t("Show")}
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
                      onChange={e => setRepeatedPassword(e.target.value)}
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
            <CheckPasswordAvailability password={firstPassword} secondPassword={repeatedPassword} />
          </Flex>
        </CardBody>
        <CardFooter>
          <Flex direction="column" alignItems="center" className="w-full">
            {/* CHECKBOX */}
            <Checkbox
              className="pb-2  border-orange-500"
              size="lg"
              colorScheme="transparent"
              onChange={() => {
                setDisableButton(!disableButton);
              }}
              icon={<CustomIcon />}
              name="acceptConditions"
            >
              <Link href="/sale-conditions" className="underline text-orange-500">
                {t("I accept terms and conditions")}
              </Link>
            </Checkbox>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={disableButton}
              hidden={false}
              className={`bg-orange-500  h-10 w-full rounded-lg ${disableButton ? "hover:cursor-not-allowed" : "hover:cursor-pointer hover:bg-orange-400"
                }`}
            >
              {t("Signup")}
            </button>

            {/* GO TO LOGIN */}
            <Text className=" text-center text-md py-2" color="black">
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
