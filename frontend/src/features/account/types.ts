export interface menuItems {
  id: number;
  name: string;
}

export interface menuItemsth {
  id: number;
  name: string;
  thClass: string
}


export interface OrderTableBodyProps {
  data: any;
  sortColumnName: string | null;
  sortOrder: "asc" | "desc" | null;
  handleDateSort: (columnName: string) => void;
}

export interface TableBodyProps {
  data: any;
}

export interface TableFooterProps {
  data: any;
  startIndex: number;
  endIndex: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  itemsPerPage: number;
}

export interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: any;
  variant?: string;
}

export interface User {
  id: number,
  name: string,
  email: string,
  address: string,
  avatar: string,
  city: string,
  country: string,
  phone: string,
  firstname: string,
  postcode: string
  role: string
}

export interface userInfoProps {
  icon?: any,
  label?: string,
  userInfo?: string
}

export interface Agency {
  id?: number,
  name?: string
}

export interface Booking {
  id?: number,
  status?: string,
  invoice?: string,
  bookingDate?: string,
  startDate?: string,
  endDate?: string,
  userId?: number,
  agency?: Agency[]
}

export interface BookingItem {
  status: string,
  startDate: string,
  endDate: string,
  product: Product,
}

export interface Product {
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  brand: String;
}