export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  userId: string;
  username: string;
  token: string;
};

export type CreateHardwareProductRequest = {
  name: string;
  detail: string;
  category: string;
  initialStock: number;
  minimumStock: number;
  unitPrice: number;
  inventoryStatus: string;
  imageUrl?: string | null;
};

export type CreateHardwareProductResponse = {
  id: string;
  code: string;
  name: string;
};

export type HardwareProduct = {
  id: string;
  code: string;
  name: string;
  detail: string;
  category: string;
  stock: number;
  minimumStock: number;
  unitPrice: number;
  inventoryStatus: string;
  imageUrl?: string | null;
};

export type RegisterHardwareSaleRequest = {
  productId: string;
  quantity: number;
  paymentMethod: string;
};

export type RegisterHardwareSaleResponse = {
  productId: string;
  quantity: number;
  remainingStock: number;
  total: number;
};

export type CreateGrainProductRequest = {
  name: string;
  unit: string;
  location: string;
  initialStock: number;
  minimumStock: number;
  unitPrice: number;
  imageUrl?: string | null;
};

export type CreateGrainProductResponse = {
  id: string;
  code: string;
  name: string;
};

export type GrainProduct = {
  id: string;
  code: string;
  name: string;
  unit: string;
  location: string;
  stock: number;
  minimumStock: number;
  unitPrice: number;
  inventoryStatus: string;
  imageUrl?: string | null;
};

export type RegisterGrainSaleRequest = {
  productId: string;
  quantity: number;
  paymentMethod: string;
};

export type RegisterGrainSaleResponse = {
  productId: string;
  quantity: number;
  remainingStock: number;
  total: number;
};

export type CreatePropertyRequest = {
  name: string;
  projectName: string;
  measure: string;
  location: string;
  ownerName: string;
  totalPrice: number;
  initialPayment: number;
  nextPaymentDate?: string | null;
  imageUrl?: string | null;
};

export type CreatePropertyResponse = {
  id: string;
  code: string;
  name: string;
};

export type Property = {
  id: string;
  code: string;
  name: string;
  projectName: string;
  measure: string;
  location: string;
  ownerName: string;
  totalPrice: number;
  amountPaid: number;
  pendingBalance: number;
  nextPaymentDate?: string | null;
  status: string;
  imageUrl?: string | null;
};

export type RegisterPropertyPaymentRequest = {
  propertyId: string;
  amount: number;
  paymentMethod: string;
  note?: string | null;
};

export type RegisterPropertyPaymentResponse = {
  propertyId: string;
  amount: number;
  amountPaid: number;
  pendingBalance: number;
  status: string;
};
