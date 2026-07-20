"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaEdit,
  FaExclamationTriangle,
  FaFileInvoiceDollar,
  FaLeaf,
  FaSeedling,
  FaWarehouse,
} from "react-icons/fa";

import AppShell from "@/components/AppShell/AppShell";
import type { WorkspaceConfig } from "@/components/WorkspaceShared/workspaceTypes";
import {
  Box,
  Card,
  Chip,
  Divider,
  IconButton,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { RegisterSaleCard } from "@/components/RegisterSaleCard";
import { SalesHistoryTable } from "@/components/SalesHistoryTable";

type GrainProduct = {
  id: string;
  name: string;
  unit: string;
  stock: number;
  minStock: number;
  price: number;
  code: string;
  accent: string;
};

type GrainSale = {
  id: string;
  productName: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  total: number;
  paymentMethod: string;
  date: string;
};

const colors = {
  pageBg: "#f3f6f4",
  cardBg: "#ffffff",
  cardBorder: "#dce5e1",
  text: "#0f172a",
  muted: "#64748b",
  softMuted: "#94a3b8",
  primary: "#064e3b",
  primaryLight: "#0f766e",
  primarySoft: "#dcfce7",
  orange: "#f97316",
  orangeSoft: "#ffedd5",
  danger: "#ef4444",
  tableHead: "#f1f5f9",
};

const grainsConfig: WorkspaceConfig = {
  category: "grains",
  badge: "Módulo de Ventas",
  title: "Ventas de Granos Básicos",
  subtitle:
    "Inventario independiente para granos, ventas por libra, saco, quintal o kilogramo.",
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

const initialProducts: GrainProduct[] = [
  {
    id: "rice",
    name: "Arroz blanco",
    unit: "Quintal",
    stock: 120,
    minStock: 20,
    price: 18.5,
    code: "GRN-ARR-2026",
    accent: "#22c55e",
  },
  {
    id: "beans",
    name: "Frijol rojo",
    unit: "Saco",
    stock: 72,
    minStock: 15,
    price: 4.25,
    code: "GRN-FRJ-1011",
    accent: "#f97316",
  },
  {
    id: "corn",
    name: "Maíz amarillo",
    unit: "Quintal",
    stock: 44,
    minStock: 18,
    price: 15.75,
    code: "GRN-MAZ-2050",
    accent: "#f97316",
  },
  {
    id: "sugar",
    name: "Azúcar sulfatada",
    unit: "Saco",
    stock: 88,
    minStock: 12,
    price: 12.4,
    code: "GRN-AZU-3301",
    accent: "#3b82f6",
  },
];

const paymentMethods = ["Efectivo", "Tarjeta", "Transferencia"];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export function GrainsWorkspace() {
  const [products, setProducts] = useState<GrainProduct[]>(initialProducts);
  const [sales, setSales] = useState<GrainSale[]>([
    {
      id: "sale-1",
      productName: "Frijol rojo",
      unit: "Saco",
      quantity: 4,
      unitPrice: 4.25,
      total: 17,
      paymentMethod: "Efectivo",
      date: "9/7/26, 10:36 a. m.",
    },
    {
      id: "sale-2",
      productName: "Frijol rojo",
      unit: "Saco",
      quantity: 5,
      unitPrice: 4.25,
      total: 21.25,
      paymentMethod: "Efectivo",
      date: "9/7/26, 10:35 a. m.",
    },
  ]);

  const [selectedProductId, setSelectedProductId] = useState("beans");
  const [quantity, setQuantity] = useState("1");
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [error, setError] = useState("");

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

  const handleRegisterSale = () => {
    setError("");

    if (!selectedProduct) {
      setError("Selecciona un producto válido.");
      return;
    }

    if (!numericQuantity || numericQuantity <= 0) {
      setError("Ingresa una cantidad mayor a cero.");
      return;
    }

    if (numericQuantity > selectedProduct.stock) {
      setError("No hay suficiente inventario disponible para esta venta.");
      return;
    }

    const newSale: GrainSale = {
      id: crypto.randomUUID(),
      productName: selectedProduct.name,
      unit: selectedProduct.unit,
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
      currentProducts.map((product) =>
        product.id === selectedProduct.id
          ? {
              ...product,
              stock: product.stock - numericQuantity,
            }
          : product,
      ),
    );

    setSales((currentSales) => [newSale, ...currentSales]);
    setQuantity("1");
  };

  return (
    <AppShell active={grainsConfig.category}>
      <Box
        sx={{
          width: "100%",
          minHeight: "calc(100vh - 48px)",
          px: { xs: 2, md: 4 },
          py: { xs: 2.5, md: 3 },
          bgcolor: colors.pageBg,
          color: colors.text,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <HeroHeader />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
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
              value={`${totalInventory}`}
              detail="Unidades en stock"
            />

            <MetricCard
              icon={<FaCheckCircle />}
              iconBg={colors.primarySoft}
              iconColor={colors.primaryLight}
              label="Productos activos"
              value={products.length.toString()}
              detail="Módulos independientes"
            />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                lg: "minmax(0, 2fr) minmax(320px, 1fr)",
              },
              gap: 2.5,
              alignItems: "stretch",
            }}
          >
            <SectionCard>
              <SectionHeader
                icon={<FaBoxOpen />}
                title="Inventario de granos"
                action="VER TODO"
              />

              <Divider />

              <Box sx={{ p: 2.5 }}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      md: "repeat(2, minmax(0, 1fr))",
                    },
                    gap: 2,
                  }}
                >
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </Box>
              </Box>
            </SectionCard>

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
            title="Historial de transacciones"
            subtitle="Últimas ventas registradas en el módulo de granos"
            productIcon={<FaSeedling size={13} />}
            getRecordLabel={(sale) =>
              `Venta #${sale.id.slice(-4).toUpperCase()}`
            }
            getQuantityLabel={(sale) => `${sale.quantity} ${sale.unit}`}
            getProductSecondaryText={() => "Producto vendido"}
            colors={{
              border: colors.cardBorder,
              text: colors.text,
              muted: colors.muted,
              primary: colors.orange,
              primarySoft: colors.orangeSoft,
              tableHead: "#f8fafc",
              rowHover: "#f0fdf4",
              paymentBg: colors.primarySoft,
              paymentText: colors.primary,
              paymentBorder: "#bbf7d0",
            }}
          />
        </Box>
      </Box>
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
        p: { xs: 2.5, md: 3 },
        borderRadius: "16px",
        color: "white",
        background:
          "linear-gradient(135deg, #064e3b 0%, #14532d 58%, #1f6f4a 100%)",
        minHeight: 116,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Chip
          label={grainsConfig.badge}
          size="small"
          sx={{
            mb: 1.25,
            bgcolor: "rgba(255,255,255,0.15)",
            color: "#d1fae5",
            fontWeight: 900,
            fontSize: 11,
          }}
        />

        <Typography sx={{ fontSize: 22, fontWeight: 950, lineHeight: 1.1 }}>
          {grainsConfig.title}
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            maxWidth: 760,
            color: "#d1fae5",
            fontSize: 14,
          }}
        >
          {grainsConfig.subtitle}
        </Typography>
      </Box>

      <Box
        sx={{
          position: "absolute",
          right: { xs: -16, md: 50 },
          bottom: -30,
          color: "rgba(255,255,255,0.11)",
          fontSize: { xs: 110, md: 150 },
          transform: "rotate(-8deg)",
        }}
      >
        <FaLeaf />
      </Box>
    </Paper>
  );
}

