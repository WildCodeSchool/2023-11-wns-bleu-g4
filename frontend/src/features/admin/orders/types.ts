import { Agency, User } from "@/graphql/generated/schema";

export interface Order {
  id?: number;
  orderNb: string;
  startDate: string;
  endDate: string;
  status: string;
  user: User;
  agency: Agency;
  bookingItem: BookingItem[];
}

export interface BookingItem {
  id: number;
  startDate?: string;
  endDate?: string;
  product: { name: string; price: number };
  productCode: { id: number };
}
