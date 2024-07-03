export interface menuItems {
  id: number;
  name: string;
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
  product?: any;
  variant?: string;
  handleDeleteProduct?: (id: number) => Promise<void>;
  refetch?: () => void;
}

export interface Brand {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}
