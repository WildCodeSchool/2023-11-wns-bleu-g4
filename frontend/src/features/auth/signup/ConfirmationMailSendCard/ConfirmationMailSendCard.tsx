import { Card, CardBody, CardFooter, CardHeader, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

export default function ConfirmationMailSendCard() {
  const { t } = useTranslation("MailSendForm");

  return (
    <Card variant="loginCard" boxShadow="md" w={{ base: "300px", sm: "396px" }} h="fit-content">
      <CardHeader textAlign="center">
        <Heading as="h1" color="black" fontWeight="500">
          {t("Confirm email")}
        </Heading>
      </CardHeader>
      <Divider color="black" />
      <CardBody>
        <Flex direction="column" gap="15px">
          <Text className="text-justify">
            {t("Please confirm your email address.")}
            <br />
            {t("We send you an email with a link to confirm your email address.")}
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
}
