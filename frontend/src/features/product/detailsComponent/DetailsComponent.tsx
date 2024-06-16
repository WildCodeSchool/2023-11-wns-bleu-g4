import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Agency, Product } from "../ProductPage";
import { useCreateBookingMutation } from "@/graphql/Booking/generated/createBooking.generated";
import { StatusBooking } from "@/graphql/generated/schema";
import AddToBasketButton from "./components/AddToBasketButton";
import DateSelector from "./components/DateSelector";
import ProductDescription from "./components/ProductDescription";
import ProductHeader from "./components/ProductHeader";
import ProductPricing from "./components/ProductPricing";
import SizeSelector from "./components/SizeSelector";
import { useAuth } from "@/hooks/useAuth";

export default function DetailsComponent({ agencies, product, productId }: DetailsComponentProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedAgency, setSelectedAgency] = useState<number | null>(null);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const { t } = useTranslation("productDetails");
  const [createBooking] = useCreateBookingMutation();
  const isLoggedIn = useAuth();

  const createBookingMutation = async (startDate: Date | null, endDate: Date | null) => {
    if (!isLoggedIn) {
      console.log("User not authenticated");
      return;
    }

    if (productId !== undefined) {
      try {
        const currentDate = new Date().toISOString();
        const response = await createBooking({
          variables: {
            data: {
              agency: {
                id: 1, // Remplacez par l'id correct de l'agence
              },
              bookingDate: currentDate,
              startDate: "2024-06-18T10:15:30.000Z", // Convertissez en format ISO string si startDate est défini
              endDate: "2024-06-18T10:15:30.000Z", // Convertissez en format ISO string si endDate est défini
              invoice: "123",
              productCodeId: null,
              productId: 1,
              status: "BOOKED" as StatusBooking, // Assurez-vous que le status est correctement défini
              user: {
                id: 1, // Remplacez par l'id correct de l'utilisateur
              },
              quantity: 1, // Assurez-vous que quantity est correctement défini
              size: "M", // Assurez-vous que size est correctement défini
            },
          },
        });

        console.log("Booking created", response);
      } catch (error) {
        console.error("Error creating booking", error);
      }
    } else {
      console.error("productId is undefined");
    }
  };

  // Filtrer les tailles disponibles en fonction de l'agence sélectionnée
  const filterAvailableSizes = (agencyId: number | null) => {
    if (agencyId !== null) {
      const selectedAgencyData = agencies?.find((agency) => agency.id === agencyId);
      const sizes = selectedAgencyData?.productCodes
        ?.map((productCode) => productCode.size)
        .filter((size): size is string => size !== null && size !== undefined)
        .map((size) => size.toUpperCase());
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

  // Gérer le changement de date
  const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    createBookingMutation(startDate, endDate);
  };

  // Gérer l'ajout au panier
  const handleAddToBasket = () => {
    createBookingMutation(null, null);
  };

  if (!product || !agencies) {
    return <p>Loading...</p>;
  }

  return (
    <Flex w="40%" flexDirection="column" gap="10px">
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
      <AddToBasketButton onAddToBasket={handleAddToBasket} />
    </Flex>
  );
}

interface DetailsComponentProps {
  agencies?: Agency[];
  product?: Product;
  productId: number; // Assurez-vous que productId est de type number
}
