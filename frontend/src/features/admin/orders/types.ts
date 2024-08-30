import { Agency, StatusBooking, User } from "@/graphql/generated/schema";

export interface Order {
  id?: number;
  orderNb: string;
  startDate: string;
  endDate: string;
  status: StatusBooking;
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

export interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
  handleCancel?: (id: number) => void;
}

export interface OrderTableBodyProps {
  data: any[];
  refetch?: () => void;
  loading?: boolean;
  sortColumnName: string | null;
  sortOrder: "asc" | "desc" | null;
  handleDateSort: (columnName: string) => void;
}
