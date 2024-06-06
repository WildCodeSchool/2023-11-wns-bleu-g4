import { Flex } from "@chakra-ui/react";
import DateRangePicker from "@/shared/components/DateRangePicker";

export default function DateSelector({
  handleDateChange
}: {
  handleDateChange: (startDate: Date | null, endDate: Date | null) => void;
}) {
  return (
    <Flex flexDirection="column" gap="30px" p="19px 0">
      <DateRangePicker onDateChange={handleDateChange} buttonSize="lg" />
    </Flex>
  );
}
