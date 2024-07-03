export interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: any;
  variant?: string;
  handleDeleteCategory?: (id: number) => Promise<void>;
  refetch?: () => void;
}
