"use client";

import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";

import {
  useCreateHardwareProduct,
  useHardwareProducts,
  useRegisterHardwareSale,
} from "@/hook/useHardware";

import {
  AddHardwareProductModal,
  type AddHardwareProductValues,
} from "@/components/AddHardwareProductModal";

import {
  LoadingState,
  SectionCard,
  RegisterSaleCard,
  AppShell,
  HardwareInventory,
  HardwareProduct,
} from "@/components";
import { paymentMethods, hardwareConfig } from "@/shared";
import { colors } from "@/theme/sharedColors";
import { HardwareMetricsGrid, HardwareWorkspaceHero } from "./components";

type HardwareSale = {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  paymentMethod: string;
  date: string;
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export function HardwareWorkspace() {
  const { data: hardwareProducts = [], isLoading: isLoadingProducts } = useHardwareProducts();

  const { mutateAsync: createHardwareProduct, isPending: isCreatingProduct } =
    useCreateHardwareProduct();

  const { mutateAsync: registerHardwareSale, isPending: isRegisteringSale } =
    useRegisterHardwareSale();

  const [selectedProductId, setSelectedProductId] = useState("");

  const [quantity, setQuantity] = useState("1");

  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);

  const [error, setError] = useState("");

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const products = useMemo<HardwareProduct[]>(() => {
    return hardwareProducts.map((product) => {
      const isLowStock =
        product.inventoryStatus === "LowStock" || product.stock <= product.minimumStock;

      return {
        id: product.id,

        name: product.name,

        detail: product.detail,

        category: product.category,

        code: product.code,

        stock: product.stock,

        minStock: product.minimumStock,

        price: product.unitPrice,

        status: isLowStock ? "lowStock" : "inStock",

        accent: isLowStock ? colors.danger : colors.primaryLight,

        imageUrl: product.imageUrl ?? "",
      };
    });
  }, [hardwareProducts]);

  useEffect(() => {
    if (products.length > 0 && !selectedProductId) {
      setSelectedProductId(products[0].id);
    }
  }, [products, selectedProductId]);

  useEffect(() => {
    if (
      selectedProductId &&
      products.length > 0 &&
      !products.some((product) => product.id === selectedProductId)
    ) {
      setSelectedProductId(products[0].id);
    }
  }, [products, selectedProductId]);

  const selectedProduct = useMemo(() => {
    return products.find((product) => product.id === selectedProductId);
  }, [products, selectedProductId]);

  const numericQuantity = Number(quantity);

  const saleTotal = useMemo(() => {
    if (!selectedProduct || Number.isNaN(numericQuantity)) {
      return 0;
    }

    return selectedProduct.price * numericQuantity;
  }, [numericQuantity, selectedProduct]);

  const handleRegisterSale = async (): Promise<void> => {
    setError("");

    if (!selectedProduct) {
      setError("Selecciona un producto válido.");

      return;
    }

    if (Number.isNaN(numericQuantity) || numericQuantity <= 0) {
      setError("Ingresa una cantidad mayor a cero.");

      return;
    }

    if (numericQuantity > selectedProduct.stock) {
      setError("No hay suficiente inventario disponible.");

      return;
    }

    try {
      await registerHardwareSale({
        productId: selectedProduct.id,

        quantity: numericQuantity,

        paymentMethod,
      });

      setQuantity("1");
    } catch {
      setError("No se pudo registrar la venta.");
    }
  };

  const handleAddProduct = async (formValues: AddHardwareProductValues): Promise<void> => {
    setError("");

    const initialStock = Number(formValues.initialStock);

    const minimumStock = Number(formValues.minimumStock);

    const unitPrice = Number(formValues.unitPrice);

    if (Number.isNaN(initialStock) || initialStock < 0) {
      setError("El stock inicial debe ser válido.");

      return;
    }

    if (Number.isNaN(minimumStock) || minimumStock < 0) {
      setError("El stock mínimo debe ser válido.");

      return;
    }

    if (minimumStock > initialStock) {
      setError("El stock mínimo no puede ser mayor al stock inicial.");

      return;
    }

    if (Number.isNaN(unitPrice) || unitPrice <= 0) {
      setError("El precio unitario debe ser mayor que cero.");

      return;
    }

    try {
      const response = await createHardwareProduct({
        name: formValues.name.trim(),

        detail: formValues.detail.trim(),

        category: formValues.category.trim(),

        initialStock,

        minimumStock,

        unitPrice,

        inventoryStatus: formValues.inventoryStatus,

        imageUrl: formValues.imageUrl.trim() || null,
      });

      setSelectedProductId(response.id);

      setIsAddProductModalOpen(false);
    } catch {
      setError("No se pudo crear el producto.");
    }
  };

  const handleEditProduct = (product: HardwareProduct): void => {
    console.log("Editar producto de ferretería:", product);
  };

  if (isLoadingProducts) {
    return (
      <AppShell active={hardwareConfig.category}>
        <LoadingState message="Cargando módulo de Ferretería..." />
      </AppShell>
    );
  }

  return (
    <AppShell active={hardwareConfig.category}>
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
            gap: 3,
          }}
        >
          <HardwareWorkspaceHero
            badge={hardwareConfig.badge}
            title={hardwareConfig.title}
            subtitle={hardwareConfig.subtitle}
          />

          <HardwareMetricsGrid hardwareProducts={hardwareProducts} />

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
            <HardwareInventory
              products={products}
              onAddProduct={() => {
                setIsAddProductModalOpen(true);
              }}
              onEditProduct={handleEditProduct}
            />

            <SectionCard
              sx={{
                height: "100%",
              }}
            >
              <RegisterSaleCard
                products={products}
                selectedProduct={selectedProduct}
                selectedProductId={selectedProductId}
                quantity={quantity}
                numericQuantity={numericQuantity}
                paymentMethod={paymentMethod}
                paymentMethods={paymentMethods}
                saleTotal={saleTotal}
                error={error}
                onSelectedProductChange={setSelectedProductId}
                onQuantityChange={setQuantity}
                onPaymentMethodChange={setPaymentMethod}
                onRegisterSale={handleRegisterSale}
              />
            </SectionCard>
          </Box>
        </Box>
      </Box>

      <AddHardwareProductModal
        open={isAddProductModalOpen}
        onClose={() => {
          if (!isCreatingProduct) {
            setIsAddProductModalOpen(false);
          }
        }}
        onSave={handleAddProduct}
      />
    </AppShell>
  );
}
