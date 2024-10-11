import React, { useState, useEffect } from "react";
import { SortProduct } from "@/graphql/generated/schema";
import { Button, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Flex, Input } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface TopFiltersProps {
  selectedSort: SortProduct | null;
  onSortChange: (sortOption: SortProduct | null) => void;
  onSearchChange: (searchQuery: string) => void;
  initialSearchQuery?: string;
}

export default function TopFilters({
  selectedSort,
  onSortChange,
  onSearchChange,
  initialSearchQuery = "",
}: TopFiltersProps) {
  const [localSort, setLocalSort] = useState<SortProduct | null>(selectedSort);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const { t } = useTranslation("TopFilters");

  useEffect(() => {
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  const handleSortChange = (sortOption: SortProduct) => {
    if (sortOption === localSort) {
      setLocalSort(null);
      onSortChange(null);
    } else {
      setLocalSort(sortOption);
      onSortChange(sortOption);
    }
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearchChange(searchQuery);
  };

  const selectedSortText =
    localSort === SortProduct.Asc ? t("Ascending price") : localSort === SortProduct.Desc ? t("Descending price") : "";

  const SortTitle: string = t("Sort by");

  return (
    <Flex alignItems="center" justifyContent="flex-end" width="100%">
      <Menu closeOnSelect={true}>
        <MenuButton as={Button} variant="primaryButton">
          {t("Sort by")} {selectedSortText && `: ${selectedSortText}`}
        </MenuButton>
        <MenuList minWidth="240px">
          <MenuOptionGroup defaultValue={localSort ?? "asc"} title={SortTitle} type="radio">
            <MenuItemOption
              value={SortProduct.Asc}
              onClick={() => handleSortChange(SortProduct.Asc)}
              isChecked={localSort === SortProduct.Asc}
            >
              {t("Ascending price")}
            </MenuItemOption>
            <MenuItemOption
              value={SortProduct.Desc}
              onClick={() => handleSortChange(SortProduct.Desc)}
              isChecked={localSort === SortProduct.Desc}
            >
              {t("Descending price")}
            </MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
}
