import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface ProfileData {
    name: string;
    email: string;
}

interface Product {
    id: number;
    name: string;
    price: number;
    thumbnail: string;
}

export interface BookingData {
    profileData?: ProfileData;
    selectedAgency?: number | null;
    startDate?: Date | null;
    endDate?: Date | null;
    product?: Product;
    quantity?: number;
    selectedSize?: string | null;
    totalPrice?: number;
}

interface BookingDataContextType {
    bookingData: BookingData[];
    updateBookingData: (data: BookingData) => void;
    removeBookingData: (index: number) => void;
    startDate: Date | null;
    setStartDate: (date: Date | null) => void;
    endDate: Date | null;
    setEndDate: (date: Date | null) => void;
}

const BookingDataContext = createContext<BookingDataContextType | undefined>(undefined);

export const useBookingData = () => {
    const context = useContext(BookingDataContext);
    if (!context) {
        throw new Error('useBookingData must be used within a BookingDataContextProvider');
    }
    return context;
};

interface BookingDataContextProviderProps {
    children: ReactNode;
}

export const BookingDataContextProvider = ({ children }: BookingDataContextProviderProps) => {
    const [bookingData, setBookingData] = useState<BookingData[]>(() => {
        if (typeof window !== "undefined") {
            const storedData = localStorage.getItem('bookingData');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                return parsedData.map((item: BookingData) => ({
                    ...item,
                    startDate: item.startDate ? new Date(item.startDate) : null,
                    endDate: item.endDate ? new Date(item.endDate) : null,
                }));
            }
        }
        return [];
    });

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    useEffect(() => {
        localStorage.setItem('bookingData', JSON.stringify(bookingData));
    }, [bookingData]);

    const updateBookingData = (data: BookingData) => {
        setBookingData(prevBookingData => [...prevBookingData, data]);
    };

    const removeBookingData = (index: number) => {
        setBookingData(prevBookingData => prevBookingData.filter((_, i) => i !== index));
    };

    const contextValue: BookingDataContextType = {
        bookingData,
        updateBookingData,
        removeBookingData,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
    };

    return (
        <BookingDataContext.Provider value={contextValue}>
            {children}
        </BookingDataContext.Provider>
    );
};
