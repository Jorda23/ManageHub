"use client";

import { Box, IconButton, Typography } from "@mui/material";
import { FaCheckCircle, FaEdit, FaExclamationTriangle } from "react-icons/fa";

import type { ProductCardHeaderProps } from "../grainInventory.types";
import { colors } from "@/theme/sharedColors";

export function ProductCardHeader({
  product,
  isLowStock,
  onEdit,
}: Readonly<ProductCardHeaderProps>) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: { xs: 0.5, sm: 1 },
        minWidth: 0,
      }}
    >
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.4, sm: 0.6 },
            minWidth: 0,
          }}
        >
          <Typography
            noWrap
            title={product.name}
            sx={{
              color: colors.text,
              fontSize: { xs: 11, sm: 12, md: 13 },
              fontWeight: 950,
              minWidth: 0,
              maxWidth: "100%",
            }}
          >
            {product.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            {isLowStock ? (
              <FaExclamationTriangle size={10} color={colors.danger} />
            ) : (
              <FaCheckCircle size={10} color={colors.green} />
            )}
          </Box>
        </Box>

        <Typography
          noWrap
          title={product.code}
          sx={{
            mt: 0.15,
            color: colors.softMuted,
            fontSize: { xs: 8, sm: 9, md: 9.5 },
            fontWeight: 700,
          }}
        >
          {product.code}
        </Typography>
      </Box>

      <IconButton
        type="button"
        size="small"
        aria-label={`Editar ${product.name}`}
        disabled={!onEdit}
        onClick={() => {
          onEdit?.(product);
        }}
        sx={{
          width: { xs: 25, sm: 27, md: 29 },
          height: { xs: 25, sm: 27, md: 29 },
          bgcolor: colors.tableHead,
          border: `1px solid ${colors.cardBorder}`,
          color: colors.muted,
          flexShrink: 0,
          "&:hover": {
            bgcolor: colors.greenSoft,
            color: colors.green,
          },
          "&.Mui-disabled": {
            opacity: 0.5,
          },
        }}
      >
        <FaEdit size={11} />
      </IconButton>
    </Box>
  );
}
