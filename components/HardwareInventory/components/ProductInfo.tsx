"use client";

import { Box, Typography } from "@mui/material";

import type { HardwareProductInfoProps } from "../hardwareInventory.types";
import { colors } from "@/theme/sharedColors";

export function ProductInfo({
  label,
  value,
  valueColor = colors.text,
  align = "left",
}: Readonly<HardwareProductInfoProps>) {
  return (
    <Box
      sx={{
        minWidth: 0,
        overflow: "hidden",
        textAlign: align,
      }}
    >
      <Typography
        noWrap
        sx={{
          color: colors.muted,
          fontSize: {
            xs: 10,
            sm: 10,
            md: 11,
          },
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </Typography>

      <Typography
        noWrap
        title={value}
        sx={{
          mt: 0.15,
          color: valueColor,
          fontSize: {
            xs: 12,
            sm: 12,
            md: 13,
          },
          fontWeight: 950,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
