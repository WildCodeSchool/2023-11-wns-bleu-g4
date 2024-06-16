import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon, ShoppingCartIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const categories = {
  Sea: ["Option 1", "Option 2", "Option 3"],
  Mountain: ["Option 1", "Option 2", "Option 3"],
  Outdoor: ["Option A", "Option B", "Option C"],
};

export default function SubNavbar() {
  const { t } = useTranslation("SubNav");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
    onOpen();
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
    onClose();
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
          <Menu key={index} isOpen={isOpen && activeIndex === index} closeOnBlur>
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
                  className={`transform transition-transform duration-300 ${isOpen && activeIndex === index ? "rotate-custom" : ""}`}
                  style={{
                    transform: isOpen && activeIndex === index ? "rotate(-180deg)" : "rotate(0)",
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
        as={Button}
        borderRadius="md"
        borderWidth="1px"
        variant="cartButton"
        leftIcon={<ShoppingCartIcon width={18} />}
        onClick={onOpen}
      >
        {t("My basket")}
      </Button>
      <Drawer size="md" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <form
              id='my-form'
              onSubmit={(e) => {
                e.preventDefault()
                console.log('submitted')
              }}
            >
              <Input name='nickname' placeholder='Type here...' />
            </form>
          </DrawerBody>

          <DrawerFooter>
            <Button type='submit' form='my-form'>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
