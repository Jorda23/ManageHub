"use client";

import { memo } from "react";

import { Box, Paper, Typography } from "@mui/material";

import type { GrainProductCardProps } from "../grainInventory.types";
import { formatCurrency } from "@/shared";
import { colors } from "@/theme/sharedColors";

import { ProductCardHeader } from "./ProductCardHeader";
import { ProductImage } from "./ProductImage";
import { ProductInfo } from "./ProductInfo";
import { StockProgress } from "./StockProgress";

export const GrainProductCard = memo(function GrainProductCard({
  product,
  onEdit,
}: Readonly<GrainProductCardProps>) {
  const stockReference = product.initialStock > 0 ? product.initialStock : product.stock;
  const stockPercent =
    stockReference > 0
      ? Math.max(0, Math.min(100, (product.stock / stockReference) * 100))
      : 0;

  const isLowStock = product.status === "lowStock" || product.stock <= product.minStock;

  const progressColor = isLowStock ? colors.danger : product.accent;

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        minWidth: 0,
        overflow: "hidden",
        borderRadius: {
          xs: "12px",
          sm: "14px",
          md: "16px",
        },
        border: `1px solid ${colors.cardBorder}`,
        bgcolor: colors.cardBg,
        transition: "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease",
        "&:hover": {
          transform: {
            xs: "none",
            md: "translateY(-2px)",
          },
          borderColor: colors.greenBorder,
          boxShadow: {
            xs: "none",
            md: "0 12px 26px rgba(15, 23, 42, 0.08)",
          },
        },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "76px minmax(0, 1fr)",
            sm: "88px minmax(0, 1fr)",
            md: "96px minmax(0, 1fr)",
            lg: "100px minmax(0, 1fr)",
          },
          minHeight: {
            xs: 126,
            sm: 136,
            md: 145,
            lg: 150,
          },
          "@media (max-width: 340px)": {
            gridTemplateColumns: "68px minmax(0, 1fr)",
          },
        }}
      >
        <ProductImage product={product} isLowStock={isLowStock} />

        <Box
          sx={{
            p: { xs: 1, sm: 1.25, md: 1.5 },
            display: "flex",
            flexDirection: "column",
            gap: { xs: 0.7, sm: 0.9, md: 1.05 },
            minWidth: 0,
            overflow: "hidden",
          }}
        >
          <ProductCardHeader product={product} isLowStock={isLowStock} onEdit={onEdit} />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: { xs: 0.6, sm: 1 },
              minWidth: 0,
            }}
          >
            <ProductInfo label="Unidad" value={product.unit} />

            <ProductInfo
              label="Precio"
              value={formatCurrency(product.price, product.currency)}
              valueColor={colors.orange}
              align="right"
            />
          </Box>

          {product.silo && (
            <Typography
              noWrap
              title={`Ubicación: ${product.silo}`}
              sx={{
                color: colors.muted,
                fontSize: { xs: 8, sm: 9, md: 9.5 },
                fontWeight: 700,
                maxWidth: "100%",
              }}
            >
              Ubicación:{" "}
              <Box
                component="span"
                sx={{
                  color: colors.text,
                  fontWeight: 900,
                }}
              >
                {product.silo}
              </Box>
            </Typography>
          )}

          <StockProgress
            stock={product.stock}
            stockPercent={stockPercent}
            progressColor={progressColor}
            isLowStock={isLowStock}
          />
        </Box>
      </Box>
    </Paper>
  );
});
