import { useTranslation } from "react-i18next";
import { List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { hasOneUpper, hasOneLower, hasOneNumber, hasOneSpecial } from "./verifyPasswordConstraints";
import { useEffect, useState } from "react";
import { PasswordCriteriaType } from "../types";
import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";

export default function CheckPasswordAvailability({ password, secondPassword }: PasswordCriteriaType) {
  const { t } = useTranslation("CheckPasswordAvailabilityComponent");

  const [twelveChars, setTwelveChars] = useState(false);
  const [oneLower, setOneLower] = useState(false);
  const [oneUpper, setOneUpper] = useState(false);
  const [oneSpecial, setOneSpecial] = useState(false);
  const [oneNumber, setOneNumber] = useState(false);
  const [samePasswords, setSamePasswords] = useState(false);

  const checkList = [
    { text: t("At least 1 lowercase"), isAvailable: oneLower },
    { text: t("At least 1 uppercase"), isAvailable: oneUpper },
    { text: t("At least 1 number"), isAvailable: oneNumber },
    { text: t("At least 1 special character"), isAvailable: oneSpecial },
    {
      text: t("At least 12 characters" + (password.length > 0 ? " (" + password.length + ")" : "")),
      isAvailable: twelveChars,
    },
    { text: t("Same passwords"), isAvailable: samePasswords },
  ];

  useEffect(() => {
    setSamePasswords(password === secondPassword && password !== "");
    setTwelveChars(password.length >= 12);
    setOneLower(hasOneLower(password));
    setOneUpper(hasOneUpper(password));
    setOneNumber(hasOneNumber(password));
    setOneSpecial(hasOneSpecial(password));
  }, [password, secondPassword]);

  return (
    <List>
      {checkList.map((el, i) => {
        return (
          <ListItem key={i} className={`flex items-center ${el.isAvailable ? "text-green-600  " : "text-red-500"}`}>
            <ListIcon
              as={el.isAvailable ? CheckIcon : XMarkIcon}
              color={el.isAvailable ? "text-green-600" : "text-red-500"}
            />
            {el.text}
          </ListItem>
        );
      })}
    </List>
  );
}
