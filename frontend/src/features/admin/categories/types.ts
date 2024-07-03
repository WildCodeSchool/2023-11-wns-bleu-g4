import { Category, ParentCategory } from "@/graphql/generated/schema";

export interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: Category;
  parentCategory?: ParentCategory;
  variant?: string;
  handleDelete?: (id: number) => Promise<void>;
  refetch?: () => void;
}
