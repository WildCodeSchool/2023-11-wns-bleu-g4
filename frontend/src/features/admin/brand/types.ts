export interface Brand {
  id?: number;
  name: string;
  logo: string;
}

export interface BrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: Brand | undefined;
  handleDelete: (id: number) => void;
  refetch?: () => void;
}
