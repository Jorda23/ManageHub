"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  FaBoxOpen,
  FaBoxes,
  FaCheckCircle,
  FaClipboardCheck,
  FaEdit,
  FaExclamationTriangle,
  FaRegClock,
  FaTools,
  FaWrench,
} from "react-icons/fa";

import type { WorkspaceConfig } from "@/components/WorkspaceShared/workspaceTypes";
import AppShell from "@/components/AppShell/AppShell";
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

type HardwareProduct = {
  id: string;
  name: string;
  detail: string;
  code: string;
  stock: number;
  minStock: number;
  price: number;
  accent: string;
};

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
    code: "FER-TAL-442",
    stock: 18,
    minStock: 5,
    price: 79.9,
    accent: "#f59e0b",
  },
  {
    id: "screws",
    name: "Caja de tornillos",
    detail: "100 unidades",
    code: "FER-TOR-210",
    stock: 140,
    minStock: 25,
    price: 9,
    accent: "#0891b2",
  },
  {
    id: "hammer",
    name: "Martillo de acero",
    detail: "Mango goma",
    code: "FER-MAR-091",
    stock: 36,
    minStock: 8,
    price: 12.75,
    accent: "#0f766e",
  },
  {
    id: "cement",
    name: "Bolsa de cemento",
    detail: "42.5 kg",
    code: "FER-CEM-425",
    stock: 22,
    minStock: 20,
    price: 8.5,
    accent: "#dc2626",
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

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export function HardwareWorkspace() {
  const [products, setProducts] = useState<HardwareProduct[]>(initialProducts);
  const [sales, setSales] = useState<HardwareSale[]>(initialSales);
  const [selectedProductId, setSelectedProductId] = useState("drill");
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
              value={`${totalStock}`}
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
            <SectionCard>
              <SectionHeader
                icon={<FaBoxOpen />}
                title="Inventario de ferretería"
                action="VER TODO"
              />

              <Divider />

              <Box
                sx={{
                  p: {
                    xs: 1.5,
                    sm: 2,
                    md: 2.5,
                  },
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      md: "repeat(2, minmax(0, 1fr))",
                    },
                    gap: {
                      xs: 1.5,
                      md: 2,
                    },
                    width: "100%",
                    minWidth: 0,
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
            productIcon={<FaWrench size={13} />}
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
          />{" "}
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
        p: {
          xs: 2,
          sm: 2.5,
          md: 3,
        },
        borderRadius: "16px",

        color: "white",
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
      <Box sx={{ position: "relative", zIndex: 2, maxWidth: "100%" }}>
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

          <Typography sx={{ fontSize: 12, color: colors.muted }}>
            {detail}
          </Typography>
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
        minWidth: 0,
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
        px: {
          xs: 1.8,
          md: 2.5,
        },
        py: 2,
        bgcolor: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box
        sx={{ display: "flex", gap: 1.2, alignItems: "center", minWidth: 0 }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,

            borderRadius: "16px",

            display: "grid",
            placeItems: "center",
            color: colors.primary,
            bgcolor: colors.primarySoft,
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>

        <Typography
          sx={{
            fontWeight: 950,
            fontSize: {
              xs: 16,
              md: 18,
            },
            color: colors.text,
            overflowWrap: "anywhere",
          }}
        >
          {title}
        </Typography>
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
            whiteSpace: "nowrap",
          }}
        >
          {action}
        </Typography>
      )}
    </Box>
  );
}

function ProductCard({ product }: { product: HardwareProduct }) {
  const stockPercent = Math.min(100, product.stock);
  const isLowStock = product.stock <= product.minStock;
  const barColor = isLowStock ? colors.danger : product.accent;

  return (
    <Paper
      elevation={0}
      sx={{
        p: {
          xs: 1.8,
          md: 2,
        },
        borderRadius: "16px",

        border: `1px solid ${colors.cardBorder}`,
        bgcolor: "#ffffff",
        width: "100%",
        minWidth: 0,
        transition: "all 0.18s ease",
        "&:hover": {
          transform: {
            xs: "none",
            md: "translateY(-2px)",
          },
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
          <Box sx={{ minWidth: 0 }}>
            <Box sx={{ display: "flex", gap: 0.75, alignItems: "center" }}>
              <Typography
                sx={{
                  fontWeight: 950,
                  fontSize: 14.5,
                  color: colors.text,
                }}
              >
                {product.name}
              </Typography>

              {isLowStock ? (
                <FaExclamationTriangle size={12} color={colors.danger} />
              ) : (
                <FaCheckCircle size={12} color={colors.green} />
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
              flexShrink: 0,
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
            flexWrap: "wrap",
          }}
        >
          <Typography
            sx={{ fontSize: 11, color: colors.muted, fontWeight: 800 }}
          >
            DETALLE:{" "}
            <Box component="span" sx={{ color: colors.text, fontWeight: 950 }}>
              {product.detail}
            </Box>
          </Typography>

          <Typography
            sx={{ fontSize: 11, color: colors.primary, fontWeight: 800 }}
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
                bgcolor: barColor,
                borderRadius: 999,
              },
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
}
