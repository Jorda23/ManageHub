export const saleCategories = ["hardware", "grains", "property"] as const;

export type SaleCategory = (typeof saleCategories)[number];

export const saleCategoryLabels: Record<SaleCategory, string> = {
  hardware: "Hardware Store",
  grains: "Basic Grains",
  property: "Real Estate",
};

export const saleCategoryHints: Record<SaleCategory, string> = {
  hardware: "Ferretería, herramientas y materiales",
  grains: "Granos básicos, silos e inventario",
  property: "Terrenos, propiedades y abonos",
};

export function isSaleCategory(value: string): value is SaleCategory {
  return saleCategories.includes(value as SaleCategory);
}
