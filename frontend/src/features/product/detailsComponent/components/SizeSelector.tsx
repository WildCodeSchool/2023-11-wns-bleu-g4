import { Button, ButtonGroup, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function SizeSelector({
  availableSizes,
  selectedSize,
  setSelectedSize,
}: {
  availableSizes: string[];
  selectedSize: string | null;
  setSelectedSize: (size: string | null) => void;
}) {
  const { t } = useTranslation("productDetails");

  const allStringSizes = ["S", "M", "L", "XL", "XXL"];
  const allNumberSizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"];

  const renderSizeButtons = (allSizes: string[], availableSizes: string[]) => {
    return allSizes.map(size => {
      const isAvailable = availableSizes.includes(size);
      return (
        <Button
          variant="sizeButton"
          key={size}
          onClick={() => setSelectedSize(size)}
          isActive={selectedSize === size}
          colorScheme="blue"
          m={0}
          isDisabled={!isAvailable}
        >
          {size}
        </Button>
      );
    });
  };

  let sizeButtons = null;

  if (availableSizes.length > 0) {
    if (allStringSizes.includes(availableSizes[0])) {
      sizeButtons = renderSizeButtons(allStringSizes, availableSizes);
    } else {
      sizeButtons = renderSizeButtons(allNumberSizes, availableSizes);
    }
  } else {
    sizeButtons = <Text>{t("Please select an agency to see available sizes")}</Text>;
  }

  return (
    <ButtonGroup gap="4" flexWrap="wrap" justifyContent="left" m={0} marginTop="10px">
      {sizeButtons}
    </ButtonGroup>
  );
}
