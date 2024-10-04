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
  InputRightElement,
  InputGroup,
  LightMode,
  Divider,
  Heading,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { ToastConfigWarning } from "@/config/ToastConfig";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { resetPasswordType } from "./types";
import { useRouter } from "next/router";
import { useResetPasswordMutation } from "@/graphql/User/generated/ResetPassword.generated";
import CheckPasswordAvailability from "./helpers/CheckPasswordAvailability";
import { validatePassword } from "@/features/auth/helpers/validatePassword";

export default function ResetPasswordForm() {
  const { t } = useTranslation("ResetPasswordForm");
  const router = useRouter();
  const token = router.query.token as string;
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [resetPassword] = useResetPasswordMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: resetPasswordType = {
      password: formData.get("password") as string,
      repeatPassword: formData.get("repeatedPassword") as string,
      token,
    };

    if (validatePassword(formJSON.password, formJSON.repeatPassword)) {
      try {
        await resetPassword({ variables: { newPassword: formJSON.password, token } });
        toast.success("PASSWORD CHANGED SUCCESSFULLY", ToastConfigWarning);
        router.push("/login");
      } catch (error: any) {
        const errArr = error.message.replace("_", " ");
        toast.error(errArr, ToastConfigWarning);
        return;
      }
    }
  };

  const passwordInputs = [
    {
      label: t("Password"),
      name: "password",
      change: (e: string) => setFirstPassword(e),
      click: () => setShowPassword(!showPassword),
      show: showPassword,
    },
    {
      label: t("Repeat your password"),
      name: "repeatedPassword",
      change: (e: string) => setRepeatedPassword(e),
      click: () => setShowRepeatedPassword(!showRepeatedPassword),
      show: showRepeatedPassword,
    },
  ];

  return (
    <Card variant="loginCard" boxShadow="md" w={{ base: "300px", sm: "396px" }} h="fit-content">
      <CardHeader textAlign="center">
        <Heading as="h1" color="black" fontWeight="500">
          {t("RESET PASSWORD")}
        </Heading>
      </CardHeader>
      <Divider color="black" />
      <form onSubmit={handleSubmit}>
        <CardBody>
          <Flex direction="column" gap="15px">
            {passwordInputs.map((el, i) => {
              return (
                <Box key={i}>
                  <FormControl size="md">
                    <FormLabel>{el.label}</FormLabel>
                    <LightMode>
                      <InputGroup>
                        <Input
                          type={el.show ? "text" : "password"}
                          color="black"
                          placeholder="*****"
                          name={el.name}
                          size="md"
                          bg="bgLight"
                          borderRadius="lg"
                          required
                          onChange={e => el.change(e.target.value)}
                        />
                        <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="sm" onClick={() => el.click()}>
                            {el.show ? t("Hide") : t("Show")}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </LightMode>
                  </FormControl>
                </Box>
              );
            })}
            <CheckPasswordAvailability password={firstPassword} secondPassword={repeatedPassword} />
          </Flex>
        </CardBody>
        <CardFooter>
          <Button type="submit" className="w-full" variant="loginButton" m="0">
            {t("Reset password")}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
