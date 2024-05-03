export interface menuItems {
  id: number;
  name: string;
}

export interface AdminTableBodyProps {
  data: any;
  sortColumnName: string | null;
  sortOrder: "asc" | "desc" | null;
  handleDateSort: (columnName: string) => void;
}

export interface AdminTableFooterProps {
  data: any;
  startIndex: number;
  endIndex: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  itemsPerPage: number;
}
