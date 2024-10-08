import { useProductContext } from "@/context/ProductPageContext";
import DateRangePicker from "@/shared/components/dateRangePicker/DateRangePicker";
import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";

export default function DateSelector() {
  const { state, setState } = useProductContext();
  const { selectedProduct, startDate, endDate } = state;

  const handleDateChange = (newStartDate: Date | null, newEndDate: Date | null) => {
    setState(prevState => ({
      ...prevState,
      startDate: newStartDate,
      endDate: newEndDate,
    }));
  };

  useEffect(() => {
    if (startDate && endDate && selectedProduct) {
      const durationInDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
      const totalPrice = selectedProduct.price * durationInDays;
      setState(prevState => ({
        ...prevState,
        totalPrice,
      }));
    } else {
      setState(prevState => ({
        ...prevState,
        totalPrice: 0,
      }));
    }
  }, [startDate, endDate, selectedProduct]);

  return (
    <Flex flexDirection="column" gap="30px" p="19px 0">
      <DateRangePicker
        onDateChange={handleDateChange}
        buttonSize="lg"
        position="up"
        showFooter={true}
        footerTexts={{
          currentDayText: "Current day",
          bookedDatesText: "Booked dates",
        }}
      />
    </Flex>
  );
}
