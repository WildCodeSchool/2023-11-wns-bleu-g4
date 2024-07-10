export interface Characteristic {
  id?: number;
  name?: string;
  value?: string;
}

export interface CharacteristicModalProps {
  isOpen: boolean;
  onClose: () => void;
  characteristic?: Characteristic;
  handleDelete?: (id: number) => Promise<void>;
  refetch?: () => void;
}
