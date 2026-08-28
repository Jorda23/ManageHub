"use client";

import { Box, Paper, Typography } from "@mui/material";

import type { HardwareProductCardProps } from "../hardwareInventory.types";
import { colors } from "@/theme/sharedColors";

import { ProductHeader } from "./ProductHeader";
import { ProductImage } from "./ProductImage";
import { ProductInfo } from "./ProductInfo";
import { StockProgress } from "./StockProgress";
import { formatCurrency } from "@/shared";

export function HardwareProductCard({ product, onEdit }: Readonly<HardwareProductCardProps>) {
  const isLowStock = product.status === "lowStock" || product.stock <= product.minStock;

  const stockPercent =
    product.initialStock > 0
      ? Math.min(100, (product.stock / product.initialStock) * 100)
      : 100;

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
          borderColor: colors.primaryBorder,
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
            minWidth: 0,
            overflow: "hidden",
            p: {
              xs: 1,
              sm: 1.25,
              md: 1.5,
            },
            display: "flex",
            flexDirection: "column",
            gap: {
              xs: 0.7,
              sm: 0.9,
              md: 1.05,
            },
          }}
        >
          <ProductHeader product={product} isLowStock={isLowStock} onEdit={onEdit} />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: {
                xs: 0.6,
                sm: 1,
              },
              minWidth: 0,
            }}
          >
            <ProductInfo label="Detalle" value={product.detail} />

            <ProductInfo
              label="Precio"
              value={formatCurrency(product.price)}
              valueColor={colors.primary}
              align="right"
            />
          </Box>

          {product.category && (
            <Typography
              noWrap
              title={`Categoría: ${product.category}`}
              sx={{
                color: colors.muted,
                fontSize: {
                  xs: 8,
                  sm: 9,
                  md: 9.5,
                },
                fontWeight: 700,
                maxWidth: "100%",
              }}
            >
              Categoría:{" "}
              <Box
                component="span"
                sx={{
                  color: colors.text,
                  fontWeight: 900,
                }}
              >
                {product.category}
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
}
