"use client";

import { useMemo, useState, type ReactNode } from "react";

import {
  FaBoxes,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaRegClock,
  FaTools,
  FaWrench,
} from "react-icons/fa";

import { Box, Card, Chip, Paper, Typography } from "@mui/material";

import type { SxProps, Theme } from "@mui/material/styles";

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

import type { WorkspaceConfig } from "@/components/WorkspaceShared/workspaceTypes";

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

const colors = {
  pageBg: "#f3f6f8",
  cardBg: "#ffffff",
  cardBorder: "#dce5e1",
  text: "#0f172a",
  muted: "#64748b",
  softMuted: "#94a3b8",
  primary: "#92400e",
  primaryDark: "#78350f",
  primaryLight: "#f59e0b",
  primarySoft: "#ffedd5",
  blue: "#0891b2",
  blueSoft: "#cffafe",
  green: "#0f766e",
  greenSoft: "#dcfce7",
  danger: "#dc2626",
  dangerSoft: "#fee2e2",
  tableHead: "#f1f5f9",
};

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
          <HeroHeader />

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

function HeroHeader() {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        p: {
          xs: 2,
          sm: 2.5,
          md: 3,
        },
        borderRadius: "16px",
        color: "#ffffff",
        background:
          "linear-gradient(135deg, #78350f 0%, #f59e0b 55%, #0891b2 100%)",
        minHeight: {
          xs: 130,
          md: 118,
        },
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          maxWidth: "100%",
          minWidth: 0,
        }}
      >
        <Chip
          label={hardwareConfig.badge}
          size="small"
          sx={{
            mb: 1.25,
            bgcolor: "rgba(255,255,255,0.18)",
            color: "#fff7ed",
            fontWeight: 900,
            fontSize: 11,
          }}
        />

        <Typography
          sx={{
            fontSize: {
              xs: 22,
              sm: 26,
              md: 34,
            },
            lineHeight: 1.1,
            fontWeight: 950,
          }}
        >
          {hardwareConfig.title}
        </Typography>

        <Typography
          sx={{
            mt: 0.75,
            maxWidth: 760,
            color: "#fff7ed",
            fontSize: {
              xs: 12.5,
              sm: 14,
            },
            lineHeight: 1.45,
          }}
        >
          {hardwareConfig.subtitle}
        </Typography>
      </Box>

      <Box
        sx={{
          position: "absolute",
          right: {
            xs: -28,
            md: 48,
          },
          bottom: {
            xs: -26,
            md: -34,
          },
          color: "rgba(255,255,255,0.15)",
          fontSize: {
            xs: 94,
            md: 150,
          },
          transform: "rotate(-8deg)",
        }}
      >
        <FaTools />
      </Box>
    </Paper>
  );
}

type MetricCardProps = {
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  detail: string;
};

function MetricCard({
  icon,
  iconBg,
  iconColor,
  label,
  value,
  detail,
}: MetricCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",
        border: `1px solid ${colors.cardBorder}`,
        bgcolor: colors.cardBg,
        boxShadow: "0 8px 22px rgba(15, 23, 42, 0.05)",
      }}
    >
      <Box
        sx={{
          p: {
            xs: 1.8,
            md: 2.25,
          },
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "16px",
            display: "grid",
            placeItems: "center",
            bgcolor: iconBg,
            color: iconColor,
            fontSize: 19,
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: 11,
              color: colors.text,
              fontWeight: 950,
              textTransform: "uppercase",
              letterSpacing: "0.03em",
            }}
          >
            {label}
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: 20,
                md: 22,
              },
              fontWeight: 950,
              lineHeight: 1.1,
              color: colors.text,
              overflowWrap: "anywhere",
            }}
          >
            {value}
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              color: colors.muted,
            }}
          >
            {detail}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

type SectionCardProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

function SectionCard({ children, sx }: SectionCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",
        border: `1px solid ${colors.cardBorder}`,
        bgcolor: colors.cardBg,
        overflow: "hidden",
        boxShadow: "0 10px 28px rgba(15, 23, 42, 0.06)",
        minWidth: 0,
        ...sx,
      }}
    >
      {children}
    </Card>
  );
}
