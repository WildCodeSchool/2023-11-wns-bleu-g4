import { useProductContext } from "@/context/ProductPageContext";
import DateRangePicker from "@/shared/components/DateRangePicker";
import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";

export default function DateSelector() {
  const { setStartDate, setEndDate, selectedProduct, setTotalPrice } = useProductContext();

  const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
    setStartDate(startDate);
    setEndDate(endDate);

    if (startDate && endDate && selectedProduct) {
      const durationInDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
      const totalPrice = selectedProduct.price * durationInDays;
      setTotalPrice(totalPrice);
    }
  };

  useEffect(() => {
    if (!setStartDate || !setEndDate) {
      setTotalPrice(0);
    }
  }, [setStartDate, setEndDate, setTotalPrice]);

  return (
    <Flex flexDirection="column" gap="30px" p="19px 0">
      <DateRangePicker onDateChange={handleDateChange} buttonSize="lg" position="up" />
    </Flex>
  );
}
