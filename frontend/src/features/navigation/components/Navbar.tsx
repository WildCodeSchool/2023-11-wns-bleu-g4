import SearchBar from "@/shared/components/SearchBar";
import ThemeToggle from "@/shared/components/ThemeToggle";
import ThemedLogo from "@/shared/components/ThemedLogo";
import {
  Box,
  Button,
  Collapse,
  Flex,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ArrowLeftStartOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  Bars3BottomRightIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/solid";

import { useLogoutMutation } from "@/graphql/User/generated/Logout.generated";
import { useProfileQuery } from "@/graphql/User/generated/Profile.generated";
import LanguageSwitcher from "@/shared/components/LanguageSwitcher";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import TopNavItems from "./TopNavItems";

import { useEffect, useState } from "react";
import { useBookingData } from "@/context/BookingDataContext";
import { BasketDrawer } from "@/features/navigation/components/BasketDrawer";

function DesktopNavbar() {
  const [t] = useTranslation("Navbar");
  const { data: profileData, refetch, client } = useProfileQuery({ errorPolicy: "ignore" });
  const [logout] = useLogoutMutation();
  const { clearBookingData } = useBookingData();
  const router = useRouter();
  const isLight = useColorModeValue("bgLight", "bgDark");

  const [isLogged, setIsLogged] = useState(Boolean(profileData?.profile));

  useEffect(() => {
    setIsLogged(Boolean(profileData?.profile));
  }, [profileData]);

  const handleLogout = async () => {
    await router.push("/login");
    clearBookingData();
    await logout();
    await client.resetStore();
    await refetch();
    setIsLogged(false);
  };

  const goToAccount = () => {
    try {
      router.push(`/account`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex display={{ base: "none", md: "none", xl: "flex" }} backgroundColor={isLight}>
      <nav className="inline-flex h-16 w-full justify-between border-b border-zinc-300 px-5">
        <ul className="flex w-full items-center justify-start gap-8">
          <div className="flex grow">
            <Link href="/">
              <ThemedLogo />
            </Link>
          </div>

          <SearchBar placeholder={t("Search")} />

          <li>
            {isLogged ? (
              <Menu>
                <MenuButton
                  as={Button}
                  size="sm"
                  leftIcon={<UserCircleIcon width={20} />}
                  variant="primaryButton"
                  alignItems={"center"}
                >
                  {profileData?.profile.firstname}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={goToAccount}>{t("My Account")}</MenuItem>
                  {profileData?.profile.role === "admin" && (
                    <MenuItem onClick={() => router.push("/admin")}>{t("Admin Panel")}</MenuItem>
                  )}
                  <MenuItem>{t("Payments")} </MenuItem>
                  <MenuDivider />
                  <MenuItem icon={<ArrowLeftStartOnRectangleIcon width={24} />} onClick={handleLogout}>
                    {t("Logout")}
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                variant="primaryButton"
                size="sm"
                leftIcon={<UserCircleIcon width={20} />}
                onClick={() => router.push("/login")}
              >
                {t("Login")}
              </Button>
            )}
          </li>
          <ThemeToggle />
          <LanguageSwitcher />
        </ul>
      </nav>
    </Flex>
  );
}

function MobileNavbar() {
  const { isOpen: isMenuOpen, onToggle: onToggleMenu, onClose: onCloseMenu } = useDisclosure();
  const { isOpen: isProfileOpen, onToggle: onToggleProfile, onClose: onCloseProfile } = useDisclosure();
  const { isOpen: isBasketOpen, onOpen: onOpenBasket, onClose: onCloseBasket } = useDisclosure();
  const bg = useColorModeValue("white", "#3B3B3B");
  const textColor = useColorModeValue("black", "white");
  const [t] = useTranslation("Navbar");
  const { data: profileData, refetch, client } = useProfileQuery({ errorPolicy: "ignore" });
  const [logout] = useLogoutMutation();
  const router = useRouter();
  const { bookingData, clearBookingData } = useBookingData();
  const itemCount = bookingData ? bookingData.length : 0;

  const [isLogged, setIsLogged] = useState(Boolean(profileData?.profile));

  useEffect(() => {
    setIsLogged(Boolean(profileData?.profile));
  }, [profileData]);

  const handleLogout = async () => {
    await router.push("/login");
    clearBookingData();
    await logout();
    await client.resetStore();
    await refetch();
    setIsLogged(false);
  };

  const goToAccount = () => {
    try {
      router.push(`/account`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Flex
        display={{ base: "flex", sm: "flex", md: "flex", lg: "flex", xl: "none" }}
        direction="column"
        px={4}
        position="relative"
        borderBottom={"1px solid #E2E8F0"}
      >
        <Flex dir={"row"} align={"center"}>
          <Link href="/">
            <ThemedLogo />
          </Link>
          <Spacer />
          <Flex gap={2} align={"center"}>
            <SearchBar variant="mobile" placeholder={t("Search")} />
            {isLogged ? (
              <>
                <IconButton
                  bg={"transparent"}
                  aria-label="Profil button"
                  icon={<UserCircleIcon width={24} />}
                  size={"sm"}
                  onClick={onToggleProfile}
                />
                <Collapse in={isProfileOpen} className="absolute left-0 top-[3.8rem] z-10 w-full">
                  <Box bg={bg} p={4} rounded="md" shadow="md" mt={2}>
                    <Button onClick={goToAccount} w="full" mb={2}>
                      {t("My Account")}
                    </Button>
                    {profileData?.profile.role === "admin" && (
                      <Button onClick={() => router.push("/admin")} w="full" mb={2}>
                        {t("Admin Panel")}
                      </Button>
                    )}
                    <Button w="full" mb={2}>
                      {t("Payments")}
                    </Button>
                    <Button leftIcon={<ArrowLeftStartOnRectangleIcon width={24} />} onClick={handleLogout} w="full">
                      {t("Logout")}
                    </Button>
                  </Box>
                </Collapse>
              </>
            ) : (
              <IconButton
                bg={"transparent"}
                aria-label="Login button"
                size="sm"
                icon={<ArrowRightEndOnRectangleIcon width={24} />}
                onClick={() => router.push("/login")}
              />
            )}
            <IconButton
              bg={"transparent"}
              aria-label="Cart button"
              icon={<ShoppingCartIcon width={24} style={{ fill: itemCount > 0 ? "#E66300" : "black" }} />}
              size={"sm"}
              onClick={onOpenBasket}
            />
            <BasketDrawer isOpen={isBasketOpen} onClose={onCloseBasket} onOpen={onOpenBasket} />
            <IconButton
              aria-label="Open Menu"
              icon={isMenuOpen ? <XMarkIcon width={24} /> : <Bars3BottomRightIcon width={24} />}
              onClick={onToggleMenu}
              size={"sm"}
            />
          </Flex>
        </Flex>
      </Flex>

      <Collapse in={isMenuOpen} className="absolute left-0 top-[3.8rem] z-10 w-full">
        <Box width="100%" bg={bg} color={textColor} mt="14px" pt={0} display={{ xl: "none" }}>
          <TopNavItems />
          <Flex justifyContent="center" alignItems="center" py={4}>
            <ThemeToggle />
          </Flex>
        </Box>
      </Collapse>
    </Box>
  );
}

export default function Navbar() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
}
