"use client";

import { Box, CircularProgress, Paper } from "@mui/material";

import { FaBoxOpen } from "react-icons/fa";

import { EmptyState } from "../EmptyState";
import { LoadingState } from "../LoadingState";

import { useInfiniteScroll } from "@/hook/useInfiniteScroll";

import { colors } from "@/theme/sharedColors";

import type { GrainInventoryProps } from "./grainInventory.types";

import { GrainProductCard, InventoryHeader } from "./components";

const inventoryContentSx = {
  overflowY: {
    xs: "auto",
    md: "visible",
  },

  overflowX: "hidden",

  p: {
    xs: 1.25,
    sm: 1.5,
    md: 1.75,
  },

  pr: {
    xs: 0.75,
    sm: 1,
    md: 1.75,
  },

  scrollbarGutter: {
    xs: "stable",
    md: "auto",
  },

  "&::-webkit-scrollbar": {
    width: 6,
  },

  "&::-webkit-scrollbar-track": {
    bgcolor: "transparent",
  },

  "&::-webkit-scrollbar-thumb": {
    bgcolor: "#cbd5e1",
    borderRadius: 999,
  },

  "&::-webkit-scrollbar-thumb:hover": {
    bgcolor: "#94a3b8",
  },

  scrollbarWidth: "thin",
  scrollbarColor: "#cbd5e1 transparent",
};

export function GrainInventory({
  products,
  search,
  onSearchChange,
  isInitialLoading = false,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
  onAddProduct,
  onEditProduct,
  onRegisterSale,
}: Readonly<GrainInventoryProps>) {
  const { rootRef, sentinelRef } = useInfiniteScroll<HTMLDivElement>({
    hasMore,
    isLoadingMore,
    onLoadMore: () => {
      onLoadMore?.();
    },
  });

  const hasProducts = products.length > 0;

  const renderContent = () => {
    if (isInitialLoading && !hasProducts) {
      return <LoadingState message="Cargando productos..." />;
    }

    if (!hasProducts && search) {
      return (
        <EmptyState
          title="Sin resultados"
          description={`No se encontraron productos que coincidan con "${search}".`}
          icon={<FaBoxOpen size={36} />}
        />
      );
    }

    if (!hasProducts) {
      return (
        <EmptyState
          title="No hay productos registrados"
          description="Agrega el primer producto al inventario de granos."
          icon={<FaBoxOpen size={36} />}
        />
      );
    }

    return (
      <>
        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "minmax(0, 1fr)",
              md: "repeat(2, minmax(0, 1fr))",
              xl: "repeat(3, minmax(0, 1fr))",
            },

            gap: {
              xs: 1.25,
              sm: 1.5,
              md: 1.75,
            },

            width: "100%",
            minWidth: 0,
          }}
        >
          {products.map((product) => (
            <GrainProductCard key={product.id} product={product} onEdit={onEditProduct} />
          ))}
        </Box>

        {isLoadingMore && (
          <Box
            sx={{
              py: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress
              size={20}
              thickness={4}
              sx={{
                color: colors.primary,
              }}
            />
          </Box>
        )}

        {hasMore && (
          <Box
            ref={sentinelRef}
            aria-hidden="true"
            sx={{
              height: 1,
            }}
          />
        )}
      </>
    );
  };

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

        boxShadow: "0 10px 28px rgba(15, 23, 42, 0.05)",
      }}
    >
      <InventoryHeader
        search={search}
        onSearchChange={onSearchChange}
        onAddProduct={onAddProduct}
        onRegisterSale={onRegisterSale}
      />

      <Box ref={rootRef} sx={inventoryContentSx}>
        {renderContent()}
      </Box>
    </Paper>
  );
}
