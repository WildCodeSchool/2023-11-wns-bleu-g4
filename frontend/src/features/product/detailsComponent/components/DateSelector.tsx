import { useProductContext } from "@/context/ProductPageContext";
import DateRangePicker from "@/shared/components/DateRangePicker";
import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";

export default function DateSelector() {
  const { state, setState } = useProductContext();
  const { selectedProduct } = state;

  const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
    setState(prevState => ({
      ...prevState,
      startDate,
      endDate,
    }));

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
  };

  useEffect(() => {
    if (!state.startDate || !state.endDate) {
      setState(prevState => ({
        ...prevState,
        totalPrice: 0,
      }));
    }
  }, [state.startDate, state.endDate, setState]);

  return (
    <Flex flexDirection="column" gap="30px" p="19px 0">
      <DateRangePicker onDateChange={handleDateChange} buttonSize="lg" position="up" />
    </Flex>
  );
}
