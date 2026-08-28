"use client";

import { Box, LinearProgress, Typography } from "@mui/material";

import type { StockProgressProps } from "../grainInventory.types";
import { colors } from "@/theme/sharedColors";

export function StockProgress({
  stock,
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
            fontWeight: 950,
            fontSize: {
              xs: 10,
              sm: 10,
              md: 11,
            },
            textTransform: "uppercase",
          }}
        >
          Stock actual
        </Typography>

        <Typography
          noWrap
          sx={{
            flexShrink: 0,
            color: isLowStock ? colors.danger : progressColor,
            fontWeight: 950,
            fontSize: {
              xs: 11,
              sm: 11,
              md: 12,
            },
          }}
        >
          {stock} · {Math.round(stockPercent)}%
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={stockPercent}
        aria-label={`Stock actual ${Math.round(stockPercent)}%`}
        sx={{
          height: {
            xs: 6,
            sm: 6,
            md: 7,
          },
          borderRadius: 999,
          bgcolor: "#e5e7eb",
          "& .MuiLinearProgress-bar": {
            bgcolor: progressColor,
            borderRadius: 999,
          },
        }}
      />
    </Box>
  );
}
