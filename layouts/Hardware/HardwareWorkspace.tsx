"use client";

import {
  useCallback,
  useMemo,
  useState,
} from "react";

import { Box, Dialog } from "@mui/material";

import {
  useCreateHardwareProduct,
  useHardwareProducts,
  useUpdateHardwareProduct,
} from "@/hook/useHardware";

import {
  LoadingState,
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
import { normalizeCurrency } from "@/shared/utils/currency";

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
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);

  const products =
    useMemo<HardwareInventoryItem[]>(() => {
      return hardwareProducts.map(
        (product) => {
          const isLowStock =
            product.inventoryStatus ===
              "LowStock" ||
            product.currentStock <=
              product.minimumStock;

          return {
            id: product.id,
            name: product.name,
            detail: product.detail,
            category: product.category,
            code: product.code,
            stock: product.currentStock,
            initialStock:
              product.initialStock,
            minStock:
              product.minimumStock,
            price: product.unitPrice,
            currency: product.currency,

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
        const safeCurrency = normalizeCurrency(formValues.currency);

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
          currency: safeCurrency,

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
        const safeCurrency = normalizeCurrency(values.currency);

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
            currency: safeCurrency,
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
                      lg: "minmax(0, 1fr)",
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
                   onRegisterSale={() => setIsSaleModalOpen(true)}
                   onAddProduct={() => {
                    setActiveTab("create");
                  }}
                />

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
            <RegisterHardwareSaleForm
              products={products}
              productOptionLabel={({ name, code }) => `${code} · ${name}`}
              onRegistered={() => setIsSaleModalOpen(false)}
            />
          </Dialog>
        </Box>
      </Box>
  );
}