export interface menuItems {
  id?: number;
  name: string;
}

export interface Brand {
  id?: number;
  name: string;
}

export interface Category {
  id?: number;
  name: string;
}

export interface Characteristic {
  id?: number;
  characteristic?: string;
  value?: string;
}

export interface Product_Picture {
  id?: number;
  thumbnail: string;
  alt: string;
}

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  category: Category;
  brand: Brand;
  characteristics: Characteristic[];
  pictures: Product_Picture[];
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
  product: Product;
  handleDeleteProduct?: (id: number) => Promise<void>;
  refetch?: () => void;
}
