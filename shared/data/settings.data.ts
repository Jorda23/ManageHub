import { saleCategories } from "./saleWorkspace.data";

export const APP_DISPLAY_NAME = "AdminNegocio";

const MODULE_LABELS: Record<(typeof saleCategories)[number], string> = {
  hardware: "Ferretería",
  grains: "Granos",
  property: "Terrenos",
};

export const enabledModules: ReadonlyArray<string> = saleCategories.map(
  (category) => MODULE_LABELS[category],
);