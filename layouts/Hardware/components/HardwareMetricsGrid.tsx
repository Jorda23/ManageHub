import { useMemo } from "react";

import { Box } from "@mui/material";

import { FaBoxes, FaExclamationTriangle } from "react-icons/fa";

import { MetricCard } from "@/components";
import { colors } from "@/theme/sharedColors";
import { HardwareProduct } from "@/shared";

type HardwareMetricsGridProps = {
  hardwareProducts: HardwareProduct[];
};

export function HardwareMetricsGrid({ hardwareProducts }: HardwareMetricsGridProps) {
  const totalStock = useMemo(() => {
    return hardwareProducts.reduce((total, product) => total + product.currentStock, 0);
  }, [hardwareProducts]);

  const lowStockCount = useMemo(() => {
    return hardwareProducts.filter(
      (product) =>
        product.inventoryStatus === "LowStock" || product.currentStock <= product.minimumStock,
    ).length;
  }, [hardwareProducts]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
        },
        gap: {
          xs: 1.5,
          md: 2,
        },
      }}
    >
      <MetricCard
        icon={<FaBoxes />}
        iconBg={colors.primarySoft}
        iconColor={colors.primaryLight}
        label="Productos en stock"
        value={totalStock.toString()}
        detail={`${hardwareProducts.length} productos activos`}
      />

      <MetricCard
        icon={<FaExclamationTriangle />}
        iconBg={colors.dangerSoft}
        iconColor={colors.danger}
        label="Bajo inventario"
        value={lowStockCount.toString()}
        detail="Requieren revisión"
      />
    </Box>
  );
}
