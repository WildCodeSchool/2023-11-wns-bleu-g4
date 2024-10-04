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
                <Flex align="center" justifyContent="space-between">
                  {product && <Image w={100} src={product.thumbnail} alt={product.name} />}
                  <Flex align="center" justifyContent="space-around" w="100%" fontSize={18} fontWeight={500}>
                    <Flex flexDirection="column">
                      {product && (
                        <Text>
                          {t("Product :")} {product.name}
                        </Text>
                      )}
                      {selectedSize && (
                        <Text>
                          {"Size :"} {selectedSize}
                        </Text>
                      )}
                      {agency && (
                        <Text>
                          {t("Agency :")} {agency.name}
                        </Text>
                      )}
                    </Flex>
                    <Flex>
                      {quantity && (
                        <Text textAlign="center">
                          {t("Quantity :")} {quantity}
                        </Text>
                      )}
                    </Flex>
                    <Flex>
                      <Flex flexDirection="column">
                        {startDate && (
                          <Text>
                            {t("Start :")} {new Date(startDate).toLocaleDateString()}
                          </Text>
                        )}
                        {endDate && (
                          <Text>
                            {t("End :")} {new Date(endDate).toLocaleDateString()}
                          </Text>
                        )}
                      </Flex>
                    </Flex>
                    <Flex>
                      {totalPrice && (
                        <Text textAlign="center">
                          {t("Total Price")} : {parseFloat(totalPrice.toFixed(2))} €
                        </Text>
                      )}
                    </Flex>
                  </Flex>
                </Flex>
                <Divider mt={4} />
              </Box>
            );
          })}
          <Flex justify="center" mt={4}>
            <Button variant="primaryButton" onClick={handleBooking} isLoading={bookingInProgress}>
              {"Book"}
            </Button>
          </Flex>
        </>
      ) : (
        <Text>{"Your basket is empty"}</Text>
      )}
    </Layout>
  );
}
