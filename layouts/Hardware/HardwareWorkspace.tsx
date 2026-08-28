"use client";

import {
  useMemo,
  useState,
} from "react";

import { Box } from "@mui/material";

import {
  useCreateHardwareProduct,
  useHardwareProducts,
} from "@/hook/useHardware";

import {
  LoadingState,
  SectionCard,
  RegisterHardwareSaleForm,
  AppShell,
  HardwareInventory,
  HardwareProduct,
  AddHardwareProductValues,
  AddHardwareProductForm,
} from "@/components";

import {
  hardwareConfig,
} from "@/shared";

import { colors } from "@/theme/sharedColors";

import {
  HardwareMetricsGrid,
  HardwareTabs,
  HardwareWorkspaceHero,
} from "./components";

export type HardwareWorkspaceTab =
  | "inventory"
  | "create";

export function HardwareWorkspace() {
  const {
    data: hardwareProducts = [],
    isLoading: isLoadingProducts,
  } = useHardwareProducts();

  const {
    mutateAsync: createHardwareProduct,
    isPending: isCreatingProduct,
  } = useCreateHardwareProduct();

  const [
    activeTab,
    setActiveTab,
  ] =
    useState<HardwareWorkspaceTab>(
      "inventory",
    );

  const products =
    useMemo<HardwareProduct[]>(() => {
      return hardwareProducts.map(
        (product) => {
          const isLowStock =
            product.inventoryStatus ===
              "LowStock" ||
            product.stock <=
              product.minimumStock;

          return {
            id: product.id,
            name: product.name,
            detail: product.detail,
            category: product.category,
            code: product.code,
            stock: product.stock,
            initialStock:
              product.initialStock,
            minStock:
              product.minimumStock,
            price: product.unitPrice,

            status: isLowStock
              ? "lowStock"
              : "inStock",

            accent: isLowStock
              ? colors.danger
              : colors.primaryLight,

            imageUrl:
              product.imageUrl ?? "",
          };
        },
      );
    }, [hardwareProducts]);

  const handleAddProduct = async (
    formValues: AddHardwareProductValues,
  ): Promise<void> => {
    try {
      await createHardwareProduct({
        name:
          formValues.name.trim(),

        detail:
          formValues.detail.trim(),

        category:
          formValues.category.trim(),

        initialStock: Number(
          formValues.initialStock,
        ),

        minimumStock: Number(
          formValues.minimumStock,
        ),

        unitPrice: Number(
          formValues.unitPrice,
        ),

        inventoryStatus:
          formValues.inventoryStatus,

        imageUrl:
          formValues.imageUrl.trim() ||
          null,
      });

      setActiveTab("inventory");
    } catch {
      throw new Error(
        "No se pudo crear el producto.",
      );
    }
  };

  const handleEditProduct = (
    product: HardwareProduct,
  ): void => {
    console.log(
      "Editar producto de ferretería:",
      product,
    );
  };

  if (isLoadingProducts) {
    return (
      <AppShell
        active={
          hardwareConfig.category
        }
      >
        <LoadingState message="Cargando módulo de Ferretería..." />
      </AppShell>
    );
  }

  return (
    <AppShell
      active={hardwareConfig.category}
    >
      <Box
        sx={{
          width: "100%",

          minHeight:
            "calc(100vh - 48px)",

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

            flexDirection:
              "column",

            gap: 2.5,
          }}
        >
          <HardwareWorkspaceHero
            badge={
              hardwareConfig.badge
            }
            title={
              hardwareConfig.title
            }
            subtitle={
              hardwareConfig.subtitle
            }
          />

          <HardwareTabs
            value={activeTab}
            onChange={setActiveTab}
          />

          {activeTab ===
          "inventory" ? (
            <>
              <HardwareMetricsGrid
                hardwareProducts={
                  hardwareProducts
                }
              />

              <Box
                sx={{
                  display: "grid",

                  gridTemplateColumns:
                    {
                      xs: "1fr",

                      lg: "minmax(0, 2fr) minmax(340px, 1fr)",
                    },

                  gap: {
                    xs: 2,
                    md: 2.5,
                  },

                  alignItems:
                    "start",

                  width: "100%",

                  minWidth: 0,
                }}
              >
                <HardwareInventory
                  products={products}
                  onEditProduct={
                    handleEditProduct
                  }
                   onAddProduct={() => {
                    setActiveTab("create");
                  }}
                />

                <SectionCard
                  sx={{
                    height: "100%",
                  }}
                >
                  <RegisterHardwareSaleForm
                    products={products}
                    productOptionLabel={({ name, code }) => `${code} · ${name}`}
                  />
                </SectionCard>
              </Box>
            </>
          ) : (
            <AddHardwareProductForm
              isSubmitting={
                isCreatingProduct
              }
              onCancel={() => {
                setActiveTab(
                  "inventory",
                );
              }}
              onSave={
                handleAddProduct
              }
            />
          )}
        </Box>
      </Box>
    </AppShell>
  );
}