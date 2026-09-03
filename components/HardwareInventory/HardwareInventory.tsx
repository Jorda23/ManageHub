"use client";

import { Box, Paper } from "@mui/material";
import { FaBoxOpen } from "react-icons/fa";
import { colors } from "@/theme/sharedColors";

import { EmptyState } from "../EmptyState";
import type { HardwareInventoryProps } from "./hardwareInventory.types";
import { HardwareProductCard, InventoryHeader } from "./components";

export function HardwareInventory({
  products,
  onAddProduct,
  onEditProduct,
  onRegisterSale,
}: Readonly<HardwareInventoryProps>) {
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
        boxShadow: "0 10px 28px rgba(15, 23, 42, 0.06)",
      }}
    >
      <InventoryHeader onAddProduct={onAddProduct} onRegisterSale={onRegisterSale} />

      <Box
        sx={{
          maxHeight: {
            xs: 460,
            sm: 500,
            md: 540,
            lg: 580,
          },
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarGutter: "stable",
          p: {
            xs: 1,
            sm: 1.5,
            md: 2,
            lg: 2.5,
          },
          pr: {
            xs: 0.75,
            sm: 1,
            md: 1.25,
            lg: 1.5,
          },
          "&::-webkit-scrollbar": {
            width: {
              xs: 5,
              sm: 7,
              md: 8,
            },
          },
          "&::-webkit-scrollbar-track": {
            bgcolor: colors.tableHead,
            borderRadius: 999,
          },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: colors.softMuted,
            borderRadius: 999,
            border: `2px solid ${colors.tableHead}`,
          },
          "&::-webkit-scrollbar-thumb:hover": {
            bgcolor: colors.muted,
          },
          scrollbarWidth: "thin",
          scrollbarColor: `${colors.softMuted} ${colors.tableHead}`,
        }}
      >
        {products.length === 0 ? (
          <EmptyState
            title="No hay productos registrados"
            description="Agrega el primer producto al inventario de ferretería."
            icon={<FaBoxOpen size={40} />}
          />
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "minmax(0, 1fr)",
                md: "repeat(2, minmax(0, 1fr))",
                xl: "repeat(3, minmax(0, 1fr))",
              },
              gap: {
                xs: 1,
                sm: 1.5,
                md: 2,
              },
              width: "100%",
              minWidth: 0,
            }}
          >
            {products.map((product) => (
              <HardwareProductCard key={product.id} product={product} onEdit={onEditProduct} />
            ))}
          </Box>
        )}
      </Box>
    </Paper>
  );
}
