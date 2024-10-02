import { useBookingData } from "@/context/BookingDataContext";
import { useProductContext } from "@/context/ProductPageContext";
import { Product } from "@/graphql/generated/schema";
import { Button, Flex, Text } from "@chakra-ui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCheckProductAvailabilityLazyQuery } from "@/graphql/ProductCode/generated/checkProductAvailability.generated";

interface BookingData {
  profileData: {
    name: string;
    email: string;
  };
  selectedAgency: number | null;
  startDate: Date | null;
  endDate: Date | null;
  product: Product | undefined;
  quantity: number;
  selectedSize: string | null;
  totalPrice: number;
}

interface AddToBasketButtonProps {
  triggerReload: () => void;
}

export default function AddToBasketButton({ triggerReload }: AddToBasketButtonProps) {
  const { t } = useTranslation("AddToBasketButton");
  const { updateBookingData, bookingData } = useBookingData();
  const {
    state: { selectedProduct, selectedAgency, startDate, endDate, quantity, selectedSize, totalPrice, isSizeable },
  } = useProductContext();

  const [checkProductAvailability] = useCheckProductAvailabilityLazyQuery();
  const [isProductAdded, setIsProductAdded] = useState(false);

  useEffect(() => {
    setIsProductAdded(false);
  }, [selectedProduct, selectedAgency, startDate, endDate, quantity, selectedSize]);

  const handleAddToBasket = async () => {
    let missingFields = [];
    if (!selectedProduct) missingFields.push(t("Product need to be selected"));
    if (!selectedAgency) missingFields.push(t("Agency need to be selected"));
    if (!quantity) missingFields.push(t("Quantity need to be selected"));
    if (!startDate) missingFields.push(t("Start date need to be selected"));
    if (!endDate) missingFields.push(t("End date need to be selected"));
    if (isSizeable && !selectedSize) {
      missingFields.push(t("Size need to be selected"));
    }

    if (missingFields.length > 0) {
      const errorMessage = (
        <>
          <Text fontWeight="bold" fontSize="lg">
            {t("Please make sure all fields are filled out :")}
          </Text>
          <ul>
            {missingFields.map(field => (
              <li key={field}>- {field}</li>
            ))}
          </ul>
        </>
      );

      toast.error(errorMessage);
      return;
    }

    if (isProductAdded) {
      toast.info(t("This product is already in your basket with the selected options."));
      return;
    }

    const { data } = await checkProductAvailability({
      variables: {
        agencyId: selectedAgency!,
        productId: selectedProduct!.id,
        startDate: startDate!.toISOString(),
        endDate: endDate!.toISOString(),
        quantity,
        size: selectedSize,
      },
    });

    if (data?.checkProductAvailability) {
      const newBookingData: BookingData = {
        profileData: { name: "", email: "" },
        selectedAgency,
        startDate,
        endDate,
        product: selectedProduct,
        quantity,
        selectedSize,
        totalPrice,
      };

      updateBookingData(newBookingData);
      setIsProductAdded(true);
      triggerReload();
      toast.success(t("Product added to basket successfully!"));
    } else {
      toast.error(t("The product is already booked for the selected dates."));
    }
  };

  return (
    <Flex justifyContent="center">
      <Button
        onClick={handleAddToBasket}
        h={54}
        rightIcon={<ShoppingCartIcon width={24} />}
        variant={"accentButton"}
        size="lg"
        width="100%"
      >
        {t("Add to basket")}
      </Button>
    </Flex>
  );
}
