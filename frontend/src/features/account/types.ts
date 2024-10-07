export interface menuItems {
  id: number;
  name: string;
}

export interface menuItemsth {
  id: number;
  name: string;
  thClass: string;
}

/*export interface OrderTableBodyProps {
  data: any;
  sortColumnName: string | null;
  sortOrder: "asc" | "desc" | null;
  handleDateSort: (columnName: string) => void;
}*/

/*export interface TableBodyProps {
  data: any;
}*/

export interface TableFooterProps {
  data: any;
  startIndex: number;
  endIndex: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  itemsPerPage: number;
}

export interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
  // variant?: string;
}

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: number;
  bookingItemIds: number[];
}

export interface User {
  id: number;
  name: string;
  email?: string;
  address?: string;
  avatar?: string;
  city?: string;
  country?: string;
  phone?: string;
  firstname: string;
  postcode?: string;
  role?: string;
}

/*export interface userInfoProps {
  icon?: any;
  label?: string;
  userInfo?: string;
}*/

export interface Agency {
  id?: number;
  address?: string;
  city?: string;
  country?: string;
  email?: string;
  name?: string;
  phone?: string;
  postcode?: string;
}

export interface Booking {
  id?: number;
  status?: string;
  invoice?: string;
  bookingDate?: string;
  startDate?: string;
  endDate?: string;
  userId?: number;
  agency?: Agency[];
}

export interface BookingItem {
  id?: number;
  status?: string;
  startDate?: Date;
  endDate?: Date;
  productCode?: {
    id: number;
  };
  product?: {
    thumbnail?: string;
    name?: string;
    price?: number;
  };
}

export interface Product {
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  brand: String;
}

export interface BookingPDF {
  id: number;
  status: string;
  invoice: string;
  bookingDate: string;
  startDate: Date;
  endDate: Date;
  user: User;
  agency: Agency;
}
