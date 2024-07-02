import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon, ShoppingCartIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BasketDrawer } from "./BasketDrawer";

const categories = {
  Sea: ["Option 1", "Option 2", "Option 3"],
  Mountain: ["Option 1", "Option 2", "Option 3"],
  Outdoor: ["Option A", "Option B", "Option C"],
};

export default function SubNavbar() {
  const router = useRouter();
  const { t } = useTranslation("SubNav");
  const { isOpen, onOpen: originalOnOpen, onClose } = useDisclosure();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onOpen = () => {
    if (router.pathname === '/basket') {
      return;
    }
    originalOnOpen();
  };

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const { colorMode } = useColorMode();
  const shadowColor =
    colorMode === "dark"
      ? "0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -2px rgba(255, 255, 255, 0.1)"
      : "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";

  return (
    <Flex
      className="h-8 w-full justify-between px-5 py-8"
      display={{ base: "none", md: "none", xl: "flex" }}
      align={"center"}
      style={{ boxShadow: shadowColor }}
    >
      <Flex gap={2}>
        {Object.entries(categories).map(([category, items], index) => (
          <Menu key={index} isOpen={activeIndex === index} closeOnBlur>
            <MenuButton
              as={Button}
              size="sm"
              variant="subNavButton"
              borderRadius="md"
              borderWidth="1px"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              rightIcon={
                <div
                  className={`transform transition-transform duration-300 ${activeIndex === index ? "rotate-custom" : ""}`}
                  style={{
                    transform: activeIndex === index ? "rotate(-180deg)" : "rotate(0)",
                  }}
                >
                  <ChevronDownIcon width={24} />
                </div>
              }
              py={4}
            >
              {t(category)}
            </MenuButton>
            <MenuList zIndex={100} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
              {items.map((item, i) => (
                <MenuItem key={i}>{item}</MenuItem>
              ))}
            </MenuList>
          </Menu>
        ))}
      </Flex>
      <Spacer />
      <Button
        size="sm"
        onClick={onOpen}
        borderRadius="md"
        borderWidth="1px"
        variant="accentButton"
        leftIcon={<ShoppingCartIcon width={18} />}
      >
        {t("My basket")}
      </Button>
      <BasketDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </Flex>
  );
}
