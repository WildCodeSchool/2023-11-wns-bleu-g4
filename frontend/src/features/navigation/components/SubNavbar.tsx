import { useGetAllParentCategoryQuery } from "@/graphql/ParentCategory/generated/GetAllParentCategory.generated";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon, ShoppingCartIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/router";
import qs from "query-string";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BasketDrawer } from "./BasketDrawer";
import { useBookingData } from "@/context/BookingDataContext";

export default function SubNavbar() {
  const router = useRouter();
  const { t } = useTranslation("SubNav");
  const { isOpen, onOpen: originalOnOpen, onClose } = useDisclosure();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isLight = useColorModeValue("bgLight", "bgDark");
  const { bookingData } = useBookingData();
  const [itemCount, setItemCount] = useState(0);

  const onOpen = () => {
    if (router.pathname === "/basket") {
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

  const { data: categoriesData } = useGetAllParentCategoryQuery();

  const [search, setSearch] = useState("");
  const searchParams = qs.parse(window.location.search);

  useEffect(() => {
    if (typeof router.query.name === "string") {
      setSearch(router.query.name);
    }
  }, [router.query.name]);

  useEffect(() => {
    setItemCount(bookingData.length);
  }, [bookingData]);

  return (
    <Flex
      className="h-8 w-full justify-between px-5 py-8"
      display={{ base: "none", md: "none", xl: "flex" }}
      align={"center"}
      style={{ boxShadow: shadowColor }}
      backgroundColor={isLight}
    >
      <Flex gap={2}>
        {categoriesData?.getAllParentCategories.map((category, index) => (
          <Menu key={index} isOpen={activeIndex === index} closeOnBlur>
            <MenuButton
              as={Button}
              data-testid="category"
              size="sm"
              variant="subNavButton"
              borderRadius="md"
              borderWidth="1px"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              rightIcon={
                <div
                  className={`transform transition-transform duration-300 ${
                    activeIndex === index ? "rotate-custom" : ""
                  }`}
                  style={{
                    transform: activeIndex === index ? "rotate(-180deg)" : "rotate(0)",
                  }}
                >
                  <ChevronDownIcon width={24} />
                </div>
              }
              py={4}
            >
              {t(category.name)}
            </MenuButton>
            <MenuList zIndex={100} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
              {category.categories.map(subCat => {
                const [firstLetter, ...restOfSubCatName] = subCat.name.split("");
                const subCatName = firstLetter.toUpperCase() + restOfSubCatName.join("");
                const isActive = router.query.categoryId === subCat.id.toString();

                return (
                  <MenuItem
                    data-testid="subCategory"
                    onClick={() => {
                      router.push(
                        `/products?${qs.stringify({
                          ...searchParams,
                          categoryId: subCat.id,
                          page: 1,
                        })}`,
                      );
                    }}
                    key={subCat.id}
                  >
                    {subCatName}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        ))}
      </Flex>
      <Spacer />
      <Button
        data-testid={"basket"}
        size="sm"
        onClick={onOpen}
        borderRadius="md"
        borderWidth="1px"
        variant="accentButton"
        leftIcon={<ShoppingCartIcon width={18} />}
      >
        {t("My basket")} {itemCount > 0 && `(${itemCount})`}
      </Button>
      <BasketDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </Flex>
  );
}
