"use client";

import { Box, LinearProgress, Typography } from "@mui/material";

import type { StockProgressProps } from "../grainInventory.types";
import { colors } from "@/theme/sharedColors";

export function StockProgress({
  stock,
  minStock,
  stockPercent,
  progressColor,
  isLowStock,
}: Readonly<StockProgressProps>) {
  return (
    <Box sx={{ mt: "auto", minWidth: 0 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 0.55,
          gap: 1,
        }}
      >
        <Typography
          noWrap
          sx={{
            color: colors.softMuted,
            fontSize: { xs: 10, sm: 10, md: 11 },
            fontWeight: 950,
            textTransform: "uppercase",
          }}
        >
          Stock actual
        </Typography>

        <Typography
          sx={{
            color: isLowStock ? colors.danger : colors.text,
            fontSize: { xs: 12, sm: 12, md: 13 },
            fontWeight: 950,
            fontVariantNumeric: "tabular-nums",
            flexShrink: 0,
          }}
        >
          {stock}
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={stockPercent}
        sx={{
          height: { xs: 5, sm: 5, md: 6 },
          borderRadius: 999,
          bgcolor: colors.tableHead,
          "& .MuiLinearProgress-bar": {
            bgcolor: progressColor,
            borderRadius: 999,
          },
        }}
      />

      <Typography
        noWrap
        sx={{
          mt: 0.45,
          color: colors.softMuted,
          fontSize: { xs: 10, sm: 10, md: 11 },
          fontWeight: 700,
          textAlign: "right",
        }}
      >
        Mínimo: {minStock}
      </Typography>
    </Box>
  );
}
