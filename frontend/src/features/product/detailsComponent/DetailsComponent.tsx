import { useProductContext } from "@/context/ProductPageContext";
import { Flex } from "@chakra-ui/react";
import AddToBasketButton from "./components/AddToBasketButton";
import DateSelector from "./components/DateSelector";
import ProductCharacteristic from "./components/ProductCharacteristic";
import ProductDescription from "./components/ProductDescription";
import ProductHeader from "./components/ProductHeader";
import ProductPricing from "./components/ProductPricing";
import SizeSelector from "./components/SizeSelector";

export default function DetailsComponent() {
  const { selectedProduct, agencies } = useProductContext();

  if (!selectedProduct || !agencies) {
    return <p>Loading...</p>;
  }

  return (
    <Flex w="40%" flexDirection="column" gap="10px">
      <ProductHeader />
      <ProductDescription />
      <SizeSelector />
      <ProductPricing />
      <DateSelector />
      <AddToBasketButton />
      <ProductCharacteristic />
    </Flex>
  );
}
