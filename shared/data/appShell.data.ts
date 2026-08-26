import { FaBuilding, FaHistory, FaLayerGroup, FaTools, FaTractor } from "react-icons/fa";
import { NavItem } from "../types";

export const navItems: NavItem[] = [
  {
    label: "Inicio",
    mobileLabel: "Inicio",
    href: "/dashboard",
    icon: FaLayerGroup,
    key: "dashboard",
  },
  {
    label: "Ferretería",
    mobileLabel: "Ferretería",
    href: "/sell/hardware",
    icon: FaTools,
    key: "hardware",
  },
  {
    label: "Granos basicos",
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
  {
    label: "Historial",
    mobileLabel: "Historial",
    href: "/history",
    icon: FaHistory,
    key: "history",
  },
];
