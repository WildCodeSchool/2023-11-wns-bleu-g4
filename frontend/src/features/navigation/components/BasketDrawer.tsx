import { useBookingData } from "@/context/BookingDataContext";
import { useGetProductsDetailsQuery } from "@/graphql/Product/generated/getProductsDetails.generated";
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";

interface BasketDrawerProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const BasketDrawer: React.FC<BasketDrawerProps> = ({ isOpen, onOpen, onClose }) => {
  const { t } = useTranslation("BasketDrawer");
  const { bookingData, removeBookingData } = useBookingData();
  const { data: productData } = useGetProductsDetailsQuery();
  const router = useRouter();
  const colorScheme = useColorModeValue("#fff", "#0B0F0B");

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent bg={colorScheme}>
        <DrawerCloseButton />
        <DrawerHeader>{t("Your basket")}</DrawerHeader>
        <Divider />

        <DrawerBody>
          {bookingData && bookingData.length > 0 ? (
            bookingData.map((data, index) => {
              const product = productData?.getAllProducts.products.find(p => p.id === data.product?.id);
              return (
                <Flex key={index} flexDirection="column" gap={10}>
                  <Flex justifyContent="space-around" mt={10} gap={4} alignItems="center">
                    {product && <Image w="20%" h="20%" src={product.thumbnail} alt={product.name} />}
                    <Flex justifyContent="center" flexDirection="column" gap={2}>
                      {product && (
                        <Box display="flex" className="flex-wrap">
                          <Text fontWeight="bold" mr={2}>
                            {t("Product :")}
                          </Text>
                          <Text>{product.name}</Text>
                        </Box>
                      )}
                      {data.quantity && (
                        <Box display="flex">
                          <Text fontWeight="bold" mr={2}>
                            {t("Quantity :")}
                          </Text>
                          <Text>{data.quantity}</Text>
                        </Box>
                      )}
                      {data.selectedSize && (
                        <Box display="flex">
                          <Text fontWeight="bold" mr={2}>
                            {t("Size :")}
                          </Text>
                          <Text>{data.selectedSize}</Text>
                        </Box>
                      )}
                      {data.startDate && (
                        <Box display="flex">
                          <Text fontWeight="bold" mr={2}>
                            {t("Start date :")}
                          </Text>
                          <Text>{data.startDate.toLocaleDateString()}</Text>
                        </Box>
                      )}
                      {data.endDate && (
                        <Box display="flex">
                          <Text fontWeight="bold" mr={2}>
                            {t("End date :")}
                          </Text>
                          <Text>{data.endDate.toLocaleDateString()}</Text>
                        </Box>
                      )}
                      {data.totalPrice && (
                        <Box display="flex">
                          <Text fontWeight="bold" mr={2}>
                            {"Total price :"}
                          </Text>
                          <Text>{parseFloat(data.totalPrice.toFixed(2))} €</Text>
                        </Box>
                      )}
                    </Flex>
                  </Flex>
                  <Flex justifyContent="space-between" gap={5}>
                    <Button
                      variant="primaryButton"
                      // onClick={() => removeBookingData(index)}
                      aria-label="Edit"
                      leftIcon={<PencilSquareIcon width={24} />}
                      w="100%"
                    >
                      {t("Edit")}
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => removeBookingData(index)}
                      aria-label={t("Delete")}
                      leftIcon={<TrashIcon width={24} />}
                      w="100%"
                    >
                      {t("Delete")}
                    </Button>
                  </Flex>
                  <Divider />
                  <Button
                    onClick={() => router.push("/basket")}
                    isDisabled={!bookingData || bookingData.length === 0}
                    variant="accentButton"
                  >
                    {t("Go to basket")}
                  </Button>
                </Flex>
              );
            })
          ) : (
            <Text>{t("Your basket is empty")}</Text>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
