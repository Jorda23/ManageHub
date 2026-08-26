import type { WorkspaceConfig } from "@/components/WorkspaceShared/workspaceTypes";

type WorkspaceHeaderConfig = Pick<WorkspaceConfig, "category" | "badge" | "title" | "subtitle">;

export const hardwareConfig: WorkspaceHeaderConfig = {
  category: "hardware",
  badge: "Ferretería",
  title: "Ventas de Ferretería",
  subtitle: "Control de productos, cantidades, precios, inventario e historial de ventas.",
};

export const hardwarePaymentMethods = [
  "Efectivo",
  "Tarjeta",
  "Crédito local",
  "Transferencia",
] as const;
