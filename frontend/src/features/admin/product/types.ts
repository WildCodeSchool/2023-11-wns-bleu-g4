import { Agency } from "@/graphql/generated/schema";
import { Characteristic } from "../characteristic/types";

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

export interface TableBodyProps {
  data: any;
  refetch?: () => void;
}

export interface TableFooterProps {
  data: number;
  startIndex: number;
  endIndex: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  itemsPerPage: number;
}

export interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  handleDeleteProduct?: (id: number) => Promise<void>;
  refetch?: () => void;
}

export interface ProductCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  agency?: Agency;
  refetch?: () => void;
}