function MetricCard({
  icon,
  iconBg,
  iconColor,
  label,
  value,
  detail,
}: {
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  detail: string;
}) {
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
      <Box sx={{ p: 2.25 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
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

          <Box>
            <Typography
              sx={{
                fontSize: 11,
                color: colors.text,
                fontWeight: 900,
                textTransform: "uppercase",
              }}
            >
              {label}
            </Typography>

            <Typography
              sx={{
                fontSize: 18,
                color: colors.text,
                fontWeight: 950,
                mt: 0.25,
              }}
            >
              {value}
            </Typography>

            <Typography sx={{ fontSize: 12, color: colors.muted }}>
              {detail}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

function SectionCard({
  children,
  sx,
}: {
  children: ReactNode;
  sx?: SxProps<Theme>;
}) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",
        border: `1px solid ${colors.cardBorder}`,
        bgcolor: colors.cardBg,
        overflow: "hidden",
        boxShadow: "0 10px 28px rgba(15, 23, 42, 0.06)",
        ...sx,
      }}
    >
      {children}
    </Card>
  );
}

function SectionHeader({
  icon,
  title,
  action,
}: {
  icon: ReactNode;
  title: string;
  action?: string;
}) {
  return (
    <Box
      sx={{
        px: 2.5,
        py: 2,
        bgcolor: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 1.2, alignItems: "center" }}>
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: "16px",
            display: "grid",
            placeItems: "center",
            color: colors.primaryLight,
            bgcolor: colors.primarySoft,
          }}
        >
          {icon}
        </Box>

        <Typography sx={{ fontWeight: 950, fontSize: 14,            color: colors.text }}>{title}</Typography>
      </Box>

      {action && (
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 950,
            color: colors.primary,
            cursor: "pointer",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          {action}
        </Typography>
      )}
    </Box>
  );
}

