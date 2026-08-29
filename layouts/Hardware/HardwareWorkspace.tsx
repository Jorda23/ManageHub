"use client";

import {
  useCallback,
  useMemo,
  useState,
} from "react";

import { Box } from "@mui/material";

import {
  useCreateHardwareProduct,
  useHardwareProducts,
  useUpdateHardwareProduct,
} from "@/hook/useHardware";

import {
  LoadingState,
  SectionCard,
  RegisterHardwareSaleForm,
  HardwareInventory,
  HardwareInventoryItem,
  AddHardwareProductValues,
  AddHardwareProductForm,
  EditHardwareProductForm,
  EditHardwareProductValues,
  useToast,
} from "@/components";

import type { HardwareProduct } from "@/shared/types/api.types";

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

  const {
    mutateAsync: updateHardwareProduct,
    isPending: isUpdatingProduct,
  } = useUpdateHardwareProduct();

  const { showSuccess, showError } = useToast();

  const [
    editingProduct,
    setEditingProduct,
  ] = useState<HardwareProduct | null>(null);

  const [
    activeTab,
    setActiveTab,
  ] =
    useState<HardwareWorkspaceTab>(
      "inventory",
    );

  const products =
    useMemo<HardwareInventoryItem[]>(() => {
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

  const handleAddProduct = useCallback(
    async (
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

        showSuccess(
          "Producto de ferretería creado correctamente.",
        );

        setActiveTab("inventory");
      } catch {
        showError(
          "No se pudo crear el producto.",
        );

        throw new Error(
          "No se pudo crear el producto.",
        );
      }
    },
    [createHardwareProduct, showSuccess, showError],
  );

  const handleEditProduct = useCallback(
    (
      product: HardwareInventoryItem,
    ): void => {
      const rawProduct =
        hardwareProducts.find(
          (item) => item.id === product.id,
        ) ?? null;

      setEditingProduct(rawProduct);
    },
    [hardwareProducts],
  );

  const handleUpdateProduct = useCallback(
    async (
      id: string,
      values: EditHardwareProductValues,
    ): Promise<void> => {
      try {
        await updateHardwareProduct({
          id,
          request: {
            name: values.name.trim(),
            detail: values.detail.trim(),
            category: values.category.trim(),
            minimumStock: Number(
              values.minimumStock,
            ),
            unitPrice: Number(
              values.unitPrice,
            ),
            inventoryStatus:
              values.inventoryStatus,
            imageUrl:
              values.imageUrl.trim() ||
              null,
          },
        });

        showSuccess(
          "Producto de ferretería actualizado correctamente.",
        );

        setEditingProduct(null);
      } catch {
        showError(
          "No se pudo actualizar el producto.",
        );

        throw new Error(
          "No se pudo actualizar el producto.",
        );
      }
    },
    [updateHardwareProduct, showSuccess, showError],
  );

  if (isLoadingProducts) {
    return (
      <LoadingState message="Cargando módulo de Ferretería..." />
    );
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

          <EditHardwareProductForm
            open={Boolean(editingProduct)}
            product={editingProduct}
            isSubmitting={isUpdatingProduct}
            onClose={() => {
              setEditingProduct(null);
            }}
            onSave={handleUpdateProduct}
          />
        </Box>
      </Box>
  );
}