import { useBookingData } from "@/context/BookingDataContext";
import { useProductContext } from "@/context/ProductPageContext";
import { useBookingMutation } from "@/features/product/detailsComponent/useBookingMutation";
import { useProfileQuery } from "@/graphql/User/generated/Profile.generated";
import Layout from "@/layouts/Layout";
import { Box, Button, Divider, Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function BasketPage() {
  const { t } = useTranslation("BasketPage");
  const { bookingData, removeBookingData } = useBookingData();
  const {
    state: { agencies },
  } = useProductContext();
  const { performBookingMutation } = useBookingMutation();
  const { data: profileData } = useProfileQuery();
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const router = useRouter();

  const handleBooking = async () => {
    if (!bookingData || bookingData.length === 0) {
      toast.error("Your basket is empty.");
      return;
    }

    if (!profileData || !profileData.profile) {
      router.push("/login");
      return;
    }

    try {
      setBookingInProgress(true);

      const reservations = bookingData.map(data => ({
        product: data.product,
        selectedAgency: data.selectedAgency as number | null,
        selectedSize: data.selectedSize ?? null,
        quantity: data.quantity || 0,
        startDate: data.startDate || null,
        endDate: data.endDate ?? null,
      }));

      await performBookingMutation({
        profileData: profileData,
        profileLoading: false,
        profileError: null,
        reservations: reservations,
      });

      bookingData.forEach((_, index) => removeBookingData(index));
    } catch (error) {
      toast.error("An error occured while booking");
    } finally {
      setBookingInProgress(false);
    }
  };

  useEffect(() => {
    // console.log("bookingData:", bookingData);
  }, [bookingData]);

  return (
    <Layout>
      {bookingData && bookingData.length > 0 ? (
        <>
          {bookingData.map((data, index) => {
            const { product, selectedAgency, selectedSize, quantity, startDate, endDate, totalPrice } = data;
            const agency = agencies.find(a => a.id === selectedAgency);

            return (
              <Box className="px-5 lg:px-24" key={index} mb={4}>
                <Flex align="center" justifyContent="space-between" className="flex-col xl:flex-row" gap={8}>
                  {product && <Image w={100} src={product.thumbnail} alt={product.name} />}
                  <Flex
                    align="flex-start"
                    justifyContent="space-around"
                    className="flex-col xl:flex-row"
                    w="100%"
                    fontSize={18}
                    fontWeight={500}
                    gap={2}
                  >
                    <Flex flexDirection="column" gap={2}>
                      {product && (
                        <Text>
                          <strong>{t("Product :")}</strong> {product.name}
                        </Text>
                      )}
                      <Divider />
                      {selectedSize && (
                        <Text>
                          <strong>{"Size :"}</strong> {selectedSize}
                        </Text>
                      )}
                      <Divider />
                      {agency && (
                        <Text>
                          <strong>{t("Agency :")}</strong> {agency.name}
                        </Text>
                      )}
                      <Divider />
                    </Flex>
                    <Flex direction="column" className="flex-col xl:flex-row" gap="2">
                      <Flex>
                        {quantity && (
                          <Text textAlign="center">
                            <strong>{t("Quantity :")}</strong> {quantity}
                          </Text>
                        )}
                      </Flex>
                      <Divider />
                      <Flex>
                        <Flex flexDirection="column" gap={2} w="100%">
                          {startDate && (
                            <Text>
                              <strong>{t("Start :")}</strong> {new Date(startDate).toLocaleDateString()}
                            </Text>
                          )}
                          <Divider />
                          {endDate && (
                            <Text>
                              <strong>{t("End :")}</strong> {new Date(endDate).toLocaleDateString()}
                            </Text>
                          )}
                        </Flex>
                      </Flex>
                      <Divider />
                      <Flex className="bg-accent rounded-md p-2" w="fit-content">
                        {totalPrice && (
                          <Text textAlign="center" fontSize={24} color="white">
                            <strong>{t("Total Price")}</strong> : {parseFloat(totalPrice.toFixed(2))} €
                          </Text>
                        )}
                      </Flex>
                    </Flex>
                  </Flex>
                  <Button
                    colorScheme="red"
                    onClick={() => removeBookingData(index)}
                    aria-label={t("Delete")}
                    height={{ base: "3rem", xl: "5rem" }}
                    width={{ base: "auto", xl: "4rem" }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    transition="width 0.2s ease-in-out"
                    _hover={{
                      width: { base: "auto", xl: "11rem" },
                      ".text": { display: { xl: "inline" } },
                    }}
                  >
                    <TrashIcon width={24} />
                    <Text ml={2} className="text" display={{ base: "inline", xl: "none" }}>
                      <strong>{t("DELETE")}</strong>
                    </Text>
                  </Button>
                </Flex>
                <Divider mt={4} />
              </Box>
            );
          })}
          <Flex justify="center" mt={4}>
            <Button variant="primaryButton" onClick={handleBooking} isLoading={bookingInProgress}>
              {t("Book")}
            </Button>
          </Flex>
        </>
      ) : (
        <Text>{t("Your basket is empty")}</Text>
      )}
    </Layout>
  );
}
