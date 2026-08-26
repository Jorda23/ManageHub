import { ModuleCard } from "../types/dashboard.types";

export const modules: ModuleCard[] = [
  {
    eyebrow: "FERRETERIA",
    title: "Ventas de ferreteria",
    description: "Administra productos, existencias, precios y ventas del negocio de ferreteria.",
    image:
      "https://images.unsplash.com/photo-1519520104014-df63821cb6f9?q=80&w=1170&auto=format&fit=crop",
    href: "/sell/hardware",
    stats: [
      { value: "$106.90", label: "VENTAS HOY" },
      { value: "216", label: "EN STOCK" },
      { value: "4", label: "PRODUCTOS" },
    ],
  },
  {
    eyebrow: "GRANOS BASICOS",
    title: "Ventas de granos",
    description: "Controla inventario y ventas por libra, saco, quintal o kilogramo.",
    image:
      "https://images.unsplash.com/photo-1645331465778-eb409d112198?q=80&w=687&auto=format&fit=crop",
    href: "/sell/grains",
    stats: [
      { value: "$38.25", label: "VENTAS HOY" },
      { value: "324", label: "UNIDADES" },
      { value: "4", label: "PRODUCTOS" },
    ],
  },
  {
    eyebrow: "TERRENOS",
    title: "Propiedades y abonos",
    description: "Consulta propiedades vendidas, clientes, cuotas, saldos y pagos pendientes.",
    image:
      "https://images.unsplash.com/photo-1672861847378-e15e90cc25ca?q=80&w=1332&auto=format&fit=crop",
    href: "/sell/property",
    stats: [
      { value: "4", label: "PROPIEDADES" },
      { value: "$41.1k", label: "ABONADO" },
      { value: "$73.7k", label: "PENDIENTE" },
    ],
  },
];
