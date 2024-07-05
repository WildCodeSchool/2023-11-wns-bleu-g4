// import { Category, ParentCategory } from "@/graphql/generated/schema";

export interface ParentCategory {
  id?: number;
  name: string;
}

export interface Category {
  id?: number;
  name: string;
  thumbnail: string;
  parentCategory: ParentCategory;
}

export interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: Category;
  parentCategory?: ParentCategory;
  variant?: string;
  handleDelete?: (id: number) => Promise<void>;
  refetch?: () => void;
}
