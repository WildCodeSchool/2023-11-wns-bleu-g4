import { Button, ButtonProps, Text } from "@chakra-ui/react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { isBefore, isSameDay, isWeekend } from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { DateRange, DayPicker, SelectRangeEventHandler } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useTranslation } from "react-i18next";

interface DateRangePickerProps {
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
  buttonSize?: ButtonProps["size"];
  position?: 'up' | 'down';
}

export default function DateRangePicker({ onDateChange, buttonSize = "md", position = 'down' }: DateRangePickerProps) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
      setShowDatePicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const locale = useRouter().locale;
  const { t } = useTranslation("DateRangePicker");

  useEffect(() => {
    if (range) {
      onDateChange(range.from ?? null, range.to ?? null);
    }
  }, [range]);

  const handleSelectRange: SelectRangeEventHandler = selectedRange => {
    setRange(selectedRange);
  };

  const isDisabledDay = (date: Date) => {
    if (isWeekend(date)) {
      return true;
    }
    if (isBefore(date, new Date()) && !isSameDay(date, new Date())) {
      return true;
    }
    return false;
  };

  const positionStyle = position === 'down' ? { top: "calc(100% + 10px)" } : { bottom: "calc(100% + 10px)" };

  return (
    <div style={{ position: "relative", display: "inline-block" }} ref={datePickerRef}>
      <Button
        variant="primaryButton"
        rightIcon={<CalendarDaysIcon width={24} />}
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
        <div
          style={{
            position: "absolute",
            left: 0,
            zIndex: 1000,
            ...positionStyle,
          }}
        >
          <DayPicker
            mode="range"
            selected={range}
            onSelect={handleSelectRange}
            numberOfMonths={2}
            locale={locale === "en" ? enUS : fr}
            showOutsideDays
            disabled={isDisabledDay}
          />
        </div>
      )}
    </div>
  );
}
