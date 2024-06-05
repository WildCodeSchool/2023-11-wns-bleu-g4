import { useGetAllProductsQuery } from "@/graphql/Product/generated/getProductsDetails.generated";
import DateRangePicker from "@/shared/components/DateRangePicker";
import { Box, Button, ButtonGroup, Flex, HStack, Image, Select, Text, useNumberInput } from "@chakra-ui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function DetailsComponent() {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(0);

  const { getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    value: quantity,
    min: 0,
    max: 10,
    step: 1,
    onChange: (valueAsString, valueAsNumber) => setQuantity(valueAsNumber),
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();

  const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
    console.log("Date de début:", startDate);
    console.log("Date de fin:", endDate);
  };

  const { data, loading, error } = useGetAllProductsQuery();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  console.log("data", data);

  const product = data?.getAllProducts[0];

  const { t } = useTranslation("productDetails");

  return (
    <Flex w="50%" flexDirection="column" gap="10px">
      <Flex justifyContent="space-between">
        <Flex flexDirection="column">
          <Text size="18px" fontWeight="600">
            Ref: 05221489
          </Text>
          <Text fontWeight="600">
            {t("Brand")}: {product?.brand}
          </Text>
        </Flex>
        <Image width="20%" src="https://velos-cargo.com/wp-content/uploads/2023/05/logo-trek-.png" alt="product" />
      </Flex>
      <Flex flexDirection="column" gap="10px">
        <Text fontSize="2xl" fontWeight="700" fontFamily="Poppins">
          {product?.name}
        </Text>
        <Text fontWeight="600">{product?.description}</Text>
        <Select placeholder="Select agency" width="fit-content">
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </Select>
      </Flex>
      <ButtonGroup gap="4" flexWrap="wrap" justifyContent="left" m={0}>
        {[...Array(11)].map((_, i) => {
          const size = 36 + i;
          return (
            <Button
              variant="sizeButton"
              key={i}
              onClick={() => setSelectedSize(size)}
              isActive={selectedSize === size}
              colorScheme="blue"
              m={0}
            >
              {size}
            </Button>
          );
        })}
      </ButtonGroup>
      {selectedSize && (
        <Text mt="4">
          {t("Selected size")}: {selectedSize}
        </Text>
      )}
      <Flex flexDirection="column">
        {t("Price")} : {product?.price} € / {t("Day")}
      </Flex>
      <Flex flexDirection="column" gap="30px" p="19px 0">
        <Flex flexDirection="column" gap={2}>
          <Text fontWeight="700">{t("Quantity")}</Text>
          <HStack maxW="200px" bg="#EDF2F7" borderRadius="10px" p="14px 18px">
            <Button size="xs" variant="selectorButton" {...dec}>
              -
            </Button>
            <Box color="dark" width="xs" textAlign="center" fontSize="18px" fontWeight="700">
              {quantity}
            </Box>
            <Button size="xs" variant="selectorButton" {...inc}>
              +
            </Button>
          </HStack>
        </Flex>
        <DateRangePicker onDateChange={handleDateChange} buttonSize="lg" />
      </Flex>
      <Flex justifyContent="center">
        <Button h={54} rightIcon={<ShoppingCartIcon width={24} />} color="light" bg="accent" size="lg" width="100%">
          {t("Add to basket")}
        </Button>
      </Flex>
    </Flex>
  );
}
