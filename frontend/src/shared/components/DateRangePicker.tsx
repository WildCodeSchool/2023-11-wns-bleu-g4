import { Button, ButtonProps, Text } from "@chakra-ui/react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { enUS, fr } from "date-fns/locale"; // Importez les locales depuis date-fns
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { DateRange, DayPicker, SelectRangeEventHandler } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useTranslation } from "react-i18next";

interface DateRangePickerProps {
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
  buttonSize?: ButtonProps["size"];
}

export default function DateRangePicker({ onDateChange, buttonSize = "md" }: DateRangePickerProps) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const datePickerRef = useRef<HTMLDivElement>(null); // Ref pour le conteneur du calendrier

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

  return (
    <div style={{ position: "relative", display: "inline-block" }} ref={datePickerRef}>
      <Button
        bg="secondary"
        color="light"
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
            top: "calc(100% + 10px)",
            left: 0,
            zIndex: 1000,
          }}
        >
          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange as SelectRangeEventHandler}
            numberOfMonths={2}
            locale={locale === "en" ? enUS : fr}
            showOutsideDays
            disabled={{ before: new Date() }}
          />
        </div>
      )}
    </div>
  );
}