function ProductCard({ product }: { product: GrainProduct }) {
  const stockPercent = Math.min(100, product.stock);
  const isLowStock = product.stock <= product.minStock;
  const warningColor = isLowStock ? colors.danger : product.accent;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: "16px",
        border: `1px solid ${colors.cardBorder}`,
        bgcolor: "#ffffff",
        minHeight: 132,
        transition: "all 0.18s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          borderColor: "#b7c7c2",
          boxShadow: "0 12px 26px rgba(15, 23, 42, 0.08)",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 1.5,
          }}
        >
          <Box>
            <Box sx={{ display: "flex", gap: 0.75, alignItems: "center" }}>
              <Typography
                sx={{ fontSize: 13, color: colors.text, fontWeight: 950 }}
              >
                {product.name}
              </Typography>

              {isLowStock ? (
                <FaExclamationTriangle size={12} color={colors.danger} />
              ) : (
                <FaCheckCircle size={12} color={colors.primaryLight} />
              )}
            </Box>

            <Typography
              sx={{
                fontSize: 11,
                color: colors.softMuted,
                fontWeight: 700,
              }}
            >
              {product.code}
            </Typography>
          </Box>

          <IconButton
            size="small"
            sx={{
              width: 30,
              height: 30,
              bgcolor: "#f8fafc",
              border: `1px solid ${colors.cardBorder}`,
              color: colors.muted,
              "&:hover": {
                bgcolor: colors.primarySoft,
                color: colors.primary,
              },
            }}
          >
            <FaEdit size={12} />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Typography
            sx={{ fontSize: 11, color: colors.muted, fontWeight: 800 }}
          >
            UNIDAD:{" "}
            <Box component="span" sx={{ color: colors.text, fontWeight: 950 }}>
              {product.unit}
            </Box>
          </Typography>

          <Typography
            sx={{ fontSize: 11, color: colors.orange, fontWeight: 800 }}
          >
            PRECIO:{" "}
            <Box component="span" sx={{ fontWeight: 950 }}>
              {formatCurrency(product.price)}
            </Box>
          </Typography>
        </Box>

        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 0.7,
            }}
          >
            <Typography sx={{ fontSize: 10.5, fontWeight: 950 }}>
              STOCK ACTUAL
            </Typography>

            <Typography sx={{ fontSize: 10.5, fontWeight: 950 }}>
              {product.stock}
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={stockPercent}
            sx={{
              height: 7,
              borderRadius: 999,
              bgcolor: "#e5e7eb",
              "& .MuiLinearProgress-bar": {
                bgcolor: warningColor,
                borderRadius: 999,
              },
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
}
