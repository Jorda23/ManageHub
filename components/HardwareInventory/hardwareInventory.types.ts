export type HardwareStatus = "inStock" | "lowStock";

export type HardwareProduct = {
  id: string;
  name: string;
  detail: string;
  stock: number;
  minStock: number;
  price: number;
  code: string;
  accent: string;
  imageUrl: string;
  category?: string;
  status?: HardwareStatus;
};

export type HardwareInventoryProps = {
  products: HardwareProduct[];
  onAddProduct: () => void;
  onEditProduct?: (product: HardwareProduct) => void;
};

export type HardwareProductCardProps = {
  product: HardwareProduct;
  onEdit?: (product: HardwareProduct) => void;
};

export type HardwareProductImageProps = {
  product: HardwareProduct;
  isLowStock: boolean;
};

export type HardwareProductHeaderProps = {
  product: HardwareProduct;
  isLowStock: boolean;
  onEdit?: (product: HardwareProduct) => void;
};

export type HardwareStockProgressProps = {
  stock: number;
  minStock: number;
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
