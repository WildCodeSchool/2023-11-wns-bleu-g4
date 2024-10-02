import { SortProduct } from "@/graphql/generated/schema";
import { Button, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup } from "@chakra-ui/react";
import { useState } from "react";

interface TopFiltersProps {
  selectedSort: SortProduct | null;
  onSortChange: (sortOption: SortProduct | null) => void;
}

export default function TopFilters({ selectedSort, onSortChange }: TopFiltersProps) {
  const [localSort, setLocalSort] = useState<SortProduct | null>(selectedSort);

  const handleSortChange = (sortOption: SortProduct) => {
    if (sortOption === localSort) {
      setLocalSort(null);
      onSortChange(null);
    } else {
      setLocalSort(sortOption);
      onSortChange(sortOption);
    }
  };

  // Texte à afficher à côté de "Sort by"
  const selectedSortText =
    localSort === SortProduct.Asc ? "Ascending price" : localSort === SortProduct.Desc ? "Descending price" : "";

  return (
    <Menu closeOnSelect={true}>
      <MenuButton as={Button} variant="primaryButton">
        Sort by {selectedSortText && `: ${selectedSortText}`}
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup defaultValue={localSort ?? "asc"} title="Sort by" type="radio">
          <MenuItemOption
            value={SortProduct.Asc}
            onClick={() => handleSortChange(SortProduct.Asc)}
            isChecked={localSort === SortProduct.Asc}
          >
            Ascending price
          </MenuItemOption>
          <MenuItemOption
            value={SortProduct.Desc}
            onClick={() => handleSortChange(SortProduct.Desc)}
            isChecked={localSort === SortProduct.Desc}
          >
            Descending price
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
