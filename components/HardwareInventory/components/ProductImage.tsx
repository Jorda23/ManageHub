"use client";

import { Box, Chip } from "@mui/material";
import { FaTools } from "react-icons/fa";

import type { HardwareProductImageProps } from "../hardwareInventory.types";
import { colors } from "@/theme/sharedColors";

export function ProductImage({ product, isLowStock }: Readonly<HardwareProductImageProps>) {
  return (
    <Box
      role="img"
      aria-label={`Imagen de ${product.name}`}
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        minWidth: 0,
        minHeight: {
          xs: 126,
          sm: 136,
          md: 145,
          lg: 150,
        },
        display: "grid",
        placeItems: "center",
        bgcolor: colors.orangeSoft,
        backgroundImage: product.imageUrl
          ? `
              linear-gradient(
                to bottom,
                rgba(120, 53, 15, 0.01),
                rgba(120, 53, 15, 0.18)
              ),
              url("${product.imageUrl}")
            `
          : `linear-gradient(135deg, ${colors.orangeSoft}, ${colors.orangeBorder})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {!product.imageUrl && (
        <Box
          aria-hidden="true"
          sx={{
            display: "grid",
            placeItems: "center",
            color: colors.primary,
            opacity: 0.45,
            fontSize: {
              xs: 20,
              sm: 23,
              md: 26,
            },
          }}
        >
          <FaTools />
        </Box>
      )}

      <Chip
        label={isLowStock ? "Stock bajo" : "Disponible"}
        size="small"
        sx={{
          position: "absolute",
          left: {
            xs: 4,
            sm: 6,
            md: 8,
          },
          bottom: {
            xs: 5,
            sm: 6,
            md: 8,
          },
          maxWidth: {
            xs: "calc(100% - 8px)",
            sm: "calc(100% - 12px)",
            md: "calc(100% - 16px)",
          },
          height: {
            xs: 18,
            sm: 20,
            md: 21,
          },
          bgcolor: isLowStock ? colors.dangerSoft : colors.greenSoft,
          color: isLowStock ? colors.danger : colors.green,
          border: `1px solid ${isLowStock ? colors.dangerBorder : colors.greenBorder}`,
          fontSize: {
            xs: 6.8,
            sm: 7.5,
            md: 8,
          },
          fontWeight: 950,
          backdropFilter: "blur(5px)",
          "& .MuiChip-label": {
            px: {
              xs: 0.45,
              sm: 0.65,
              md: 0.8,
            },
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
        }}
      />
    </Box>
  );
}
