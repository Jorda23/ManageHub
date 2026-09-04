export type GrainStatus = "inStock" | "lowStock";

export type GrainInventoryItem = {
  id: string;
  name: string;
  unit: string;
  stock: number;
  initialStock: number;
  minStock: number;
  price: number;
  currency: "USD" | "NIO";
  code: string;
  accent: string;
  imageUrl: string;
  silo?: string;
  status?: GrainStatus;
};

export type GrainInventoryProps = {
  products: GrainInventoryItem[];
  search?: string;
  onSearchChange?: (value: string) => void;
  isInitialLoading?: boolean;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
  onAddProduct: () => void;
  onRegisterSale?: () => void;
  onEditProduct?: (product: GrainInventoryItem) => void;
};

export type GrainProductCardProps = {
  product: GrainInventoryItem;
  onEdit?: (product: GrainInventoryItem) => void;
};

export type ProductImageProps = {
  product: GrainInventoryItem;
  isLowStock: boolean;
};

export type ProductCardHeaderProps = {
  product: GrainInventoryItem;
  isLowStock: boolean;
  onEdit?: (product: GrainInventoryItem) => void;
};

export type StockProgressProps = {
  stock: number;
  stockPercent: number;
  progressColor: string;
  isLowStock: boolean;
};

export type ProductInfoProps = {
  label: string;
  value: string;
  valueColor?: string;
  align?: "left" | "right";
};
