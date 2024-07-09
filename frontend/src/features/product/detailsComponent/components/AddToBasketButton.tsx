import React from "react";
import {useBookingData} from "@/context/BookingDataContext";
import {useProductContext} from "@/context/ProductPageContext";
import {Product} from "@/graphql/generated/schema";
import {Button, Flex, Text} from "@chakra-ui/react";
import {ShoppingCartIcon} from "@heroicons/react/24/outline";
import {useTranslation} from "react-i18next";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    const {t} = useTranslation("AddToBasketButton");
    const {updateBookingData} = useBookingData();
    const {
        state: {
            selectedProduct,
            selectedAgency,
            startDate,
            endDate,
            quantity,
            selectedSize,
            totalPrice
        }
    } = useProductContext();

    const handleAddToBasket = () => {
        let missingFields = [];
        if (!selectedProduct) missingFields.push(t("Product need to be selected"));
        if (!selectedAgency) missingFields.push(t("Agency need to be selected"));
        if (!startDate) missingFields.push(t("Start date need to be selected"));
        if (!endDate) missingFields.push(t("End date need to be selected"));
        if (!quantity) missingFields.push(t("Quantity need to be selected"));
        if (!selectedSize) missingFields.push(t("Size need to be selected"));

        if (missingFields.length > 0) {
            toast.error(
                <Flex flexDirection="column" gap={2} p={2}>
                    <Text fontWeight="bold" fontSize="lg">
                        {t("Please make sure all fields are filled out :")}
                    </Text>
                    <ul>
                        {missingFields.map(field => (
                            <li key={field}>- {field}</li>
                        ))}
                    </ul>
                </Flex>,
            );
            return;
        }

        const newBookingData: BookingData = {
            profileData: {name: "", email: ""},
            selectedAgency,
            startDate,
            endDate,
            product: selectedProduct,
            quantity,
            selectedSize,
            totalPrice,
        };

        console.log(newBookingData);

        updateBookingData(newBookingData);
        toast.success(t("The product has been added to your basket."),
        );
    };

    return (
        <Flex justifyContent="center">
            <Button
                onClick={handleAddToBasket}
                h={54}
                rightIcon={<ShoppingCartIcon width={24}/>}
                variant={"accentButton"}
                size="lg"
                width="100%"
            >
                {t("Add to basket")}
            </Button>
            <ToastContainer
                stacked={true}
                theme={"colored"}
            />
        </Flex>
    );
}
