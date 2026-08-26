"use client";

import { useMemo, useState } from "react";
import { Box } from "@mui/material";

import { useCreateGrainProduct, useGrainProducts, useRegisterGrainSale } from "@/hook/useGrains";

import { LoadingState, SectionCard, RegisterSaleCard, AppShell } from "@/components";
import { AddGrainModal, type AddGrainFormValues } from "@/components/AddGrainModal";
import { GrainInventory, type GrainProduct } from "@/components/GrainInventory";

import { grainsConfig } from "@/shared/data/grains.data";
import { paymentMethods } from "@/shared";
import { colors } from "@/theme/sharedColors";
import { GrainMetricsGrid, HeroHeader } from "./components";

type GrainSale = {
  id: string;
  productId: string;
  productName: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  total: number;
  paymentMethod: string;
  date: string;
};

export function GrainsWorkspace() {
  const { data: grainProducts = [], isLoading: isLoadingProducts } = useGrainProducts();

  const { mutateAsync: createGrainProduct, isPending: isCreatingProduct } = useCreateGrainProduct();

  const { mutateAsync: registerGrainSale } = useRegisterGrainSale();

  const [selectedProductId, setSelectedProductId] = useState("");

  const [quantity, setQuantity] = useState("1");

  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);

  const [error, setError] = useState("");

  const [isAddGrainOpen, setIsAddGrainOpen] = useState(false);

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

        minStock: product.minimumStock,

        price: product.unitPrice,

        silo: product.location,

        imageUrl: product.imageUrl ?? "",

        status: isLowStock ? "lowStock" : "inStock",

        accent: isLowStock ? colors.danger : colors.primaryLight,
      };
    });
  }, [grainProducts]);

  const activeSelectedProductId = useMemo(() => {
    if (selectedProductId && products.some((product) => product.id === selectedProductId)) {
      return selectedProductId;
    }

    return products[0]?.id ?? "";
  }, [products, selectedProductId]);

  const selectedProduct = useMemo(() => {
    return products.find((product) => product.id === activeSelectedProductId);
  }, [activeSelectedProductId, products]);

  const numericQuantity = Number(quantity);

  const saleTotal = useMemo(() => {
    if (!selectedProduct || Number.isNaN(numericQuantity)) {
      return 0;
    }

    return selectedProduct.price * numericQuantity;
  }, [selectedProduct, numericQuantity]);

  const handleRegisterSale = async (): Promise<void> => {
    setError("");

    if (!selectedProduct) {
      setError("Selecciona un producto válido.");

      return;
    }

    if (Number.isNaN(numericQuantity) || numericQuantity <= 0) {
      setError("Ingresa una cantidad mayor que cero.");

      return;
    }

    if (numericQuantity > selectedProduct.stock) {
      setError("No hay suficiente inventario disponible para esta venta.");

      return;
    }

    try {
      await registerGrainSale({
        productId: selectedProduct.id,

        quantity: numericQuantity,

        paymentMethod,
      });

      setQuantity("1");
    } catch {
      setError("No se pudo registrar la venta.");
    }
  };

  const handleAddGrain = async (formValues: AddGrainFormValues): Promise<void> => {
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
      const response = await createGrainProduct({
        name: formValues.name.trim(),

        unit: formValues.unit.trim(),

        location: formValues.location.trim(),

        initialStock,

        minimumStock,

        unitPrice,

        imageUrl: formValues.imageUrl.trim() || null,
      });

      setSelectedProductId(response.id);

      setIsAddGrainOpen(false);
    } catch {
      setError("No se pudo crear el producto.");
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
            gap: 3,
          }}
        >
          <HeroHeader />

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
              onAddProduct={() => {
                setIsAddGrainOpen(true);
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
                selectedProductId={activeSelectedProductId}
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

      <AddGrainModal
        open={isAddGrainOpen}

        onClose={() => {
          if (!isCreatingProduct) {
            setIsAddGrainOpen(false);
          }
        }}

        onSave={handleAddGrain}
      />
    </AppShell>
  );
}
