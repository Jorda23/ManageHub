"use client";

import { useMemo, useState } from "react";

import { Box } from "@mui/material";

import { useCreateGrainProduct, useGrainProducts } from "@/hook/useGrains";

import {
  LoadingState,
  SectionCard,
  RegisterGrainSaleForm,
  AppShell,
  AddGrainForm,
  AddGrainFormValues,
} from "@/components";

import { GrainInventory, type GrainProduct } from "@/components/GrainInventory";

import { grainsConfig } from "@/shared/data/grains.data";
import { colors } from "@/theme/sharedColors";

import { GrainMetricsGrid, GrainsTabs, HeroHeader } from "./components";

export type GrainsWorkspaceTab = "inventory" | "create";

export function GrainsWorkspace() {
  const { data: grainProducts = [], isLoading: isLoadingProducts } = useGrainProducts();

  const { mutateAsync: createGrainProduct, isPending: isCreatingProduct } = useCreateGrainProduct();

  const [activeTab, setActiveTab] = useState<GrainsWorkspaceTab>("inventory");

  const products = useMemo<GrainProduct[]>(() => {
    return grainProducts.map((product) => {
      const isLowStock =
        product.inventoryStatus === "LowStock" || product.stock <= product.minimumStock;

      return {
        id: product.id,
        code: product.code,
        name: product.name,
        unit: product.unit,
        stock: product.stock,
        initialStock: product.initialStock,
        minStock: product.minimumStock,
        price: product.unitPrice,
        silo: product.location,
        imageUrl: product.imageUrl ?? "",
        status: isLowStock ? "lowStock" : "inStock",
        accent: isLowStock ? colors.danger : colors.primaryLight,
      };
    });
  }, [grainProducts]);

  const handleCreateGrain = async (values: AddGrainFormValues): Promise<void> => {
    try {
      await createGrainProduct({
        name: values.name.trim(),
        unit: values.unit.trim(),
        location: values.location.trim(),
        initialStock: Number(values.initialStock),
        minimumStock: Number(values.minimumStock),
        unitPrice: Number(values.unitPrice),
        imageUrl: values.imageUrl.trim() || null,
      });

      setActiveTab("inventory");
    } catch {
      throw new Error("No se pudo crear el producto.");
    }
  };

  const handleEditProduct = (product: GrainProduct): void => {
    console.log("Editar producto:", product);
  };

  if (isLoadingProducts) {
    return (
      <AppShell active={grainsConfig.category}>
        <LoadingState message="Cargando módulo de granos..." />
      </AppShell>
    );
  }

  return (
    <AppShell active={grainsConfig.category}>
      <Box
        sx={{
          width: "100%",
          minHeight: "calc(100vh - 48px)",
          px: {
            xs: 2,
            md: 4,
          },
          py: {
            xs: 2.5,
            md: 3,
          },
          bgcolor: colors.pageBg,
          color: colors.text,
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
                    lg: "minmax(0, 2fr) minmax(340px, 1fr)",
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
                  onAddProduct={() => {
                    setActiveTab("create");
                  }}
                />

                <SectionCard
                  sx={{
                    height: "100%",
                  }}
                >
                  <RegisterGrainSaleForm
                    products={products}
                    productOptionLabel={({ name, unit }) => `${name} · ${unit}`}
                  />
                </SectionCard>
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
        </Box>
      </Box>
    </AppShell>
  );
}
