export type HardwareStatus = "inStock" | "lowStock";

export type HardwareInventoryItem = {
  id: string;
  name: string;
  detail: string;
  stock: number;
  initialStock: number;
  minStock: number;
  price: number;
  code: string;
  accent: string;
  imageUrl: string;
  category?: string;
  status?: HardwareStatus;
};

export type HardwareInventoryProps = {
  products: HardwareInventoryItem[];
  onAddProduct: () => void;
  onEditProduct?: (product: HardwareInventoryItem) => void;
};

export type HardwareProductCardProps = {
  product: HardwareInventoryItem;
  onEdit?: (product: HardwareInventoryItem) => void;
};

export type HardwareProductImageProps = {
  product: HardwareInventoryItem;
  isLowStock: boolean;
};

export type HardwareProductHeaderProps = {
  product: HardwareInventoryItem;
  isLowStock: boolean;
  onEdit?: (product: HardwareInventoryItem) => void;
};

export type HardwareStockProgressProps = {
  stock: number;
  stockPercent: number;
  progressColor: string;
  isLowStock: boolean;
};

export type HardwareProductInfoProps = {
  label: string;
  value: string;
  valueColor?: string;
  align?: "left" | "right";
};
