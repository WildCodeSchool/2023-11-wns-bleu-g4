import React, {useState} from "react";
import {useProductContext} from "@/context/ProductPageContext";
import {Flex} from "@chakra-ui/react";
import AddToBasketButton from "./components/AddToBasketButton";
import DateSelector from "./components/DateSelector";
import ProductCharacteristic from "./components/ProductCharacteristic";
import ProductDescription from "./components/ProductDescription";
import ProductHeader from "./components/ProductHeader";
import ProductPricing from "./components/ProductPricing";
import SizeSelector from "./components/SizeSelector";
import {useGetAllAgenciesQuery} from "@/graphql/Agency/generated/getAllAgency.generated";

export default function DetailsComponent() {
  const {state} = useProductContext();
  const {selectedProduct, agencies, isSizeable} = state;

  const [key, setKey] = useState(0);
  const {data: agenciesData, loading: agenciesLoading, error: agenciesError} = useGetAllAgenciesQuery();

  const triggerReload = () => {
    setKey(prevKey => prevKey + 1);
  };

  if (!selectedProduct || !agencies || !agenciesData || agenciesLoading || agenciesError) {
    return <p>Loading...</p>;
  }

  return (
    <Flex key={key} w={{base: "100%", xl: "40%"}} flexDirection="column" gap="10px">
      <ProductHeader/>
      <ProductDescription/>
      <SizeSelector/>
      <ProductPricing/>
      <DateSelector/>
      <AddToBasketButton triggerReload={triggerReload}/>
      <ProductCharacteristic/>
    </Flex>
  );
}
