import {Button, ButtonProps, Text, Divider} from "@chakra-ui/react";
import {CalendarDaysIcon} from "@heroicons/react/24/outline";
import {isBefore, isSameDay, isWeekend, isWithinInterval} from "date-fns";
import {enUS, fr} from "date-fns/locale";
import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import {DateRange, DayPicker, SelectRangeEventHandler} from "react-day-picker";
import "react-day-picker/dist/style.css";
import {useTranslation} from "react-i18next";
import {useProductContext} from "@/context/ProductPageContext";
import {
    useGetBookingItemDatesByProductCodeIdQuery
} from "@/graphql/Product/generated/getBookingItemDateByProductCodeId.generated";

interface DateRangePickerProps {
    onDateChange: (startDate: Date | null, endDate: Date | null) => void;
    buttonSize?: ButtonProps["size"];
    position?: 'up' | 'down';
    showFooter?: boolean;
    footerTexts?: {
        currentDayText: string;
        availableDatesText: string;
        bookedDatesText: string;
    };
}

export default function DateRangePicker({
                                            onDateChange,
                                            buttonSize = "md",
                                            position = 'down',
                                            showFooter = false,
                                            footerTexts = {
                                                currentDayText: "",
                                                availableDatesText: "",
                                                bookedDatesText: ""
                                            }
                                        }: DateRangePickerProps) {
    const [range, setRange] = useState<DateRange | undefined>();
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const datePickerRef = useRef<HTMLDivElement>(null);
    const {t} = useTranslation("DateRangePicker");
    const locale = useRouter().locale;

    const {state: {selectedAgency, selectedProduct}} = useProductContext();

    const {data: bookingData, loading, error} = useGetBookingItemDatesByProductCodeIdQuery({
        variables: {productCodeId: selectedProduct?.id || 0, agencyId: selectedAgency || 0},
    });

    const bookedDays = bookingData?.getBookingItemDatesByProductCodeId.map(item => ({
        from: new Date(item.startDate),
        to: new Date(item.endDate)
    })) || [];

    useEffect(() => {
        if (range) {
            onDateChange(range.from ?? null, range.to ?? null);
        }
    }, [range]);

    const isDisabledDay = (date: Date) => {
        if (isWeekend(date)) {
            return true;
        }
        if (isBefore(date, new Date()) && !isSameDay(date, new Date())) {
            return true;
        }
        // Vérifier si le jour est dans une plage réservée
        const isBooked = bookedDays.some(({from, to}) => isWithinInterval(date, {start: from, end: to}));
        return isBooked;
    };

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

    const positionStyle = position === 'down' ? {top: "calc(100% + 10px)"} : {bottom: "calc(100% + 10px)"};

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const handleSelectRange: SelectRangeEventHandler = selectedRange => {
        // Vérifier si tous les jours dans la plage sélectionnée sont disponibles
        const isRangeBooked = selectedRange?.from && selectedRange?.to && bookedDays.some(({from, to}) => {
            return isWithinInterval(from, {start: selectedRange.from as Date, end: selectedRange.to as Date}) ||
                isWithinInterval(to, {start: selectedRange.from as Date, end: selectedRange.to as Date});
        });

        if (!isRangeBooked) {
            setRange(selectedRange);
        } else {
            // Afficher un message ou une indication que la plage est réservée
            console.log("Cette plage de dates contient des jours déjà réservés.");
        }
    };

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
                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        zIndex: 1000,
                        backgroundColor: "#f0f0f0",
                        border: "2px solid #000",
                        borderRadius: "10px",
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
                        modifiers={{booked: bookedDays}}
                        modifiersClassNames={{booked: "booked"}}
                    />
                    {showFooter && (
                        <footer style={{
                            padding: "10px",
                            background: "#fff",
                            borderTop: "1px solid #ccc",
                            borderRadius: "0 0 10px 10px"
                        }}>
                            <div style={{display: 'flex', alignItems: 'center', gap: "10px"}}>
                                <Divider w={3} border="4px" borderColor="#4F6F52"/>
                                <Text>{footerTexts.currentDayText}</Text>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center', gap: "10px"}}>
                                <Divider w={3} border="4px" borderColor="green"/>
                                <Text>{footerTexts.availableDatesText}</Text>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center', gap: "10px"}}>
                                <Divider w={3} border="4px" borderColor="darkred"/>
                                <Text>{footerTexts.bookedDatesText}</Text>
                            </div>
                        </footer>
                    )}
                </div>
            )}
        </div>
    );
}
