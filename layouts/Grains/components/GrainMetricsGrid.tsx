import { useMemo } from "react";

import { Box } from "@mui/material";

import { FaBoxes, FaExclamationTriangle } from "react-icons/fa";

import { MetricCard } from "@/components";
import { colors } from "@/theme/sharedColors";
import { GrainProduct } from "@/shared";

type GrainMetricsGridProps = {
  grainProducts: GrainProduct[];
};

export function GrainMetricsGrid({ grainProducts }: GrainMetricsGridProps) {
  const totalInventory = useMemo(() => {
    return grainProducts.reduce((total, product) => total + product.currentStock, 0);
  }, [grainProducts]);

  const lowStockCount = useMemo(() => {
    return grainProducts.filter(
      (product) =>
        product.inventoryStatus === "LowStock" || product.currentStock <= product.minimumStock,
    ).length;
  }, [grainProducts]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
        },
        gap: 2.5,
      }}
    >
      <MetricCard
        icon={<FaBoxes />}
        iconBg={colors.primarySoft}
        iconColor={colors.primaryLight}
        label="Productos en stock"
        value={totalInventory.toString()}
        detail={`${grainProducts.length} productos activos`}
      />

      <MetricCard
        icon={<FaExclamationTriangle />}
        iconBg={colors.orangeSoft}
        iconColor={colors.orange}
        label="Bajo inventario"
        value={lowStockCount.toString()}
        detail="Requieren revisión"
      />
    </Box>
  );
}
