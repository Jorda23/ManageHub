import {
  FaBoxes,
  FaBuilding,
  FaChartLine,
  FaChartPie,
  FaCoins,
  FaTools,
  FaTractor,
  FaWallet,
} from "react-icons/fa";
import type { IconType } from "react-icons";

import type { ReportType } from "../types/reports.types";

export type ReportTypeConfig = {
  value: ReportType;
  label: string;
  icon: IconType;
};

export const reportTypes: ReportTypeConfig[] = [
  { value: "sales", label: "Reporte de ventas", icon: FaChartLine },
  { value: "sold-properties", label: "Terrenos vendidos", icon: FaBuilding },
  { value: "property-payments", label: "Pagos de terrenos", icon: FaCoins },
  { value: "pending-accounts", label: "Cuentas pendientes", icon: FaWallet },
  { value: "inventory", label: "Inventario", icon: FaBoxes },
  { value: "grain-sales", label: "Ventas de granos", icon: FaTractor },
  { value: "hardware-sales", label: "Ventas de ferretería", icon: FaTools },
  { value: "profit", label: "Reporte de ganancias", icon: FaChartPie },
];

export const reportTypeLabel = (type: ReportType): string =>
  reportTypes.find((item) => item.value === type)?.label ?? type;