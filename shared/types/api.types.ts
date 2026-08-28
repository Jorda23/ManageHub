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
  initialStock: number;
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
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  remainingStock: number;
  paymentMethod: string;
  createdAt: string;
};

export type HardwareSale = {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  paymentMethod: string;
  createdAt: string;
};

export type HardwareSalesFilters = {
  search?: string;
  from?: string;
  to?: string;
  paymentMethod?: string;
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
  initialStock: number;
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
  id: string;
  productId: string;
  productName: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  total: number;
  remainingStock: number;
  paymentMethod: string;
  createdAt: string;
};

export type GrainSale = {
  id: string;
  productId: string;
  productName: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  total: number;
  paymentMethod: string;
  createdAt: string;
};

export type GrainSalesFilters = {
  search?: string;
  from?: string;
  to?: string;
  paymentMethod?: string;
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
  IdentificationImageUrl?: string | null;
  IdentificationNumber: string;
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
  id: string;
  propertyId: string;
  propertyName: string;
  ownerName: string;
  amount: number;
  amountPaid: number;
  pendingBalance: number;
  status: string;
  paymentMethod: string;
  note?: string | null;
  createdAt: string;
};

export type PropertyPayment = {
  id: string;
  propertyId: string;
  propertyName: string;
  ownerName: string;
  amount: number;
  paymentMethod: string;
  note?: string | null;
  createdAt: string;
};

export type PropertyPaymentsFilters = {
  search?: string;
  from?: string;
  to?: string;
  paymentMethod?: string;
};

export type DashboardSummary = {
  salesToday: number;
  monthlyIncome: number;
  accountsReceivable: number;
  openAccounts: number;
  alertsCount: number;
  salesVsYesterdayPercent: number;
  monthlyVsPreviousMonthPercent: number;
};

export type DashboardRecentActivity = {
  type: string;
  title: string;
  subtitle: string;
  amount: number;
  createdAt: string;
};

export type DashboardCashFlowDay = {
  date: string;
  hardware: number;
  grains: number;
  properties: number;
  total: number;
};

export type DashboardAlert = {
  group: string;
  code: string;
  title: string;
  message: string;
  severity: string;
  imageUrl: string | null;
};

export type DashboardResponse = {
  summary: DashboardSummary;
  recentActivity: DashboardRecentActivity[];
  cashFlow7Days: DashboardCashFlowDay[];
  alerts: DashboardAlert[];
};
