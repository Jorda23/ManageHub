import type { ReactNode } from "react";

export type {
  ReportStatus,
  ReportModule,
  SaleReportRow,
  SoldPropertyRow,
  PropertyPaymentRow,
  PendingAccountRow,
  InventoryRow,
  GrainSaleRow,
  HardwareSaleRow,
  ProfitModuleRow,
  ProfitReportData,
  ReportFilters,
} from "@/shared/types/api.types";

export type ReportType =
  | "sales"
  | "sold-properties"
  | "property-payments"
  | "pending-accounts"
  | "inventory"
  | "grain-sales"
  | "hardware-sales"
  | "profit";

export type ReportColumn<T> = {
  key: string;
  header: string;
  width?: string;
  align?: "left" | "center" | "right";
  render: (row: T) => ReactNode;
};

export type ReportMetric = {
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  detail: string;
};