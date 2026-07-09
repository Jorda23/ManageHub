"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  FaBoxOpen,
  FaBoxes,
  FaCashRegister,
  FaCheckCircle,
  FaClipboardCheck,
  FaCreditCard,
  FaDownload,
  FaEdit,
  FaExclamationTriangle,
  FaFilter,
  FaHammer,
  FaMoneyBillWave,
  FaPlusCircle,
  FaReceipt,
  FaRegClock,
  FaShoppingCart,
  FaSyncAlt,
  FaTools,
  FaWrench,
} from "react-icons/fa";

import type { WorkspaceConfig } from "@/components/WorkspaceShared/workspaceTypes";
import AppShell from "@/components/AppShell/AppShell";
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  FormControl,
  IconButton,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

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

const inputSx: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2.5,
    bgcolor: "#fbfdfc",
    fontSize: 14,
    fontWeight: 600,
    color: colors.text,
    "& fieldset": {
      borderColor: colors.cardBorder,
    },
    "&:hover fieldset": {
      borderColor: "#94a3b8",
    },
    "&.Mui-focused fieldset": {
      borderColor: colors.primaryLight,
      borderWidth: 1.5,
    },
  },
};

const selectSx: SxProps<Theme> = {
  borderRadius: 2.5,
  bgcolor: "#fbfdfc",
  fontSize: 14,
  fontWeight: 600,
  color: colors.text,
  "& fieldset": {
    borderColor: colors.cardBorder,
  },
  "&:hover fieldset": {
    borderColor: "#94a3b8",
  },
  "&.Mui-focused fieldset": {
    borderColor: colors.primaryLight,
    borderWidth: 1.5,
  },
};

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
              <SectionHeader
                icon={<FaCashRegister />}
                title="Registrar venta"
              />

              <Divider />

              <Box
                sx={{
                  p: {
                    xs: 1.8,
                    md: 2.5,
                  },
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {error && (
                  <Box
                    sx={{
                      px: 1.5,
                      py: 1,

                      borderRadius: "16px",

                      bgcolor: colors.dangerSoft,
                      border: "1px solid #fecaca",
                      color: colors.danger,
                      fontSize: 12,
                      fontWeight: 800,
                    }}
                  >
                    {error}
                  </Box>
                )}

                <Box>
                  <FieldLabel>Producto</FieldLabel>

                  <FormControl fullWidth size="small">
                    <Select
                      value={selectedProductId}
                      onChange={(event) =>
                        setSelectedProductId(event.target.value)
                      }
                      sx={selectSx}
                    >
                      {products.map((product) => (
                        <MenuItem key={product.id} value={product.id}>
                          {product.name} - {product.detail}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box>
                  <FieldLabel>Cantidad</FieldLabel>

                  <TextField
                    type="number"
                    size="small"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    slotProps={{
                      htmlInput: {
                        min: 1,
                        step: 1,
                      },
                    }}
                    fullWidth
                    sx={inputSx}
                  />
                </Box>

                <Box>
                  <FieldLabel>Método de pago</FieldLabel>

                  <FormControl fullWidth size="small">
                    <Select
                      value={paymentMethod}
                      onChange={(event) => setPaymentMethod(event.target.value)}
                      sx={selectSx}
                    >
                      {paymentMethods.map((method) => (
                        <MenuItem key={method} value={method}>
                          {method}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <SaleSummary
                  product={selectedProduct}
                  quantity={numericQuantity}
                  total={saleTotal}
                />

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<FaPlusCircle />}
                  onClick={handleRegisterSale}
                  sx={{
                    py: 1.35,
                    borderRadius: 2.5,
                    bgcolor: colors.primary,
                    fontWeight: 900,
                    textTransform: "none",
                    boxShadow: "0 12px 24px rgba(245, 158, 11, 0.22)",
                    "&:hover": {
                      bgcolor: "#78350f",
                      boxShadow: "0 14px 28px rgba(245, 158, 11, 0.28)",
                    },
                  }}
                >
                  Registrar venta
                </Button>
              </Box>
            </SectionCard>
          </Box>

          <SalesHistoryTable sales={sales} totalSold={totalSold} />
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

function SaleSummary({
  product,
  quantity,
  total,
}: {
  product?: HardwareProduct;
  quantity: number;
  total: number;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: "16px",

        bgcolor: "#f8fafc",
        border: `1px solid ${colors.cardBorder}`,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.1 }}>
        <SummaryRow label="Producto" value={product?.name ?? "-"} />
        <SummaryRow
          label="Precio unitario"
          value={product ? formatCurrency(product.price) : "$0.00"}
        />
        <SummaryRow label="Cantidad" value={`${quantity || 0}`} />

        <Divider sx={{ my: 0.5 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 20, fontWeight: 950 }}>Total</Typography>

          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 950,
              color: colors.primary,
            }}
          >
            {formatCurrency(total)}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

function SalesHistoryTable({
  sales,
  totalSold,
}: {
  sales: HardwareSale[];
  totalSold: number;
}) {
  return (
    <SectionCard>
      <Box
        sx={{
          p: {
            xs: 1.8,
            md: 2.5,
          },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          borderBottom: `1px solid ${colors.cardBorder}`,
          bgcolor: "#ffffff",
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
              bgcolor: colors.primarySoft,
              color: colors.primary,
              flexShrink: 0,
            }}
          >
            <FaSyncAlt size={14} />
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontWeight: 950,
                fontSize: {
                  xs: 16,
                  md: 18,
                },
                color: colors.text,
              }}
            >
              Historial de ventas
            </Typography>

            <Typography sx={{ fontSize: 12, color: colors.muted }}>
              Productos vendidos, cantidades, precios y métodos de pago
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <SmallIconButton>
            <FaFilter />
          </SmallIconButton>

          <SmallIconButton>
            <FaDownload />
          </SmallIconButton>
        </Box>
      </Box>

      {sales.length === 0 ? (
        <Box
          sx={{
            p: 4,
            textAlign: "center",
            bgcolor: "#fbfdfc",
          }}
        >
          <Typography
            sx={{ fontSize: 14, fontWeight: 950, color: colors.muted }}
          >
            Todavía no hay ventas registradas.
          </Typography>

          <Typography sx={{ color: colors.muted, fontSize: 13, mt: 0.5 }}>
            Cuando registres una venta, aparecerá aquí.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <Box
            component="table"
            sx={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: 0,
              minWidth: {
                xs: 820,
                md: 920,
              },
            }}
          >
            <Box
              component="thead"
              sx={{
                "& th": {
                  px: 2.5,
                  py: 1.6,
                  bgcolor: colors.tableHead,
                  color: colors.muted,
                  fontSize: 11,
                  fontWeight: 950,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  textAlign: "left",
                  borderBottom: `1px solid ${colors.cardBorder}`,
                  whiteSpace: "nowrap",
                },
                "& th:first-of-type": {
                  pl: 3,
                },
                "& th:last-of-type": {
                  pr: 3,
                  textAlign: "right",
                },
              }}
            >
              <tr>
                <th>Fecha</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio unitario</th>
                <th>Pago</th>
                <th>Total</th>
              </tr>
            </Box>

            <Box
              component="tbody"
              sx={{
                "& tr": {
                  transition: "background-color 0.16s ease",
                },
                "& tr:nth-of-type(even)": {
                  bgcolor: "#fbfdfc",
                },
                "& tr:hover": {
                  bgcolor: "#fff7ed",
                },
                "& td": {
                  px: 2.5,
                  py: 1.8,
                  borderBottom: `1px solid ${colors.cardBorder}`,
                  fontSize: 13,
                  color: colors.text,
                  verticalAlign: "middle",
                  whiteSpace: "nowrap",
                },
                "& tr:last-of-type td": {
                  borderBottom: "none",
                },
                "& td:first-of-type": {
                  pl: 3,
                },
                "& td:last-of-type": {
                  pr: 3,
                  textAlign: "right",
                },
              }}
            >
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.25,
                      }}
                    >
                      <Typography sx={{ fontSize: 13, fontWeight: 850 }}>
                        {sale.date}
                      </Typography>

                      <Typography sx={{ fontSize: 11, color: colors.muted }}>
                        Ticket #{sale.id.slice(-4).toUpperCase()}
                      </Typography>
                    </Box>
                  </td>

                  <td>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.2 }}
                    >
                      <Box
                        sx={{
                          width: 30,
                          height: 30,

                          borderRadius: "16px",

                          display: "grid",
                          placeItems: "center",
                          bgcolor: colors.primarySoft,
                          color: colors.primary,
                          flexShrink: 0,
                        }}
                      >
                        <FaWrench size={13} />
                      </Box>

                      <Typography
                        sx={{
                          fontSize: 13,
                          fontWeight: 850,
                          overflowWrap: "anywhere",
                        }}
                      >
                        {sale.productName}
                      </Typography>
                    </Box>
                  </td>

                  <td>
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: 850,
                        textAlign: "center",
                      }}
                    >
                      {sale.quantity}
                    </Typography>
                  </td>

                  <td>
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: 850,
                        textAlign: "center",
                      }}
                    >
                      {formatCurrency(sale.unitPrice)}
                    </Typography>
                  </td>

                  <td>
                    <Chip
                      label={sale.paymentMethod}
                      size="small"
                      sx={{
                        height: 24,
                        px: 0.5,
                        fontSize: 11,
                        fontWeight: 900,
                        bgcolor: colors.greenSoft,
                        color: colors.green,
                        border: "1px solid #bbf7d0",
                        "& .MuiChip-label": {
                          px: 1,
                        },
                      }}
                    />
                  </td>

                  <td>
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: 950,
                        color: colors.primary,
                        textAlign: "right",
                      }}
                    >
                      {formatCurrency(sale.total)}
                    </Typography>
                  </td>
                </tr>
              ))}
            </Box>
          </Box>
        </Box>
      )}

      <Box
        sx={{
          px: {
            xs: 1.8,
            md: 3,
          },
          py: 1.8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          bgcolor: "#f8fafc",
          borderTop: `1px solid ${colors.cardBorder}`,
        }}
      >
        <Typography sx={{ fontSize: 12, color: colors.muted, fontWeight: 700 }}>
          {sales.length} ventas registradas
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            sx={{ fontSize: 12, color: colors.muted, fontWeight: 700 }}
          >
            Total vendido:
          </Typography>

          <Typography
            sx={{ fontSize: 15, color: colors.primary, fontWeight: 950 }}
          >
            {formatCurrency(totalSold)}
          </Typography>
        </Box>
      </Box>
    </SectionCard>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <Typography
      sx={{
        mb: 0.75,
        fontSize: 11,
        color: colors.text,
        fontWeight: 950,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
      }}
    >
      {children}
    </Typography>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Typography sx={{ fontSize: 13, color: colors.muted, fontWeight: 600 }}>
        {label}
      </Typography>

      <Typography
        sx={{
          fontSize: 13,
          color: colors.text,
          fontWeight: 950,
          textAlign: "right",
          overflowWrap: "anywhere",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function SmallIconButton({ children }: { children: ReactNode }) {
  return (
    <IconButton
      size="small"
      sx={{
        width: 36,
        height: 36,
        border: `1px solid ${colors.cardBorder}`,
        borderRadius: "16px",
        color: colors.muted,
        bgcolor: "#ffffff",
        transition: "all 0.16s ease",
        flexShrink: 0,
        "&:hover": {
          bgcolor: colors.primarySoft,
          color: colors.primary,
          borderColor: "#fed7aa",
          transform: "translateY(-1px)",
        },
      }}
    >
      {children}
    </IconButton>
  );
}
