import { Button, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import UserPasswordModal from "../modal/UserPasswordModal";
import { useTranslation } from "react-i18next";

export default function UserPassword() {
  const { t } = useTranslation("UserPassword");
  /** DARK / LIGHT MODE */
  const textColor = useColorModeValue("dark", "light");
  const bgTableHeadColor = useColorModeValue("#d0d2d6", "cactus.900");
  const bgColor = useColorModeValue("footerBgLight", "cactus.600");

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const toggleUpdateUserModal = () => setIsPasswordModalOpen(!isPasswordModalOpen);

  return (
    <Flex
      direction={"column"}
      className="bg-cactus-600 text-white text-sm min-w-56 h-28 rounded overflow-hidden w-full lg:max-w-screen-md"
      bg={bgColor}
      color={textColor}
    >
      <Heading size={"md"} className="p-3 bg-cactus-900" bg={bgTableHeadColor}>
        {t("PASSWORD")}
      </Heading>

      <Flex gap={4} justify={"space-between"} alignItems={"center"} className="px-5 py-3">
        <Text color={textColor} size={"md"}>
          *******
        </Text>
        <Button className="w-1/2" size="md" padding="4" variant={"accentButton"} onClick={toggleUpdateUserModal}>
          {t("Modify")}
        </Button>
        <UserPasswordModal onClose={toggleUpdateUserModal} isOpen={isPasswordModalOpen} />
      </Flex>
    </Flex>
  );
}
