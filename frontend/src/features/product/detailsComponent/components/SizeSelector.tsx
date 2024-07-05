import { useProductContext } from "@/context/ProductPageContext";
import { Button, ButtonGroup, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function SizeSelector() {
  const { availableSizes, selectedSize, setSelectedSize } = useProductContext();
  const { t } = useTranslation("productDetails");

  const allStringSizes = ["S", "M", "L", "XL", "XXL"];
  const allNumberSizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"];

  const renderSizeButtons = (allSizes: any[], availableSizes: string | any[]) => {
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

  if (availableSizes.length === 0) {
    sizeButtons = <Text>{t("Please select an agency to see available sizes")}</Text>;
  } else {
    const isStringSize = allStringSizes.includes(availableSizes[0]);
    const allSizes = isStringSize ? allStringSizes : allNumberSizes;
    sizeButtons = renderSizeButtons(allSizes, availableSizes);
  }

  return (
    <ButtonGroup gap="4" flexWrap="wrap" justifyContent="left" m={0} marginTop="10px">
      {sizeButtons}
    </ButtonGroup>
  );
}
