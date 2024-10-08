import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
  Box,
  useOutsideClick,
} from "@chakra-ui/react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import SearchSuggestions from "./SearchSuggestions";
import SearchSuggestionsMobile from "./mobile/SearchSuggestion.mobile";
import { useGetAllProductsQuery, GetAllProductsQuery } from "@/graphql/Product/generated/getAllProducts.generated";

interface SearchBarProps {
  variant?: "desktop" | "mobile";
  placeholder: string;
}

export default function SearchBar({ placeholder, variant = "desktop" }: SearchBarProps) {
  const { t } = useTranslation("Navbar");
  const [query, setQuery] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<GetAllProductsQuery["getAllProducts"]["products"]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef<HTMLInputElement>(null);

  useOutsideClick({
    ref: suggestionsRef,
    handler: () => setShowSuggestions(false),
  });

  const { data } = useGetAllProductsQuery({
    variables: { name: query },
    skip: query.trim() === "",
  });

  useEffect(() => {
    if (data?.getAllProducts?.products) {
      setSuggestions(data.getAllProducts.products.slice(0, 5));
      setShowSuggestions(true);
    }
  }, [data]);

  const handleSearch = () => {
    if (query.trim() !== "") {
      router.push({
        pathname: "/shop",
        query: { search: query },
      });
      setShowSuggestions(false);
      if (variant === "mobile") {
        onClose();
      }
    }
  };

  const handleClearInput = () => {
    setQuery("");
    setIsInputEmpty(true);
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsInputEmpty(value === "");
    if (value.trim() !== "") {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (productId: number) => {
    setShowSuggestions(false);

    router
      .push(`/products/${productId}`)
      .then(() => {
        if (variant === "mobile") {
          onClose();
        }
      })
      .catch(err => {
        console.error("Navigation error:", err);
      });
  };

  const renderSearchInput = () => (
    <div className="relative flex items-center justify-center" ref={inputRef}>
      <input
        type="search"
        placeholder={placeholder}
        className="flex h-8 w-full items-center rounded-full border-b-2 border-accent px-4 py-1 pr-20 text-base
        focus:border-2 focus:border-accent focus:outline-none sm:bg-white
        md:bg-neutral-100/20 [&::-webkit-search-cancel-button]:hidden"
        value={query}
        onChange={handleInputChange}
        onKeyDown={e => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        ref={firstField}
      />
      {!isInputEmpty && (
        <div className="absolute right-11 top-1/2 -translate-y-1/2 transform cursor-pointer" onClick={handleClearInput}>
          <XMarkIcon className="h-4 w-4" />
        </div>
      )}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer" onClick={handleSearch}>
        <MagnifyingGlassIcon className="h-4 w-4" />
      </div>
    </div>
  );

  if (variant === "desktop") {
    return (
      <Flex
        position="relative"
        align="center"
        justify={{ base: "center", md: "end" }}
        width={{ base: "full", md: "50%" }}
        zIndex={4}
      >
        {renderSearchInput()}
        {showSuggestions && (
          <Box
            ref={suggestionsRef}
            position="absolute"
            top="100%"
            right={0}
            zIndex={1}
            width={inputRef.current?.offsetWidth || "auto"}
          >
            <SearchSuggestions suggestions={suggestions} onSuggestionClick={handleSuggestionClick} />
          </Box>
        )}
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
          bg="transparent"
          aria-label="Search button"
          icon={<MagnifyingGlassIcon width={24} />}
          size="sm"
          onClick={onOpen}
        />
        <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} finalFocusRef={firstField}>
          <DrawerOverlay />
          <DrawerContent height="80vh" maxHeight="80vh" overflowY="auto" position="relative">
            <DrawerHeader borderBottomWidth="1px">
              {t("Search a product")}
              <IconButton
                aria-label="Close drawer"
                icon={<XMarkIcon width={24} />}
                size="sm"
                onClick={onClose}
                position="absolute"
                right="8px"
                top="8px"
              />
            </DrawerHeader>
            <DrawerBody zIndex="99">
              {renderSearchInput()}
              {showSuggestions && (
                <Box ref={suggestionsRef}>
                  <SearchSuggestionsMobile suggestions={suggestions} onSuggestionClick={handleSuggestionClick} />
                </Box>
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    );
  }
}
