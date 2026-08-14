"use client";

import { useEffect, useMemo, useState } from "react";

import {
  FaBoxes,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaRegClock,
  FaWrench,
} from "react-icons/fa";

import { Box } from "@mui/material";

import AppShell from "@/components/AppShell/AppShell";

import {
  AddHardwareProductModal,
  type AddHardwareProductValues,
} from "@/components/AddHardwareProductModal";

import { HardwareInventory, type HardwareProduct } from "@/components/HardwareInventory";

import { RegisterSaleCard } from "@/components/RegisterSaleCard";

import { SalesHistoryTable } from "@/components/SalesHistoryTable";

import { HardwareWorkspaceHero } from "@/Modules/Hardware/components/HardwareWorkspaceHero";

import {
  useCreateHardwareProduct,
  useHardwareProducts,
  useHardwareSales,
  useRegisterHardwareSale,
} from "@/hook/useHardware";

import { hardwareColors } from "@/theme/sharedColors";

import type { WorkspaceConfig } from "@/components/WorkspaceShared/workspaceTypes";

import type { HardwareSale as ApiHardwareSale } from "@/types/api.types";

import { SectionCard } from "./components/SectionCard";

import { MetricCard } from "./components/MetricCard";
import { LoadingState } from "@/components/LoadingState";

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

export const colors = hardwareColors;

const hardwareConfig: WorkspaceConfig = {
  category: "hardware",

  badge: "Ferretería",

  title: "Ventas de Ferretería",

  subtitle: "Control de productos, cantidades, precios, inventario e historial de ventas.",

  heroAccent: "#f59e0b",

  heroSecondary: "#19d3d8",

  invoice: "#FER-2026-014",

  customer: "Carlos Mendoza",

  customerEmail: "carlos.mendoza@assethub.com",

  agent: "M. Torres",

  terminal: "Caja Ferretería 01",

  customerMode: "quick",

  summaryLabel: "Ticket de venta",

  summaryTotal: "$124.90",

  summaryNote:
    "Módulo para ventas rápidas de productos de ferretería, control de stock e historial.",

  metrics: [],

  products: [],

  payments: [],

  salesAnalysis: [],

  workflowTitle: "Flujo ferretería",

  workflowItems: [
    "Seleccionar productos del inventario",
    "Verificar cantidades y precios",
    "Cobrar y generar recibo",
  ],
};

const paymentMethods = ["Efectivo", "Tarjeta", "Crédito local", "Transferencia"];

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export function HardwareWorkspace() {
  const {
    data: hardwareProducts = [],
    isLoading: isLoadingProducts,
    isError: isProductsError,
  } = useHardwareProducts();

  const {
    data: apiSales = [],
    isLoading: isLoadingSales,
    isError: isSalesError,
  } = useHardwareSales();

  const { mutateAsync: createHardwareProduct, isPending: isCreatingProduct } =
    useCreateHardwareProduct();

  const { mutateAsync: registerHardwareSale, isPending: isRegisteringSale } =
    useRegisterHardwareSale();

  const isLoading = isLoadingProducts || isRegisteringSale;

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

  const sales = useMemo<HardwareSale[]>(() => {
    return apiSales.map((sale: ApiHardwareSale) => ({
      id: sale.id,

      productId: sale.productId,

      productName: sale.productName,

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
  }, [numericQuantity, selectedProduct]);

  const totalSold = useMemo(() => {
    return sales.reduce((total, sale) => total + sale.total, 0);
  }, [sales]);

  const totalStock = useMemo(() => {
    return products.reduce((total, product) => total + product.stock, 0);
  }, [products]);

  const lowStockCount = useMemo(() => {
    return products.filter((product) => product.stock <= product.minStock).length;
  }, [products]);

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

  return (
    <AppShell active={hardwareConfig.category}>
      {isLoading ? (
        <LoadingState message="Cargando módulo de Ferretería..." />
      ) : (
        <Box
          sx={{
            width: "100%",
            maxWidth: "100vw",
            minHeight: "calc(100vh - 48px)",
            overflowX: "hidden",
            px: {
              xs: 1.5,
              sm: 2,
              md: 4,
            },
            py: {
              xs: 2,
              md: 3,
            },
            bgcolor: colors.pageBg,
            color: colors.text,
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: {
                xs: "100%",
                xl: 1320,
              },
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              gap: {
                xs: 2,
                md: 3,
              },
            }}
          >
            <HardwareWorkspaceHero
              badge={hardwareConfig.badge}
              title={hardwareConfig.title}
              subtitle={hardwareConfig.subtitle}
            />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                  lg: "repeat(4, minmax(0, 1fr))",
                },
                gap: {
                  xs: 1.5,
                  md: 2,
                },
              }}
            >
              <MetricCard
                icon={<FaClipboardCheck />}
                iconBg={colors.greenSoft}
                iconColor={colors.green}
                label="Ventas registradas"
                value={sales.length.toString()}
                detail={`Total: ${formatCurrency(totalSold)}`}
              />

              <MetricCard
                icon={<FaBoxes />}
                iconBg={colors.primarySoft}
                iconColor={colors.primaryLight}
                label="Productos en stock"
                value={totalStock.toString()}
                detail={`${products.length} productos activos`}
              />

              <MetricCard
                icon={<FaExclamationTriangle />}
                iconBg={colors.dangerSoft}
                iconColor={colors.danger}
                label="Bajo inventario"
                value={lowStockCount.toString()}
                detail="Requieren revisión"
              />

              <MetricCard
                icon={<FaRegClock />}
                iconBg={colors.blueSoft}
                iconColor={colors.blue}
                label="Tiempo en caja"
                value="2m 11s"
                detail="Atención promedio"
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

            <SalesHistoryTable
              sales={sales}
              totalSold={totalSold}
              isLoading={isLoadingSales}
              isError={isSalesError}
              title="Historial de ventas"
              subtitle="Productos vendidos, cantidades, precios y métodos de pago"
              productIcon={<FaWrench size={13} />}
              getRecordLabel={(sale) => `Venta #${sale.id.slice(-4).toUpperCase()}`}
              getQuantityLabel={(sale) => `${sale.quantity}`}
              getProductSecondaryText={() => "Producto de ferretería"}
              colors={{
                primary: colors.primary,
                primarySoft: colors.primarySoft,
                border: colors.cardBorder,
                text: colors.text,
                muted: colors.muted,
                tableHead: colors.tableHead,
                rowHover: "#fff7ed",
                paymentBg: colors.greenSoft,
                paymentText: colors.green,
                paymentBorder: "#bbf7d0",
              }}
            />
          </Box>
        </Box>
      )}

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
