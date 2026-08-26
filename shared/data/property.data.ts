import type { ReactNode } from "react";

import type { WorkspaceConfig } from "@/components/WorkspaceShared/workspaceTypes";
import { colors } from "@/theme/sharedColors";

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

type WorkspaceHeaderConfig = Pick<WorkspaceConfig, "category" | "badge" | "title" | "subtitle">;

export const propertyConfig: WorkspaceHeaderConfig = {
  category: "property",

  badge: "Terrenos y propiedades",

  title: "Gestión de Propiedades",

  subtitle:
    "Control de terrenos captados por clientes, compradores, abonos, saldo pendiente y estado de cuenta.",
};

export function getPendingAmount(property: PropertyItem): number {
  return Math.max(property.price - property.paid, 0);
}

export function getStatusColors(status: AccountStatus) {
  if (status === "Pagado") {
    return {
      bg: colors.greenSoft,
      color: colors.green,
      border: colors.greenBorder,
    };
  }

  if (status === "Atrasado") {
    return {
      bg: colors.dangerSoft,
      color: colors.danger,
      border: colors.dangerBorder,
    };
  }

  if (status === "Pendiente") {
    return {
      bg: colors.orangeSoft,
      color: colors.orange,
      border: colors.orangeBorder,
    };
  }

  return {
    bg: colors.primarySoft,
    color: colors.primaryLight,
    border: colors.primaryBorder,
  };
}
