import { useBookingData } from "@/context/BookingDataContext";
import { useProductContext } from "@/context/ProductPageContext";
import { Product } from "@/graphql/generated/schema";
import { Button, Flex } from "@chakra-ui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

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

export default function AddToBasketButton() {
  const { t } = useTranslation("AddToBasketButton");
  const { updateBookingData } = useBookingData();
  const { state: { selectedProduct, selectedAgency, startDate, endDate, quantity, selectedSize, totalPrice } }
    = useProductContext();

  const handleAddToBasket = () => {
    if (!selectedProduct || !selectedAgency || !startDate || !endDate || !quantity || !selectedSize) {
      return;
    }

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
