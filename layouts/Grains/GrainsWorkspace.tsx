"use client";

import { useCallback, useMemo, useState } from "react";

import { Box, Dialog } from "@mui/material";

import { useCreateGrainProduct, useGrainProducts, useUpdateGrainProduct } from "@/hook/useGrains";

import {
  LoadingState,
  RegisterGrainSaleForm,
  AddGrainForm,
  AddGrainFormValues,
  EditGrainProductForm,
  EditGrainProductValues,
  useToast,
} from "@/components";

import type { GrainProduct } from "@/shared/types/api.types";

import { GrainInventory, type GrainInventoryItem } from "@/components/GrainInventory";

import { colors } from "@/theme/sharedColors";

import { GrainMetricsGrid, GrainsTabs, HeroHeader } from "./components";
import { normalizeCurrency } from "@/shared/utils/currency";

export type GrainsWorkspaceTab = "inventory" | "create";

export function GrainsWorkspace() {
  const { data: grainProducts = [], isLoading: isLoadingProducts } = useGrainProducts();

  const { mutateAsync: createGrainProduct, isPending: isCreatingProduct } = useCreateGrainProduct();

  const { mutateAsync: updateGrainProduct, isPending: isUpdatingProduct } = useUpdateGrainProduct();

  const { showSuccess, showError } = useToast();

  const [activeTab, setActiveTab] = useState<GrainsWorkspaceTab>("inventory");
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState<GrainProduct | null>(null);

  const products = useMemo<GrainInventoryItem[]>(() => {
    return grainProducts.map((product) => {
      const isLowStock =
        product.inventoryStatus === "LowStock" || product.currentStock <= product.minimumStock;

      return {
        id: product.id,
        code: product.code,
        name: product.name,
        unit: product.unit,
        stock: product.currentStock,
        initialStock: product.initialStock,
        minStock: product.minimumStock,
        price: product.unitPrice,
        currency: product.currency,
        silo: product.location,
        imageUrl: product.imageUrl ?? "",
        status: isLowStock ? "lowStock" : "inStock",
        accent: isLowStock ? colors.danger : colors.primaryLight,
      };
    });
  }, [grainProducts]);

  const handleCreateGrain = useCallback(
    async (values: AddGrainFormValues): Promise<void> => {
      try {
        const safeCurrency = normalizeCurrency(values.currency);

        await createGrainProduct({
          name: values.name.trim(),
          unit: values.unit.trim(),
          location: values.location.trim(),
          initialStock: Number(values.initialStock),
          minimumStock: Number(values.minimumStock),
          unitPrice: Number(values.unitPrice),
          currency: safeCurrency,
          imageUrl: values.imageUrl.trim() || null,
        });

        showSuccess("Producto de granos creado correctamente.");

        setActiveTab("inventory");
      } catch {
        showError("No se pudo crear el producto.");

        throw new Error("No se pudo crear el producto.");
      }
    },
    [createGrainProduct, showSuccess, showError],
  );

  const handleEditProduct = useCallback(
    (product: GrainInventoryItem): void => {
      const rawProduct = grainProducts.find((item) => item.id === product.id) ?? null;

      setEditingProduct(rawProduct);
    },
    [grainProducts],
  );

  const handleUpdateProduct = useCallback(
    async (id: string, values: EditGrainProductValues): Promise<void> => {
      try {
        const safeCurrency = normalizeCurrency(values.currency);

        await updateGrainProduct({
          id,
          request: {
            name: values.name.trim(),
            unit: values.unit.trim(),
            location: values.location.trim(),
            minimumStock: Number(values.minimumStock),
            unitPrice: Number(values.unitPrice),
            currency: safeCurrency,
            imageUrl: values.imageUrl.trim() || null,
          },
        });

        showSuccess("Producto de granos actualizado correctamente.");

        setEditingProduct(null);
      } catch {
        showError("No se pudo actualizar el producto.");

        throw new Error("No se pudo actualizar el producto.");
      }
    },
    [updateGrainProduct, showSuccess, showError],
  );

  if (isLoadingProducts) {
    return <LoadingState message="Cargando módulo de granos..." />;
  }

  return (
    <Box
      sx={{
        width: "100%",
        px: {
          xs: 2,
          md: 4,
        },
        py: {
          xs: 2.5,
          md: 3,
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1440,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
        }}
      >
          <HeroHeader />

          <GrainsTabs value={activeTab} onChange={setActiveTab} />

          {activeTab === "inventory" ? (
            <>
              <GrainMetricsGrid grainProducts={grainProducts} />

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    lg: "minmax(0, 1fr)",
                  },
                  gap: {
                    xs: 2,
                    md: 2.5,
                  },
                  alignItems: "start",
                  width: "100%",
                  minWidth: 0,
                }}
              >
                <GrainInventory
                  products={products}
                  onEditProduct={handleEditProduct}
                  onRegisterSale={() => setIsSaleModalOpen(true)}
                  onAddProduct={() => {
                    setActiveTab("create");
                  }}
                />

              </Box>
            </>
          ) : (
            <AddGrainForm
              isSubmitting={isCreatingProduct}
              onCancel={() => {
                setActiveTab("inventory");
              }}
              onSave={handleCreateGrain}
            />
          )}

          <EditGrainProductForm
            open={Boolean(editingProduct)}
            product={editingProduct}
            isSubmitting={isUpdatingProduct}
            onClose={() => {
              setEditingProduct(null);
            }}
            onSave={handleUpdateProduct}
          />

          <Dialog
            open={isSaleModalOpen}
            onClose={() => setIsSaleModalOpen(false)}
            fullWidth
            maxWidth={false}
            scroll="paper"
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  width: { xs: "calc(100% - 24px)", sm: "calc(100% - 64px)" },
                  maxWidth: 620,
                  maxHeight: { xs: "calc(100dvh - 24px)", sm: "calc(100dvh - 64px)" },
                  m: { xs: 1.5, sm: 4 },
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid rgba(148, 163, 184, 0.28)",
                  boxShadow: "0 28px 80px rgba(15, 23, 42, 0.24)",
                },
              },
              backdrop: {
                sx: {
                  bgcolor: "rgba(15, 23, 42, 0.56)",
                  backdropFilter: "blur(5px)",
                },
              },
            }}
          >
            <RegisterGrainSaleForm
              products={products}
              productOptionLabel={({ name, unit }) => `${name} · ${unit}`}
              onRegistered={() => setIsSaleModalOpen(false)}
            />
          </Dialog>
        </Box>
      </Box>
  );
}
