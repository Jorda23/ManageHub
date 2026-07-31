import type { ReactNode } from "react";

import type { WorkspaceConfig } from "@/components/WorkspaceShared/workspaceTypes";
import { propertyColors } from "@/theme/sharedColors";

export type AccountStatus = "Al día" | "Pendiente" | "Atrasado" | "Pagado";

export type PropertyItem = {
  id: string;
  name: string;
  code: string;
  location: string;
  size: string;
  price: number;
  paid: number;
  buyerName: string;
  buyerEmail: string;
  dueDate: string;
  status: AccountStatus;
  accent: string;
  imageUrl: string;
  ownerName: string;
  ownerPhone?: string;
  ownerDocument?: string;
};

export type PaymentRecord = {
  id: string;
  propertyId: string;
  propertyName: string;
  buyerName: string;
  amount: number;
  method: string;
  date: string;
  note: string;
};

export type PropertyMetric = {
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  detail: string;
};

export const colors = propertyColors;

export const propertyConfig: WorkspaceConfig = {
  category: "property",
  badge: "Terrenos y propiedades",
  title: "Gestión de Propiedades",
  subtitle:
    "Control de terrenos captados por clientes, compradores, abonos, saldo pendiente y estado de cuenta.",
  heroAccent: "#93c5fd",
  heroSecondary: "#5ee3a7",
  invoice: "#PRP-2026-021",
  customer: "Valeria Gómez",
  customerEmail: "valeria.gomez@assethub.com",
  agent: "R. Salazar",
  terminal: "Oficina Terrenos 03",
  customerMode: "directory",
  summaryLabel: "Estado de cuenta",
  summaryTotal: "$18,450.00",
  summaryNote:
    "Módulo para registrar terrenos de clientes, asociar compradores y controlar sus pagos.",
  dueDate: "10 noviembre 2026",
  paymentState: "Pendiente",
  totalAmount: "$18,450.00",
  paidAmount: "$4,500.00",
  customerList: [],
  metrics: [],
  products: [],
  payments: [],
  salesAnalysis: [],
  workflowTitle: "Flujo propiedades",
  workflowItems: [
    "Registrar o seleccionar terreno",
    "Asociar comprador",
    "Registrar abono y actualizar saldo",
  ],
};

export const initialProperties: PropertyItem[] = [
  {
    id: "lot-a12",
    name: "Lote A-12",
    code: "PRP-LT-012",
    location: "Residencial Las Colinas",
    size: "450 m²",
    price: 17900,
    paid: 4500,
    ownerName: "Valeria Gómez",
    buyerName: "Valeria Gómez",
    buyerEmail: "valeria.gomez@email.com",
    dueDate: "10 noviembre 2026",
    status: "Pendiente",
    accent: "#2563eb",
    imageUrl:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "lot-b08",
    name: "Lote B-08",
    code: "PRP-LT-008",
    location: "Urbanización San Miguel",
    size: "380 m²",
    price: 18450,
    paid: 18450,
    ownerName: "Carlos Mendoza",
    buyerName: "Carlos Mendoza",
    buyerEmail: "carlos.mendoza@email.com",
    dueDate: "Pagado",
    status: "Pagado",
    accent: "#0f766e",
    imageUrl:
      "https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "lot-c21",
    name: "Lote C-21",
    code: "PRP-LT-021",
    location: "Sector Norte",
    size: "520 m²",
    price: 22500,
    paid: 6200,
    ownerName: "Andrea Ruiz",
    buyerName: "Andrea Ruiz",
    buyerEmail: "andrea.ruiz@email.com",
    dueDate: "Vencido hace 5 días",
    status: "Atrasado",
    accent: "#dc2626",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "house-r04",
    name: "Casa R-04",
    code: "PRP-CS-004",
    location: "Carretera Sur",
    size: "180 m² construcción",
    price: 56000,
    paid: 12000,
    ownerName: "Propietario por confirmar",
    buyerName: "Pendiente de asignar",
    buyerEmail: "Sin comprador",
    dueDate: "Sin fecha",
    status: "Al día",
    accent: "#7c3aed",
    imageUrl:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80",
  },
];

export const initialPayments: PaymentRecord[] = [
  {
    id: "pay-001",
    propertyId: "lot-a12",
    propertyName: "Lote A-12",
    buyerName: "Valeria Gómez",
    amount: 2500,
    method: "Transferencia",
    date: "9/7/26, 10:40 a. m.",
    note: "Abono inicial",
  },
  {
    id: "pay-002",
    propertyId: "lot-a12",
    propertyName: "Lote A-12",
    buyerName: "Valeria Gómez",
    amount: 2000,
    method: "Efectivo",
    date: "9/7/26, 11:12 a. m.",
    note: "Segundo abono",
  },
  {
    id: "pay-003",
    propertyId: "lot-b08",
    propertyName: "Lote B-08",
    buyerName: "Carlos Mendoza",
    amount: 18450,
    method: "Transferencia",
    date: "8/7/26, 3:15 p. m.",
    note: "Cancelación total",
  },
];

export const paymentMethods = [
  "Efectivo",
  "Transferencia",
  "Depósito bancario",
  "Cheque",
];

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function getPendingAmount(property: PropertyItem): number {
  return Math.max(property.price - property.paid, 0);
}

export function getStatusColors(status: AccountStatus) {
  if (status === "Pagado") {
    return {
      bg: colors.greenSoft,
      color: colors.green,
      border: "#bbf7d0",
    };
  }

  if (status === "Atrasado") {
    return {
      bg: colors.dangerSoft,
      color: colors.danger,
      border: "#fecaca",
    };
  }

  if (status === "Pendiente") {
    return {
      bg: colors.orangeSoft,
      color: colors.orange,
      border: "#fed7aa",
    };
  }

  return {
    bg: colors.primarySoft,
    color: colors.primaryLight,
    border: "#bfdbfe",
  };
}
