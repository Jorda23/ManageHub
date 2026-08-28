export type GrainStatus = "inStock" | "lowStock";

export type GrainProduct = {
  id: string;
  name: string;
  unit: string;
  stock: number;
  initialStock: number;
  minStock: number;
  price: number;
  code: string;
  accent: string;
  imageUrl: string;
  silo?: string;
  status?: GrainStatus;
};

export type GrainInventoryProps = {
  products: GrainProduct[];
  onAddProduct: () => void;
  onEditProduct?: (product: GrainProduct) => void;
};

export type GrainProductCardProps = {
  product: GrainProduct;
  onEdit?: (product: GrainProduct) => void;
};

export type ProductImageProps = {
  product: GrainProduct;
  isLowStock: boolean;
};

export type ProductCardHeaderProps = {
  product: GrainProduct;
  isLowStock: boolean;
  onEdit?: (product: GrainProduct) => void;
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
