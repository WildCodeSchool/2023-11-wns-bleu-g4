import React, {useEffect, useMemo} from "react";
import {useGetAgencyByIdQuery} from "@/graphql/Agency/generated/GetAgencyById.generated";

export const useClickOutside = (ref: React.RefObject<HTMLDivElement>, handler: (event: MouseEvent) => void) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

export const useBookedDays =
  (selectedAgency: number | null, selectedProduct: number | undefined, selectedSize: string | null) => {
    const {data: agencyData} = useGetAgencyByIdQuery({
      variables: {agencyId: selectedAgency as number},
      skip: selectedAgency === null,
    });

    return useMemo(() => {
      if (!agencyData || !selectedProduct) return [];

      const filteredProductCodes = agencyData.getAgencyById.productCodes.filter(productCode => {
        if (productCode.product?.id === undefined || productCode.product?.id !== selectedProduct) {
          return false;
        }
        return !(selectedSize !== null && productCode.size !== selectedSize);
      });

      const allBookedRanges = filteredProductCodes.flatMap(productCode => {
        if (!productCode.bookingItems) {
          return [];
        }
        return productCode.bookingItems.map(booking => ({
          from: new Date(booking.startDate),
          to: new Date(booking.endDate),
        }));
      });

      const bookedDaysMap = new Map();

      allBookedRanges.forEach(range => {
        let currentDate = range.from;
        while (currentDate <= range.to) {
          bookedDaysMap.set(currentDate.getTime(), (bookedDaysMap.get(currentDate.getTime()) || 0) + 1);
          currentDate.setDate(currentDate.getDate() + 1);
        }
      });

      const productCodeCount = filteredProductCodes.length;
      const finalBookedDays = Array.from(bookedDaysMap.entries())
        .filter(([_, count]) => count === productCodeCount)
        .map(([time]) => new Date(time));

      return finalBookedDays.reduce((acc, date) => {
        if (acc.length === 0) {
          acc.push({from: date, to: date});
        } else {
          const lastRange = acc[acc.length - 1];
          if (lastRange.to.getTime() === date.getTime() - 86400000) {
            lastRange.to = date;
          } else {
            acc.push({from: date, to: date});
          }
        }
        return acc;
      }, [] as Array<{ from: Date; to: Date }>);
    }, [agencyData, selectedProduct, selectedSize]);
  };
