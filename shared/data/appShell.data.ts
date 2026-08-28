import { FaBuilding, FaHistory, FaLayerGroup, FaTools, FaTractor } from "react-icons/fa";
import type { SidebarSection } from "../types";

/**
 * Navegación del sidebar.
 *
 * Para agregar un ítem nuevo:
 *  1. Añade su `key` al tipo `SidebarItemKey` (abajo).
 *  2. Añade un objeto a la sección que corresponda dentro de `sidebarSections`.
 *
 * El tipo `AppShellSection` se deriva de `SidebarItemKey`, así al agregar
 * una key el resto del sistema (páginas y sidebar) lo reconoce automáticamente.
 */
export type SidebarItemKey = "dashboard" | "hardware" | "grains" | "property" | "history";

export const sidebarSections: SidebarSection[] = [
  {
    id: "general",
    title: "General",
    items: [
      {
        label: "Inicio",
        mobileLabel: "Inicio",
        href: "/dashboard",
        icon: FaLayerGroup,
        key: "dashboard",
      },
    ],
  },
  {
    id: "sales",
    title: "Ventas",
    items: [
      {
        label: "Ferretería",
        mobileLabel: "Ferretería",
        href: "/sell/hardware",
        icon: FaTools,
        key: "hardware",
      },
      {
        label: "Granos básicos",
        mobileLabel: "Granos",
        href: "/sell/grains",
        icon: FaTractor,
        key: "grains",
      },
      {
        label: "Terrenos",
        mobileLabel: "Terrenos",
        href: "/sell/property",
        icon: FaBuilding,
        key: "property",
      },
    ],
  },
  {
    id: "consultas",
    title: "Consultas",
    items: [
      {
        label: "Historial",
        mobileLabel: "Historial",
        href: "/history",
        icon: FaHistory,
        key: "history",
      },
    ],
  },
];
