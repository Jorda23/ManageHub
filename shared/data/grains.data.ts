import type { WorkspaceConfig } from "@/components/WorkspaceShared/workspaceTypes";

export type WorkspaceHeaderConfig = Pick<
  WorkspaceConfig,
  "category" | "badge" | "title" | "subtitle"
>;

export const grainsConfig: WorkspaceHeaderConfig = {
  category: "grains",
  badge: "Módulo de Ventas",
  title: "Ventas de Granos Básicos",
  subtitle: "Inventario independiente para granos, ventas por libra, saco, quintal o kilogramo.",
};

export const paymentMethods = ["Efectivo", "Tarjeta", "Transferencia"];
