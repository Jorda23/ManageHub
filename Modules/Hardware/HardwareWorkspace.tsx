"use client";

import { useMemo, useState } from "react";

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

import {
  HardwareInventory,
  type HardwareProduct,
} from "@/components/HardwareInventory";

import { RegisterSaleCard } from "@/components/RegisterSaleCard";
import { SalesHistoryTable } from "@/components/SalesHistoryTable";
import { HardwareWorkspaceHero } from "@/Modules/Hardware/components/HardwareWorkspaceHero";
import { hardwareColors } from "@/theme/sharedColors";

import type { WorkspaceConfig } from "@/components/WorkspaceShared/workspaceTypes";
import { SectionCard } from "./components/SectionCard";
import { MetricCard } from "./components/MetricCard";

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
  subtitle:
    "Control de productos, cantidades, precios, inventario e historial de ventas.",
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

const initialProducts: HardwareProduct[] = [
  {
    id: "drill",
    name: "Taladro inalámbrico",
    detail: "18V Kit",
    category: "Herramientas eléctricas",
    code: "FER-TAL-442",
    stock: 18,
    minStock: 5,
    price: 79.9,
    accent: "#f59e0b",
    status: "inStock",
    imageUrl:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "screws",
    name: "Caja de tornillos",
    detail: "100 unidades",
    category: "Tornillería",
    code: "FER-TOR-210",
    stock: 140,
    minStock: 25,
    price: 9,
    accent: "#0891b2",
    status: "inStock",
    imageUrl:
      "https://images.unsplash.com/photo-1609205807107-e8ec2120f9de?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "hammer",
    name: "Martillo de acero",
    detail: "Mango goma",
    category: "Herramientas manuales",
    code: "FER-MAR-091",
    stock: 36,
    minStock: 8,
    price: 12.75,
    accent: "#0f766e",
    status: "inStock",
    imageUrl:
      "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "cement",
    name: "Bolsa de cemento",
    detail: "42.5 kg",
    category: "Materiales de construcción",
    code: "FER-CEM-425",
    stock: 22,
    minStock: 20,
    price: 8.5,
    accent: "#dc2626",
    status: "inStock",
    imageUrl:
      "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?auto=format&fit=crop&w=700&q=80",
  },
];

const initialSales: HardwareSale[] = [
  {
    id: "sale-001",
    productId: "drill",
    productName: "Taladro inalámbrico",
    quantity: 1,
    unitPrice: 79.9,
    total: 79.9,
    paymentMethod: "Efectivo",
    date: "9/7/26, 10:30 a. m.",
  },
  {
    id: "sale-002",
    productId: "screws",
    productName: "Caja de tornillos",
    quantity: 3,
    unitPrice: 9,
    total: 27,
    paymentMethod: "Tarjeta",
    date: "9/7/26, 10:34 a. m.",
  },
];

const paymentMethods = [
  "Efectivo",
  "Tarjeta",
  "Crédito local",
  "Transferencia",
];

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

function createHardwareProductCode(name: string): string {
  const normalizedName = name
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 8);

  const randomCode = Math.floor(100 + Math.random() * 900);

  return `FER-${normalizedName || "PROD"}-${randomCode}`;
}

export function HardwareWorkspace() {
  const [products, setProducts] = useState<HardwareProduct[]>(initialProducts);

  const [sales, setSales] = useState<HardwareSale[]>(initialSales);

  const [selectedProductId, setSelectedProductId] = useState("drill");

  const [quantity, setQuantity] = useState("1");

  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);

  const [error, setError] = useState("");

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

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
    return products.filter((product) => product.stock <= product.minStock)
      .length;
  }, [products]);

  const handleRegisterSale = (): void => {
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

    const newSale: HardwareSale = {
      id: crypto.randomUUID(),
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      quantity: numericQuantity,
      unitPrice: selectedProduct.price,
      total: saleTotal,
      paymentMethod,
      date: new Date().toLocaleString("es-NI", {
        dateStyle: "short",
        timeStyle: "short",
      }),
    };

    setProducts((currentProducts) =>
      currentProducts.map((product) => {
        if (product.id !== selectedProduct.id) {
          return product;
        }

        const newStock = product.stock - numericQuantity;

        return {
          ...product,
          stock: newStock,
          status: newStock <= product.minStock ? "lowStock" : "inStock",
          accent: newStock <= product.minStock ? colors.danger : product.accent,
        };
      }),
    );

    setSales((currentSales) => [newSale, ...currentSales]);

    setQuantity("1");
  };

  const handleAddProduct = (formValues: AddHardwareProductValues): void => {
    const stock = Number(formValues.stock);

    const minStock = Number(formValues.minStock);

    const price = Number(formValues.price);

    const isLowStock = formValues.status === "lowStock" || stock <= minStock;

    const newProduct: HardwareProduct = {
      id: crypto.randomUUID(),
      name: formValues.name.trim(),
      detail: formValues.detail.trim(),
      category: formValues.category,
      code: createHardwareProductCode(formValues.name),
      stock,
      minStock,
      price,
      accent: isLowStock ? colors.danger : colors.primaryLight,
      status: isLowStock ? "lowStock" : "inStock",
      imageUrl:
        formValues.imageUrl.trim() ||
        "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=700&q=80",
    };

    setProducts((currentProducts) => [newProduct, ...currentProducts]);

    setSelectedProductId(newProduct.id);
    setIsAddProductModalOpen(false);
  };

  const handleEditProduct = (product: HardwareProduct): void => {
    console.log("Editar producto de ferretería:", product);
  };

  return (
    <AppShell active={hardwareConfig.category}>
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

            <SectionCard sx={{ height: "100%" }}>
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
            title="Historial de ventas"
            subtitle="Productos vendidos, cantidades, precios y métodos de pago"
            productIcon={<FaWrench size={13} />}
            getRecordLabel={(sale) =>
              `Venta #${sale.id.slice(-4).toUpperCase()}`
            }
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

      <AddHardwareProductModal
        open={isAddProductModalOpen}
        onClose={() => {
          setIsAddProductModalOpen(false);
        }}
        onSave={handleAddProduct}
      />
    </AppShell>
  );
}



