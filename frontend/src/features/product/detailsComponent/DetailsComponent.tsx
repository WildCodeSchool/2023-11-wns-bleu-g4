import AddToBasketButton from "@/features/product/detailsComponent/components/AddToBasketButton";
import DateSelector from "@/features/product/detailsComponent/components/DateSelector";
import ProductDescription from "@/features/product/detailsComponent/components/ProductDescription";
import ProductHeader from "@/features/product/detailsComponent/components/ProductHeader";
import ProductPricing from "@/features/product/detailsComponent/components/ProductPricing";
import SizeSelector from "@/features/product/detailsComponent/components/SizeSelector";
import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Agency, Product } from "../ProductPage";

export default function DetailsComponent({ agencies, product }: DetailsComponentProps) {
  const [selectedSize, setSelectedSize] = useState<string | number | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [selectedAgency, setSelectedAgency] = useState<number | null>(null);
  const [availableSizes, setAvailableSizes] = useState<(string | number)[]>([]);
  const { t } = useTranslation("productDetails");

  const filterAvailableSizes = (agencyId: number | null) => {
    if (agencyId !== null) {
      const selectedAgencyData = agencies?.find(agency => agency.id === agencyId);
      const sizes = selectedAgencyData?.productCodes
        ?.map(productCode => productCode.size)
        .filter((size): size is string | number => size !== null && size !== undefined);
      return sizes || [];
    }
    return [];
  };

  useEffect(() => {
    if (selectedAgency !== null) {
      const sizes = filterAvailableSizes(selectedAgency);
      setAvailableSizes(sizes);
    }
  }, [selectedAgency, agencies]);

  const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
    console.log("Date de début:", startDate);
    console.log("Date de fin:", endDate);
  };

  if (!product || !agencies) {
    return <p>Loading...</p>;
  }

  console.log("selectedSize", selectedSize);

  return (
    <Flex w="50%" flexDirection="column" gap="10px">
      <ProductHeader product={product} />
      <ProductDescription
        product={product}
        agencies={agencies}
        selectedAgency={selectedAgency}
        setSelectedAgency={setSelectedAgency}
        setSelectedSize={setSelectedSize}
      />
      <SizeSelector availableSizes={availableSizes} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
      <ProductPricing product={product} quantity={quantity} setQuantity={setQuantity} />
      <DateSelector handleDateChange={handleDateChange} />
      <AddToBasketButton />
    </Flex>
  );
}

interface DetailsComponentProps {
  agencies?: Agency[];
  product?: Product;
}
