"use client";

import { useEffect, useMemo, useState } from "react";

import { FaCheckCircle, FaFileInvoiceDollar, FaSeedling, FaWarehouse } from "react-icons/fa";

import { Box } from "@mui/material";

import AppShell from "@/components/AppShell/AppShell";

import { AddGrainModal, type AddGrainFormValues } from "@/components/AddGrainModal";

import { GrainInventory, type GrainProduct } from "@/components/GrainInventory";

import { RegisterSaleCard } from "@/components/RegisterSaleCard";

import { SalesHistoryTable } from "@/components/SalesHistoryTable";

import type { WorkspaceConfig } from "@/components/WorkspaceShared/workspaceTypes";

import {
  useCreateGrainProduct,
  useGrainProducts,
  useGrainSales,
  useRegisterGrainSale,
} from "@/hook/useGrains";

import type { GrainSale as ApiGrainSale } from "@/types/api.types";

import { grainsColors } from "@/theme/sharedColors";

import { HeroHeader } from "./components/HeroHeader";

import { MetricCard } from "./components/MetricCard";

import { SectionCard } from "./components/SectionCard";

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

export const colors = grainsColors;

export const grainsConfig: WorkspaceConfig = {
  category: "grains",

  badge: "Módulo de Ventas",

  title: "Ventas de Granos Básicos",

  subtitle: "Inventario independiente para granos, ventas por libra, saco, quintal o kilogramo.",

  heroAccent: "#5ee3a7",

  heroSecondary: "#f59e0b",

  invoice: "#GRN-2026-082",

  customer: "Alex Rivera",

  customerEmail: "alex.rivera@assethub.com",

  agent: "Jordan P.",

  terminal: "Bodega Granos 01",

  customerMode: "quick",

  summaryLabel: "Comprobante de venta",

  summaryTotal: "$58.32",

  summaryNote:
    "Módulo independiente para controlar inventario, ventas e historial de granos básicos.",

  metrics: [],

  products: [],

  payments: [],

  salesAnalysis: [],

  workflowTitle: "Flujo granos básicos",

  workflowItems: [],
};

const paymentMethods = ["Efectivo", "Tarjeta", "Transferencia"];

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export function GrainsWorkspace() {
  const {
    data: grainProducts = [],
    isLoading: isLoadingProducts,
    isError: isProductsError,
  } = useGrainProducts();

  const { data: apiSales = [], isLoading: isLoadingSales, isError: isSalesError } = useGrainSales();

  const { mutateAsync: createGrainProduct, isPending: isCreatingProduct } = useCreateGrainProduct();

  const { mutateAsync: registerGrainSale, isPending: isRegisteringSale } = useRegisterGrainSale();

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

  const sales = useMemo<GrainSale[]>(() => {
    return apiSales.map((sale: ApiGrainSale) => ({
      id: sale.id,

      productId: sale.productId,

      productName: sale.productName,

      unit: sale.unit,

      quantity: sale.quantity,

      unitPrice: sale.unitPrice,

      total: sale.total,

      paymentMethod: sale.paymentMethod,

      date: new Date(sale.createdAt).toLocaleString("es-NI", {
        dateStyle: "short",

        timeStyle: "short",
      }),
    }));
  }, [apiSales]);

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
  }, [selectedProduct, numericQuantity]);

  const totalSold = useMemo(() => {
    return sales.reduce((total, sale) => total + sale.total, 0);
  }, [sales]);

  const totalInventory = useMemo(() => {
    return products.reduce((total, product) => total + product.stock, 0);
  }, [products]);

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

          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",

                sm: "repeat(2, minmax(0, 1fr))",

                md: "repeat(3, minmax(0, 1fr))",
              },

              gap: 2.5,
            }}
          >
            <MetricCard
              icon={<FaFileInvoiceDollar />}

              iconBg={colors.primarySoft}

              iconColor={colors.primaryLight}

              label="Ventas registradas"

              value={sales.length.toString()}

              detail={`Total: ${formatCurrency(totalSold)}`}
            />

            <MetricCard
              icon={<FaWarehouse />}

              iconBg={colors.orangeSoft}

              iconColor={colors.orange}

              label="Inventario disponible"

              value={totalInventory.toString()}

              detail="Unidades en stock"
            />

            <MetricCard
              icon={<FaCheckCircle />}

              iconBg={colors.primarySoft}

              iconColor={colors.primaryLight}

              label="Productos activos"

              value={products.length.toString()}

              detail="Productos registrados"
            />
          </Box>

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

          <SalesHistoryTable
            sales={sales}

            totalSold={totalSold}

            isLoading={isLoadingSales}

            isError={isSalesError}

            title="Historial de transacciones"

            subtitle="Últimas ventas registradas en el módulo de granos"

            productIcon={<FaSeedling size={13} />}

            getRecordLabel={(sale) => `Venta #${sale.id.slice(-4).toUpperCase()}`}

            getQuantityLabel={(sale) => `${sale.quantity} ${sale.unit}`}

            getProductSecondaryText={() => "Producto vendido"}

            colors={{
              border: colors.cardBorder,

              text: colors.text,

              muted: colors.muted,

              primary: colors.orange,

              primarySoft: colors.orangeSoft,

              tableHead: colors.tableHead,

              rowHover: "#f0fdf4",

              paymentBg: colors.primarySoft,

              paymentText: colors.primary,

              paymentBorder: "#bbf7d0",
            }}
          />
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
