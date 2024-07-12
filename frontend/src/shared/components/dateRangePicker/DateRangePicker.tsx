import {Button, ButtonProps, Divider, Flex, Text, useBreakpointValue, useColorModeValue} from "@chakra-ui/react";
import {CalendarDaysIcon} from "@heroicons/react/24/outline";
import {endOfDay, isAfter, isBefore, isSameDay, isWeekend, isWithinInterval, startOfDay} from "date-fns";
import {enUS, fr} from "date-fns/locale";
import {useRouter} from "next/router";
import React, {useEffect, useRef, useState, useMemo, useCallback} from "react";
import {DateRange, DayPicker, SelectRangeEventHandler} from "react-day-picker";
import "react-day-picker/dist/style.css";
import {useTranslation} from "react-i18next";
import 'react-toastify/dist/ReactToastify.css';
import {useProductContext} from "@/context/ProductPageContext";
import {useClickOutside, useBookedDays} from "./utils";

interface DateRangePickerProps {
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
  buttonSize?: ButtonProps["size"];
  position?: 'up' | 'down';
  showFooter?: boolean;
  footerTexts?: {
    currentDayText: string;
    bookedDatesText: string;
  }
}

const DateRangePicker = ({
                           onDateChange,
                           buttonSize = "md",
                           position = 'down',
                           showFooter = false,
                           footerTexts = {
                             currentDayText: "",
                             bookedDatesText: ""
                           }
                         }: DateRangePickerProps) => {
  const [range, setRange] = useState<DateRange | undefined>();
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const {state} = useProductContext();
  const {selectedAgency, selectedProduct} = state;
  const useTheme = useColorModeValue("#f0f0f0", "#3A3D3A")

  const bookedDays = useBookedDays(selectedAgency, selectedProduct?.id, state.selectedSize ?? "");

  useClickOutside(datePickerRef, () => setShowDatePicker(false));

  const locale = useRouter().locale;
  const {t} = useTranslation("DateRangePicker");

  useEffect(() => {
    if (range) {
      onDateChange(range.from ?? null, range.to ?? null);
    }
  }, [range]);

  const handleSelectRange: SelectRangeEventHandler = useCallback(selectedRange => {
    const isRangeBooked = selectedRange?.from && selectedRange.to &&
      bookedDays.some(bookedRange => {
        return isBefore(selectedRange.from!, bookedRange.to) &&
          isAfter(selectedRange.to!, bookedRange.from);
      });

    if (isRangeBooked) {
      setRange(undefined);
    } else {
      setRange(selectedRange);
    }
  }, [bookedDays]);

  const isDisabledDay = useCallback((date: Date) => {
    if (isWeekend(date)) {
      return true;
    }
    if (isBefore(date, new Date()) && !isSameDay(date, new Date())) {
      return true;
    }

    const dateStart = startOfDay(date);
    const dateEnd = endOfDay(date);

    return bookedDays.some(bookedRange => {
      const rangeStart = startOfDay(bookedRange.from);
      const rangeEnd = endOfDay(bookedRange.to);
      return isWithinInterval(dateStart, {start: rangeStart, end: rangeEnd}) ||
        isWithinInterval(dateEnd, {start: rangeStart, end: rangeEnd}) ||
        (isBefore(dateStart, rangeStart) && isAfter(dateEnd, rangeEnd));
    });
  }, [bookedDays]);

  const positionStyle = useMemo(() =>
    position === 'down' ? {top: "calc(100% + 10px)"} : {bottom: "calc(100% + 10px)"}, [position]);
  const numberOfMonths = useBreakpointValue({base: 1, lg: 2});

  return (
    <div style={{position: "relative", display: "inline-block"}} ref={datePickerRef}>
      <Button
        variant="primaryButton"
        rightIcon={<CalendarDaysIcon width={24}/>}
        size={buttonSize}
        onClick={() => setShowDatePicker(!showDatePicker)}
        w="373px"
        h="54px"
      >
        {range?.from && range?.to ? (
          <Text as="span">
            <Text as="span" fontWeight={700}>
              {t("From")} :{" "}
            </Text>
            {range.from.toLocaleDateString()}
            <Text as="span" fontWeight={700}>
              {" "}
              {t("To")} :{" "}
            </Text>
            {range.to.toLocaleDateString()}
          </Text>
        ) : (
          <Text as="span" fontWeight={700}>
            {t("Select a date")}
          </Text>
        )}
      </Button>
      {showDatePicker && (
        <Flex
          style={{
            position: "absolute",
            left: 0,
            zIndex: 1000,
            border: "2px solid #000",
            borderRadius: "10px",
            ...positionStyle,
          }}
          bg={useTheme}
          flexDirection={"column"}
        >
          <DayPicker
            mode="range"
            selected={range}
            onSelect={handleSelectRange}
            numberOfMonths={numberOfMonths}
            locale={locale === "en" ? enUS : fr}
            showOutsideDays
            disabled={isDisabledDay}
            modifiers={{booked: bookedDays}}
            modifiersClassNames={{booked: "booked"}}
          />
          {showFooter && (
            <Flex style={{
              padding: "10px",
              borderTop: "1px solid #ccc",
              borderRadius: "0 0 10px 10px"
            }}
                  bg={useTheme}
                  gap={5}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: "10px"}}>
                <Divider w={3} border="4px" borderColor="#E66300" opacity={1}/>
                <Text>{footerTexts.currentDayText}</Text>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: "10px"}}>
                <Divider w={3} border="4px" borderColor="darkred" opacity={1}/>
                <Text>{footerTexts.bookedDatesText}</Text>
              </div>
            </Flex>
          )}
        </Flex>
      )}
    </div>
  );
};

export default DateRangePicker;
