import { Box, Button, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import {
  HomeIcon,
  MapPinIcon,
  MapIcon,
  GlobeEuropeAfricaIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { User } from "../../types";
import { useState } from "react";
import UserInfoModal from "./../modal/UserInfoModal";
import UserDeleteAccountModal from "../modal/UserDeleteAccountModal";
import { useTranslation } from "react-i18next";

export default function UserInfos({ user }: { user?: User }) {
  const { t } = useTranslation("UserInfos");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const toggleUpdateUserModal = () => setIsUpdateModalOpen(!isUpdateModalOpen);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const toggleDeleteUserModal = () => setIsDeleteModalOpen(!isDeleteModalOpen);

  const transparentBackGround: boolean = window.innerWidth > 640 && window.innerWidth < 1024;

  /** DARK / LIGHT MODE */
  const textColor = useColorModeValue("dark", "light");
  const bgHeading = useColorModeValue("cactus.50", "cactus.900");
  const labelColor = useColorModeValue("cactus.500", "cactus.200");
  let bgTableHeadColor = useColorModeValue("#d0d2d6", "cactus.900");
  const bgColor = useColorModeValue("footerBgLight", "cactus.600");
  const bgTableContent = useColorModeValue("lightgrey", "cactus.700");
  const bgActionButton = useColorModeValue("accentLight", "accentDark");

  const userInfos = [
    {
      title: t("ADDRESS"),
      data: [
        {
          icon: <HomeIcon className="size-5" color={labelColor} />,
          label: t("Address"),
          userInfo: user?.address,
        },
        {
          icon: <MapPinIcon className="size-5" color={labelColor} />,
          label: t("PostCode"),
          userInfo: user?.postcode,
        },
        {
          icon: <MapIcon className="size-5" color={labelColor} />,
          label: t("City"),
          userInfo: user?.city,
        },
        {
          icon: <GlobeEuropeAfricaIcon className="size-5" color={labelColor} />,
          label: t("Country"),
          userInfo: user?.country,
        },
      ],
    },
    {
      title: t("CONTACT"),
      data: [
        {
          icon: <PhoneIcon className="size-5" color={labelColor} />,
          label: t("Phone"),
          userInfo: user?.phone,
        },
        {
          icon: <EnvelopeIcon className="size-5" color={labelColor} />,
          label: t("Email"),
          userInfo: user?.email,
        },
      ],
    },
  ];

  return (
    <Flex className="w-full flex flex-col">
      {/*************************** USER INFOS ***************************/}
      <Flex
        className="w-full flex justify-between items-start flex-col"
        color={textColor}
      >
        {userInfos &&
          userInfos.map((info, i) => {
            return (
              <Flex key={i} className="flex flex-col w-full sm:h-full ">
                <Flex className="flex flex-col justify-start w-full">
                  <Heading size={"md"} className="p-3 h-fit" bg={bgTableHeadColor}>
                    {info.title}
                  </Heading>
                  <Flex gap="1" direction="column" className="px-5 py-3 h-full w-full" bg={bgColor}>
                    {info.data &&
                      info.data.map((el, i) => {
                        return (
                          <Flex key={i} gap={2} alignItems="center" className="w-full">
                            <Box>{el.icon}</Box>
                            <Text
                              className="text-cactus-200 sm:hidden lg:flex w-3/12 whitespace-nowrap 2xl:block"
                              color={labelColor}
                            >
                              {el.label}
                            </Text>
                            <Text className="whitespace-nowrap overflow-hidden text-ellipsis">{el.userInfo}</Text>
                          </Flex>
                        );
                      })}
                  </Flex>
                </Flex>
              </Flex>
            );
          })}
        {/*************************** BUTTONS ***************************/}
        <Flex
          className="w-full py-3 px-5 gap-4 justify-between items-start h-fit lg:w-full lg:py-3 lg:px-5"
          bg={bgTableHeadColor}
          color={textColor}
        >
          {/*************************** UPDATE ***************************/}
          <Button className="w-1/2" size="md" padding="4" onClick={toggleUpdateUserModal} variant={"accentButton"}>
            {t("Update")}
          </Button>
          <UserInfoModal isOpen={isUpdateModalOpen} onClose={toggleUpdateUserModal} user={user} />

          {/*************************** DELETE ***************************/}
          <Button className="w-1/2" size="md" padding="4" variant={"warningButton"} onClick={toggleDeleteUserModal}>
            {t("Delete Account")}
          </Button>
          <UserDeleteAccountModal isOpen={isDeleteModalOpen} onClose={toggleDeleteUserModal} />
        </Flex>
      </Flex>
    </Flex>
  );
}
