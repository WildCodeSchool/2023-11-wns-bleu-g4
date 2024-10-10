import { useBookingData } from "@/context/BookingDataContext";
import { useProductContext } from "@/context/ProductPageContext";
import { useBookingMutation } from "@/features/product/detailsComponent/useBookingMutation";
import { useProfileQuery } from "@/graphql/User/generated/Profile.generated";
import Layout from "@/layouts/Layout";
import { Box, Button, Divider, Flex, Image as ChakraImage, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { TrashIcon } from "@heroicons/react/24/solid";
import Validate from "@public/images/validate.gif";
import Image from "next/image";

export default function BasketPage() {
  const { t } = useTranslation("BasketPage");
  const { bookingData, removeBookingData } = useBookingData();
  const { clearBookingData } = useBookingData();
  const {
    state: { agencies },
  } = useProductContext();
  const { performBookingMutation } = useBookingMutation();
  const { data: profileData } = useProfileQuery();
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const router = useRouter();

  const totalPrice = bookingData?.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0) || 0;

  const handleBooking = async () => {
    if (!bookingData || bookingData.length === 0) {
      toast.error(t("Your basket is empty."));
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

      setBookingSuccess(true);
      toast.success(t("Your booking has been successfully completed!"));

      clearBookingData();
    } catch (error) {
      toast.error(t("An error occurred while booking"));
    } finally {
      setBookingInProgress(false);
    }
  };

  if (bookingSuccess) {
    return (
      <Layout>
        <Flex justify="center" align="center" direction="column" mb={4}>
          <Image src={Validate} alt="" width={200} height={200} style={{ marginBottom: "24px" }} />
          <Text fontSize={32} fontWeight="bold" mb={4}>
            {t("Order confirmed!")}
          </Text>
          <Text fontSize={20} mb={6} textAlign={"center"}>
            {t("Thank you for your purchase. Your booking has been successfully completed.")}
          </Text>
          <Text fontSize={18} mb={6} textAlign={"center"}>
            {t("You can view the details of your order in your")}
            <Button onClick={() => router.push("/account")} variant="link" color="accent" ml={1} fontSize={18}>
              <strong>{t("account")}</strong>
            </Button>{" "}
            {t("section.")}{" "}
          </Text>
          <Button onClick={() => router.push("/")} variant="primaryButton">
            {t("Back to homepage")}
          </Button>
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout>
      {bookingData && bookingData.length > 0 ? (
        <>
          {bookingData.map((data, index) => {
            const { product, selectedAgency, selectedSize, quantity, startDate, endDate, totalPrice } = data;
            const agency = agencies.find(a => a.id === selectedAgency);

            return (
              <Box className="px-5 lg:px-24" key={index}>
                <Flex align="center" justifyContent="space-between" className="flex-col xl:flex-row" gap={8}>
                  {product && <ChakraImage w={100} src={product.thumbnail} alt={product.name} />}
                  <Flex
                    align="flex-start"
                    justifyContent="space-around"
                    className="flex-col xl:flex-row"
                    w="100%"
                    fontSize={18}
                    fontWeight={500}
                    gap={2}
                  >
                    <Flex flexDirection="column" gap={2} w={"100%"}>
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
                    <Flex direction="column" className="flex-col xl:flex-row" gap="2" w={"100%"}>
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
                      {totalPrice && (
                        <Text fontSize={18}>
                          <strong>{t("Price")}</strong> : {parseFloat(totalPrice.toFixed(2))} €
                        </Text>
                      )}
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
                <Divider mt={4} borderWidth={"4px"} />
              </Box>
            );
          })}
          <Flex justify="center" mt={4} alignItems="center" flexDirection="column" mb={4} className="px-5 lg:px-24">
            <Flex justify="flex-end" width="100%">
              <Text fontSize={24} fontWeight="bold" color="accent">
                {t("Total price:")} {parseFloat(totalPrice.toFixed(2))} €
              </Text>
            </Flex>
            <Flex>
              <Button variant="primaryButton" onClick={handleBooking} isLoading={bookingInProgress} fontWeight="bold">
                {t("Book items")}
              </Button>
            </Flex>
          </Flex>
        </>
      ) : (
        <Flex justify="center" align="center" direction="column" mb={4}>
          <Text fontSize={24} fontWeight="bold" mb={4}>
            {t("Your basket is empty")}
          </Text>
          <Button onClick={() => router.push("/")} variant="primaryButton">
            {t("Back to homepage")}
          </Button>
        </Flex>
      )}
    </Layout>
  );
}
