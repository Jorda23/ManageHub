import type { DashboardIcon } from "@/shared/types/dashboard.types";

export type WorkspaceProduct = {
  name: string;
  detail: string;
  code: string;
  qty: number;
  unit: string;
  total: string;
  accent: string;
  icon: DashboardIcon;
};

export type WorkspacePayment = {
  icon: DashboardIcon;
  title: string;
  subtitle: string;
  active?: boolean;
};

export type WorkspaceCustomer = {
  name: string;
  detail: string;
  status: "Pagado" | "Pendiente" | "Atrasado" | "Al día";
  amount: string;
};

export type WorkspaceMetric = {
  label: string;
  value: string;
  detail: string;
  icon: DashboardIcon;
};

export type WorkspaceAnalysisItem = {
  label: "Día" | "Semana" | "Mes";
  value: string;
  detail: string;
  progress: number;
};

export type WorkspaceConfig = {
  category: "hardware" | "grains" | "property";
  badge: string;
  title: string;
  subtitle: string;
  heroAccent: string;
  heroSecondary: string;
  invoice: string;
  customer: string;
  customerEmail: string;
  agent: string;
  terminal: string;
  summaryLabel: string;
  summaryTotal: string;
  summaryNote: string;
  customerMode: "directory" | "quick";
  dueDate?: string;
  paymentState?: "Pagado" | "Pendiente" | "Atrasado" | "Al día";
  totalAmount?: string;
  paidAmount?: string;
  customerList?: WorkspaceCustomer[];
  metrics: WorkspaceMetric[];
  products: WorkspaceProduct[];
  payments: WorkspacePayment[];
  salesAnalysis: WorkspaceAnalysisItem[];
  workflowTitle: string;
  workflowItems: string[];
};

export type WorkspaceHeaderConfig = Pick<
  WorkspaceConfig,
  "category" | "badge" | "title" | "subtitle"
>;
