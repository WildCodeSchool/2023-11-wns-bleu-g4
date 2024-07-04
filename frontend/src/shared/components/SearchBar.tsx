import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "next-i18next";
import { useEffect, useRef, useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  variant?: "desktop" | "mobile";
  placeholder: string;
}

export default function SearchBar({ onSearch, placeholder, variant = "desktop" }: SearchBarProps) {
  const { t } = useTranslation("Navbar");
  const [query, setQuery] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(true);

  const handleSearch = () => {
    onSearch(query);
  };

  const handleClearInput = () => {
    setQuery("");
    setIsInputEmpty(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsInputEmpty(e.target.value === "");
  };

  const handleIconClick = () => {
    if (query.trim() !== "") {
      handleSearch();
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      handleClearInput();
      firstField.current?.focus();
    }
  }, [isOpen]);

  if (variant === "desktop") {
    return (
      <Flex
        position="relative"
        align="center"
        justify={{ base: "center", md: "end" }}
        width={{ base: "full", md: "50%" }}
      >
        <div className="relative flex items-center justify-center">
          <input
            type="search"
            placeholder={placeholder}
            className=" flex h-8 items-center rounded-full border-b-2 border-accent px-4 py-1 pr-20 text-base 
					focus:border-2 focus:border-accent focus:outline-none sm:bg-white 
					md:bg-neutral-100/20 [&::-webkit-search-cancel-button]:hidden"
            value={query}
            onChange={handleInputChange}
            onKeyDown={e => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          {!isInputEmpty && (
            <div
              className="absolute right-11 top-1/2 -translate-y-1/2 transform cursor-pointer"
              onClick={handleClearInput}
            >
              <XMarkIcon className="dark h-4 w-4" />
            </div>
          )}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer" onClick={handleIconClick}>
            <MagnifyingGlassIcon className="dark h-4 w-4" />
          </div>
        </div>
      </Flex>
    );
  } else if (variant === "mobile") {
    return (
      <Flex
        position="relative"
        align="center"
        justify={{ base: "center", md: "end" }}
        width={{ base: "full", md: "50%" }}
      >
        <IconButton
          bg={"transparent"}
          aria-label="Search button"
          icon={<MagnifyingGlassIcon width={24} />}
          size={"sm"}
          onClick={onOpen}
        />
        <Drawer
          variant="searchBarDrawer"
          size="full"
          placement="bottom"
          onClose={onClose}
          isOpen={isOpen}
          initialFocusRef={firstField}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">
              {t("Search a product")}
              <IconButton
                aria-label="Close drawer"
                icon={<XMarkIcon />}
                size={"sm"}
                onClick={onClose}
                position="absolute"
                right="8px"
                top="8px"
              />
            </DrawerHeader>
            <DrawerBody>
              <div className="relative flex items-center justify-center">
                <input
                  type="search"
                  placeholder={placeholder}
                  className="flex h-8 w-full items-center rounded-full border-b-2 border-accent
                   px-4 py-1 pr-20 text-base focus:border-2 focus:border-accent focus:outline-none
                    sm:bg-white md:bg-neutral-100/20 [&::-webkit-search-cancel-button]:hidden"
                  value={query}
                  onChange={handleInputChange}
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  onClick={onOpen}
                  ref={firstField}
                />
                {!isInputEmpty && (
                  <div
                    className="absolute right-11 top-1/2 -translate-y-1/2 transform cursor-pointer
                     sm:right-8 md:right-14"
                    onClick={handleClearInput}
                  >
                    <XMarkIcon className="dark h-4 w-4" />
                  </div>
                )}
                <div
                  className="absolute right-5 top-1/2 -translate-y-1/2 transform cursor-pointer sm:right-4 md:right-8"
                  onClick={handleIconClick}
                >
                  <MagnifyingGlassIcon className="dark h-4 w-4" />
                </div>
              </div>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    );
  }
}
